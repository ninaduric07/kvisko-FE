import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import MyButton from '../components/Buttons/MyButton';
import { Stack } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header/Header';
import { useParams } from "react-router-dom";

const CategoryPage = () => {

    const navigateTo = useNavigate();
    const { sifKategorije } = useParams();
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



    React.useEffect(() => {
        axios.get(process.env.REACT_APP_BASE_URL +'/category/' +sifKategorije).then(json => setSearchData(json.data));
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
                            <Stack direction='row' justifyContent='flex-start' alignItems='center' spacing='5rem'style={{margin:'30px'}} >
                                <Stack direction='row' justifyContent='flex-start' alignItems='flex-start' spacing='5rem'>
                                    <div ><img src={kviz.image} alt="" style={{height: '150px', width: '240px'}} /></div>
                                    <Stack direction='column' justifyContent='flex-start' alignItems='flex-start' spacing='0rem' style={{width:"300px", textAlign:"left"}}>
                                        <p style={{fontSize:"25px", fontWeight:'bold'}}>{kviz.name} </p>
                                        <p>{kviz.description}</p>
                                        <p style={{fontSize:"12px", fontWeight:'bold'}}>{kviz.nazivKategorije}</p>
                                    </Stack>
                                </Stack>
                                <p><MyButton onClick={function(){navigateTo('/quiz/' + kviz.sifKviz);}}>Igraj kviz</MyButton></p>
                            </Stack>
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
            <Header />
            <div>
                <Stack direction='column' justifyContent='center' alignItems='center' spacing='1rem' style={{ marginInline: '50px' }}>
                    {searchData[0] &&
                        <h1>Kategorija: {searchData[0].nazivKategorije}</h1>
                    }
                    
                    
                    {searchData &&
                        < table id="users">
                            <thead>
                                
                            </thead>
                            <tbody>{renderSearchTable()}</tbody>
                            
                            
                        </table>
                    }
                    <MyButton onClick={function () { handleSearch(); }}>Prikaži više!</MyButton>
                </Stack>
            </div>
        </div>
    );
};

export default CategoryPage;