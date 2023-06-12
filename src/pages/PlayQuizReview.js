import React from "react";
import Header from "../components/Header/Header.js";
import axios from 'axios';
import { useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { Stack } from "@mui/material";
import MyButton from "../components/Buttons/MyButton.js";
import {  CountdownCircleTimer } from 'react-countdown-circle-timer';
import SlagalicaButton from "../components/Buttons/SlagalicaButton.js";
import { ReactMarkdown } from "react-markdown/lib/react-markdown.js";

const PlayQuizReview = () => {

    const { sifKviz } = useParams();
    const navigateTo = useNavigate();
    const [data, setDataList] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [secondsTimer, setSecondsTimer] = useState('');
    const [duration, setDuration] = useState('');
    const [questionNumber, setQuestionNumber] = useState(0);
    const [numberOfQuestions, setNumberOfQuestions] = useState('');
    const [first, setFirst] = useState(true);
    const [time, setTime] = useState('');
    const [kviz, setKviz] = useState('');
    const [korisnikOdgovor, setKorisnikOdgovor] = useState('');
    const [result, setResult] = useState('');
    const [correct, setCorrect] = useState('');
    const [questions2, setQuestions2] = useState('');
    const [disctinctAns, setDistinctAns] = useState([]);
    const [disctinctCorrAns, setDistinctCorrAns] = useState([]);
    const [strOdg, setStrOdg] = useState('');
    const [strCorrOdg, setStrCorrOdg] = useState('');
    var disctinct = [];

    const handleOdgovor = (e) => {
        setKorisnikOdgovor(e.target.value);
    };

    React.useEffect(() => {

        
        const getData = async () => {
            let dataa = (
                await axios.get(process.env.REACT_APP_BASE_URL +'/session', {withCredentials: true})
            ).data;
            //setValue(data[0]);
            setDataList(dataa);
        };
        const getQuestions = async () => {
            let dataa2 = (
                await axios.get(process.env.REACT_APP_BASE_URL +'/quiz/getReviewQuestions/' + sifKviz + "?number=0", {withCredentials: true})
            ).data;
            //setValue(data[0]);
            setQuestions(dataa2);
            for(var i = 0; i < dataa2.length; i++) {
                if(dataa2[i].isCorrect === 1) {
                    setCorrect(dataa2[i].odgovor);
                }
            }
            let shuffled = dataa2.map(value => ({ value, sort: Math.random() }))
                .sort((a, b) => a.sort - b.sort)
                .map(({ value }) => value);

            let strCorrOdgHelp = "";
            let strOdgHelp = "";
            let distinctAnsHelp = [];
            let distinctCorrAnsHelp = [];
            for(i = 0; i < dataa2.length; i++) {
                if(!distinctAnsHelp.includes(dataa2[i].korisnikOdgovor) && dataa2[i].korisnikOdgovor) {
                    distinctAnsHelp.push(dataa2[i].korisnikOdgovor);
                }
                if(dataa2[i].isCorrect === 1 && !distinctCorrAnsHelp.includes(dataa2[i].odgovor)) {
                    distinctCorrAnsHelp.push(dataa2[i].odgovor);
                }
            }
            setDistinctAns(distinctAnsHelp);
            setDistinctCorrAns(distinctCorrAnsHelp);
            for(i = 0; i < distinctAnsHelp.length; i++) {
                if(i!= distinctAnsHelp.length - 1) strOdgHelp = strOdgHelp + distinctAnsHelp[i] + ", ";
                else strOdgHelp = strOdgHelp + distinctAnsHelp[i];
            }
            setStrOdg(strOdgHelp);
            for(i = 0; i < distinctCorrAnsHelp.length; i++) {
                if(i!= distinctCorrAnsHelp.length - 1) strCorrOdgHelp = strCorrOdgHelp + distinctCorrAnsHelp[i] + ", ";
                else strCorrOdgHelp = strCorrOdgHelp + distinctCorrAnsHelp[i];
            }
            setStrCorrOdg(strCorrOdgHelp);
            setQuestions2(shuffled);
            setQuestionNumber(0);

        };
        const getKviz = async () => {
            let data2 = (
                await axios.get(process.env.REACT_APP_BASE_URL +'/quiz/' + sifKviz)
            ).data;
            //setValue(data[0]);
            setNumberOfQuestions(data2.numberOfQuestions);
            setKviz(data2);
            setSecondsTimer(data2.reviewDurationSec);


        };
        const getResult = async () => {
            let data2 = (
                await axios.get(process.env.REACT_APP_BASE_URL +'/quiz/getResult/' + sifKviz, {withCredentials: true})
            ).data;
            //setValue(data[0]);
            setNumberOfQuestions(data2.numberOfQuestions);
            setResult(data2);
            


        };
        getResult().catch((err) => console.log(err));
        getKviz().catch((err) => console.log(err));
        getQuestions().catch((err) => console.log(err));
        getData().catch((err) => console.log(err));
        setQuestionNumber(0);


    }, [refresh]);

    const getAnotherQuestion = async () => {

        const getQuestions = async () => {
            let dataa2 = (
                await axios.get(process.env.REACT_APP_BASE_URL +'/quiz/getReviewQuestions/' + sifKviz + "?number=" + (questionNumber + 1), {withCredentials: true})
            ).data;
            //setValue(data[0]);
            for(var i = 0; i < dataa2.length; i++) {
                if(dataa2[i].isCorrect === 1) {
                    setCorrect(dataa2[i].odgovor);
                }
            }
            setQuestions(dataa2);
            let shuffled = dataa2.map(value => ({ value, sort: Math.random() }))
                .sort((a, b) => a.sort - b.sort)
                .map(({ value }) => value);
            setQuestions2(shuffled);
            let strCorrOdgHelp = "";
            let strOdgHelp = "";
            let distinctAnsHelp = [];
            let distinctCorrAnsHelp = [];
            for(i = 0; i < dataa2.length; i++) {
                if(!distinctAnsHelp.includes(dataa2[i].korisnikOdgovor) && dataa2[i].korisnikOdgovor) {
                    distinctAnsHelp.push(dataa2[i].korisnikOdgovor);
                }
                if(dataa2[i].isCorrect === 1 && !distinctCorrAnsHelp.includes(dataa2[i].odgovor)) {
                    distinctCorrAnsHelp.push(dataa2[i].odgovor);
                }
            }
            setDistinctAns(distinctAnsHelp);
            setDistinctCorrAns(distinctCorrAnsHelp);
            for(i = 0; i < distinctAnsHelp.length; i++) {
                if(i!= distinctAnsHelp.length - 1) strOdgHelp = strOdgHelp + distinctAnsHelp[i] + ", ";
                else strOdgHelp = strOdgHelp + distinctAnsHelp[i];
            }
            setStrOdg(strOdgHelp);
            for(i = 0; i < distinctCorrAnsHelp.length; i++) {
                if(i!= distinctCorrAnsHelp.length - 1) strCorrOdgHelp = strCorrOdgHelp + distinctCorrAnsHelp[i] + ", ";
                else strCorrOdgHelp = strCorrOdgHelp + distinctCorrAnsHelp[i];
            }
            setStrCorrOdg(strCorrOdgHelp);
        };
        disctinct = '';
        setQuestionNumber(questionNumber + 1);
        getQuestions().catch((err) => console.log(err));
        //renderSearchTable();
    };

    const submitQuiz = async () => {

        navigateTo('/quiz/' + sifKviz);
    };

    function getPreviousQuestion() {

        const getQuestions = async () => {
            let dataa2 = (
                await axios.get(process.env.REACT_APP_BASE_URL +'/quiz/getReviewQuestions/' + sifKviz + "?number=" + (questionNumber - 1), {withCredentials: true})
            ).data;
            //setValue(data[0]);
            for(var i = 0; i < dataa2.length; i++) {
                if(dataa2[i].isCorrect === 1) {
                    setCorrect(dataa2[i].odgovor);
                }
            }
            setQuestions(dataa2);
            let shuffled = dataa2.map(value => ({ value, sort: Math.random() }))
                .sort((a, b) => a.sort - b.sort)
                .map(({ value }) => value);
            setQuestions2(shuffled);
            let strCorrOdgHelp = "";
            let strOdgHelp = "";
            let distinctAnsHelp = [];
            let distinctCorrAnsHelp = [];
            for(i = 0; i < dataa2.length; i++) {
                if(!distinctAnsHelp.includes(dataa2[i].korisnikOdgovor) && dataa2[i].korisnikOdgovor) {
                    distinctAnsHelp.push(dataa2[i].korisnikOdgovor);
                }
                if(dataa2[i].isCorrect === 1 && !distinctCorrAnsHelp.includes(dataa2[i].odgovor)) {
                    distinctCorrAnsHelp.push(dataa2[i].odgovor);
                }
            }
            setDistinctAns(distinctAnsHelp);
            setDistinctCorrAns(distinctCorrAnsHelp);
            for(i = 0; i < distinctAnsHelp.length; i++) {
                if(i!= distinctAnsHelp.length - 1) strOdgHelp = strOdgHelp + distinctAnsHelp[i] + ", ";
                else strOdgHelp = strOdgHelp + distinctAnsHelp[i];
            }
            setStrOdg(strOdgHelp);
            for(i = 0; i < distinctCorrAnsHelp.length; i++) {
                if(i!= distinctCorrAnsHelp.length - 1) strCorrOdgHelp = strCorrOdgHelp + distinctCorrAnsHelp[i] + ", ";
                else strCorrOdgHelp = strCorrOdgHelp + distinctCorrAnsHelp[i];
            }
            setStrCorrOdg(strCorrOdgHelp);
        };
        disctinct = '';
        setQuestionNumber(questionNumber - 1);
        getQuestions().catch((err) => console.log(err));
        //renderSearchTable();
    }

    const renderSearchTable = () => {

        return (
            <Stack direction='column' justifyContent='flex-end' alignItems='center' spacing='4rem'  >
                <Stack direction='column' justifyContent='flex-start' alignItems='flex-start' spacing='0rem'  >
                    <p style={{ fontWeight: "bold" }}>Pitanje: {questionNumber + 1}/{numberOfQuestions}</p>
                    {questions[0] && questions[0].sifTip === 1 &&
                        <Stack direction='column' justifyContent='flex-start' alignItems='center' spacing='2rem'  >
                            <ReactMarkdown 
                                components={{
                                    p: ({ children }) => <Stack direction='column' justifyContent='flex-start' alignItems='center' spacing='2rem'  style={{fontSize:'30px'}}>{children}</Stack>,
                                    img: (props) => (
                                        <div style={{alignItems :'center'}}>
                                            <br/>
                                            <img src={props.src} alt={props.alt} height={200}/>
                                            <br/>
                                        </div>
                                        
                                    ),
                                }}>
                                {questions[0].tekstPitanja}
                                
                            </ReactMarkdown>
                            <input disabled="true" style={{ height: "30px", width: "200px" }} value={korisnikOdgovor} name="korisnikOdgovor" id="korisnikOdgovor" onChange={handleOdgovor}></input>
                        </Stack>
                        
                    }
                    {questions[0] && questions[0].sifTip === 2 &&
                        <Stack direction='column' justifyContent='flex-start' alignItems='center' spacing='2rem'  >
                            <ReactMarkdown 
                                components={{
                                    p: ({ children }) => <Stack direction='column' justifyContent='flex-start' alignItems='center' spacing='2rem'  style={{fontSize:'30px'}}>{children}</Stack>,
                                    img: (props) => (
                                        <div>
                                            <br/>
                                            <img src={props.src} alt={props.alt} height={200} />
                                            <br/>
                                        </div>
                                        
                                    ),
                                }}>
                                {questions[0].tekstPitanja}
                            </ReactMarkdown>
                            <Stack direction='column' justifyContent='flex-start' alignItems='flex-start' spacing='2rem'  >
                                {questions.map((q) => {
                                    return (
                                        <Stack key={q.sifPitanjeOdgovor} direction='row' justifyContent='flex-start' alignItems='center' spacing='1rem'  >
                                            {disctinctAns.includes(q.odgovor) && !disctinct.includes(q.odgovor)  &&
                                                <input disabled = "true" checked="checked" type="radio" value={korisnikOdgovor} name={q.odgovor}  onChange={function(){setKorisnikOdgovor(q.odgovor);}}></input>
                                            }
                                            {!disctinctAns.includes(q.odgovor) && !disctinct.includes(q.odgovor)  &&
                                                <input disabled = "true" type="radio" value={korisnikOdgovor} name={q.odgovor}  onChange={function(){setKorisnikOdgovor(q.odgovor);}}></input>
                                            }
                                            { !disctinct.includes(q.odgovor) && disctinct.push(q.odgovor) &&
                                                <p>{q.odgovor}</p>
                                            }
                                            
                                        </Stack>

                                    );
                                })}
                            </Stack>
                        </Stack>
                    }
                    {questions[0] && questions[0].sifTip === 3 &&
                        <Stack direction='column' justifyContent='flex-start' alignItems='center' spacing='2rem'  >
                            <p style={{ fontSize: "30px" }}>{questions[0].tekstPitanja}</p>
                            <Stack direction='row' justifyContent='space-items' alignItems='space-items' spacing='25rem'  >
                                <Stack direction='column' justifyContent='flex-start' alignItems='flex-start' spacing='2rem'  >
                                    {questions.map((q) => {
                                        return (
                                            <Stack key={q.sifSlagalicaPar} direction='column' justifyContent='flex-start' alignItems='center' spacing='1rem'  >
                                                { q.lijevaStranaPara.includes("![") && !disctinct.includes(q.sifLijeveStranePara) && disctinct.push(q.sifLijeveStranePara) &&
                                                    <div className = "buttons">
                                                        <ReactMarkdown 
                                                            components={{
                                                                img: (props) => (
                                                                    <img src={props.src} alt={props.alt} height={100} />
                                                                ),
                                                            }}>
                                                            {q.lijevaStranaPara}
                                                        </ReactMarkdown>
                                                    </div> 
                                                }
                                                { !q.lijevaStranaPara.includes("![") && !disctinct.includes(q.sifLijeveStranePara) && disctinct.push(q.sifLijeveStranePara)  &&
                                                    <SlagalicaButton >{q.lijevaStranaPara}</SlagalicaButton>
                                                }
                                                
                                        
                                            </Stack>

                                        );
                                    })}
                                </Stack>
                                <Stack direction='column' justifyContent='flex-start' alignItems='flex-start' spacing='2rem'  >
                                    { questions2.map((q2) =>
                                    {
                                        return (
                                            <Stack key={q2.sifSlagalicaPar} direction='column' justifyContent='flex-start' alignItems='center' spacing='1rem'  >
                                                { q2.desnaStranaPara.includes("![") &&
                                                <div>
                                                    <ReactMarkdown 
                                                        components={{
                                                            img: (props) => (
                                                                <img src={props.src} alt={props.alt} height={100} />
                                                            ),
                                                        }}>
                                                        {q2.desnaStranaPara}
                                                    </ReactMarkdown>
                                                </div>
                                                }
                                                { !q2.desnaStranaPara.includes("![") && 
                                                <SlagalicaButton >
                                                    {q2.desnaStranaPara}
                                                </SlagalicaButton>
                                                } 
                                                <Stack key={q2.sifSlagalicaPar} direction='row' justifyContent='flex-start' alignItems='center' spacing='1rem'  > 
                                                
                                                
                                                    <p style={{color: q2.lijevaStrana === q2.lijevaStranaPara ? 'green' : 'red', fontWeight:"bold"}}>Vaš odgovor: </p>
                                                    {
                                                        q2.lijevaStrana.includes("![")? 
                                                            <ReactMarkdown 
                                                                components={{
                                                                    img: (props) => (
                                                                        <img src={props.src} alt={props.alt} height={50} />
                                                                    ),
                                                                }}>
                                                                {q2.lijevaStrana}
                                                            </ReactMarkdown> : 
                                                            <p style={{color: q2.lijevaStrana === q2.lijevaStranaPara ? 'green' : 'red', fontWeight:"bold"}}>{q2.lijevaStrana}</p>
                                            
                                                    } <p style={{color: q2.lijevaStrana === q2.lijevaStranaPara ? 'green' : 'red', fontWeight:"bold"}}>.Točan odgovor: </p> {
                                                        q2.lijevaStranaPara.includes("![")? 
                                                            <ReactMarkdown 
                                                                components={{
                                                                    img: (props) => (
                                                                        <img src={props.src} alt={props.alt} height={50} />
                                                                    ),
                                                                }}>
                                                                {q2.lijevaStranaPara}
                                                            </ReactMarkdown> : 
                                                            <p style={{color: q2.lijevaStrana === q2.lijevaStranaPara ? 'green' : 'red', fontWeight:"bold"}}> {q2.lijevaStranaPara} </p>
                                            
                                                    }
                                                </Stack>
                                                
                                            </Stack>

                                        );
                                    }) }
                                </Stack>
                                
                            </Stack>
                        </Stack>
                    }


                </Stack>
                <Stack direction='column' justifyContent='flex-start' alignItems='center' spacing='2rem'  >
                    {questions[0] && questions[0].isAnswerCorrect === 1 && questions[0].sifTip === 1 &&
                        <p style={{color:"green", fontWeight:"bold"}}>Vaš odgovor je točan! Vaš odgovor: {questions[0].korisnikOdgovor}. Točan odgovor: {correct}</p>
                            
                    }
                    {questions[0] && questions[0].isAnswerCorrect === 0 && questions[0].sifTip === 1 &&
                        <p style={{color:"red", fontWeight:"bold"}}>Vaš odgovor je netočan! Vaš odgovor: {questions[0].korisnikOdgovor}. Točan odgovor: {correct}</p>
                        
                    }
                    {questions[0] && questions[0].isAnswerCorrect >= 0.5 && questions[0].sifTip === 2 &&
                        <p style={{color:"green", fontWeight:"bold"}}>Vaš odgovor je većinom točan! Vaši odgovor: {strOdg}. Točni odgovori: {strCorrOdg}</p>
                            
                    }
                    {questions[0]  && questions[0].isAnswerCorrect < 0.5 && questions[0].sifTip === 2 &&
                        <p style={{color:"red", fontWeight:"bold"}}>Vaš odgovor je većinom netočan! Vaš odgovor: {strOdg}. Točni odgovori: {strCorrOdg}</p>
                        
                    }
                </Stack>
                <Stack direction='row' justifyContent='space-around' alignItems='center' spacing='5rem'  >
                    {questionNumber !== 0 &&
                        <MyButton onClick={function () { getPreviousQuestion(); }}>Prethodno pitanje</MyButton>
                    }
                    {questionNumber!== numberOfQuestions-1 &&
                        <MyButton onClick={function () { getAnotherQuestion(); }}>Iduće pitanje</MyButton>
                    }
                    {questionNumber=== numberOfQuestions-1 &&
                        <MyButton onClick={function () { submitQuiz(); }}>Završi pregled</MyButton>
                    }
                    
                </Stack>
                
            </Stack>
        );

    };

    const renderTime = ({ remainingTime }) => {
        if (remainingTime === 0) {
            return <div className="timer">Too lale...</div>;
        }

        return (
            <Stack direction='row' justifyContent='center' alignItems='center' spacing='0rem'>
                <div className="value" style={{fontSize:"25px"}}>{Math.floor(remainingTime / 60)}</div>
                <div className="text" style={{fontSize:"25px"}}>:</div>
                <div className="value" style={{fontSize:"25px"}}>{remainingTime % 60}</div>
            </Stack>
        );
    };

    return (
        <div>
            <Header />
            <Stack direction='column' justifyContent='center' alignItems='center' spacing='1rem' style={{
                marginBlockStart: '0rem', marginBlockEnd: '3rem'
            }}>
                
                <Stack direction='row' justifyContent='space-around' alignItems='center' spacing='23rem' style={{
                    marginBlockStart: '2rem',
                }}>

                    <div><img src={kviz.image} style={{ height: "100px" }}></img></div>
                    <p style={{ fontSize: "40px", fontWeight: "bold" }}>{kviz.name}</p>
                    <div className="timer-wrapper">
                        <CountdownCircleTimer
                            isPlaying
                            duration={secondsTimer}
                            colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                            colorsTime={[30, 20, 10, 0]}
                            onComplete={() => { navigateTo('/quiz/' + sifKviz); }}

                        >
                            {renderTime}
                        </CountdownCircleTimer>
                    </div>
                </Stack>
                <p style={{color: "blue", fontWeight:"bold"}}>Vaš rezultat je {((result.bodovi/result.maksBodovi)*100).toFixed(2)}%, imali ste {result.brojTocnih} točnih, {result.brojPolovicnih} polovičnih i {result.maksBodovi - (result.brojTocnih + result.brojPolovicnih)} netočnih odgovora!</p>

                {questions &&
                    < table id="users">
                        <thead>

                        </thead>
                        <tbody>{renderSearchTable()}</tbody>


                    </table>
                }
            </Stack>
        </div>
    );
};

export default PlayQuizReview;