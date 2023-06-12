
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Box, Stack } from "@mui/material";
import React from "react";
import AdminHeader from "../components/Header/AdminHeader.js";
import axios from 'axios';
import { useState } from 'react';
import MyButton from "../components/Buttons/MyButton.js";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from 'react-hook-form';

const AdminQuestionsPage = () => {

    const navigateTo = useNavigate();
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [data, setDataList] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [question1, setQuestion1] = useState('');
    const [answer1, setAnswer1] = useState('');
    const [incorrectAnswer, setIncorrectAnswer] = useState('');
    const [question2, setQuestion2] = useState('');
    const [answer2, setAnswer2] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState('');
    const [question1Get, setQuestion1Get] = useState('');
    const [answer1Get, setAnswer1Get] = useState('');
    const [slagalica, setSlagalica] = useState('');
    const [slagalicaL, setSlagalicaL] = useState('');
    const [slagalicaD, setSlagalicaD] = useState('');
    const [rememberedQuestion, setRememberedQuestion] = useState('');
    const [rememberedAnswer, setRememberedAnswer] = useState('');
    const [pairs, setPairs] = useState('');
    const { handleSubmit } = useForm();
    const { sifKviz } = useParams();
    const [questions, setQuestions] = useState([]);
    const [numberOfSearch, setNumberOfSearch] = useState(10);
    const [quiz, setQuiz] = useState('');
    const [searchData, setSearchData] = useState('');
    const [numberOfSearch2, setNumberOfSearch2] = useState(3);
    const [searchQuestion, setSearchQuestion] = useState('');
    const [value, setValue] = useState('1');
    const [correct, setCorrect] = useState('0');

    const handleQuestion1 = (e) => {
        setQuestion1(e.target.value);
    };

    const handleSearch = () => {
        setNumberOfSearch2(numberOfSearch2 + 3);
    };

    const handleNumberOfSearch = () => {
        setNumberOfSearch(numberOfSearch + 5);
    };

    const handleAnswer1 = (e) => {
        setAnswer1(e.target.value);
    };


    const handleQuestion2 = (e) => {
        setQuestion2(e.target.value);
    };

    const handleAnswer2 = (e) => {
        setAnswer2(e.target.value);
    };

    const handleIncorrectAnswer = (e) => {
        setIncorrectAnswer(e.target.value);
    };

    const handleSlagalicaPitanje = (e) => {
        setSlagalica(e.target.value);
    };
    const handleSlagalicaL = (e) => {
        setSlagalicaL(e.target.value);
    };
    const handleSlagalicaD = (e) => {
        setSlagalicaD(e.target.value);
    };

    const handleQuestion = async (e) => {
        setSearchQuestion(e.target.value);
        await axios.get('http://localhost:5000/admin/searchQuestions?quiz=' + e.target.value).then(json => setSearchData(json.data));
        renderQuestionTable();
    };


    const get1 = async (sifPitanje) => {
        const getQuestion = async () => {
            let data2 = (
                await axios.get('http://localhost:5000/admin/quiz/getQuestion1/' + sifPitanje)
            ).data;
            //setValue(data[0]);
            setQuestion1Get(data2.tekstPitanja);
            setAnswer1Get(data2.odgovor);
        };
        getQuestion().catch((err) => console.log(err));
    };

    const addQuestion = async (sifPitanje) => {
        await axios.get('http://localhost:5000/admin/quiz/addQuestion/' + sifKviz + '/' + sifPitanje).then((response) => {
            console.log(response.json);
            setError(false);
            setSuccess('dodali pitanje');
            setTimeout(() => { setSuccess(''); }, 3000);
            //setValue(data[0]);
            setRememberedQuestion(question2);
            setRememberedAnswer(answer2);
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

    const removeQuestion = async (sifPitanje) => {
        await axios.post('http://localhost:5000/admin/quiz/removeQuestion/' + sifKviz + '/' + sifPitanje).then((response) => {
            console.log(response.json);
            setError(false);
            setSuccess('dodali pitanje');
            setTimeout(() => { setSuccess(''); }, 3000);
            //setValue(data[0]);
            setRememberedQuestion(question2);
            setRememberedAnswer(answer2);
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


    const submitCorrectAnswer = async () => {
        await axios.post(`http://localhost:5000/admin/quiz/createQuestion3/` + sifKviz + '/' + 2,
            {
                question1: question1,
                answer1: answer2,
                isCorrect: correct
            }

        ).then((response) => {
            console.log(response.json);
            setError(false);
            setSuccess('pitanje');
            setTimeout(() => { setSuccess(''); }, 3000);
            //setValue(data[0]);
            setRememberedQuestion(question2);
            setRememberedAnswer(answer2);
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


    const onSubmitting = async (c, e) => {
        
        await axios.post(`http://localhost:5000/admin/quiz/createQuestion1/` + sifKviz + '/' + 1,
            {
                question1,
                answer1
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

    const submitSlagalica = async (e) => {
        e.preventDefault();
        await axios.post(`http://localhost:5000/admin/quiz/createSlagalica/` + sifKviz + '/' + 3,
            {
                question: question1,
                pair1: slagalicaL,
                pair2: slagalicaD
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

    const addIncorrect = async () => {
        await axios.post(`http://localhost:5000/admin/quiz/createIncorrectAnswer/` + sifKviz + '/' + 2,
            {
                question: rememberedQuestion,
                correctAnswer: rememberedAnswer,
                incorrectAnswer: incorrectAnswer
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

    const setQuestionsHelp = async () => {
        let data2 = (
            await axios.get('http://localhost:5000/admin/quiz/getQuestions/' + sifKviz)
        ).data;
        setQuestions(data2);
        renderSearchTable();
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

    const renderQuestionTable = () => {
        var i = 0;
        const num = numberOfSearch2;
        if (searchData) {
            return searchData.map(q => {
                while (i < num) {
                    i = i + 1;
                    return (
                        <tr key={q.sifPitanje} style={{ height: '40px', textAlign: 'center' }}>
                            <td style={{ borderLeft: '1px solid #eeeee4', borderBlockEnd: '1px solid', maxWidth: '300px', overflowX: 'auto' }}>{q.tekstPitanja}</td>
                            <td style={{ borderLeft: '1px solid #eeeee4', borderBlockEnd: '1px solid' }}>{q.nazivTip}</td>

                            <td style={{ borderLeft: '1px solid #eeeee4', borderRight: '1px solid #eeeee4', borderBlockEnd: '1px solid' }}><img src={'https://icon-library.com/images/add-icon-png/add-icon-png-10.jpg'} style={{ position: 'relative', height: '30px', width: '30px' }} onClick={function () { addQuestion(q.sifPitanje); }} /></td>

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

    const renderSearchTable = () => {
        var i = 0;
        const num = numberOfSearch;
        if (questions) {
            return questions.map(q => {
                while (i < num) {
                    i = i + 1;
                    return (
                        <tr key={q.sifPitanje} style={{ height: '40px', textAlign: 'center' }}>
                            <td style={{ borderLeft: '1px solid #eeeee4', borderBlockEnd: '1px solid' }}>{i}</td>
                            <td style={{ borderLeft: '1px solid #eeeee4', borderBlockEnd: '1px solid', maxWidth: '500px', overflowX: 'auto' }}>{q.tekstPitanja}</td>
                            <td style={{ borderLeft: '1px solid #eeeee4', borderBlockEnd: '1px solid', borderRight: '1px solid #eeeee4', }}>{q.nazivTip}</td>
                            {q.sifTip === 1 &&
                                <td style={{ borderLeft: '1px solid #eeeee4', borderRight: '1px solid #eeeee4', borderBlockEnd: '1px solid' }}><img src={'https://www.backgroundsy.com/file/blue-info-icon.jpg'} style={{ position: 'relative', height: '35px', width: '45px' }} onClick={function () { navigateTo('/admin/manageQuestion/input/' + q.sifPitanje); }} /></td>
                            }
                            {q.sifTip == 2 &&
                                <td style={{ borderLeft: '1px solid #eeeee4', borderRight: '1px solid #eeeee4', borderBlockEnd: '1px solid' }}><img src={'https://www.backgroundsy.com/file/blue-info-icon.jpg'} style={{ position: 'relative', height: '35px', width: '45px' }} onClick={function () { navigateTo('/admin/manageQuestion/multipleChoice/' + q.sifPitanje); }} /></td>}
                            {q.sifTip == 3 &&
                                <td style={{ borderLeft: '1px solid #eeeee4', borderRight: '1px solid #eeeee4', borderBlockEnd: '1px solid' }}><img src={'https://www.backgroundsy.com/file/blue-info-icon.jpg'} style={{ position: 'relative', height: '35px', width: '45px' }} onClick={function () { navigateTo('/admin/manageQuestion/connectPairs/' + q.sifPitanje); }} /></td>}

                            <td style={{ borderLeft: '1px solid #eeeee4', borderRight: '1px solid #eeeee4', borderBlockEnd: '1px solid' }}><img src={'https://cdn-icons-png.flaticon.com/512/5499/5499405.png'} style={{ position: 'relative', height: '30px', width: '30px' }} onClick={function () { removeQuestion(q.sifPitanje); }} /></td>
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
        axios.get('http://localhost:5000/admin/searchQuestions?quiz=').then(json => setSearchData(json.data));
        const getData = async () => {
            let dataa = (
                await axios.get('http://localhost:5000/session', {withCredentials: true})
            ).data;
            //setValue(data[0]);
            setDataList(dataa);
        };
        const getQuestions = async () => {
            let data2 = (
                await axios.get('http://localhost:5000/admin/quiz/getQuestions/' + sifKviz)
            ).data;
            //setValue(data[0]);
            setQuestions(data2);
        };
        const getQuizInfo = async () => {
            let dataa = (
                await axios.get('http://localhost:5000/admin/getQuiz/' + sifKviz)
            ).data;
            //setValue(data[0]);
            setQuiz(dataa);
        };
        getData().catch((err) => console.log(err));
        getQuestions().catch((err) => console.log(err));
        getQuizInfo().catch((err) => console.log(err));

    }, [refresh]);

    const handleChangeTab = (e, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <AdminHeader />
            <Stack direction='column' justifyContent='center' alignItems='top' spacing='1rem'>
                <h1 style={{ alignSelf: 'center', marginBlockStart: '50px' }}> Upravljaj pitanjima za kviz {quiz.name}</h1>
                <Stack direction='row' justifyContent='center' alignItems='center' spacing='1rem' style={{ marginInline: '200px', alignSelf: 'center' }}>
                    <Stack direction='column' justifyContent='center' alignItems='center' spacing='1rem'>
                        {!show2 &&
                            <MyButton onClick={() => setShow(prev => !prev)}>Dodaj novo pitanje</MyButton>
                        }
                        
                        {show &&
                            <Box sx={{ width: '100%', typography: 'body1' }}>
                                <br />
                                <Stack direction='row' justifyContent='space-between' alignItems='center' spacing='5rem' >
                                    <label className="label">Tekst pitanja:  </label>
                                    <textarea style={{ height: '40px', width: '400px' }} onChange={handleQuestion1} className="input"
                                        type="textarea" name='question1' id="question1" value={question1} placeholder="Koji je glavni grad Meksika?" required />
                                </Stack>
                                <br />
                                <TabContext value={value}>
                                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                        <TabList onChange={handleChangeTab} aria-label="lab API tabs example">
                                            <Tab label="Slobodni odgovor" value="1" style={{ color: "black" }} />
                                            <Tab label="Slagalica" value="2" style={{ color: "black" }} />
                                            <Tab label="Ponuđeni odgovori" value="3" style={{ color: "black" }} />
                                        </TabList>
                                    </Box>
                                    <TabPanel value="1">
                                        <div className='modal' >
                                            <br />
                                            <Stack direction='row' justifyContent='space-between' alignItems='center' spacing='3rem'>
                                                <label className="label">Odgovor:   </label>
                                                <textarea style={{ height: '40px', width: '400px' }} onChange={handleAnswer1} className="input"
                                                    value={answer1} type="textarea" name='answer1' id="answer1" placeholder='Mexico City' required />

                                            </Stack>

                                            <br />
                                            <Stack direction='row' justifyContent='space-between' alignItems='center' spacing='2rem' >
                                                <MyButton onClick={onSubmitting}>
                                                    Spremi pitanje
                                                </MyButton>


                                            </Stack>
                                            <div className="messages" style={{
                                                position: 'absolute', left: '50%', top: '20%',
                                                transform: 'translate(-50%, -50%)'
                                            }}>
                                                {errorMessage()}
                                                {successMessage()}
                                            </div>
                                        </div>
                                    </TabPanel>
                                    <TabPanel value="2">
                                        <div className='modal'>
                                            <br />
                                            <Stack direction='column' justifyContent='center' alignItems='center' spacing='0rem' >
                                                <Stack direction='row' justifyContent='space-items' alignItems='space-items' spacing='14rem' >
                                                    <label className="label">Pojam:  </label>
                                                    <textarea style={{ height: '40px', width: '400px' }} onChange={handleSlagalicaL} className="input"
                                                        type="text" name='slagalicaL' id="slagalicaL" value={slagalicaL} placeholder="Portugal" required />
                                                </Stack>
                                                <br />
                                                <Stack direction='row' justifyContent='space-items' alignItems='space-items' spacing='4rem' >
                                                    <label className="label">Dodaj par navedenom pojmu:  </label>
                                                    <textarea style={{ height: '40px', width: '400px' }} onChange={handleSlagalicaD} className="input"
                                                        type="text" name='slagalicaD' id="slagalicaD" value={slagalicaD} placeholder="Cristiano Ronaldo" required />
                                                </Stack>
                                                <br />
                                                <Stack direction='row' justifyContent='space-between' alignItems='center' spacing='5rem' >
                                                    <MyButton onClick={function(e){submitSlagalica(e);}}>
                                                        Spremi par
                                                    </MyButton>

                                                </Stack>
                                                {/* Labels and inputs for form data */}
                                                <br />
                                            </Stack>

                                            <div className="messages" style={{
                                                position: 'absolute', left: '50%', top: '20%',
                                                transform: 'translate(-50%, -50%)'
                                            }}>
                                                {errorMessage()}
                                                {successMessage()}
                                            </div>
                                        </div>
                                    </TabPanel>
                                    <TabPanel value="3">
                                        <div className='modal'>
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

                                            <div className="messages" style={{
                                                position: 'absolute', left: '50%', top: '10%',
                                                transform: 'translate(-50%, -50%)'
                                            }}>
                                                {errorMessage()}
                                                {successMessage()}
                                            </div>
                                        </div>
                                    </TabPanel>
                                </TabContext>
                            </Box>
                        }
                    </Stack>
                    <Stack direction='column' justifyContent='center' alignItems='center' spacing='1rem'>
                        {!show &&
                            <MyButton onClick={() => setShow2(prev => !prev)}>Ubaci postojeće pitanje</MyButton>
                        }
                        
                        {show2 &&
                            <Box sx={{ width: '100%', typography: 'body1'}}>
                                <div className='modal'>
                                    <div>
                                        <Stack direction='column' justifyContent='center' alignItems='top' spacing='1rem'>
                                            <form>
                                            
                                                <p>Pretraži pitanja</p>
                                                <Stack direction='row' justifyContent='left' alignItems='center' spacing='5rem' >
                                                    <input style={{ height: '30px', width: '300px' }} onChange={handleQuestion} className="input"
                                                        type="text" name='searchQuiz' id="searchQuiz" value={searchQuestion} placeholder="Upišite ime:" />

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
                                                            <th style={{ borderLeft: '1px solid #eeeee4', borderBlock: '1px solid', margin: '0px' }}>Tekst pitanja</th>
                                                            <th style={{ borderLeft: '1px solid #eeeee4', borderBlock: '1px solid', margin: '0px' }}>Tip pitanja</th>

                                                            <th style={{ borderLeft: '1px solid #eeeee4', borderRight: '1px solid #eeeee4', borderBlock: '1px solid', margin: '0px' }}>Dodaj</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>{renderQuestionTable()}</tbody>
                                                    <MyButton onClick={function () { handleSearch(); }}>Prikaži više!</MyButton>
                                                </table>
                                            }

                                        </Stack>
                                        {errorMessage()}
                                        {successMessage()}
                                    </div>
                                </div>
                            </Box>
                        }
                    </Stack>
                </Stack>
                <Stack direction='row' justifyContent='center' alignItems='center' spacing='1rem' style={{ marginInline: '20px', alignSelf: 'center' }}>
                    {questions &&
                        < table id="users">
                            <thead>
                                <tr style={{
                                    height: '40px',
                                    padding: '12px 0px 12px 0px',
                                    textAlign: 'center',
                                    backgroundColor: 'rgba(255, 165, 0, 0.5)',


                                }}>
                                    <th style={{ borderLeft: '1px solid #eeeee4', borderBlock: '1px solid', margin: '0px' }}>Broj</th>
                                    <th style={{ borderLeft: '1px solid #eeeee4', borderBlock: '1px solid', margin: '0px' }}>Tekst pitanja</th>
                                    <th style={{ borderLeft: '1px solid #eeeee4', borderBlock: '1px solid', margin: '0px', width: '200px' }}>Tip pitanja</th>
                                    <th style={{ borderLeft: '1px solid #eeeee4', borderBlock: '1px solid', margin: '0px', width: '200px' }}>Više informacija</th>
                                    <th style={{ borderLeft: '1px solid #eeeee4', borderRight: '1px solid #eeeee4', borderBlock: '1px solid', margin: '0px' }}>Ukloni pitanje iz kviza</th>

                                </tr>
                            </thead>
                            <tbody>{renderSearchTable()}</tbody>
                            <MyButton onClick={function () { handleNumberOfSearch(); }}>Prikaži više!</MyButton>
                        </table>
                    }
                </Stack>

            </Stack >
        </div >
    );
};

export default AdminQuestionsPage;