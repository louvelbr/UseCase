import React, { useState } from 'react';
import './Home.css'
import HomeComposition from '../../components/HomeComposition/HomeComposition';
import UseFrequency from '../../components/UseFrequency/UseFrequency';
import { Link, useLocation } from 'react-router-dom';
import * as graph from '../../graphe_mathis.json'
import Plot from 'react-plotly.js';

function Home() {   
    const[tab_infos_user, set_tab_infos_user] = useState({
        "type_habitation": "Maison",
        "surface": 0,
        "habitants": 0,
        "debut_plage_horaire": "0:00"
    });

    const[tab_infos_user_optimisation , set_tab_infos_user_optimisation ] = useState({
        type: "Maison",
        size: 0,
        nbPeople: 0,
        washingMachine: false,
        clothesDryer: false,
        dishWasher: false,
        fridge1: false,
        waterHeater1: false,
        freezer: false,
        oven: false,
        hotplates: false,
        TV: false,
        range1: {
            begin: 0,
            end: 0}
    });
    return (
        <div className='container'>
            <HomeComposition tab_infos_user={tab_infos_user} set_tab_infos_user={set_tab_infos_user} tab_infos_user_optimisation={tab_infos_user_optimisation} set_tab_infos_user_optimisation={set_tab_infos_user_optimisation}></HomeComposition>
            {/* <UseFrequency></UseFrequency> */}
            <Plot data={graph} layout={ {title: 'Consommation globale par heure', plot_bgcolor: "transparent", paper_bgcolor:"transparent", font: {color: "#fff", size: 14}} }/>
            <Link to='/results' state={{tab_infos_user: tab_infos_user, tab_infos_user_optimisation: tab_infos_user_optimisation}}>
                    <button className='btn-next'>Predict</button>
            </Link>
        </div>
    ); 
}

export default Home; 