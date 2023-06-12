import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import MyButton from '../components/Buttons/MyButton';
import { Stack } from "@mui/material";
import { useNavigate } from 'react-router-dom';


const ManageQuizes = () => {

    const navigateTo = useNavigate();
    const [data, setData] = useState([]);
    const [numberOfSearch, setNumberOfSearch] = useState(3);
    const [category, setCategory] = useState('');
    const [searchQuiz, setSearchQuiz] = useState('');
    const [searchData, setSearchData] = useState('');
    const [allCategories, setAllCategories] = useState('');

    const handleCategory = (e) => {
        setCategory(e);
    };

    const handleSearch = () => {
        setNumberOfSearch(numberOfSearch + 5);
    };

    const handleQuiz = async (e) => {
        setSearchQuiz(e.target.value);
        await axios.get(process.env.REACT_APP_BASE_URL +'/admin/searchQuizes?quiz=' + e.target.value).then(json => setSearchData(json.data));
        renderSearchTable();
    };

    const removeQuiz = async (sifKviz) => {
        await axios.post(process.env.REACT_APP_BASE_URL +'/admin/quiz/deleteQuiz/' + sifKviz);
        await axios.get(process.env.REACT_APP_BASE_URL +'/admin/searchQuizes?quiz=').then(json => setSearchData(json.data));
        renderSearchTable();
    };



    React.useEffect(() => {
        axios.get(process.env.REACT_APP_BASE_URL +'/admin/searchQuizes?quiz=').then(json => setSearchData(json.data));
        axios.get(process.env.REACT_APP_BASE_URL +'/admin/getCategories').then(json => setAllCategories(json.data));
    }, []);


    const renderSearchTable = () => {
        var i = 0;
        const num = numberOfSearch;
        if (searchData) {
            return searchData.map(kviz => {
                while (i < num) {
                    i = i + 1;
                    return (
                        <tr key={kviz.sifKviz} style={{ height: '40px', textAlign: 'center' }}>
                            <td style={{ borderLeft: '1px solid #eeeee4', borderBlockEnd: '1px solid' }}><img src={kviz.image} alt="" width="100" /></td>
                            <td style={{ borderLeft: '1px solid #eeeee4', borderBlockEnd: '1px solid' }}>{kviz.name}</td>
                            <td style={{ borderLeft: '1px solid #eeeee4', borderBlockEnd: '1px solid', maxWidth: '300px', overflowX: 'auto' }}>{kviz.description}</td>
                            <td style={{ borderLeft: '1px solid #eeeee4', borderBlockEnd: '1px solid' }}>{kviz.nazivKategorije}</td>
                            <td style={{ borderLeft: '1px solid #eeeee4', borderBlockEnd: '1px solid' }}>{kviz.availableFrom}</td>
                            <td style={{ borderLeft: '1px solid #eeeee4', borderBlockEnd: '1px solid' }}>{kviz.availableTo}</td>
                            <td style={{ borderLeft: '1px solid #eeeee4', borderBlockEnd: '1px solid' }}>{kviz.durationSec}</td>
                            <td style={{ borderLeft: '1px solid #eeeee4', borderBlockEnd: '1px solid' }}>{kviz.reviewDurationSec}</td>
                            <td style={{ borderLeft: '1px solid #eeeee4', borderBlockEnd: '1px solid' }}><img src= {'https://www.vagaservis.hr/images/upitnik.jpg'} style= {{height: '50px'}}onClick={function () { navigateTo('/admin/pitanja/' + kviz.sifKviz); }}></img></td>
                            <td style={{ borderLeft: '1px solid #eeeee4', borderBlockEnd: '1px solid' }}><img src={'https://cdn.dribbble.com/users/3293/screenshots/2591498/screen_shot_2016-03-15_at_12.51.52_pm.png'} style={{ position: 'relative', height: '50px', width: '50px' }} onClick={function () { navigateTo('/admin/manageQuizes/' + kviz.sifKviz); }} /></td>
                            <td style={{ borderLeft: '1px solid #eeeee4', borderRight: '1px solid #eeeee4', borderBlockEnd: '1px solid' }}><img src={'https://cdn-icons-png.flaticon.com/512/5499/5499405.png'} style={{ position: 'relative', height: '30px', width: '30px' }} onClick={function () { removeQuiz(kviz.sifKviz); }} /></td>

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



    return (
        <div>
            <div>
                <Stack direction='column' justifyContent='center' alignItems='top' spacing='1rem' style={{ marginInline: '50px' }}>
                    <form>
                        <br />
                        <p>Pretraži kvizove</p>
                        <Stack direction='row' justifyContent='left' alignItems='center' spacing='5rem' >
                            <input style={{ height: '50px', width: '400px' }} onChange={handleQuiz} className="input"
                                type="text" name='searchQuiz' id="searchQuiz" value={searchQuiz} placeholder="Upišite ime:" />
                            
                        </Stack>
                    </form>
                    {searchData &&
                        < table id="users">
                            <thead>
                                <tr style={{
                                    height: '40px',
                                    padding: '12px 0px 12px 0px',
                                    textAlign: 'center',
                                    backgroundColor: 'rgba(255, 165, 0, 0.5)',


                                }}>
                                    <th style={{ borderLeft: '1px solid #eeeee4', borderBlock: '1px solid', margin: '0px' }}>Slika</th>
                                    <th style={{ borderLeft: '1px solid #eeeee4', borderBlock: '1px solid', margin: '0px' }}>Naziv kviza</th>
                                    <th style={{ borderLeft: '1px solid #eeeee4', borderBlock: '1px solid', margin: '0px' }}>Kratki opis</th>
                                    <th style={{ borderLeft: '1px solid #eeeee4', borderBlock: '1px solid', margin: '0px' }}>Kategorija</th>
                                    <th style={{ borderLeft: '1px solid #eeeee4', borderBlock: '1px solid', margin: '0px' }}>Dostupan od</th>
                                    <th style={{ borderLeft: '1px solid #eeeee4', borderBlock: '1px solid', margin: '0px' }}>Dostupan do</th>
                                    <th style={{ borderLeft: '1px solid #eeeee4', borderBlock: '1px solid', margin: '0px' }}>Trajanje u sekundama</th>
                                    <th style={{ borderLeft: '1px solid #eeeee4', borderBlock: '1px solid', margin: '0px' }}>Trajanje pregleda u sekundama</th>
                                    <th style={{ borderLeft: '1px solid #eeeee4', borderBlock: '1px solid', margin: '0px' }}>Upravljaj pitanjima</th>
                                    <th style={{ borderLeft: '1px solid #eeeee4', borderBlock: '1px solid', margin: '0px' }}>Uredi kviz</th>
                                    <th style={{ borderLeft: '1px solid #eeeee4', borderRight: '1px solid #eeeee4', borderBlock: '1px solid', margin: '0px' }}>Izbriši kviz</th>
                                </tr>
                            </thead>
                            <tbody>{renderSearchTable()}</tbody>
                            <MyButton onClick={function () { handleSearch(); }}>Prikaži više!</MyButton>
                        </table>
                    }

                </Stack>
            </div>
        </div>
    );
};

export default ManageQuizes;