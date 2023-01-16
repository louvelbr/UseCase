import React from 'react';
import './Home.css'
import ConsumptionPrediction from '../components/ConsumptionPrediction/ConsumptionPrediction';
import GlobalConsumption from '../components/GlobalConsumption/GlobalConsumption';
import HomeComposition from '../components/HomeComposition/HomeComposition';
import UseFrequency from '../components/UseFrequency/UseFrequency';
import UseRange from '../components/UseRange/UseRange';
import YourConsumption from '../components/YourConsumption/YourConsumption';

function Home() {   
    return (
        <div className='container'>
            <HomeComposition></HomeComposition>
            <UseFrequency></UseFrequency>
            <ConsumptionPrediction></ConsumptionPrediction>
            <UseRange></UseRange>
            <YourConsumption></YourConsumption>
            <GlobalConsumption></GlobalConsumption>
        </div>
    ); 
}

export default Home;