// Import Express
const express = require("express");

// Import cors
const cors = require("cors");

// Import Axios
const axios = require("axios").default;

// Import Query String
const qs = require("qs");

// Import Backend LocalStorage
const {LocalStorage} = require("node-localstorage");
localStorage = new LocalStorage("./scratch");


const app = express();

// API Middlewares
app.use(express.json()); // accept data in json format
app.use(cors()); //To enable cross-origin resource sharing with front end


localStorage.clear();


// API Routes --->
app.get("/api/results", (req, res) => {
    const results = localStorage.getItem("responseAmex");
    res.status(200).json(results);
});


app.post("/api/login", (req, res) => {
    const UserID = req.body.UserID;
    const Password = req.body.Password;
    console.log("UserID: "+ UserID);
    console.log("Password: "+ Password);
    const data = {
        Logon: "Logon",
        UserID: UserID,
        Password: Password
    }

    // Amex login --->
    axios({
        method: "post",
        url: "https://global.americanexpress.com/myca/logon/us/action/login",
        data: qs.stringify(data)
      })
      .then((response) => {

          responseText = JSON.stringify(response.data);
          jsonObj = JSON.parse(responseText);
        
          amexErrorCode = jsonObj.errorCode;
          amexErrorMessage = jsonObj.errorMessage;
          console.log("ErrorCode: " + amexErrorCode);
          console.log("ErrorMessage: " + amexErrorMessage);
          if(amexErrorCode == "LGON001")
          {
            responseText = amexErrorMessage;
          }

        // Add response to localStorage
        localStorage.setItem("responseAmex", responseText);
        
        console.log("ResponseText: " + responseText);
        res.json(responseText);
      }, (error) => {
        console.log(error); 
       }).catch(err => console.log(err));

    // Amex login <---

});

// Set port
const PORT = process.env.PORT || 3001;

// Listen for requests
app.listen(PORT, () => {
  console.log("Server is running on port ${PORT}.");
});
