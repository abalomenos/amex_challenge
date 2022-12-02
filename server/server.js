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
app.get("/results", (req, res) => {
    const results = localStorage.getItem("responseAmex");
    res.status(200).json(results);
    console.log(results);
});


app.post("/login", (req, res) => {
    const UserID = req.body.UserID;
    const Password = req.body.Password;
    console.log(UserID);
    console.log(Password);
    const data = {
        Logon: "Logon",
        UserID: UserID,
        Password: Password
    }

    // Amex login --->
    axios({
        method: "post",
        url: "https://global.americanexpress.com/myca/logon/us/action/login",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
        },
        data: qs.stringify(data)
      })
      .then((response) => {
        // Add response to localStorage
        localStorage.setItem("responseAmex", JSON.stringify(response.data));
        
        console.log(response.data);
        res.json(response.data);
      }, (error) => {
        console.log(error); 
       }).catch(err => console.log(err));

    // Amex login <---

    // const testData = {
    //     statusCode: 2,
    //     errorCode: 'LGON001',
    //     errorMessage: 'Your User ID or Password is incorrect. Please try again.',
    //     redirectUrl: '',
    //     debugInfo: '',
    //     reauth: null,
    //     challenge: false
    // }

    // localStorage.setItem('responseAmex', JSON.stringify(testData));
    //     console.log(testData);
    //     res.json(testData);
});
// API Routes <---


// Set port
const PORT = process.env.PORT || 3001;

// Listen for requests
app.listen(PORT, () => {
  console.log("Server is running on port ${PORT}.");
});
