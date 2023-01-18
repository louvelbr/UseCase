import React, { useEffect, useState } from 'react';
import './ConsumptionPrediction.css';
import Loading from '../Loading/Loading'
import { handleResponse } from '../../helpers';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function ConsumptionPrediction() {
    const location = useLocation();
    const tab_infos_user = location.state.tab_infos_user;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    //const tab = { "type_habitation": "M", "surface": 110, "habitants": 4, "debut_plage_horaire": "0:00"}
    const [prediction, setPrediction] = useState({})
    //const axios = require("axios")
    useEffect(() => {
        axios.post('http://127.0.0.1:8000/prediction_consommation', tab_infos_user)
        .then(function (response) {
            setPrediction(response.data)
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
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

    // if (loading) {
    //     return <div className="loading-container"><Loading /></div>
    // }
    // if (error) {
    //     return <div className="error">{error}</div>
    // }

    
        
        // const handleResponse = (response) => {
        //     console.log("ekekekek222", response);
        //     return response.json().then(json => {
        //         console.log("ekekekek333", json);
        //         console.log("ekekekek444", response.ok);
        //         return response.ok ? json : Promise.reject(json);
        //     });
        // }

        
    return (
        <div className='block'>
            <fieldset className='fieldset'>
                <legend>Prédiction de consommation</legend>
                {console.log("yoyuoyuy , ", prediction['prediction_conso'])}
                <span>Votre consommation : {prediction['prediction_conso']} {prediction['unité']}</span>
                <span></span>
            </fieldset>
        </div>
    );
}

export default ConsumptionPrediction;