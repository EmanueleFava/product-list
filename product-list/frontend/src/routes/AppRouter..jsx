import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/landing-page/LandingPage';
import Login from '../pages/login/Login'
import Prodotti from '../pages/prodotti/Prodotti';
import DettaglioProdotto from '../pages/dettaglio-prodotto/DettaglioProdotto';
import Profilo from '../pages/profilo/Profilo';
import Utenti from '../pages/utenti/Utenti';

function AppRouter() {

    return (
        <Routes>
            <Route  path='/' element={<LandingPage/>}/>
            <Route  path='/login' element={<Login/>}/>
            <Route  path='/prodotti' element={<Prodotti/>}/>
            <Route path='/dettaglio-prodotto' element={<DettaglioProdotto/>}/>
            <Route  path='/profilo' element={<Profilo/>}/>
            <Route  path='/utenti' element={<Utenti/>}/>
        </Routes>
    )


}



export default AppRouter;