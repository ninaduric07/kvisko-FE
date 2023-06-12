import React from "react";
import Register from "../components/Register/Register.js";
import Header from "../components/Header/Header.js";
import axios from 'axios';
import { useState } from 'react';

const RegisterPage = () => {

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
            <Register />
        </div>
    );
};

export default RegisterPage;