import React from "react";
import AdminHeader from "../components/Header/AdminHeader.js";
import axios from 'axios';
import { useState } from 'react';
import Categories from "../components/Admin/Categories.js";

const ManageCategories = () => {

    const [data, setDataList] = useState([]);
    const [refresh, setRefresh] = useState(false);


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

    return(
        <div>
            <AdminHeader />
            <Categories/>
        </div>
    );
};

export default ManageCategories;