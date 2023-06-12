import React from "react";
import AdminHeader from "../components/Header/AdminHeader.js";
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { Navigate } from "react-router-dom";

const AdminPage = () => {

    const [data, setDataList] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const navigateTo = useNavigate();


    React.useEffect(() => {
        const getData = async () => {
            let dataa = (
                await axios.get(process.env.REACT_APP_BASE_URL +'/session', {withCredentials: true})
            ).data;
            //setValue(data[0]);
            setDataList(dataa);
        };
        getData().catch((err) => console.log(err));
    }, [refresh]);

    //if (data) return <Navigate to='/' />;
    return (
        <div>
            <AdminHeader />
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    p: 1,
                    m: 1,
                    borderRadius: 7,
                    border: '6px solid rgba(255, 165, 0, 0.5)',
                    position: 'absolute', left: '33%', top: '15%',
                    padding: '30px 30px 30px 30px',
                    borderColor: 'orange'
                }}>
                <p style={{ fontSize: '30px' }}> Dobrodošli na admin stranicu!</p>
                <img src={'https://www.koolbadges.co.uk/images/thumbnails/i-love-admin-badges-400x400.jpg'} style={{ height: '300px', width: '300px' }}></img>
                
            </Box>
        </div>
    );
};

export default AdminPage;