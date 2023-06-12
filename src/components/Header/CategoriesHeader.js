import React from "react";
import { useNavigate, Link } from "react-router-dom";
// importing material UI components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import useSession from "../../hooks/useSession";
import { Box, Menu, MenuItem , List, ListItemButton, ListItemText, Drawer} from "@mui/material";
import axios from 'axios';
import { useState } from 'react';



export default function CategoriesHeader() {
    const navigateTo = useNavigate();
    var session = false;
    const [data, setDataList] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [uloga, setUloga] = useState('');
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [kategorije, setKategorije] = useState(null);
   


    const userOptions = [
        {
            label: 'Profil',
            onClick: () => navigateTo('/profile'),
        },
        {
            label: 'Odjava',
            onClick: () => handleLogout(),
        },
    ];

    const anonOptions = [
        {
            label: 'Prijava',
            onClick: () => navigateTo('/login'),
        },
        {
            label: 'Registracija',
            onClick: () => navigateTo('/register'),
        },
    ];

    const adminOptions = [
        {
            label: 'Profil',
            onClick: () => navigateTo('/profile'),
        },
        {
            label: 'Odjava',
            onClick: () => navigateTo('/logout'),
        },
        {
            label: 'Admin',
            onClick: () => navigateTo('/admin'),
        },
    ];

    let currentOptions = anonOptions;
    if(data){
        if(uloga == 'Admin') {
            currentOptions = adminOptions;
        }
        else {
            currentOptions = userOptions;
        }
    } 
    else {
        currentOptions = anonOptions;
    }

    const handleLogout = async () => {
        try {
            await axios.get(process.env.REACT_APP_BASE_URL +`/logout`, { withCredentials: true });
            navigateTo('/');
        } catch (error) {
            console.error(error);
        }
    };

    const handleUloga = (e) => {
        if(data.admin == 1) {
            setUloga('Admin');
        } else{
            setUloga('Korisnik');
        }
    };


    React.useEffect(() => {
        const getData = async () => {
            let dataa = (
                await axios.get(process.env.REACT_APP_BASE_URL +'/session', {withCredentials: true})
            ).data;
            //setValue(data[0]);
            setDataList(dataa);
            handleUloga();
        };
        const getKategorije = async () => {
            let dataa = (
                await axios.get(process.env.REACT_APP_BASE_URL +'/admin/getCategories')
            ).data;
            //setValue(data[0]);
            setKategorije(dataa);
        };
        getKategorije().catch((err) => console.log(err));
        getData().catch((err) => console.log(err));
    }, [refresh]);


    return (
        <AppBar position="static">
            <Toolbar>
                {/*Inside the IconButton, we 
           can render various icons*/}
                <IconButton onClick={() => setDrawerOpen((prev) => !prev)}>
                    <MenuIcon sx={{ fontSize: 40 }} />
                </IconButton>
                <Drawer
                    sx={{ flexShrink: 0, zIndex: "800" }}
                    open={drawerOpen}
                    anchor="left"
                    onClose={() => setDrawerOpen(false)}
                >
                    <>
                        <Toolbar />
                        <List sx={{ width: { xs: "25vw", sm: "15vw" } }}>
                            {kategorije && kategorije.map((drawer, index) => {
                                return (
                                    <div key={index}>
                                        <ListItemButton key={index} onClick ={function(){navigateTo('/category/' + drawer.sifKategorije);}}>
                                            <ListItemText
                                                sx={{ color: "blue" }}
                                                primary={drawer.nazivKategorije}
                                            />
                                        </ListItemButton>
                                    </div>
                                );
                            })}
                        </List>
                    </>
                </Drawer>
                {/* The Typography component applies 
           default font weights and sizes */}

                <Typography variant="h6"
                    component="div" sx={{ flexGrow: 1 }}>
                    <Button color="inherit" onClick={function(){navigateTo('/');}}>Kvisko </Button>
                </Typography>
                <Box flexGrow='1'></Box>
                {data &&
                    <Typography>Pozdrav, {data.username}</Typography>
                }
                {data && data.admin == 1 &&
                    <Button color="inherit" onClick={adminOptions[2].onClick}>{adminOptions[2].label} </Button>
                }
                <Button color="inherit" onClick={currentOptions[0].onClick}>{currentOptions[0].label} </Button>
                <Button color="inherit" onClick={currentOptions[1].onClick}>{currentOptions[1].label}</Button>
            </Toolbar>
        </AppBar>
    );
}