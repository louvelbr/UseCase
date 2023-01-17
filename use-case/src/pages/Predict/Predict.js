import React from 'react';
import './Predict.css'
import ConsumptionPrediction from '../../components/ConsumptionPrediction/ConsumptionPrediction';
import GlobalConsumption from '../../components/GlobalConsumption/GlobalConsumption';
import UseRange from '../../components/UseRange/UseRange';
import YourConsumption from '../../components/YourConsumption/YourConsumption';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
function Predict(props) {
    return (
        <div className='App'>
            <Header/>
            <div className='container'>
                <ConsumptionPrediction></ConsumptionPrediction>
                <UseRange></UseRange>
                <YourConsumption></YourConsumption>
                <GlobalConsumption></GlobalConsumption>
            </div>
            <Footer/>
        </div>
    );
}

export default Predict;