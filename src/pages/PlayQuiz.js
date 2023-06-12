import React from "react";
import Header from "../components/Header/Header.js";
import axios from 'axios';
import { useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { Stack } from "@mui/material";
import MyButton from "../components/Buttons/MyButton.js";
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import SlagalicaButton from "../components/Buttons/SlagalicaButton.js";
import ReactMarkdown from 'react-markdown';


const PlayQuiz = () => {

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
    const [left, setLeft] = useState('');
    const [right, setRight] = useState('');
    const [leftPair, setLeftPair] = useState('');
    const [rightPair, setRightPair] = useState('');
    const [questions2, setQuestions2] = useState('');
    const [remainingTimer, setRemainingTimer] = useState('');
    const [state, setState] = useState([]);
    let disctinct = [];
    var obojanoLijevaStrana = [];
    var obojanoDesnaStrana = [];
    var leftButtons = "leftButtons";
    var rightButtons = "rightButtons";


    const handleOdgovor = (e) => {
        setKorisnikOdgovor(e.target.value);
    };

    const onChangeValue = (odgovor) => {
        var button = document.getElementById(odgovor);
        let selectedItems = state;
        if(selectedItems.includes(odgovor)) {
            var index = selectedItems.indexOf(odgovor);
            selectedItems.splice(index, 1);
            button.checked = false;
            setState(selectedItems);
        }
        else {
            selectedItems.push(odgovor);
            button.checked = true;
            setState(selectedItems);
        } 
        console.log(selectedItems);
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
                await axios.get(process.env.REACT_APP_BASE_URL +'/quiz/getQuestions/' + sifKviz + "?number=0")
            ).data;
            //setValue(data[0]);
            setQuestions(dataa2);
            let shuffled = dataa2.map(value => ({ value, sort: Math.random() }))
                .sort((a, b) => a.sort - b.sort)
                .map(({ value }) => value);
            setQuestions2(shuffled);
            setQuestionNumber(0);
            

        };

        const getKviz = async () => {
            let data2 = (
                await axios.get(process.env.REACT_APP_BASE_URL +'/quiz/' + sifKviz)
            ).data;
            //setValue(data[0])
            setNumberOfQuestions(data2.numberOfQuestions);
            setKviz(data2);
            setSecondsTimer(data2.durationSec);


        };
        getKviz().catch((err) => console.log(err));
        getQuestions().catch((err) => console.log(err));
        getData().catch((err) => console.log(err));
        setQuestionNumber(0);
        


    }, [refresh]);

    const getAnotherQuestion = async () => {

        const getQuestions = async () => {
            let dataa2 = (
                await axios.get(process.env.REACT_APP_BASE_URL +'/quiz/getQuestions/' + sifKviz + "?number=" + (questionNumber + 1))
            ).data;
            //setValue(data[0]);
            setQuestions(dataa2);
            let shuffled = dataa2.map(value => ({ value, sort: Math.random() }))
                .sort((a, b) => a.sort - b.sort)
                .map(({ value }) => value);
            setQuestions2(shuffled);
         
        
        };
        if(questions[0].sifTip === 1) {
            await axios.post(process.env.REACT_APP_BASE_URL +'/quiz/saveAnswer/' + questions[0].sifPitanje + "/" + data.username, {
                korisnikOdgovor
            }, {withCredentials: true});
        } else if(questions[0].sifTip===2){
            await axios.post(process.env.REACT_APP_BASE_URL +'/quiz/saveMultipleAnswer/' + questions[0].sifPitanje, 
                {selectedItems: state}, {withCredentials: true}
            );
        }
        else if(questions[0].sifTip===3){
            await axios.post(process.env.REACT_APP_BASE_URL +'/quiz/saveSlagalica/' + questions[0].sifPitanje,{}, {withCredentials: true});
        }
        setState([]);
        disctinct = [];
        setQuestionNumber(questionNumber + 1);
        setKorisnikOdgovor("");
        getQuestions().catch((err) => console.log(err));
        //renderSearchTable();
    };

    const submitQuiz = async () => {

        if(questions[0].sifTip === 1) {
            await axios.post(process.env.REACT_APP_BASE_URL +'/quiz/saveAnswer/' + questions[0].sifPitanje + "/" + data.username, {
                korisnikOdgovor
            }, {withCredentials: true});
        } else if(questions[0].sifTip===2){
            await axios.post(process.env.REACT_APP_BASE_URL +'/quiz/saveMultipleAnswer/' + questions[0].sifPitanje, 
                {selectedItems: state}, {withCredentials: true}
            );
        }
        else if(questions[0].sifTip===3){
            await axios.post(process.env.REACT_APP_BASE_URL +'/quiz/saveSlagalica/' + questions[0].sifPitanje,{}, {withCredentials: true});
        }
        await axios.post(process.env.REACT_APP_BASE_URL +'/quiz/saveResult/' + sifKviz, {
            elapsedTime: secondsTimer - remainingTimer
        }, {withCredentials: true});
        navigateTo('/playQuiz/review/' + sifKviz);


        setQuestionNumber(questionNumber + 1);
    };

    

    const handleSlagalicaClickLeft = (event, sifLijeveStrane) => {
        var el = document.getElementsByClassName(leftButtons);
        for(let i = 0; i < el.length; i++) {
            el[i].style.backgroundColor = '#4fc3f7';
            el[i].style.color = 'black';
        }
        
        event.target.style.backgroundColor = '#115293';  
        event.target.style.color = 'white';
        setLeftPair(sifLijeveStrane);  
        if(rightPair!==''){
            axios.post(process.env.REACT_APP_BASE_URL +'/quiz/savePair',  {
                sifPitanje: questions[0].sifPitanje,
                sifLeft: sifLijeveStrane,
                sifRight: rightPair
            }, {withCredentials: true});
            el = document.getElementsByClassName(leftButtons);
            for(let i = 0; i < el.length; i++) {
                el[i].style.backgroundColor = '#4fc3f7';
                el[i].style.color = 'black';
            }
            el = document.getElementsByClassName(rightButtons);
            for(let i = 0; i < el.length; i++) {
                el[i].style.backgroundColor = '#4fc3f7';
                el[i].style.color = 'black';
            }
            el = document.getElementById(rightPair);
            el.disabled = true;
            el.style.cursor = 'not-allowed';
            el.style.opacity = '0.4';
            setLeftPair('');
            setRightPair('');
        }
    };

    const handleSlagalicaClickRight = (event, desna) => {
        var el = document.getElementsByClassName(rightButtons);
        for(let i = 0; i < el.length; i++) {
            el[i].style.backgroundColor = '#4fc3f7';
            el[i].style.color = 'black';
        }
        event.target.style.backgroundColor = '#115293'; 
        event.target.style.color = 'white';
        setRightPair(desna);
        if(leftPair!==''){
            axios.post(process.env.REACT_APP_BASE_URL +'/quiz/savePair',  {
                sifPitanje: questions[0].sifPitanje,
                sifLeft: leftPair,
                sifRight: desna
            }, {withCredentials: true});
            el = document.getElementsByClassName(leftButtons);
            for(let i = 0; i < el.length; i++) {
                el[i].style.backgroundColor = '#4fc3f7';
                el[i].style.color = 'black';
            }
            el = document.getElementsByClassName(rightButtons);
            for(let i = 0; i < el.length; i++) {
                el[i].style.backgroundColor = '#4fc3f7';
                el[i].style.color = 'black';
            }
            el = document.getElementById(desna);
            el.disabled = true;
            el.style.cursor = 'not-allowed';
            el.style.opacity = '0.4';
            setLeftPair('');
            setRightPair('');
        }
        
    };


    function getPreviousQuestion() {

        const getQuestions = async () => {
            let dataa2 = (
                await axios.get(process.env.REACT_APP_BASE_URL +'/quiz/getQuestions/' + sifKviz + "?number=" + (questionNumber - 1))
            ).data;
            //setValue(data[0]);
            setQuestions(dataa2);
            let shuffled = dataa2.map(value => ({ value, sort: Math.random() }))
                .sort((a, b) => a.sort - b.sort)
                .map(({ value }) => value);
            setQuestions2(shuffled);
        };
        if(questions[0].sifTip === 1) {
            axios.post(process.env.REACT_APP_BASE_URL +'/quiz/saveAnswer/' + questions[0].sifPitanje + "/" + data.username, {
                korisnikOdgovor
            }, {withCredentials: true});
        } else if(questions[0].sifTip===2){
            axios.post(process.env.REACT_APP_BASE_URL +'/quiz/saveMultipleAnswer/' + questions[0].sifPitanje, 
                {selectedItems: state}, {withCredentials: true}
            );
        }
        else if(questions[0].sifTip===3){
            axios.post(process.env.REACT_APP_BASE_URL +'/quiz/saveSlagalica/' + questions[0].sifPitanje,{}, {withCredentials: true});
        }
        setState([]);
        disctinct = [];
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
                                        <div>
                                            <br/>
                                            <img src={props.src} alt={props.alt} height={200} />
                                            <br/>
                                        </div>
                                    ),
                                }}>
                                {questions[0].tekstPitanja}
                            </ReactMarkdown>
                            
                            <input style={{ height: "30px", width: "200px" }} value={korisnikOdgovor} name="korisnikOdgovor" id="korisnikOdgovor" onChange={handleOdgovor}></input>
                        </Stack>
                    }
                    {questions[0] && questions[0].sifTip === 2 &&
                        <Stack direction='column' justifyContent='flex-start' alignItems='center' spacing='2rem'  >
                            <ReactMarkdown 
                                components={{
                                    p: ({ children }) => <Stack direction='column' justifyContent='flex-start' alignItems='center' spacing='2rem'  style={{fontSize:'30px'}}>{children}</Stack>,
                                    img: (props) => (
                                        <div style={{fontSize:'30px', alignItems: 'center', alignContent:'center'}}>
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
                                            <input type="radio" value={q.odgovor} name={q.odgovor} id ={q.odgovor} onClick = {function(){onChangeValue(q.odgovor);}}
                                                //setKorisnikOdgovor(q.odgovor); 
                                            >
                                                        
                                            </input>
                                            <p>{q.odgovor}</p>
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
                                                    <div className = "buttons" onClick={function(event){handleSlagalicaClickLeft(event, q.sifLijeveStranePara); }} style ={{padding:'0px 0px 0px 0px', backgroundColor:'white', borderColor:'white', cursor: 'pointer'}}>
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
                                                    <SlagalicaButton className = {leftButtons} onClick={function(event){handleSlagalicaClickLeft(event, q.sifLijeveStranePara); }} >{q.lijevaStranaPara}</SlagalicaButton>
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
                                                <div className = {"rightButtonsPic"} id ={q2.desnaStranaPara} onClick={function(event){handleSlagalicaClickRight(event, q2.desnaStranaPara);}} style ={{padding:'0px 0px 0px 0px', backgroundColor:'white', borderColor:'white', cursor: 'pointer'}}>
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
                                                { !q2.desnaStranaPara.includes("![")  &&
                                                <SlagalicaButton className = {rightButtons} id ={q2.desnaStranaPara} onClick={function(event){handleSlagalicaClickRight(event, q2.desnaStranaPara);}}>
                                                    {q2.desnaStranaPara}
                                                </SlagalicaButton>
                                                }
                                            </Stack>

                                        );
                                    }) }
                                </Stack>
                                
                            </Stack>
                        </Stack>
                    }


                </Stack>
                <Stack direction='row' justifyContent='space-around' alignItems='center' spacing='5rem'  >
                    {questionNumber !== 0 &&
                        <MyButton onClick={function () { getPreviousQuestion(); }}>Prethodno pitanje</MyButton>
                    }
                    {questionNumber !== numberOfQuestions - 1 &&
                        <MyButton onClick={function () { getAnotherQuestion(); }}>Iduće pitanje</MyButton>
                    }
                    {questionNumber === numberOfQuestions - 1 &&
                        <MyButton onClick={function () { submitQuiz(); }}>Završi kviz</MyButton>
                    }

                </Stack>

            </Stack>
        );

    };

    const renderTime = ({ remainingTime }) => {
        if (remainingTime === 0) {
            return <div className="timer">Too lale...</div>;
        }
        setRemainingTimer(remainingTime);
        return (
            <Stack direction='row' justifyContent='center' alignItems='center' spacing='0rem'>
                <div className="value" style={{ fontSize: "25px" }}>{Math.floor(remainingTime / 60)}</div>
                <div className="text" style={{ fontSize: "25px" }}>:</div>
                <div className="value" style={{ fontSize: "25px" }}>{remainingTime % 60}</div>
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

export default PlayQuiz;