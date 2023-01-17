import React from 'react';
import './GlobalConsumption.css'
function GlobalConsumption(props) {
    return (
        <div>
            <fieldset className='fieldset'>
                <legend>Consommation globale</legend>
                <span>11111 kw/h</span>
                <span>Vous êtes dans la moyenne haute/basse</span>
            </fieldset>
        </div>
    );
}

export default GlobalConsumption;