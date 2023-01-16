import React from 'react';
import './HomeComposition.css'

function HomeComposition(props) {
    return (
        <div className='block'>
            <form className='form'> 
                <fieldset className='fieldset'>
                    <legend>Composition Habitation</legend>
                    <label>
                        <span>Taille (m²):</span>
                        <input type="number" name="size"/>
                    </label>
                    <label>
                        <span>Nombre de personnes dans l'habitation :</span>
                        <input type="number" name="nbPeople"/>
                    </label>
                    <label>
                        <span>Equipements :</span>
                        <span>
                            <input type="checkbox" name="washingMachine"/> Lave-Linge
                            <input type="checkbox" name="clothesDryer"/> Sèche-Linge
                            <input type="checkbox" name="dishWasher"/> Lave-Vaisselle
                            <input type="checkbox" name="fridge"/> Réfrigérateur
                            <input type="checkbox" name="freezer"/> Congélateur
                            <input type="checkbox" name="oven"/> Four
                            <input type="checkbox" name="hotplates"/> Plaques de Cuisson (électriques)
                        </span>
                    </label>
                    <label>
                        <span>Heures creuses :</span>
                        <span>
                            de <input className='inputTime' type="time" name="firstDayTime"/> à <input className='inputTime' type="time" name="secondDayTime"/>  
                            &
                            de <input className='inputTime' type="time" name="firstNightTime"/> à <input className='inputTime' type="time" name="secondNightTime"/>
                        </span>
                    </label>
                </fieldset>
            </form>
        </div>
    );
}

export default HomeComposition;