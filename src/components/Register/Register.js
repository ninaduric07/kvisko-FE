import { useState } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Box, Button, Stack } from "@mui/material";
import MySmallButton from '../Buttons/MySmallButton';

export default function Form() {


    // States for registration
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const navigateTo = useNavigate();
    const { handleSubmit } = useForm();

    // States for checking the errors
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);
    const [pbr, setPbr] = useState('');
    const handleChange = (e) => {
        setPbr(e.target.value);
    };

    // Handling the name change
    const handleUsername = (e) => {
        setUsername(e.target.value);
        setSubmitted(false);
    };

    const handleName = (e) => {
        setName(e.target.value);
        setSubmitted(false);
    };
    const handleSurname = (e) => {
        setSurname(e.target.value);
        setSubmitted(false);
    };

    // Handling the email change
    const handleEmail = (e) => {
        setEmail(e.target.value);
        setSubmitted(false);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
        setSubmitted(false);
    };
    const handleRepeatPassword = (e) => {
        setRepeatPassword(e.target.value);
        setSubmitted(false);
    };

    // Handling the form submission
    const onSubmitting = async (c, e) => {
        e.preventDefault();
        //console.log(e);
        if ((password !== repeatPassword)) {
            setError(true);
            return;
        }

        else {
            await axios.post(process.env.REACT_APP_BASE_URL +`/register`,
                {
                    username,
                    name,
                    surname,
                    password,
                    email,
                
                }

            ).then((response) => {
                console.log(response.json);
                navigateTo('/login');
                setError(false);
                setSubmitted(true);
                return response.data;
            }).catch((err) => {
                setError(true);
                return err;
            });
        }
    };


    // Showing success message
    const successMessage = () => {
        return (
            <div
                className="success"
                style={{
                    display: submitted ? '' : 'none',
                }}>
                <h1> User {name} successfully registered!!</h1>
            </div>
        );
    };


    // Showing error message if error is true
    const errorMessage = () => {
        return (
            <div
                className="error"
                style={{
                    display: error ? '' : 'none',
                }}>
                <p style={{ color: "red", fontSize: 20 }}>Nešto ne valja! Pokušajte ponovno</p>
            </div>
        );
    };

    return (

        <div className='form'>
            <div className="p-3 my-5 d-flex flex-column w-50" direction="row" style={{
                position: 'absolute', left: '50%', top: '55%',
                transform: 'translate(-50%, -50%)',
                border: '10px solid rgba(255, 165, 0, 0.5)',
                padding: '20px'
            }}>
                <p style={{ fontSize: 20 }}> Registracija</p>

                {/* Calling to the methods */}
                <form onSubmit={handleSubmit(onSubmitting)}>
                    {/* Labels and inputs for form data */}
                    <Stack direction='row' justifyContent='space-between' alignItems='center' spacing='8px' >
                        <label className="label">Korisničko ime:  </label>

                        <input onChange={handleUsername} className="input"
                            type="text" name='name' id="name" value={username} placeholder="Username" required />
                    </Stack>
                    <br />
                    <Stack direction='row' justifyContent='space-between' alignItems='center' spacing='5rem' >
                        <label className="label">Ime:  </label>

                        <input onChange={handleName} className="input"
                            type="text" name='name' id="name" value={name} placeholder="Name" required />
                    </Stack>
                    <br />
                    <Stack direction='row' justifyContent='space-between' alignItems='center' spacing='3rem'>
                        <label className="label">Prezime:   </label>

                        <input onChange={handleSurname} className="input"
                            value={surname} type="text" name='surname' id="surname" placeholder='Last name' required />
                    </Stack>

                    <br />

                    <Stack direction='row' justifyContent='space-between' alignItems='center' spacing='4.2rem' >
                        <label className="label">Email:</label>
                        <input onChange={handleEmail} className="input"
                            value={email} type="email" name='email' id="email" placeholder='Email' required />

                    </Stack>
                    <br />
                    <Stack direction='row' justifyContent='space-between' alignItems='center' spacing='4.2rem' >
                        <label className="label">Lozinka</label>
                        <input onChange={handlePassword} className="input"
                            value={password} type="password" name='password' id="password" minLength={8} placeholder='Password' required />

                    </Stack>
                    <br />
                    <Stack direction='row' justifyContent='space-between' alignItems='center' spacing='4.2rem' >
                        <label className="label">Ponovite lozinku</label>
                        <br />
                        <input onChange={handleRepeatPassword} className="input"
                            value={repeatPassword} type="password" name='repeatPassword' minLength={8} id="repeatPassword" placeholder='Repeat password' required />
                    </Stack>
                    
                    <br />
                    <MySmallButton className="btn" type="submit">
                        Registriraj se
                    </MySmallButton>

                    <br />
                </form>

            </div>
            <div className="messages" style={{
                position: 'absolute', left: '50%', top: '20%',
                transform: 'translate(-50%, -50%)'
            }}>
                {errorMessage()}
                {successMessage()}
            </div>
        </div>
    );
}