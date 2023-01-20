import React from 'react';
import './GlobalConsumption.css';
import * as graph from '../../data_opti/graphe.json';
import Plot from 'react-plotly.js';
// graph par heure des consos de jenna
function GlobalConsumption(props) {
    return (
        <div className='globalConsumption'>
            <fieldset className='fieldset'>
            <legend className='titleGlobalConsumption'>Consommation globale par heure</legend>
                <Plot data={graph} layout={ {title: 'Consommation globale par heure', plot_bgcolor: "transparent", paper_bgcolor:"transparent", font: {color: "#fff", size: 14}} }/>
            </fieldset>
        </div>
    );
}

export default GlobalConsumption; 