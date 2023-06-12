import React from "react";
import AdminHeader from "../components/Header/AdminHeader.js";
import axios from 'axios';
import { useState } from 'react';
import { useParams } from "react-router-dom";
import { Stack } from "@mui/material";
import MyButton from "../components/Buttons/MyButton.js";
import { useForm } from 'react-hook-form';
import { ReactMarkdown } from "react-markdown/lib/react-markdown.js";

const ManagePairQuestion = () => {
    const { handleSubmit } = useForm();
    const { sifPitanje } = useParams();
    const [numberOfSearch, setNumberOfSearch] = useState(5);
    const [data, setDataList] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [questionList, setQuestionList] = useState('');
    const [textQ, setTextQ] = useState('');
    const [quizQuestion, setQuizQuestion] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState('');
    const [incorrect, setIncorrect] = useState('');
    const [value, setValue] = useState('');
    const [correct, setCorrect] = useState('');
    const [left, setLeft] = useState('');
    const [right, setRight] = useState('');

    const handleLeft = (e) => {
        setLeft(e.target.value);
    };

    const handleRight = (e) => {
        setRight(e.target.value);
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
        if (questionList) {
            return questionList.map(q => {

                return (
                    <tr key={q.sifSlagalica} style={{ height: '40px', textAlign: 'center' }}>
                        <td style={{ borderLeft: '1px solid #eeeee4', borderBlockEnd: '1px solid', maxWidth: '300px', overflowX: 'auto' }}>
                            {
                                q.lijevaStranaPara&& q.lijevaStranaPara.includes("![") ?
                                    <ReactMarkdown
                                        components={{
                                            img: (props) => (
                                                <img src={props.src} alt={props.alt} height={100} />
                                            ),
                                        }}>
                                        {q.lijevaStranaPara}
                                    </ReactMarkdown> :
                                    q.lijevaStranaPara

                            }
                        </td>
                        <td style={{ borderLeft: '1px solid #eeeee4', borderBlockEnd: '1px solid', maxWidth: '300px', overflowX: 'auto' }}>
                            {
                                q.desnaStranaPara && q.desnaStranaPara.includes("![") ?
                                    <ReactMarkdown
                                        components={{
                                            img: (props) => (
                                                <img src={props.src} alt={props.alt} height={100} />
                                            ),
                                        }}>
                                        {q.desnaStranaPara}
                                    </ReactMarkdown> :
                                    q.desnaStranaPara

                            }
                        </td>

                        <td style={{ borderLeft: '1px solid #eeeee4', borderBlockEnd: '1px solid' }}><img src={'https://cdn-icons-png.flaticon.com/512/5499/5499405.png'} style={{ position: 'relative', height: '30px', width: '30px' }} onClick={function () { deletePair(q.sifSlagalicaPar); }} /></td>


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

    const addPair = async (c, e) => {
        e.preventDefault();
        await axios.post(process.env.REACT_APP_BASE_URL +`/admin/quiz/addPair/` + sifPitanje,
            {

                pair1: left,
                pair2: right
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

    const deletePair = async (sifSlagalicaPar) => {
        await axios.post(process.env.REACT_APP_BASE_URL +`/admin/quiz/deletePair/` + sifSlagalicaPar,

        ).then((response) => {
            console.log(response.json);
            setError(false);
            setSuccess('obrisali par');
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
            await axios.get(process.env.REACT_APP_BASE_URL +'/admin/quiz/getSlagalica/' + sifPitanje)
        ).data;
        setQuestionList(data2);
        renderChoiceTable();
    };

    React.useEffect(() => {
        const getData = async () => {
            let dataa = (
                await axios.get(process.env.REACT_APP_BASE_URL +'/session', { withCredentials: true })
            ).data;
            //setValue(data[0]);
            setDataList(dataa);
        };
        const getQuestion = async () => {
            let data2 = (
                await axios.get(process.env.REACT_APP_BASE_URL +'/admin/quiz/getSlagalica/' + sifPitanje)
            ).data;
            //setValue(data[0]);
            setQuestionList(data2);
            setTextQ(data2[0].tekstPitanja);


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
                        <p>Tip: slagalica</p>
                    </div>
                    <br />
                    <form onSubmit={handleSubmit(editTextQuestion)}>
                        {/* Labels and inputs for form data */}
                        <Stack direction='row' justifyContent='flex-start' alignItems='center' spacing='5rem' >
                            <label className="label">Tekst pitanja:  </label>

                            <textarea style={{ height: '40px', width: '400px' }} onChange={handleQuestionQ} className="input"
                                type="textarea" name='question' id="question" value={textQ} />

                            <MyButton type="submit">
                                Uredi
                            </MyButton>
                        </Stack>
                    </form>
                    <br />
                    <Stack direction='row' justifyContent='flex-start' alignItems='center' spacing='1rem' style={{ marginInline: '200px', alignSelf: 'center' }}>
                        <form onSubmit={handleSubmit(addPair)}>

                            <p>Dodaj lijevu stranu slagalice:</p>
                            <Stack direction='row' justifyContent='left' alignItems='center' spacing='5rem' >
                                <input style={{ height: '30px', width: '200px' }} onChange={handleLeft} className="input"
                                    type="text" name='left' id="left" value={left} placeholder="Tom" />
                            </Stack>
                            <p>Dodaj desnu stranu slagalice:</p>
                            <Stack direction='row' justifyContent='left' alignItems='center' spacing='5rem' >
                                <input style={{ height: '30px', width: '200px' }} onChange={handleRight} className="input"
                                    type="text" name='right' id="right" value={right} placeholder="Jerry" />
                                <MyButton type="submit">Dodaj</MyButton>
                            </Stack>

                        </form>
                    </Stack>

                    <br />
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
                                        <th style={{ borderLeft: '1px solid #eeeee4', borderBlock: '1px solid', margin: '0px', maxWidth: '300px', overflowX: 'auto' }}>Lijeva strana para</th>
                                        <th style={{ borderLeft: '1px solid #eeeee4', borderBlock: '1px solid', margin: '0px', maxWidth: '300px', overflowX: 'auto' }}>Desna strana para</th>
                                        <th style={{ borderLeft: '1px solid #eeeee4', borderBlock: '1px solid', margin: '0px' }}>Ukloni par</th>

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

export default ManagePairQuestion;