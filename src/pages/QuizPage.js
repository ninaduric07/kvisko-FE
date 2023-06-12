import React from "react";
import Header from "../components/Header/Header.js";
import axios from 'axios';
import { useState } from 'react';
import { Stack } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import MyButton from "../components/Buttons/MyButton.js";

const QuizPage = () => {

    const navigateTo = useNavigate();
    const [data, setDataList] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const { sifKviz } = useParams();
    const [kviz, setKviz] = useState('');
    const [date, setDate] = useState('');
    const [duration, setDuration] = useState('');
    const [table, setTable] = useState('');
    const [numberOfUsers, setNumberOfUsers] = useState(10);
    let distinct = [];


    function formatDate(string) {
        var options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        return new Date(string).toLocaleDateString([], options);
    }




    React.useEffect(() => {
        const getData = async () => {
            let dataa = (
                await axios.get(process.env.REACT_APP_BASE_URL +'/session', {withCredentials: true})
            ).data;
            //setValue(data[0]);
            setDataList(dataa);
        };
        const getKviz = async () => {
            let data2 = (
                await axios.get(process.env.REACT_APP_BASE_URL +'/quiz/' + sifKviz)
            ).data;
            //setValue(data[0]);
            setKviz(data2);
            setDate(formatDate(data2.availableTo));
            var date = new Date(0);
            date.setSeconds(data2.durationSec); // specify value for SECONDS here
            setDuration(date.toISOString().substring(14, 19));

        };
        const getTable = async () => {
            let data2 = (
                await axios.get(process.env.REACT_APP_BASE_URL +'/quiz/getResultTable/' + sifKviz)
            ).data;
            setTable(data2);
        };
        getTable().catch((err) => console.log(err));
        getKviz().catch((err) => console.log(err));
        getData().catch((err) => console.log(err));
    }, [refresh]);

    const renderSearchTable = () => {
        var i = 0;
        const num = numberOfUsers;
        return table.map(c => {
            while (i < num) {
                i = i + 1;
                return (                
                    <div>
                        {!distinct.includes(c.username)  &&
                            distinct.push(c.username) && 
                        < tr key={c.sifKategorije} style={{ height: '40px', textAlign:"center"}}>
                            <td style={{ borderBlockEnd: '1px solid', width:"40px"}}>{i}.</td>
                            <td style={{ borderBlockEnd: '1px solid', width:"200px"}}>{c.username}</td>

                            <td style={{ borderBlockEnd: '1px solid', width:"100px" }}>{c.postotak.toFixed(2)}%</td>
                            <td style={{ borderBlockEnd: '1px solid', width:"100px" }}>{Math.floor(c.elapsedTime/60) + ':' + c.elapsedTime%60}</td>

                        </tr >
                        }
                    </div>    
                    
                );
            }
        });

    };

    return (
        <div>
            <Header />
            <Stack direction='column' justifyContent='center' alignItems='center' spacing='3rem' style={{
                marginBlock: '4rem',
            }}>
                <Stack direction='row' justifyContent='center' alignItems='center' spacing='5rem'>
                    <div ><img src={kviz.image} alt="" style={{ height: '350px' }} /></div>
                    <Stack direction='column' justifyContent='flex-start' alignItems='flex-start' spacing='1rem' style={{ width: "300px", textAlign: "left" }}>
                        <p style={{ fontSize: "40px", fontWeight: 'bold', width: "50rem" }}>{kviz.name} </p>
                        <p style={{ fontSize: "20px", fontStyle: 'italic', width: "30rem", marginBlock: "5px" }}>{kviz.description}</p>
                        <Stack direction='row' justifyContent='flex-start' alignItems='center' spacing='1rem' style={{ textAlign: "left", marginBlock: "5px", height: "30px" }}>
                            <p style={{ fontSize: "17px", fontWeight: "bold" }}>Broj pitanja: </p>
                            <p style={{ fontSize: "17px" }}>{kviz.numberOfQuestions}</p>
                        </Stack>
                        <Stack direction='row' justifyContent='flex-start' alignItems='center' spacing='1rem' style={{ textAlign: "left", marginBlock: "5px", height: "30px" }}>
                            <p style={{ fontSize: "17px", fontWeight: "bold" }}>Zatvara se u: </p>
                            <p style={{ fontSize: "17px" }}>{date}</p>
                        </Stack>
                        <Stack direction='row' justifyContent='flex-start' alignItems='center' spacing='1rem' style={{ textAlign: "left", marginBlock: "5px", height: "30px" }}>
                            <p style={{ fontSize: "17px", fontWeight: "bold" }}>Kategorija: </p>
                            <p style={{ fontSize: "17px" }}>{kviz.nazivKategorije}</p>
                        </Stack>
                        <Stack direction='row' justifyContent='flex-start' alignItems='center' spacing='1rem' style={{ textAlign: "left", marginBlock: "5px", height: "30px" }}>
                            <p style={{ fontSize: "17px", fontWeight: "bold" }}>Vrijeme trajanja u minutama: </p>
                            <p style={{ fontSize: "17px" }}>{duration}</p>
                        </Stack>
                    </Stack>
                </Stack>
                {!data &&
                    <MyButton style={{ height: "50px", width: "200px", opacity: '0.6', cursor: 'not-allowed' }}>Za igranje kvizova potrebno se prijaviti</MyButton>
                }
                {data &&
                    <MyButton style={{ height: "50px", width: "200px" }} onClick={function () { navigateTo('/playQuiz/' + sifKviz); }}>Započni igranje kviza</MyButton>
                }
                <p style={{fontWeight:"bold", fontSize:"25px"}}>Rang lista najboljih rezultata u ovom kvizu</p>
                {table &&
                    < table id="users">
                        <thead>

                        </thead>
                        <tbody>{renderSearchTable()}</tbody>


                    </table>
                }
            </Stack>
        </div >

    );
};

export default QuizPage;