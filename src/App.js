
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage.js';
import RegisterPage from './pages/RegisterPage.js';
import ProfilePage from './pages/ProfilePage.js';
import MainPage from './pages/MainPage.js';
import AdminPage from './pages/AdminPage.js';
import ManageAdmins from './pages/ManageAdmins.js';
import ManageCategories from './pages/ManageCategories.js';
import CreateQuiz from './pages/CreateQuiz.js';
import ManageQuizes from './pages/ManageQuizes.js';
import ManageSpecificQuiz from './pages/ManageSpecificQuiz.js';
import ManageInputQuestion from './pages/ManageInputQuestion.js';
import ManageChoiceQuestion from './pages/ManageChoiceQuestion.js';
import ManagePairQuestion from './pages/ManagePairQuestion.js';
import QuizPage from './pages/QuizPage.js';
import PlayQuiz from './pages/PlayQuiz.js';
import PlayQuizReview from './pages/PlayQuizReview.js';
import CategoryPage from './pages/CategoryPage.js';
import AdminQuizPage from './pages/AdminQuizPage.js';
import AdminQuestionsPage from './pages/AdminQuestionsPage.js';
import { Navigate } from 'react-router-dom';


function App() {

    const [user, setUser] = useState('');



    useEffect(() => {
    // First session load
        const getData = async () => {
            let dataa = (
                await axios.get(process.env.REACT_APP_BASE_URL +'/session', {withCredentials: true})
            ).data;
            //setValue(data[0]);
            setUser(dataa);
        };
        getData();
    }, []);

    //////////////////////////////////////////////////////////////////////////////////




    return ( 
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path = "*" element = {<Navigate to="/"/>} />
                    <Route path ="/" element = {<MainPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    {user && user.admin === 1 && 
                        <Route path="/admin" element={<AdminPage />} />
                    }
                    {user && user.admin === 0 && 
                        <Route path="/admin" element={<Navigate to="/"/>} />
                    }
                    {user && user.admin === 1 && 
                        <Route path="/admin/korisnici" element={<ManageAdmins />} />
                    }
                    {user && user.admin === 0 && 
                        <Route path="/admin/korisnici" element={<Navigate to="/"/>} />
                    }
                    {user && user.admin === 1 && 
                        <Route path="/admin/kategorije" element={<ManageCategories />} />
                    }
                    {user && user.admin === 0 && 
                        <Route path="/admin/kategorije" element={<Navigate to="/"/>} />
                    }
                    {user && user.admin === 1 && 
                        <Route path="/admin/createQuiz" element = {<CreateQuiz/>} />
                    }
                    {user && user.admin === 0 && 
                        <Route path="/admin/createQuiz" element={<Navigate to="/"/>} />
                    }
                    {user && user.admin === 1 && 
                        <Route path="/admin/manageQuizes" element = {<ManageQuizes/>}/>
                    }
                    {user && user.admin === 0 && 
                        <Route path="/admin/manageQuizes" element={<Navigate to="/"/>} />
                    }
                    {user && user.admin === 1 && 
                        <Route path="/admin/manageQuizes/:sifKviz" element = {<ManageSpecificQuiz/>}/>
                    }
                    {user && user.admin === 0 && 
                        <Route path="/admin/manageQuizes/:sifKviz" element={<Navigate to="/"/>} />
                    }
                    {user && user.admin === 1 && 
                        <Route path="/admin/pitanja/:sifKviz" element = {<AdminQuestionsPage/>} />
                    }
                    {user && user.admin === 0 && 
                        <Route path="/admin/pitanja/:sifKviz" element={<Navigate to="/"/>} />
                    }
                    {user && user.admin === 1 && 
                        <Route path="/admin/manageQuestion/input/:sifPitanje" element = {<ManageInputQuestion/>} />
                    }
                    {user && user.admin === 0 && 
                        <Route path="/admin/manageQuestion/input/:sifPitanje" element={<Navigate to="/"/>} />
                    }
                    {user && user.admin === 1 && 
                        <Route path="/admin/manageQuestion/multipleChoice/:sifPitanje" element = {<ManageChoiceQuestion/>} />
                    }
                    {user && user.admin === 0 && 
                        <Route path="/admin/manageQuestion/multipleChoice/:sifPitanje" element={<Navigate to="/"/>} />
                    }
                    {user && user.admin === 1 && 
                        <Route path="/admin/manageQuestion/connectPairs/:sifPitanje" element = {<ManagePairQuestion/>} />
                    }
                    {user && user.admin === 0 && 
                        <Route path="/admin/manageQuestion/connectPairs/:sifPitanje" element={<Navigate to="/"/>} />
                    }
                    <Route path="/quiz/:sifKviz" element = {<QuizPage/>} />
                    <Route path="/playQuiz/:sifKviz" element = {<PlayQuiz/>} />
                    <Route path = "/playQuiz/review/:sifKviz" element = {<PlayQuizReview/>} />
                    <Route path ="/category/:sifKategorije" element = {<CategoryPage />} />
                    <Route path ="/admin/kvizovi" element = {<AdminQuizPage />} />
                </Routes>
            </ BrowserRouter>
        </div>
    );
}

export default App;