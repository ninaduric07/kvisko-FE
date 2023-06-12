import React from "react";
import AdminHeader from "../components/Header/AdminHeader.js";
import axios from 'axios';
import { useState } from 'react';
import { useParams } from "react-router-dom";
import { Stack } from "@mui/material";
import MyButton from "../components/Buttons/MyButton.js";
import { useForm } from 'react-hook-form';

const ManageChoiceQuestion = () => {
    const { handleSubmit } = useForm();
    const { sifPitanje } = useParams();
    const [numberOfSearch, setNumberOfSearch] = useState(5);
    const [data, setDataList] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [questionList, setQuestionList] = useState('');
    const [question2List, setQuestion2List] = useState('');
    const [textQ, setTextQ] = useState('');
    const [quizQuestion, setQuizQuestion] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState('');
    const [answer2, setAnswer2] = useState('');
    const [value, setValue] = useState('');
    const [correct, setCorrect] = useState('0');

    const handleAnswer2 = (e) => {
        setAnswer2(e.target.value);
    };

    const handleCorrect = (e) => {
        setCorrect(e.target.value);
    };

    const handleQuestionQ = (e) => {
        setTextQ(e.target.value);
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
                <p style={{ color: "green", fontSize: 20 }}>Uspješno ste {success}</p>
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

    const editTextQuestion = async (c, e) => {
        e.preventDefault();
        await axios.post(process.env.REACT_APP_BASE_URL +`/admin/quiz/editTextQuestion/` + sifPitanje,
            {
                question: textQ,
            }

        ).then((response) => {
            console.log(response.json);
            setError(false);
            setSuccess('uredili tekst pitanja');
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
        if (quizQuestion) {
            return quizQuestion.map(q => {
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

    const renderChoiceTable = () => {
        if (question2List) {
            return question2List.map(q => {

                return (
                    <tr key={q.sifPitanjeOdgovor} style={{ height: '40px', textAlign: 'center' }}>
                        <td style={{ borderLeft: '1px solid #eeeee4', borderBlockEnd: '1px solid' }}>{q.odgovor}</td>
                        

                        {q.isCorrect === 0 &&
                            <td style={{ borderLeft: '1px solid #eeeee4', borderBlockEnd: '1px solid' }}>NETOČAN</td>
                        }
                        {q.isCorrect === 1 &&
                            <td style={{ borderLeft: '1px solid #eeeee4', borderBlockEnd: '1px solid' }}>TOČAN</td>
                        }
                        
                        <td style={{ borderLeft: '1px solid #eeeee4', borderBlockEnd: '1px solid' }}><img src={'https://cdn-icons-png.flaticon.com/512/5499/5499405.png'} style={{ position: 'relative', height: '30px', width: '30px' }} onClick={function () { deleteIncorrect(q.sifPitanjeOdgovor); }} /></td>
                        
                        


                    </tr>
                );

            });
        }
        else {
            return (
                <p>Ne postoji takav korisnik!</p>
            );
        }

    };

    const submitCorrectAnswer = async () => {
        await axios.post(process.env.REACT_APP_BASE_URL +`/admin/quiz/addAnswer3/` + sifPitanje,
            {
                answer: answer2,
                isCorrect: correct
            }

        ).then((response) => {
            console.log(response.json);
            setError(false);
            setSuccess('pitanje');
            setTimeout(() => { setSuccess(''); }, 3000);
            //setValue(data[0]);
            setQuestionsHelp();

            renderSearchTable();
            return response.data;
        }).catch((err) => {
            setError(true);
            setTimeout(() => { setError(false); }, 3000);
            setSuccess('');
            return err;
        });


    };

    const addIncorrect = async (c, e) => {
        e.preventDefault();
        await axios.post(process.env.REACT_APP_BASE_URL +`/admin/quiz/addIncorrectAnswer/` + sifPitanje,
            {

                incorrectAnswer: answer2
            }

        ).then((response) => {
            console.log(response.json);
            setError(false);
            setSuccess('pogrešan odgovor');
            setTimeout(() => { setSuccess(''); }, 3000);
            //setValue(data[0]);
            setQuestionsHelp();

            renderSearchTable();
            return response.data;
        }).catch((err) => {
            setError(true);
            setTimeout(() => { setError(false); }, 3000);
            setSuccess('');
            return err;
        });


    };

    const deleteIncorrect = async (sifPitanjeOdgovor) => {
        await axios.post(process.env.REACT_APP_BASE_URL +`/admin/quiz/deleteIncorrect/` + sifPitanjeOdgovor,

        ).then((response) => {
            console.log(response.json);
            setError(false);
            setSuccess('obrisali pogrešan odgovor');
            setTimeout(() => { setSuccess(''); }, 3000);
            //setValue(data[0]);
            setQuestionsHelp();

            renderSearchTable();
            return response.data;
        }).catch((err) => {
            setError(true);
            setTimeout(() => { setError(false); }, 3000);
            setSuccess('');
            return err;
        });


    };

    const editCorrect = async (sifPitanjeOdgovor) => {
        await axios.post(process.env.REACT_APP_BASE_URL +'/admin/quiz/editCorrect/' + sifPitanjeOdgovor,
            {
                correctAnswer: correct,
            }

        ).then((response) => {
            console.log(response.json);
            setError(false);
            setSuccess('uredili točan odgovor');
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



    const setQuestionsHelp = async () => {
        let data2 = (
            await axios.get(process.env.REACT_APP_BASE_URL +'/admin/quiz/getQuestion2/input/' + sifPitanje)
        ).data;
        setQuestion2List(data2);
        renderChoiceTable();
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


        };
        const getQuestion2 = async () => {
            let data2 = (
                await axios.get(process.env.REACT_APP_BASE_URL +'/admin/quiz/getQuestion2/input/' + sifPitanje)
            ).data;
            //setValue(data[0]);
            setQuestion2List(data2);
           


        };
        const getQuizes = async () => {
            let data3 = (
                await axios.get(process.env.REACT_APP_BASE_URL +'/admin/quiz/getQuizQuestion/' + sifPitanje)
            ).data;
            //setValue(data[0]);
            setQuizQuestion(data3);

        };
        const getCorrect = async () => {
            let data4 = (
                await axios.get(process.env.REACT_APP_BASE_URL +'/admin/quiz/getCorrect/' + sifPitanje)
            ).data;
            //setValue(data[0]);
            setCorrect(data4[0].odgovor);

        };
        getQuestion2().catch((err) => console.log(err));
        getCorrect().catch((err) => console.log(err));
        getQuizes().catch((err) => console.log(err));
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
                        <p>Tip: pitanje odabira</p>
                    </div>
                    <br />
                    <form onSubmit={handleSubmit(editTextQuestion)}>
                        {/* Labels and inputs for form data */}
                        <Stack direction='row' justifyContent='space-between' alignItems='center' spacing='5rem' >
                            <label className="label">Tekst pitanja:  </label>

                            <textarea style={{ height: '40px', width: '400px' }} onChange={handleQuestionQ} className="input"
                                type="textarea" name='question' id="question" value={textQ} />

                            <MyButton type="submit">
                                Uredi
                            </MyButton>
                        </Stack>
                    </form>
                    <br />
                    <Stack direction='column' justifyContent='flex-start' alignItems='flex-start' spacing='2rem'>
                        <Stack direction='row' justifyContent='flex-start' alignItems='center' spacing='1rem'>
                            <label className="label">Ponuđeni odgovor:   </label>

                            <textarea style={{ height: '40px', width: '400px' }} onChange={handleAnswer2} className="input"
                                value={answer2} type="text" name='answer2' id="answer2" placeholder='476. godine' required />
                            <input type="radio" name="answer" onChange={function () { setCorrect('1'); }}/>
                            <p>T</p>
                            <input type="radio" name="answer" onChange={function () { setCorrect('0'); }}/>
                            <p>N</p>
                        </Stack>
                        <Stack direction='row' justifyContent='flex-start' alignItems='center' spacing='1rem'>
                            <MyButton onClick={submitCorrectAnswer}>
                                Spremi odgovor!
                            </MyButton>
                        </Stack>
                    </Stack>
                    <br />
                    <Stack direction='row' justifyContent='center' alignItems='center' spacing='5rem' >
                        {questionList &&
                            < table id="users">
                                <thead>
                                    <tr style={{
                                        height: '40px',
                                        padding: '12px 0px 12px 0px',
                                        textAlign: 'center',
                                        backgroundColor: 'rgba(255, 165, 0, 0.5)',


                                    }}>
                                        <th style={{ borderLeft: '1px solid #eeeee4', borderBlock: '1px solid', margin: '0px' }}>Ponuđeni odgovor</th>
                                        <th style={{ borderLeft: '1px solid #eeeee4', borderBlock: '1px solid', margin: '0px' }}>Točnost</th>
                                        <th style={{ borderLeft: '1px solid #eeeee4', borderBlock: '1px solid', margin: '0px' }}>Uredi ili ukloni odgovor</th>

                                    </tr>
                                </thead>
                                <tbody>{renderChoiceTable()}</tbody>
                            </table>
                        }
                    </Stack>
                    <br />
                    <Stack direction='row' justifyContent='flex-end' alignItems='center' spacing='2rem' >



                    </Stack>

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

export default ManageChoiceQuestion;