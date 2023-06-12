import React from "react";
import AdminHeader from "../components/Header/AdminHeader.js";
import axios from 'axios';
import { useState } from 'react';
import { useParams } from "react-router-dom";
import { Stack } from "@mui/material";
import MyButton from "../components/Buttons/MyButton.js";
import {  useForm } from 'react-hook-form';

const ManageInputQuestion = () => {
    const { handleSubmit } = useForm();
    const { sifPitanje } = useParams();
    const[numberOfSearch, setNumberOfSearch] = useState(5);
    const [data, setDataList] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [questionList, setQuestionList] = useState('');
    const [textQ, setTextQ] = useState('');
    const [answerQ, setAnswerQ] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState('');

    const handleQuestionQ = (e) => {
        setTextQ(e.target.value);
    };

    const handleAnswerQ = (e) => {
        setAnswerQ(e.target.value);
    };

    const handleSearch = () => {
        setNumberOfSearch(numberOfSearch + 5);
    };

    const successMessage = () => {
        return (
            <div
                className="success"
                style={{
                    display: (success != '') ? '' : 'none',
                }}>
                <p style={{ color: "green", fontSize: 20 }}>Uspješno ste dodali {success}</p>
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
                <p style={{ color: "red", fontSize: 20 }}>Nije uspjelo, pokušajte ponovno</p>
            </div>
        );
    };

    const editQuestion = async (c, e) => {
        e.preventDefault();
        await axios.post(process.env.REACT_APP_BASE_URL +`/admin/quiz/editQuestion/input/` + sifPitanje,
            {
                question: textQ,
                answer: answerQ
            }

        ).then((response) => {
            console.log(response.json);
            setError(false);
            setSuccess('pitanje');
            setTimeout(() => { setSuccess(''); }, 3000);
            //setValue(data[0]);

            return response.data;
        }).catch((err) => {
            setError(true);
            setTimeout(() => { setError(false); }, 3000);
            setSuccess('');
            return err;
        });


    };

    const renderSearchTable = () => {
        var i = 0;
        const num = numberOfSearch;
        if (questionList) {
            return questionList.map(q => {
                while (i < num) {
                    i = i + 1;
                    return (
                        <tr key={q.sifKviz} style={{ height: '40px', textAlign: 'center' }}>
                            <td style={{ borderLeft: '1px solid #eeeee4', borderBlockEnd: '1px solid' }}><img src={q.image} alt="" width="100" /></td>
                            <td style={{ borderLeft: '1px solid #eeeee4', borderBlockEnd: '1px solid' }}>{q.name}</td>
                            <td style={{ borderLeft: '1px solid #eeeee4', borderBlockEnd: '1px solid', maxWidth: '300px', overflowX: 'auto' }}>{q.description}</td>
                            <td style={{ borderLeft: '1px solid #eeeee4', borderBlockEnd: '1px solid' }}>{q.nazivKategorije}</td>
                            <td style={{ borderLeft: '1px solid #eeeee4', borderBlockEnd: '1px solid' }}>{q.availableFrom}</td>
                            <td style={{ borderLeft: '1px solid #eeeee4', borderBlockEnd: '1px solid' }}>{q.availableTo}</td>
                            <td style={{ borderLeft: '1px solid #eeeee4', borderBlockEnd: '1px solid' }}>{q.durationSec}</td>
                            <td style={{ borderLeft: '1px solid #eeeee4', borderBlockEnd: '1px solid' }}>{q.reviewDurationSec}</td>
                            

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
        };
        const getQuestion = async () => {
            let data2 = (
                await axios.get(process.env.REACT_APP_BASE_URL +'/admin/quiz/getQuestion/input/' + sifPitanje)
            ).data;
            //setValue(data[0]);
            setQuestionList(data2);
            setTextQ(data2[0].tekstPitanja);
            setAnswerQ(data2[0].odgovor);

        };
        getQuestion().catch((err) => console.log(err));
        getData().catch((err) => console.log(err));
    }, [refresh]);

    return (
        <div>
            <AdminHeader />
            <Stack direction='column' justifyContent='center' alignItems='center' spacing='5rem' style={{ marginBlock: '2rem' }}>
                <div className='modal' style={{
                    backgroundColor: "white", borderRadius: 7,
                    border: '6px solid rgba(255, 165, 0, 0.5)',
                    padding: '30px 30px',

                }}>
                    <div className='content'>
                        <h1>Pitanje #{sifPitanje}</h1>
                        <p>Tip: pitanje slobodnog odgovora</p>
                    </div>
                    <br />
                    <form onSubmit={handleSubmit(editQuestion)}>
                        {/* Labels and inputs for form data */}
                        <Stack direction='row' justifyContent='space-between' alignItems='center' spacing='5rem' >
                            <label className="label">Tekst pitanja:  </label>

                            <textarea style={{ height: '40px', width: '400px' }} onChange={handleQuestionQ} className="input"
                                type="textarea" name='question' id="question" value={textQ} />

                        </Stack>
                        <br />
                        <Stack direction='row' justifyContent='space-between' alignItems='center' spacing='3rem'>
                            <label className="label">Odgovor:   </label>

                            <textarea style={{ height: '40px', width: '400px' }} onChange={handleAnswerQ} className="input"
                                value={answerQ} type="textarea" name='answer1' id="answer1" />

                        </Stack>

                        <br />
                        <Stack direction='row' justifyContent='flex-end' alignItems='center' spacing='2rem' >
                            <MyButton type="submit">
                                Uredi
                            </MyButton>


                        </Stack>
                    </form>
                    <div className="messages" style={{
                        position: 'absolute', left: '50%', top: '20%',
                        transform: 'translate(-50%, -50%)'
                    }}>
                        {errorMessage()}
                        {successMessage()}
                    </div>
                </div>
                <h2>Kvizovi u kojima se to pitanje nalazi</h2>
                {questionList &&
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
                                
                            </tr>
                        </thead>
                        <tbody>{renderSearchTable()}</tbody>
                        <MyButton onClick={function () { handleSearch(); }}>Prikaži više!</MyButton>
                    </table>
                }
            </Stack>
        </div>
    );
};

export default ManageInputQuestion;