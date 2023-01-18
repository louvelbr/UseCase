import React, { useState } from 'react';
import './Home.css'
import HomeComposition from '../../components/HomeComposition/HomeComposition';
import UseFrequency from '../../components/UseFrequency/UseFrequency';
import { Link, useLocation } from 'react-router-dom';

function Home() {   
    const location = useLocation();
    const [tab_infos_user, setTab_infos_user] = useState([]);
    return (
        <div className='container'>
            <HomeComposition tab_infos_user={tab_infos_user}></HomeComposition>
            <UseFrequency></UseFrequency>
            <Link to='/results' state={{tab_infos_user: tab_infos_user}}>
                    <button className='btn-next'>Predict</button>
            </Link>
        </div>
    ); 
}

export default Home; 