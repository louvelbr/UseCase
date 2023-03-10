import React, { useState } from 'react';
import './HomeComposition.css'

function HomeComposition({tab_infos_user, set_tab_infos_user, tab_infos_user_optimisation, set_tab_infos_user_optimisation, repere, setRepere}) {
    const[nbRange, setNbRange] = useState(1);
    const handleChange = async (e) => {
        let name = e.target.name;
		let value = e.target.value;
        let className = e.target.className;
        console.log("name = ", name);
        console.log("value = ", value);
        console.log("className = ", className);
        if (className === 'prediction'){
            tab_infos_user[name] = value;
        }else if (className === 'optimisation'){
            if (value === "on") {
                tab_infos_user_optimisation[name] = true;
            }else if(value === "off") {
                tab_infos_user_optimisation[name] = false;
            }else if ((name != "range1-begin") && (name != "range1-end") && (name != "range2-begin")&& (name != "range2-end") && (name != "range3-begin")&& (name != "range3-end") && (name != "range4-begin")&& (name != "range4-end") && (name != "range")){
                tab_infos_user_optimisation[name] = value;
            }
            switch (name) {
                case "range1-begin": 
                    tab_infos_user_optimisation["range1"]["begin"] = parseInt(value.split(":")[0]); 
                    break;
                case "range1-end": 
                    tab_infos_user_optimisation["range1"]["end"] = parseInt(value.split(":")[0]); 
                    break;
                case "range2-begin": 
                    if(!tab_infos_user_optimisation["range2"]){
                        tab_infos_user_optimisation["range2"] = {}
                    }
                    tab_infos_user_optimisation["range2"]["begin"] = parseInt(value.split(":")[0]); 
                    break;
                case "range2-end": 
                    if(!tab_infos_user_optimisation["range2"]){
                        tab_infos_user_optimisation["range2"] = {}
                    }
                    tab_infos_user_optimisation["range2"]["end"] = parseInt(value.split(":")[0]); 
                    break;
                case "range3-begin": 
                    if(!tab_infos_user_optimisation["range3"]){
                        tab_infos_user_optimisation["range3"] = {}
                    }
                    tab_infos_user_optimisation["range3"]["begin"] = parseInt(value.split(":")[0]); 
                    break;
                case "range3-end": 
                    if(!tab_infos_user_optimisation["range3"]){
                        tab_infos_user_optimisation["range3"] = {}
                    }
                    tab_infos_user_optimisation["range3"]["end"] = parseInt(value.split(":")[0]); 
                    break;
                case "range4-begin": 
                    if(!tab_infos_user_optimisation["range4"]){
                        tab_infos_user_optimisation["range4"] = {}
                    }
                    tab_infos_user_optimisation["range4"]["begin"] = parseInt(value.split(":")[0]); 
                    break;
                case "range4-end": 
                    if(!tab_infos_user_optimisation["range4"]){
                        tab_infos_user_optimisation["range4"] = {}
                    }
                    tab_infos_user_optimisation["range4"]["end"] = parseInt(value.split(":")[0]); 
                    break;
                }
        }else if (name != "homeType"){
            tab_infos_user[name] = value;
            tab_infos_user_optimisation[name] = value;
        }

        console.log("tab_infos_user  =  ",tab_infos_user)
        console.log("tab_infos_user_optimisation  =  ",tab_infos_user_optimisation)
	}

    const handleOnChangeSelectRange = async (e) => {
        let value = e.target.value;
        setNbRange(value);
    }

    const handleOnChangeSelectHomeType= async (e) => {
        let value = e.target.value;
        set_tab_infos_user(tab => ({...tab, "type_habitation": value}));
        set_tab_infos_user_optimisation(tab => ({...tab, "type": value}));
    }

    const handleOnChangeSelectSurfaceNbPeople= async (e) => {
       let value = e.target.value;
       let surface = parseInt(value.split(" ")[0].split("m??")[0]);
       set_tab_infos_user(tab => ({...tab, "surface": surface}));
       set_tab_infos_user_optimisation(tab => ({...tab, "size": surface}));

       let nbPeople = parseInt(value.split(" ")[2]);
       set_tab_infos_user(tab => ({...tab, "habitants": nbPeople}))
       set_tab_infos_user_optimisation(tab => ({...tab, "nbPeople": nbPeople}))
    
    }

    const handleOnChangeSelectTime = async (e) => {
        let value = e.target.value;
        set_tab_infos_user(tab => ({...tab, "debut_plage_horaire": value}))
    }

    const handleOnChangeRepere= async (e) => {
        let value = e.target.value;
        setRepere(value);
    }
    
    return (
        <div className='block'>
            <form className='form'> 
                <fieldset className='fieldset' onChange={handleChange}>
                    <legend>Composition Habitation</legend>
                    <label>
                        <span>Choisissez votre type d'habitation : </span>
                        <select className='prediction_optimisation' name="type_habitation" id="homeType" form="homeType" onChange={handleOnChangeSelectHomeType}>
                            <option value="Maison" name="type_habitation">Maison</option>
                            <option value="Appartement" name="type_habitation">Appartement</option>
                        </select>
                        {tab_infos_user["type_habitation"] === "Maison"?(
                            <select className='prediction_optimisation' name="homeType"  id="homeType" form="homeType" onChange={handleOnChangeSelectSurfaceNbPeople}>
                                <option value="50m?? - 2 personnes">50m?? - 2 personnes</option>
                                <option value="65m?? - 3 personnes">65m?? - 3 personnes</option>
                                <option value="80m?? - 2 personnes">80m?? - 2 personnes</option>
                                <option value="85m?? - 3 personnes">85m?? - 3 personnes</option>
                                <option value="90m?? - 4 personnes">90m?? - 4 personnes</option>
                                <option value="100m?? - 3 personnes">100m?? - 3 personnes</option>
                                <option value="110m?? - 4 personnes">110m?? - 4 personnes</option>
                                <option value="120m?? - 5 personnes">120m?? - 5 personnes</option>
                                <option value="135m?? - 3 personnes">135m?? - 3 personnes</option>
                                <option value="140m?? - 5 personnes">140m?? - 5 personnes</option>
                                <option value="150m?? - 4 personnes">150m?? - 4 personnes</option>
                                <option value="160m?? - 5 personnes">160m?? - 5 personnes</option>
                                <option value="170m?? - 6 personnes">170m?? - 6 personnes</option>
                                <option value="180m?? - 5 personnes">180m?? - 5 personnes</option>
                                <option value="200m?? - 6 personnes">200m?? - 6 personnes</option>
                                <option value="250m?? - 5 personnes">250m?? - 5 personnes</option>
                            </select>
                            ):(
                            <select className='prediction_optimisation' name="homeType" id="homeType" form="homeType" onChange={handleOnChangeSelectSurfaceNbPeople}>
                                <option value="15m?? - 1 personnes">15m?? - 1 personnes</option>
                                <option value="25m?? - 1 personnes">25m?? - 1 personnes</option>
                                <option value="30m?? - 2 personnes">30m?? - 2 personnes</option>
                                <option value="50m?? - 2 personnes">50m?? - 2 personnes</option>
                                <option value="50m?? - 3 personnes">50m?? - 3 personnes</option>
                                <option value="100m?? - 3 personnes">100m?? - 3 personnes</option>
                                <option value="110m?? - 5 personnes">110m?? - 5 personnes</option>
                                <option value="120m?? - 4 personnes">120m?? - 4 personnes</option>
                                <option value="130m?? - 4 personnes">130m?? - 4 personnes</option>
                                <option value="150m?? - 6 personnes">150m?? - 6 personnes</option>
                            </select>
                         )
                        }
                        <span>Rep??re sur le r??seau :</span>
                        <input type="number" name="repere" className='repere' placeholder='000' onChange={handleOnChangeRepere}/> 
                    </label>
                    <label>
                        <span>Equipements :</span>
                        <span>
                            <input type="checkbox" name="washingMachine" className='optimisation'/> Lave-Linge
                            <input type="checkbox" name="clothesDryer" className='optimisation'/> S??che-Linge
                            <input type="checkbox" name="dishWasher" className='optimisation'/> Lave-Vaisselle
                            <input type="checkbox" name="fridge1" className='optimisation'/> R??frig??rateur
                            <input type="checkbox" name="fridge2" className='optimisation'/> Deuxi??me R??frig??rateur
                            <input type="checkbox" name="waterHeater1" className='optimisation'/> Chauffe-eau
                            <input type="checkbox" name="waterHeater2" className='optimisation'/> Deuxi??me Chauffe-eau
                            <input type="checkbox" name="freezer" className='optimisation'/> Cong??lateur
                            <input type="checkbox" name="oven" className='optimisation'/> Four
                            <input type="checkbox" name="hotplates" className='optimisation'/> Plaques de Cuisson (??lectriques)
                            <input type="checkbox" name="TV" className='optimisation'/> T??l??vision
                        </span>
                    </label>
                    <label>
                        <span>Heures creuses :</span>
                        <span>Combien de plages d'heures creuses avez-vous ?</span>
                        <select className='optimisation' name="range" id="range" form="range" onChange={handleOnChangeSelectRange}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>
                        <span>Entrez vos plages horaires: </span>
                        <span className='displayRange'>
                            <span>De <input className='optimisation' type="time" name="range1-begin"/> ?? <input className='optimisation' type="time" name="range1-end"/></span>
                            {nbRange >= 2 ? ( 
                                <span>De <input className='optimisation' type="time" name="range2-begin"/> ?? <input className='optimisation' type="time" name="range2-end"/></span>
                             ):(
                                <span></span>
                             )
                            }
                            {nbRange >= 3 ? ( 
                                <span>De <input className='optimisation' type="time" name="range3-begin"/> ?? <input className='optimisation' type="time" name="range3-end"/></span>
                             ):(
                                <span></span>
                             )
                            }
                            {nbRange >= 4 ? ( 
                                <span>De <input className='optimisation' type="time" name="range4-begin"/> ?? <input className='optimisation' type="time" name="range4-end"/></span>
                             ):(
                                <span></span>
                             )
                            }
                           
                           
                        </span>
                    </label>
                    <label>
                        <span>S??lectionnez la plage horaire sur laquelle vous voulez estimer votre consommation :</span>
                        <select className='prediction' name="debut_plage_horaire" id="range" form="range" onChange={handleOnChangeSelectTime}>
                            <option value="conso(kWh)">Toute la journ??e</option>
                            <option value="0:00">0:00</option>
                            <option value="0:30">0:30</option>
                            <option value="1:00">1:00</option>
                            <option value="1:30">1:30</option>
                            <option value="2:00">2:00</option>
                            <option value="2:30">2:30</option>
                            <option value="3:00">3:00</option>
                            <option value="3:30">3:30</option>
                            <option value="4:00">4:00</option>
                            <option value="4:30">4:30</option>
                            <option value="5:00">5:00</option>
                            <option value="5:30">5:30</option>
                            <option value="6:00">6:00</option>
                            <option value="6:30">6:30</option>
                            <option value="7:00">7:00</option>
                            <option value="7:30">7:30</option>
                            <option value="8:00">8:00</option>
                            <option value="8:30">8:30</option>
                            <option value="9:00">9:00</option>
                            <option value="9:30">9:30</option>
                            <option value="10:00">10:00</option>
                            <option value="10:30">10:30</option>
                            <option value="11:00">11:00</option>
                            <option value="11:30">11:30</option>
                            <option value="12:00">12:00</option>
                            <option value="12:30">12:30</option>
                            <option value="13:00">13:00</option>
                            <option value="13:30">13:30</option>
                            <option value="14:00">14:00</option>
                            <option value="14:30">14:30</option>
                            <option value="15:00">15:00</option>
                            <option value="15:30">15:30</option>
                            <option value="16:00">16:00</option>
                            <option value="16:30">16:30</option>
                            <option value="17:00">17:00</option>
                            <option value="17:30">17:30</option>
                            <option value="18:00">18:00</option>
                            <option value="18:30">18:30</option>
                            <option value="19:00">19:00</option>
                            <option value="19:30">19:30</option>
                            <option value="20:00">20:00</option>
                            <option value="20:30">20:30</option>
                            <option value="21:00">21:00</option>
                            <option value="21:30">21:30</option>
                            <option value="22:00">22:00</option>
                            <option value="22:30">22:30</option>
                            <option value="23:00">23:00</option>
                            <option value="23:30">23:30</option>
                        </select>
                    </label>
                </fieldset>
            </form>
        </div>
    );
}

export default HomeComposition;