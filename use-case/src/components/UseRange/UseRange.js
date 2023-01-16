import React, { useState } from 'react';
import './UseRange.css'
function UseRange(props) {
    const[answer, setAnswer] = useState("Oui")
    const handleOnChange = async (e) => {
		let value = e.target.value;
		if (value === "Oui" ) {
			setAnswer("Oui")
		} else {
			setAnswer("Non")
		}
	  }
    return (
        <div className='block'>
            <fieldset className='fieldset'>
                <legend>Plage d'utilisation proposée</legend>
                <div>
                    <span>Four : </span>
                    <span>12h - 16h</span>
                </div>
                <div>
                    <span>Lave-linge : </span>
                    <span>12h - 16h</span>
                </div>
                <div onChange={handleOnChange}>
                    <span className='radioBtns'>Cela vous convient-il ?  
                        <input className='radioBtn' type="radio" name="yes" value="Oui" checked={answer === "Oui"}/> Oui 
                        <input className='radioBtn' type="radio" name="no" value="Non" checked={answer === "Non"}/> Non 
                    </span>
                    {answer === "Non"?(
                        <div>Voulez-vous une proposition différente ? <input type="button" value="Nouvelle proposition"/></div> 
                        ):(<span></span>)
                    }
                </div>
              
            </fieldset>
        </div>
    );
}

export default UseRange;