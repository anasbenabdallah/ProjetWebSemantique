// Register.js

import  { useState } from 'react';
import { Button, TextField, Paper, Grid, Typography } from '@mui/material';
import axios from 'axios';

export default function Register() {
    const [formData, setFormData] = useState({
        employeename: '',
        email: '',
        password: '',
        role: '',
    });

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async () => {
        try {
            // const response = await axios.post('http://localhost:8091/api/v1/employee/save', {
            //     // method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     // body: JSON.stringify(formData),
            // }
            // ,formData
            // );

            // const data = await response.json();

            // if (response.ok) {
            //     console.log("Registered successfully:", data);
            // } else {
            //     console.error("Registration error:", data);
            // }
            const formDataCoordinator = {
                userFullName: formData.employeename,
                userEmail: formData.email,
                userPassword: formData.password
            }
            if(formData.role === "user"){
                await axios.post("http://192.168.1.16:8087/AMINEMS/user/create", formDataCoordinator).then(
                    (res) => console.log(res.data)
                ).catch(
                    (error) => console.log(error)
                );
            }else if(formData.role === "professor"){
                await axios.post("http://192.168.1.16:8087/AMINEMS/expert/create", formDataCoordinator).then(
                    (res) => console.log(res.data)
                ).catch(
                    (error) => console.log(error)
                );
            }
        } catch (error) {
            console.error("There was an error during registration:", error);
        }
    };

    console.log(formData)
    return (
        <Paper style={{ padding: '16px', maxWidth: '500px', margin: 'auto' }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h5">Register</Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Name"
                        name="employeename"
                        value={formData.employeename}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        type="password"
                        label="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        select
                        label="Role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        SelectProps={{ native: true }}
                    >
                        <option value="user">User</option>
                        <option value="professor">Professor</option>
                    </TextField>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        Register
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    );
}
