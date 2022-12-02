import { Button, ButtonGroup, Heading, VStack, FormControl, FormErrorMessage, Input, Container  } from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";


const Login = () => {

    const [data, setData] = useState([]);

        const formik = useFormik({
            initialValues:{ UserID: "", Password: "" },        
            validationSchema: Yup.object({
                UserID: Yup.string()
                .required("Username is required.")
                .min(6, "Username must be at least 6 characters.")
                .max(20, "Username cannot exceed 20 characters."),
                Password: Yup.string()
                .required("Password is required.")
                .min(6, "Password must be at least 6 characters.")
                .max(20, "Password cannot exceed 20 characters."),
            }),
            onSubmit: (values, actions) => {
                //alert(JSON.stringify(values, null, 2));
                const vals = { ...values };
                actions.resetForm();
                
                // POST login input --->
                fetch("http://localhost:3001/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(vals),                     
                })
                .catch(err => {
                    return;
                })
                .then(res => {
                    if (!res || !res.ok || res.status >= 400) {
                        return;
                    }
                    return res.json();
                })
                .then(data => {

                    // GET results from backend localStorage --->
                    fetch("http://localhost:3001/results", {
                        method: "GET",
                    })
                    .catch(err => {
                        return;
                    })
                        .then((res) => res.json())
                        .then((data) => {
                            setData(data);
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                    //GET results from backend localStorage <---

                    if (!data) return;
                    console.log(data);
                });
                // POST login input <---

            },

            });
        
        return (
            <VStack
                as="form"
                w={{ base: "90%", md: "450px" }}
                justify="center"
                h="75vh"
                m="auto"
                spacing="1.2rem"
                onSubmit={formik.handleSubmit}
            >
                <Heading>Log In</Heading>
                <FormControl isInvalid={formik.errors.UserID && formik.touched.UserID}>
                    <Input
                        name="UserID"
                        placeholder="Enter username"
                        autoComplete="off"
                        value={formik.values.UserID}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <FormErrorMessage>{formik.errors.UserID}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={formik.errors.Password && formik.touched.Password}>
                    <Input
                        name="Password"
                        type="password"
                        placeholder="Enter password"
                        autoComplete="off"
                        value={formik.values.Password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <FormErrorMessage>{formik.errors.Password}</FormErrorMessage>
                </FormControl>

                <ButtonGroup pt="1.5rem">
                    <Button colorScheme="teal" type="submit">
                        Log In
                    </Button>
                </ButtonGroup>

                <Heading>Server Response</Heading>
                <Container
                    w={{ base: "90%", md: "500px" }}
                    h="20vh" 
                    color="green.600" 
                    border="1px"
                    borderColor="gray.600"
                    p="1rem"
                    spacing="1.5rem"
                >
                    {data}
                </Container>
            </VStack>  
);
};

export default Login;