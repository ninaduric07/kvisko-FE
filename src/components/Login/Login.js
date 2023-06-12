import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import MySmallButton from '../Buttons/MySmallButton';
import useSession from "../../hooks/useSession";


export default function Login() {

    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigateTo = useNavigate();
    const { handleSubmit } = useForm();
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);


    const handleUsernameOrEmail = (e) => {
        setUsernameOrEmail(e.target.value);
        setSubmitted(false);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
        setSubmitted(false);
    };

    const onSubmitting = async (c, e) => {
        e.preventDefault();
        //console.log(e);
        await axios.post(process.env.REACT_APP_BASE_URL + '/login',
            {
                usernameOrEmail,
                password,
            }, {withCredentials: true}, 
                
        ).then((response) => {
            console.log(response.json); 
            navigateTo('/');
            setError(false);
            setSubmitted(true);
            return response.data;
        }).catch( (err) => {
            setError(true);
            return err;
        });
        
    };

    const successMessage = () => {
        return (
            <div
                className="success"
                style={{
                    display: submitted ? '' : 'none',
                }}>
                <h1> User {name} successfully logged in!!</h1>
            </div>
        );
    };

    const errorMessage = () => {
        return (
            <div
                className="error"
                style={{
                    display: error ? '' : 'none',
                }}>
                <p style={{ color: "red" }}>Nešto ne valja! Pokušajte ponovno</p>
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
                <p style={{ fontSize: 15 }}> Prijava</p>

                {/* Calling to the methods */}

                <form onSubmit={handleSubmit(onSubmitting)}>
                    {/* Labels and inputs for form data */}
                    <label className="label">Korisničko ime ili email</label>
                    <br />
                    <input onChange={handleUsernameOrEmail} className="input"
                        value={usernameOrEmail} type="text" name='usernameOrEmail' id="usernameOrEmail" placeholder='Marko123' required />
                    <br /> <br />
                    <label className="label">Lozinka</label>
                    <br />
                    <input onChange={handlePassword} className="input"
                        value={password} type="password" name='password' id="password" placeholder='' required />
                    <br /><br />
                    <MySmallButton className="btn" type="submit">
                        Prijava
                    </MySmallButton>
                </form>
            </div>
            <div className="messages" style={{
                position: 'absolute', left: '50%', top: '32%',
                transform: 'translate(-50%, -50%)'
            }}>
                {errorMessage()}
                {successMessage()}
            </div>
        </div>
    );
}
