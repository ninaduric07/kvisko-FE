import React from "react";
import Header from "../components/Header/Header.js";
import axios from 'axios';
import { useState } from 'react';
import { Box,  Stack } from "@mui/material";
import MyButton from "../components/Buttons/MyButton.js";
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import ImageUploading from "react-images-uploading";

const ProfilePage = () => {
    const navigateTo = useNavigate();
    const maxNumber = 1;
    const { handleSubmit } = useForm();
    const [data, setDataList] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [uloga, setUloga] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [pbr, setPbr] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [prvaSlika, setPrvaSlika] = useState(true);
    const [repeatPassword, setRepeatPassword] = useState('');
    const [value, setValue] = useState('1');
    const [image, setImages] = React.useState();

    const handleChangeTab = (e, newValue) => {
        setValue(newValue);
    };

    const handleChange = (e) => {
        setPbr(e.target.value);
    };
    const handleOldPassword = (e) => {
        setOldPassword(e.target.value);

    };
    const handleNewPassword = (e) => {
        setNewPassword(e.target.value);

    };
    const handleRepeatPassword = (e) => {
        setRepeatPassword(e.target.value);

    };

    const handleName = (e) => {
        setName(e.target.value);

    };
    const handleSurname = (e) => {
        setSurname(e.target.value);
    };

    // Handling the email change
    const handleEmail = (e) => {
        setEmail(e.target.value);

    };

    const handleUloga = (a) => {
        if(a == 1) {
            setUloga('Admin');
        } else{
            setUloga('Korisnik');
        }
    };

    const changeName = async () => {
        await axios.post(process.env.REACT_APP_BASE_URL +`/changeName`,
            {
                name,
            }, {withCredentials: true}).then((response) => {
            console.log(response.json);
            setError(false);
            setSuccess('ime');
            setTimeout(() => {setSuccess('');}, 1000);
            //setSuccess('ime');
            return response.data;
        }).catch((err) => {
            setError(true);
            setTimeout(() => {setError(false);}, 1000);
            setSuccess('');
            return err;
        });
    };


    const changeSurname = async () => {
        await axios.post(process.env.REACT_APP_BASE_URL +`/changeSurname`,
            {
                surname,
            }, {withCredentials: true}).then((response) => {
            console.log(response.json);
            setError(false);
            setSuccess('prezime');
            setTimeout(() => {setSuccess('');}, 1000);
            return response.data;
        },).catch((err) => {
            setError(true);
            setTimeout(() => {setError(false);}, 1000);
            setSuccess('');
            return err;
        });
    };

    const changeEmail = async () => {
        await axios.post(process.env.REACT_APP_BASE_URL +`/changeEmail`,
            {
                email,
            },{withCredentials: true}).then((response) => {
            console.log(response.json);
            setError(false);
            setSuccess('email');
            setTimeout(() => {setSuccess('');}, 1000);
            return response.data;
        }, ).catch((err) => {
            setError(true);
            setTimeout(() => {setError(false);}, 1000);
            setSuccess('');
            return err;
        });
    };

    const changePbr = async () => {
        await axios.post(process.env.REACT_APP_BASE_URL +`/changePbr`,
            {
                pbr,
            }).then((response) => {
            console.log(response.json);
            setError(false);
            setSuccess('mjesto stanovanja');
            setTimeout(() => {setSuccess('');}, 1000);
            return response.data;
        }).catch((err) => {
            setError(true);
            setTimeout(() => {setError(false);}, 1000);
            setSuccess('');
            return err;
        });
    };

    const getData = async () => {
        let dataa = (
            await axios.get(process.env.REACT_APP_BASE_URL +'/session', {withCredentials: true})
        ).data;
        //setValue(data[0]);
        setDataList(dataa);
        handleUloga(dataa.admin);
    };

    function UploadImage() {
        const onChange = async (imageList, addUpdateIndex) => {
            // data for submit
            setPrvaSlika(false);
            console.log(imageList, addUpdateIndex);
            setImages(imageList);
            await axios.post(process.env.REACT_APP_BASE_URL +`/changeImage` ,
                {
                    image: imageList[0].data_url,
                }, {withCredentials: true}).then((response) => {
                console.log(response.json);
                setError(false);
                setSuccess('sliku');
                setTimeout(() => { setSuccess(''); }, 1000);
                getData();
                //setSuccess('ime');
                return response.data;
            }).catch((err) => {
                setError(true);
                setTimeout(() => { setError(false); }, 1000);
                setSuccess('');
                return err;
            });
        };

        return (
            <div className="App">
                <ImageUploading
                    multiple
                    value={image}
                    onChange={onChange}
                    maxNumber={maxNumber}
                    dataURLKey="data_url"
                    acceptType={["jpg"]}
                >
                    {({
                        imageList,
                        onImageUpload,
                        onImageRemoveAll,
                        onImageUpdate,
                        onImageRemove,
                        isDragging,
                        dragProps
                    }) => (
                        // write your building UI
                        <div className="upload__image-wrapper">
                            {!image &&
                                <MyButton type="button"
                                    style={isDragging ? { color: "red" } : null}
                                    onClick={onImageUpload}
                                    {...dragProps}
                                >
                                    Slika
                                </MyButton>
                            }
                            &nbsp;
                            {imageList.map((image, index) => (
                                <div key={index} className="image-item">
                                    <Stack direction='column' justifyContent='space-between' alignItems='center' spacing='1rem'>
                                        {prvaSlika &&
                                            <img src={image} alt="" width="300" />
                                        }
                                        {!prvaSlika &&
                                            <img src={image.data_url} alt="" width="300" />
                                        }
                                        <div className="image-item__btn-wrapper">

                                            <MyButton type="button" onClick={function () { onImageUpdate(index); }}>Update</MyButton>



                                        </div>
                                    </Stack>
                                </div>
                            ))}
                        </div>
                    )}
                </ImageUploading>
            </div>
        );
    }

    React.useEffect(() => {
        const getDat = async () => {
            let dataa = (
                await axios.get(process.env.REACT_APP_BASE_URL +'/session', {withCredentials: true})
            ).data;
            //setValue(data[0]);
            setDataList(dataa);
            handleUloga(dataa.admin);
            setName(dataa.name);
            setSurname(dataa.surname);
            setEmail(dataa.email);
            setImages([dataa.image]);
        };
        getDat().catch((err) => console.log(err));
    }, [refresh]);

    const successMessage = () => {
        return (
            <div
                className="success"
                style={{
                    display: (success != '') ? '' : 'none',
                }}>
                <p style={{ color: "green", fontSize: 20 }}>Uspješno ste promjenili {success}!</p>
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
                <p style={{ color: "red", fontSize: 20 }}>Vaša promjena nije uspjela</p>
            </div>
        );
    };
    const onSubmitting = async (c, e) => {
        e.preventDefault();
        //console.log(e);
        if ((newPassword !== repeatPassword)) {
            setError(true);
            setTimeout(() => {setError(false);}, 3000);
            return;
        }

        else {
            await axios.post(process.env.REACT_APP_BASE_URL +`/changePassword`,
                {
                    oldPassword,
                    newPassword
                }, {withCredentials: true}

            ).then((response) => {
                console.log(response.json);
                setError(false);
                setSuccess('lozinku');
                setTimeout(() => {setSuccess('');}, 3000);
                return response.data;
            }).catch((err) => {
                setError(true);
                setTimeout(() => {setError(false);}, 3000);
                setSuccess('');
                return err;
            });
        }
    };


    //if (!data) return <Navigate to='/' />;
    return (
        <div>
            <Header />
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    flexDirection: 'column',
                    p: 1,
                    m: 1,
                    borderRadius: 7,
                    border: '6px solid rgba(255, 165, 0, 0.5)',
                    position: 'absolute', left: '33%', top: '20%',
                    padding: '30px 30px 30px 30px',
                    borderColor: 'orange'
                }}>
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChangeTab} aria-label="lab API tabs example">
                                <Tab label="Osobni podaci" value="1" style ={{color:"black"}}/>
                                <Tab label="Promijeni osobne podatke" value="2" style ={{color:"black"}} />
                                <Tab label="Promijeni lozinku" value="3" style ={{color:"black"}}/>
                            </TabList>
                        </Box>
                    
                
                        <TabPanel value="1">
                            <Stack direction='row' justifyContent='flex-start' alignItems='center' spacing='4rem'>
                                <Stack direction='column' justifyContent='flex-start' alignItems='flex-start' spacing='1rem'>
                                    <Stack direction='row' justifyContent='center' alignItems='center' spacing='1rem'>
                                        <p> Korisničko ime: </p>
                                        <p>{data.username}</p>
                                    </Stack>
                                    <Stack direction='row' justifyContent='center' alignItems='center' spacing='1rem'>
                                        <p>Ime:  </p>               
                                        <p>{data.name} </p>
                                    </Stack>
                                    <Stack direction='row' justifyContent='center' alignItems='center' spacing='1rem'>
                                        <p>Prezime: </p>             
                                        <p>{data.surname} </p>
                                    </Stack>
                                    <Stack direction='row' justifyContent='center' alignItems='center' spacing='1rem'>
                                        <p>Email adresa:</p>         
                                        <p>{data.email}</p>
                                    </Stack>
                                    <Stack direction='row' justifyContent='center' alignItems='center' spacing='1rem'>
                                        <p>Uloga:</p>                
                                        <p>{uloga}</p>
                                    </Stack>
                                </Stack>
                                <Stack direction='column' justifyContent='center' alignItems='center' spacing='1rem'>
                                    <p>Slika profila:</p>
                                    <div ><img src={data.image} alt="" style={{ height: '200px' }} /></div>
                                </Stack>   
                            </Stack>

                        </TabPanel>
                        <TabPanel value="2">
                            <Stack direction='row' justifyContent='flex-start' alignItems='center' spacing='3rem'>
                                <form>
                                    <Stack direction='row' justifyContent='space-between' alignItems='center' spacing='8rem' >
                                        <label className="label">Ime:  </label>
                                        <input onChange={handleName} className="input"
                                            type="text" name='name' id="name" value={name} placeholder="Name" required />
                                        <img src={'https://jf-staeulalia.pt/img/other/30/collection-green-check-mark-6.jpg'} style={{ height: '30px', width: '30px' }} onClick={function(){changeName(); getData();}} />
                                    </Stack>
                                    <br />
                                    <Stack direction='row' justifyContent='space-between' alignItems='center' spacing='5rem'>
                                        <label className="label">Prezime:   </label>
                                        <input onChange={handleSurname} className="input"
                                            value={surname} type="text" name='surname' id="surname" placeholder='Last name' required />
                                        <img src={'https://jf-staeulalia.pt/img/other/30/collection-green-check-mark-6.jpg'} style={{ height: '30px', width: '30px' }} onClick={function(){changeSurname(); getData();}} />
                                    </Stack>
                                    <br />
                                    <Stack direction='row' justifyContent='space-between' alignItems='center' spacing='7rem' >
                                        <label className="label">Email:</label>
                                        <input onChange={handleEmail} className="input"
                                            value={email} type="email" name='email' id="email" placeholder='Email' required />
                                        <img src={'https://jf-staeulalia.pt/img/other/30/collection-green-check-mark-6.jpg'} style={{ height: '30px', width: '30px' }} onClick={function(){changeEmail(); getData();}} />
                                    </Stack>
                                    <br />
                                    <Stack direction='column' justifyContent='space-between' alignItems='center' spacing='1rem' >
                                        <label className="label">Slika profila:</label>
                                        <UploadImage/>
                                    </Stack>
                                </form>
                                <div className="messages" style={{
                                    position: 'absolute', left: '40%', top: '-7%',
                                    transform: 'translate(-50%, -50%)'
                                }}>
                                    {errorMessage()}
                                    {successMessage()}
                                </div>
                            </Stack>
                        </TabPanel>
                        <TabPanel value="3">
                            <form onSubmit={handleSubmit(onSubmitting)}>
                                <Stack direction='row' justifyContent='space-between' alignItems='center' spacing='5rem' >
                                    <label className="label">Stara lozinka:  </label>
                                    <input onChange={handleOldPassword} className="input"
                                        type="password" name='oldPassword' id="oldPassword" value={oldPassword} placeholder="" required />

                                </Stack>
                                <br />
                                <Stack direction='row' justifyContent='space-between' alignItems='center' spacing='3rem'>
                                    <label className="label">Nova lozinka:   </label>

                                    <input onChange={handleNewPassword} className="input"
                                        value={newPassword} type="password" name='newPassword' id="newPassword" placeholder='' required />

                                </Stack>

                                <br />

                                <Stack direction='row' justifyContent='space-between' alignItems='center' spacing='2rem' >
                                    <label className="label">Ponovite novu lozinku:</label>
                                    <input onChange={handleRepeatPassword} className="input"
                                        value={repeatPassword} type="password" name='repeatPassword' id="repeatPassword" required />
                                </Stack>
                                <br />
                                <Stack direction='row' justifyContent='space-between' alignItems='center' spacing='2rem' >
                                    <MyButton type="submit">
                                        Promijeni lozinku
                                    </MyButton>
                                
                                </Stack>
                                
                            </form>
                            <div className="messages" style={{
                                position: 'absolute', left: '50%', top: '-10%',
                                transform: 'translate(-50%, -50%)'
                            }}>
                                {errorMessage()}
                                {successMessage()}
                            </div>
                        </TabPanel>
                    </TabContext>
                </Box>
            </Box> 

                                




    

        </div>
    );
};

export default ProfilePage;