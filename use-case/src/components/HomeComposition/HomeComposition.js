import React, { useState } from 'react';
import './HomeComposition.css'

function HomeComposition(props) {
    const[nbRange, setNbRange] = useState(1)
   var tab_infos_user =  {
        size: 0,
        nbPeople: 0,
        washingMashine: false,
        clothesDryer: false,
        dishWasher: false,
        fridge: false,
        freezer: false,
        oven: false,
        hotplates: false,
        range1: {
            begin: 0,
            end: 0},
    }

    const handleChange = async (e) => {
        let name = e.target.name;
		let value = e.target.value;
        if (value === "on") {
            tab_infos_user[name] = true;
        }else if(value === "off") {
            tab_infos_user[name] = false;
        }else if ((name != "range1-begin") && (name != "range1-end") && (name != "range2-begin")&& (name != "range2-end") && (name != "range3-begin")&& (name != "range3-end") && (name != "range4-begin")&& (name != "range4-end")){
            tab_infos_user[name] = value;
        }
        switch (name) {
            case "range1-begin": 
                tab_infos_user["range1"]["begin"] = parseInt(value.split(":")[0]); 
                break;
            case "range1-end": 
                tab_infos_user["range1"]["end"] = parseInt(value.split(":")[0]); 
                break;
            case "range2-begin": 
                if(!tab_infos_user["range2"]){
                    tab_infos_user["range2"] = {}
                }
                tab_infos_user["range2"]["begin"] = parseInt(value.split(":")[0]); 
                break;
            case "range2-end": 
                if(!tab_infos_user["range2"]){
                    tab_infos_user["range2"] = {}
                }
                tab_infos_user["range2"]["end"] = parseInt(value.split(":")[0]); 
                break;
            case "range3-begin": 
                if(!tab_infos_user["range3"]){
                    tab_infos_user["range3"] = {}
                }
                tab_infos_user["range3"]["begin"] = parseInt(value.split(":")[0]); 
                break;
            case "range3-end": 
                if(!tab_infos_user["range3"]){
                    tab_infos_user["range3"] = {}
                }
                tab_infos_user["range3"]["end"] = parseInt(value.split(":")[0]); 
                break;
            case "range4-begin": 
                if(!tab_infos_user["range4"]){
                    tab_infos_user["range4"] = {}
                }
                tab_infos_user["range4"]["begin"] = parseInt(value.split(":")[0]); 
                break;
            case "range4-end": 
                if(!tab_infos_user["range4"]){
                    tab_infos_user["range4"] = {}
                }
                tab_infos_user["range4"]["end"] = parseInt(value.split(":")[0]); 
                break;
        }
        console.log("youyoyu  =  ",tab_infos_user)
	}

    const handleOnChangeSelectRange = async (e) => {
        let value = e.target.value;
        setNbRange(value);
    }
    
    return (
        <div className='block'>
            <form className='form'> 
                <fieldset className='fieldset' onChange={handleChange}>
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
                        <span>Combien de plages horaires avez-vous ?</span>
                        <select name="range" id="range" form="range" onChange={handleOnChangeSelectRange}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>
                        <span>Entrez vos plages horaires: </span>
                        <span className='displayRange'>
                            <span>De <input className='inputTime' type="time" name="range1-begin"/> à <input className='inputTime' type="time" name="range1-end"/></span>
                            {nbRange >= 2 ? ( 
                                <span>De <input className='inputTime' type="time" name="range2-begin"/> à <input className='inputTime' type="time" name="range2-end"/></span>
                             ):(
                                <span></span>
                             )
                            }
                            {nbRange >= 3 ? ( 
                                <span>De <input className='inputTime' type="time" name="range3-begin"/> à <input className='inputTime' type="time" name="range3-end"/></span>
                             ):(
                                <span></span>
                             )
                            }
                            {nbRange >= 4 ? ( 
                                <span>De <input className='inputTime' type="time" name="range4-begin"/> à <input className='inputTime' type="time" name="range4-end"/></span>
                             ):(
                                <span></span>
                             )
                            }
                           
                           
                        </span>
                    </label>
                </fieldset>
            </form>
        </div>
    );
}

export default HomeComposition;