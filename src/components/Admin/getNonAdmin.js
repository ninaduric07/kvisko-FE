import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import MyButton from '../Buttons/MyButton';
import { Stack } from "@mui/material";
import { useNavigate } from 'react-router-dom';

function GetNonAdmins() {
    const [searchData, setSearchData] = useState('');
    const[searchUsernameNonAdmin, setSearchUsernameNonAdmin] = useState('');
    const[numberOfSearch, setNumberOfSearch] = useState(10);

    const handleSearch = () => {
        setNumberOfSearch(numberOfSearch + 5);
    };

    const handleUsernameNonAdmin = async (e) => {
        setSearchUsernameNonAdmin(e.target.value);
        await axios.get(process.env.REACT_APP_BASE_URL +'/admin/searchNonAdmins?searchUsernameNonAdmin=' + e.target.value ).then(json => setSearchData(json.data));
        renderSearchTable();
    };


    React.useEffect(() => {
        axios.get(process.env.REACT_APP_BASE_URL +'/admin/searchNonAdmins?searchUsernameNonAdmin=' ).then(json => setSearchData(json.data));
    }, []);

    const setAdmin = async (e) => {
        await axios.get(process.env.REACT_APP_BASE_URL +'/admin/setAdmin/' + e);
        await axios.get(process.env.REACT_APP_BASE_URL +'/admin/searchNonAdmins?searchUsernameNonAdmin=' + searchUsernameNonAdmin).then(json => setSearchData(json.data));
        renderSearchTable();
    };

    const removeAdmin = async (e) => {
        await axios.get(process.env.REACT_APP_BASE_URL +'/admin/removeAdmin/' + e);
        await axios.get(process.env.REACT_APP_BASE_URL +'/admin/searchNonAdmins?searchUsernameNonAdmin=' + searchUsernameNonAdmin).then(json => setSearchData(json.data));
        renderSearchTable();
    };


    const renderSearchTable = () => {
        var i = 0;
        const num = numberOfSearch;
        if (searchData) {
            return searchData.map(user => {
                while (i < num) {
                    i = i + 1;
                    return (
                        <tr key={user.username} style={{ height: '40px', }}>
                            <td style={{ borderLeft: '1px solid #eeeee4', borderBlockEnd: '1px solid' }}>{user.username}</td>
                            <td style={{ borderLeft: '1px solid #eeeee4', borderBlockEnd: '1px solid' }}>{user.name} {user.surname}</td>
                            <td style={{ borderLeft: '1px solid #eeeee4', borderBlockEnd: '1px solid' }}>{user.email}</td>
                            {user.admin ===1 &&
                            <td style={{ borderLeft: '1px solid #eeeee4', borderBlockEnd: '1px solid' }}>DA</td>
                            }
                            {user.admin ===1 &&
                            <td style={{ borderLeft: '1px solid #eeeee4', borderRight: '1px solid #eeeee4', borderBlockEnd: '1px solid' }}><img src={'https://cdn-icons-png.flaticon.com/512/5499/5499405.png'} style={{ position: 'relative', left: '40%', height: '30px', width: '30px' }} onClick={function () { removeAdmin(user.username); }} /></td>
                            }
                            {user.admin ===0 &&
                            <td style={{ borderLeft: '1px solid #eeeee4', borderBlockEnd: '1px solid' }}>NE</td>
                            }
                            {user.admin ===0 &&
                            <td style={{ borderLeft: '1px solid #eeeee4', borderRight: '1px solid #eeeee4', borderBlockEnd: '1px solid' }}><img src={'https://jf-staeulalia.pt/img/other/30/collection-green-check-mark-6.jpg'} style={{ position: 'relative', left: '40%', height: '30px', width: '30px' }} onClick={function () { setAdmin(user.username); }} /></td>
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

    return (
        <div>
            <Stack direction='column' justifyContent='center' alignItems='top' spacing='1rem'>
                <h1 style={{alignSelf:'center', marginBlockStart:'50px'}}> Upravljaj korisnicima</h1>
                <Stack direction='column' justifyContent='center' alignItems='top' spacing='1rem' style={{marginInline:'200px'}}>
                    <form>
                        <p>Pretraži korisnika po imenu</p>
                        <Stack direction='row' justifyContent='left' alignItems='center' spacing='5rem' >
                            <input style={{ height: '30px', width: '300px' }} onChange={handleUsernameNonAdmin} className="input"
                                type="text" name='searchUsernameNonAdmin' id="searchUsernameNonAdmin" value={searchUsernameNonAdmin} placeholder="Upišite ime:" />
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
                                    <th style={{ borderLeft: '1px solid #eeeee4', borderBlock: '1px solid', margin: '0px' }}>Korisničko ime</th>
                                    <th style={{ borderLeft: '1px solid #eeeee4', borderBlock: '1px solid', margin: '0px' }}>Ime i prezime</th>
                                    <th style={{ borderLeft: '1px solid #eeeee4', borderBlock: '1px solid', margin: '0px' }}>Email</th>
                                    <th style={{ borderLeft: '1px solid #eeeee4', borderBlock: '1px solid', margin: '0px' }}>Admin</th>
                                    <th style={{ borderLeft: '1px solid #eeeee4', borderRight: '1px solid #eeeee4', borderBlock: '1px solid', margin: '0px' }}>Postavi ili ukloni admina</th>
                                </tr>
                            </thead>
                            <tbody>{renderSearchTable()}</tbody>
                            <MyButton onClick={function () { handleSearch(); }}>Prikaži više!</MyButton>
                        </table>
                    }
                    
                </Stack>
        
            </Stack>
        </div>
    );
}

export default GetNonAdmins;