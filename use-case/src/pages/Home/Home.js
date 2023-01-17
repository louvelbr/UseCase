import React from 'react';
import './Home.css'
import HomeComposition from '../../components/HomeComposition/HomeComposition';
import UseFrequency from '../../components/UseFrequency/UseFrequency';
import { Link } from 'react-router-dom';

function Home() {   
    return (
        <div className='container'>
            <HomeComposition></HomeComposition>
            <UseFrequency></UseFrequency>
            <Link to='/results' >
                    <button className='btn-next'>Predict</button>
            </Link>
        </div>
    ); 
}

export default Home; 