import React from "react";
import Login from "../components/Login/Login.js";
import Header from "../components/Header/Header.js";
import axios from 'axios';
import { useState } from 'react';

const LoginPage = () => {

    const [data, setDataList] = useState([]);
    const [refresh, setRefresh] = useState(false);


    React.useEffect(() => {
        const getData = async () => {
            let dataa = (
                await axios.get(process.env.REACT_APP_BASE_URL +'/session')
            ).data;
            //setValue(data[0]);
            setDataList(dataa);
        };
        getData().catch((err) => console.log(err));
    }, [refresh]);

    //if (data) return <Navigate to='/' />;
    return(
        <div>
            <Header />
            <Login />
        </div>
    );
};

export default LoginPage;