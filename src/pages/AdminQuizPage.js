import React from "react";
import AdminHeader from "../components/Header/AdminHeader.js";
import axios from 'axios';
import { useState } from 'react';
import CreateQuiz from "./CreateQuiz.js";
import ManageQuizes from "./ManageQuizes.js";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Box } from "@mui/material";

const AdminQuizPage = () => {

    const [data, setDataList] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [value, setValue] = useState('1');

    const handleChangeTab = (e, newValue) => {
        setValue(newValue);
    };

    React.useEffect(() => {
        const getData = async () => {
            let dataa = (
                await axios.get('http://localhost:5000/session', {withCredentials: true})
            ).data;
            //setValue(data[0]);
            setDataList(dataa);
        };
        getData().catch((err) => console.log(err));
    }, [refresh]);

    return(
        <div>
            <AdminHeader />
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChangeTab} aria-label="lab API tabs example">
                            <Tab label="Stvori novi kviz" value="1" style ={{color:"black"}}/>
                            <Tab label="Upravljaj postojećim kvizovima" value="2" style ={{color:"black"}} />
                        </TabList>
                    </Box>
                    
                
                    <TabPanel value="1">
                        <CreateQuiz/>
                    </TabPanel>
                    <TabPanel value = "2">
                        <ManageQuizes/> 
                    </TabPanel>
                </TabContext>
            </Box>
        </div>
    );
};

export default AdminQuizPage;