import React from 'react';
import './UseFrequency.css'

function UseFrequency(props) {
    return (
        <div className='block'>
        <form className='form'> 
            <fieldset className='fieldset'>
                <legend>Fréquences d'utilisation</legend>
                <label>
                    <span>Lave-linge :</span>
                        <span>
                            <input type="number" name="washingMachine"/> / 
                            <select name="frequency" id="frequency" form="frequency">
                                <option value="day">jour</option>
                                <option value="week">semaine</option>
                                <option value="month">mois</option>
                            </select>
                        </span>
                </label>
                <label>
                    <span>Sèche-linge</span>
                    <span>
                        <input type="number" name="clothesDryer"/> / 
                        <select name="frequency" id="frequency" form="frequency">
                            <option value="day">jour</option>
                            <option value="week">semaine</option>
                            <option value="month">mois</option>
                        </select>
                    </span>
                </label>
                <label>
                    <span>Lave-vaisselle</span>
                    <span>
                        <input type="number" name="dishWasher"/> / 
                        <select name="frequency" id="frequency" form="frequency">
                            <option value="day">jour</option>
                            <option value="week">semaine</option>
                            <option value="month">mois</option>
                        </select>
                    </span>
                </label>
                <label>
                    <span>Four :</span>
                    <span>
                        <input type="number" name="oven"/> / 
                        <select name="frequency" id="frequency" form="frequency">
                            <option value="day">jour</option>
                            <option value="week">semaine</option>
                            <option value="month">mois</option>
                        </select>
                    </span>
                </label>
                <label>
                    <span>Plaques de cuisson :</span>
                    <span>
                        <input type="number" name="hotplates"/> / 
                        <select name="frequency" id="frequency" form="frequency">
                            <option value="day">jour</option>
                            <option value="week">semaine</option>
                            <option value="month">mois</option>
                        </select>
                    </span>
                </label>
            </fieldset>
        </form>
    </div>
    );
}

export default UseFrequency;