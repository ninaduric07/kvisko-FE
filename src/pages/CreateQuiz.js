import React from "react";
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import ImageUploading from "react-images-uploading";
import { Stack } from "@mui/material";
import MyButton from "../components/Buttons/MyButton.js";
import MySmallButton from "../components/Buttons/MySmallButton.js";

const CreateQuiz = () => {
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState('');
    const [data, setDataList] = useState([]);
    const [numberOfSearch, setNumberOfSearch] = useState(3);
    const [refresh, setRefresh] = useState(false);
    const [searchData, setSearchData] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [availableFrom, setDateAndTimeOpen] = useState(new Date(2019, 6, 23, 11, 30));
    const [availableTo, setDateAndTimeClose] = useState(new Date(2018, 6, 23, 11, 30));
    const [durationSec, setDuration] = useState('');
    const [reviewDurationSec, setReviewDuration] = useState('');
    const [image, setImages] = React.useState();
    const maxNumber = 1;
    const [searchCategory, setSearchCategory] = useState('');
    const [category, setCategory] = useState(0);
    const { handleSubmit } = useForm();


    const handleName = (e) => {
        setName(e.target.value);
    };
    const handleSearch = () => {
        setNumberOfSearch(numberOfSearch + 5);
    };

    const handleUsernameNonAdmin = async (e) => {
        setSearchCategory(e.target.value);
        await axios.get(process.env.REACT_APP_BASE_URL +'/admin/searchCategories?searchCategory=' + e.target.value).then(json => setSearchData(json.data));
        renderSearchTable();
    };
    const handleCategory = (e) => {
        setCategory(e);
        renderSearchTable();
    };

    const handleDescription = (e) => {
        setDescription(e.target.value);
    };
    const handleDuration = (e) => {
        setDuration(e.target.value);
    };
    const handleReviewDuration = (e) => {
        setReviewDuration(e.target.value);
    };
    const handleAvailableFrom = (e) => {
        e.preventDefault();
        if (e.target.value !== new Date(2019, 6, 23, 11, 30))
            setDateAndTimeOpen(e.target.value);
    };

    const handleAvailableTo = (e) => {
        e.preventDefault();
        if (e.target.value !== new Date(2018, 6, 23, 11, 30))
            setDateAndTimeClose(e.target.value);
    };

    const successMessage = () => {
        return (
            <div
                className="success"
                style={{
                    display: (success != '') ? '' : 'none',
                }}>
                <p style={{ color: "green", fontSize: 20 }}>Uspješno ste kreirali kviz!</p>
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
                <p style={{ color: "red", fontSize: 20 }}>Niste uspjeli kreirati kviz</p>
            </div>
        );
    };

    const onSubmitting = async (c, e) => {
        e.preventDefault();
        var imag = image[0].data_url;
        await axios.post(process.env.REACT_APP_BASE_URL +`/admin/createQuiz`,
            {
                name,
                image: imag,
                description,
                durationSec,
                reviewDurationSec,
                availableFrom,
                availableTo,
                category
            }

        ).then((response) => {
            console.log(response.json);
            setError(false);
            setSuccess('lozinku');
            setTimeout(() => { setSuccess(''); }, 3000);
            return response.data;
        }).catch((err) => {
            setError(true);
            setTimeout(() => { setError(false); }, 3000);
            setSuccess('');
            return err;
        });
    };

    function UploadImage() {
        const onChange = (imageList, addUpdateIndex) => {
            // data for submit
            console.log(imageList, addUpdateIndex);
            setImages(imageList);
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
                                        <img src={image.data_url} alt="" width="100" />
                                        <div className="image-item__btn-wrapper">

                                            <MySmallButton type  = "button" onClick={() => onImageUpdate(index)}>Update</MySmallButton>



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

    const renderSearchTable = () => {
        var i = 0;
        const num = numberOfSearch;
        if (searchData) {
            return searchData.map(c => {
                while (i < num) {
                    i = i + 1;
                    return (
                        <tr key={c.sifKategorije} style={{ height: '40px', }}>
                            <td style={{ borderLeft: '1px solid #eeeee4', borderBlockEnd: '1px solid' }}>{c.nazivKategorije}</td>
                            {category !== c.sifKategorije &&
                                <td style={{ borderLeft: '1px solid #eeeee4', borderRight: '1px solid #eeeee4', borderBlockEnd: '1px solid' }}><MySmallButton style={{ position: 'relative', left: '30%' }} onClick={function () { handleCategory(c.sifKategorije); }}>Odaberi</MySmallButton></td>
                            }
                            {category === c.sifKategorije &&
                                <td style={{
                                    borderLeft: '1px solid #eeeee4', borderRight: '1px solid #eeeee4', borderBlockEnd: '1px solid', opacity: '0.6',
                                    cursor: 'not-allowed'
                                }}><MySmallButton style={{ position: 'relative', left: '30%' }} onClick={function () { }}>Odabrano</MySmallButton></td>
                            }
                        </tr>
                    );
                }
            });
        }
        else {
            return (
                <p>Ne postoji takav korisnik!</p>
            );
        }

    };

    React.useEffect(() => {
        const getData = async () => {
            let dataa = (
                await axios.get(process.env.REACT_APP_BASE_URL +'/session', {withCredentials: true})
            ).data;
            //setValue(data[0]);
            setDataList(dataa);
            await axios.get(process.env.REACT_APP_BASE_URL +'/admin/searchCategories?searchCategory=').then(json => setSearchData(json.data));
        };
        getData().catch((err) => console.log(err));
    }, [refresh]);

    return (
        <div>
            <div className='form'>
                <Stack direction='column' justifyContent='space-between' alignItems='center' spacing='1rem'
                >
                    <br />
                    <h2 style={{ position: 'relative' }}> Kreiraj novi kviz</h2>

                    {/* Calling to the methods */}
                    <form style={{
                        width: "500px",
                        border: '10px solid rgba(255, 165, 0, 0.5)',
                        padding: '20px'
                    }} onSubmit={handleSubmit(onSubmitting)}>
                        {/* Labels and inputs for form data */}
                        <Stack direction='row' justifyContent='space-between' alignItems='center' spacing='1rem' >
                            <label className="label">Naziv kviza  </label>

                            <input onChange={handleName} className="input"
                                type="text" name='name' id="name" value={name} placeholder="Zastave Europe" style={{ height: '30px', width: '200px' }} required />
                        </Stack>
                        <br />
                        <Stack direction='row' justifyContent='space-between' alignItems='center' spacing='5rem' >
                            <label className="label">Opis kviza:  </label>

                            <textarea onChange={handleDescription} className="input"
                                type="textarea" name='description' id="description" value={description} placeholder="Vrlo poučan i edukativan kviz za sve uzraste" style={{ height: '50px', width: '200px' }} required />
                        </Stack>
                        <br />
                        <Stack direction='column' justifyContent='center' alignItems='top' spacing='1rem'>

                            <Stack direction='column' justifyContent='center' alignItems='center' spacing='0rem' >
                                <p>Izaberite kategoriju</p>
                                <input style={{ height: '30px', width: '300px' }} onChange={handleUsernameNonAdmin} className="input"
                                    type="text" name='searchCategorx' id="searchCategory" value={searchCategory} placeholder="Pretraži kategoriju:" />
                            </Stack>
                            <Stack direction='row' justifyContent='center' alignItems='center' spacing='5rem' >
                                {searchData &&
                                    < table id="users" style={{ width: "400px" }}>
                                        <thead>
                                        </thead>
                                        <tbody>{renderSearchTable()}</tbody>
                                        <MyButton type = "button" onClick={function () { handleSearch(); }}>Prikaži više!</MyButton>
                                    </table>
                                }
                            </Stack>
                        </Stack>
                        <br />
                        <Stack direction='row' justifyContent='space-between' alignItems='center' spacing='3rem'>
                            <label className="label">Broj sekundi trajanja:   </label>

                            <input onChange={handleDuration} className="input"
                                value={durationSec} type="text" name='durationSec' id="durationSec" placeholder='60' style={{ height: '30px', width: '200px' }} required />
                        </Stack>

                        <br />

                        <Stack direction='row' justifyContent='space-between' alignItems='center' spacing='4.2rem' >
                            <label className="label">Broj sekundi trajanja pregleda:</label>
                            <input onChange={handleReviewDuration} className="input"
                                value={reviewDurationSec} type="text" name='reviewDurationSec' id="reviewDurationSec" placeholder='100' style={{ height: '30px', width: '200px' }} required />

                        </Stack>
                        <br />
                        <Stack direction='column' justifyContent='space-between' alignItems='center' spacing='0.5rem' >
                            <label className="label">Datum i vrijeme otvaranja kviza</label>

                            <input type="datetime-local" style={{ height: "30px", width: "200px" }}
                                value={availableFrom}
                                onChange={handleAvailableFrom}
                                name='availableFrom'

                                required
                            />

                        </Stack>
                        <br />
                        <Stack direction='column' justifyContent='space-between' alignItems='center' spacing='0.5rem' >
                            <label className="label">Datum i vrijeme zatvaranja kviza</label>
                            <input type="datetime-local" style={{ height: "30px", width: "200px" }}
                                value={availableTo}
                                onChange={handleAvailableTo}
                                name='availableTo'

                                required
                            />

                        </Stack>
                        <br />
                        <Stack direction='row' justifyContent='space-between' alignItems='center' spacing='4.2rem' >
                            <label className="label">Učitajte sliku</label>
                            <br />
                            <UploadImage />
                        </Stack>
                        <br />
                        <Stack direction='row' justifyContent='space-between' alignItems='center' spacing='0rem' >
                            <MyButton className="btn" type="submit">
                                Kreiraj kviz
                            </MyButton>
                            <div className="messages" style={{
                                position: 'relative',
                            }}>
                                {errorMessage()}
                                {successMessage()}
                            </div>
                        </Stack>
                        <br />
                    </form>

                </Stack>
                <div className="messages" style={{
                    position: 'absolute', left: '50%', top: '20%',
                    transform: 'translate(-50%, -50%)'
                }}>

                </div>
            </div >
        </div >
    );
};

export default CreateQuiz;