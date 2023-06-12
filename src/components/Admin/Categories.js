import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import MyButton from '../Buttons/MyButton';
import { Stack } from "@mui/material";
import { useNavigate } from 'react-router-dom';

function Categories() {
    const navigateTo = useNavigate();
    const [data, setData] = useState([]);
    const [numberOfCategories, setNumberOfCategories] = useState(5);
    const [name, setName] = useState('');
    const [fullName, setFullName] = useState("Joe Abraham");
    const [showInputEle, setShowInputEle] = useState(false);

    const handleNumberOfCategories = () => {
        setNumberOfCategories(numberOfCategories + 5);
    };
    const handleName = (e) => {
        setName(e.target.value);
    };



    React.useEffect(() => {
        axios.get(process.env.REACT_APP_BASE_URL + '/admin/getCategories').then(json => setData(json.data));
    }, []);


    const removeCategory = async (e) => {
        await axios.get(process.env.REACT_APP_BASE_URL +'/admin/removeCategory/' + e);
        await axios.get(process.env.REACT_APP_BASE_URL +'/admin/getCategories').then(json => setData(json.data));
        renderFirstTable();
    };

    const addCategory = async (e) => {
        await axios.post(process.env.REACT_APP_BASE_URL +'/admin/newCategory', { name });
        await axios.get(process.env.REACT_APP_BASE_URL +'/admin/getCategories').then(json => setData(json.data));
        renderFirstTable();
    };

    const renderFirstTable = () => {
        var i = 0;
        const num = numberOfCategories;
        return data.map(c => {
            while (i < num) {
                i = i + 1;
                return (


                    < tr key={c.sifKategorije} style={{ height: '40px', }}>

                        <td style={{ borderLeft: '1px solid #eeeee4', borderBlockEnd: '1px solid', width:"100px" }}>{c.nazivKategorije}</td>
                        {c.sifKategorije !== 1 &&
                            <td style={{ borderLeft: '1px solid #eeeee4', borderRight: '1px solid #eeeee4', borderBlockEnd: '1px solid', width:"100px" }}><img src={'https://cdn-icons-png.flaticon.com/512/5499/5499405.png'} style={{ position: 'relative', left: '40%', height: '30px', width: '30px' }} onClick={function () { removeCategory(c.sifKategorije); }} /></td>
                        }
                        {c.sifKategorije === 1 &&
                            <td style={{ borderLeft: '1px solid #eeeee4', borderRight: '1px solid #eeeee4', borderBlockEnd: '1px solid', width:"100px" }}></td>
                        }
                    </tr >

                );
            }
        });

    };



    return (
        <div>
            <Stack direction='column' justifyContent='center' alignItems='top' spacing='1rem'>
                <h1 style={{ alignSelf: 'center', marginBlockStart: '50px' }}> Upravljaj kategorijama</h1>
                <Stack direction='column' justifyContent='center' alignItems='top' spacing='1rem' style={{ marginInline: '200px', alignSelf: 'center' }}>
                    <form onSubmit={function () { addCategory(name); }}>
                        <p>Dodaj kategoriju</p>
                        <Stack direction='row' justifyContent='left' alignItems='center' spacing='5rem' >
                            <input style={{ height: '30px', width: '200px' }} onChange={handleName} className="input"
                                type="text" name='name' id="name" value={name} placeholder="Upišite ime:" />
                            <MyButton type="submit">Dodaj</MyButton>
                        </Stack>
                    </form>

                </Stack>
                <Stack direction='row' justifyContent='center' alignItems='top' spacing='1rem'>
                    <div>
                        <p>Sve kategorije: </p>
                        <table id="users">
                            <thead>
                                <tr style={{
                                    height: '40px',
                                    padding: '12px 0px 12px 0px',
                                    textAlign: 'center',
                                    backgroundColor: 'rgba(255, 165, 0, 0.5)',


                                }}>
                                    <th style={{ borderLeft: '1px solid #eeeee4', borderBlock: '1px solid', margin: '0px', width:"100px" }}>Naziv kategorije</th>
                                    <th style={{ borderLeft: '1px solid #eeeee4', borderRight: '1px solid #eeeee4', borderBlock: '1px solid', margin: '0px', width:"100px" }}>Izbriši kategoriju</th>
                                </tr>
                            </thead>
                            <tbody>{renderFirstTable()}</tbody>
                        </table>
                        <MyButton onClick={function () { handleNumberOfCategories(); }}>Prikaži više!</MyButton>
                    </div>
                </Stack>
            </Stack>
        </div>
    );
}

export default Categories;