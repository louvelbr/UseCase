import React from 'react';
import './Predict.css'
import ConsumptionPrediction from '../../components/ConsumptionPrediction/ConsumptionPrediction';
import GlobalConsumption from '../../components/GlobalConsumption/GlobalConsumption';
import UseRange from '../../components/UseRange/UseRange';
import YourConsumption from '../../components/YourConsumption/YourConsumption';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { useLocation } from 'react-router-dom';
function Predict() {
    const location = useLocation(); 
    const tab_infos_user = location.state.tab_infos_user;
    const tab_infos_user_optimisation = location.state.tab_infos_user_optimisation;
    const repere = location.state.repere;
    console.log("tab_infos_user_optimisation  RARARAR =  ",tab_infos_user_optimisation)
    return (
        <div className='App'>
            <Header/>
            <div className='container'>
                <ConsumptionPrediction tab_infos_user={tab_infos_user} repere={repere}></ConsumptionPrediction>
                <UseRange tab_infos_user_optimisation={tab_infos_user_optimisation}/>
                {/* <YourConsumption></YourConsumption> */}
                <GlobalConsumption></GlobalConsumption>
            </div>
            <Footer/>
        </div>
    );
}

export default Predict;