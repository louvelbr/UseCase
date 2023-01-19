import React, { useEffect, useState } from 'react';
import './ConsumptionPrediction.css';
import Loading from '../Loading/Loading'
import { handleResponse } from '../../helpers';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Plot from 'react-plotly.js';
import * as graph from '../../graphe_emmy.json';
import * as graph2 from '../../graphe_math2.json';

function ConsumptionPrediction() {
    const location = useLocation();
    const tab_infos_user = location.state.tab_infos_user;
    const repere = location.state.repere;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    //const tab = { "type_habitation": "M", "surface": 110, "habitants": 4, "debut_plage_horaire": "0:00"}
    const [prediction, setPrediction] = useState({})
    //const axios = require("axios")
    console.log("659 = ", repere)
    console.log(parseInt(repere) === parseInt(659))
    console.log("tab_infos_user = ", tab_infos_user)
    useEffect(() => {
        if (parseInt(repere) === parseInt(659)){
            axios.post('http://127.0.0.1:8000/prediction_consommation_id', tab_infos_user)
            .then(function (response) {
                setPrediction(response.data)
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
        }else{
            axios.post('http://127.0.0.1:8000/prediction_consommation_type', tab_infos_user)
            .then(function (response) {
                setPrediction(response.data)
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
        }
    }, []);

    // const test = {
    //     "type_habitation": "M",
    //     "surface": 110,
    //     "habitants": 4,
    //     "debut_plage_horaire": "0:00"
    //   }
    // const [myInit, setMyInit] = useState(
    //     {   method: 'POST',
    //         headers: [
    //             ["Content-Type", "application/json"],
    //             ["Content-Type", "text/plain"],
    //             ["Access-Control-Allow-Origin", "*"]
    //             ],
    //         mode: 'no-cors',
    //         cache: 'default',
    //         body: JSON.stringify(test),
    //     });
   

    // useEffect(() => {
    //     fetch(`http://127.0.0.1:8000/prediction_consommation`, myInit)
    //         .then((res) => { return res; })
    //         .then(handleResponse)
    //         .then((data) => {
    //             const beers  = JSON.parse(data.prediction);
    //             setBeers(beers);
    //             // setLoading(false);
    //         })
    //         .catch((error) => {
    //             setError(error.errorMessage);
    //             // setLoading(false);
    //         })
    //         .finally(() => {
    //             setLoading(false);
    //         })
    // }, [myInit]);

    if (loading) {
        return <div className="loading-container"><Loading /></div>
    }
    // if (error) {
    //     return <div className="error">{error}</div>
    // }

    
        
    //  var data = JSON.parse(prediction.graphique)
    //  Plotly.react('graph', data);
        
    return (
        <div className='block'>
            <fieldset className='fieldset'>
                <legend>Prédiction de consommation</legend>       
                {parseInt(repere) === parseInt(659) ? 
                    <div className='graph'>
                        <Plot data={graph} layout={ {title: "Consommation d'énergie de la semaine passée", plot_bgcolor: "transparent", paper_bgcolor:"transparent", font: {color: "#fff", size: 14}} }/>
                        <Plot data={graph2} layout={ {title: 'Prédiction de la consommation électrique du logement', plot_bgcolor: "transparent", paper_bgcolor:"transparent", font: {color: "#fff", size: 14}} }/>
                    </div>
                    : ""
                }
                {console.log("yoyuoyuy , ", prediction['prediction_conso'])}
                <span>Votre consommation : {prediction['prediction_conso']} {prediction['unité']}</span>
                <span></span>
            </fieldset>
        </div>
    );
}

export default ConsumptionPrediction;