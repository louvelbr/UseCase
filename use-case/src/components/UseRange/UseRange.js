import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { CsvToHtmlTable } from 'react-csv-to-table';
import csvFile from '../../A100-3-1.csv';
import Papa from 'papaparse';
import './UseRange.css'
// affiche le planning d'utilisation des équipements (algo de thomas sur la matrice de jenna)
function UseRange({tab_infos_user_optimisation}) {
    const[answer, setAnswer] = useState("Oui")
    const[optim, setOptim] = useState("hello")
    console.log("csvFiel = ", csvFile)
    console.log("tab_infos_user_optimisation = ", tab_infos_user_optimisation)
    var tab_test = {size: 0,
    nbPeople: 0,
    washingMachine: false,
    clothesDryer: false,
    dishWasher: false,
    fridge1: false,
    waterHeater1: false,
    freezer: false,
    oven: false,
    hotplates: false,
    range1: {
        begin: 0,
        end: 0}}
    console.log("tab_test = ", tab_test)

    useEffect(() => {
        axios.post('http://127.0.0.1:8000/optimisation_consommation', tab_infos_user_optimisation)
        .then(function (response) {
            setOptim(response.data);
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }, []);

     // State to store parsed data
  const [parsedCsvData, setParsedData] = useState([]);

  //State to store table Column name
  const [tableRows, setTableRows] = useState([]);

  //State to store the values
  const [values, setValues] = useState([]);
  useEffect(() => {
    Papa.parse(csvFile, {
        download: true,
        header : true,
        complete: function (results) {
            const rowsArray = [];
            const valuesArray = [];
    
            // Iterating data to get column name and their values
            results.data.map((d) => {
              rowsArray.push(Object.keys(d));
              valuesArray.push(Object.values(d));
            });
    
            // Parsed Data Response in array format
            setParsedData(results.data);
    
            // Filtered Column Names
            setTableRows(rowsArray[0]);
    
            // Filtered Values
            setValues(valuesArray);
       }})
    }, []);

    console.log("parsedData = ", parsedCsvData)
    console.log("tablerows = ", tableRows)
    console.log("values = ", values)

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
                <table className="ArchiveTable">
                <thead>
                <tr >
                    <th>{"Equipement"}</th>
                {parsedCsvData &&
                        tableRows.map((rows, index) => (
                         <th key={index}>{index != 24 ? rows: ""}</th>
                ))}
                </tr>
                </thead>
                <tbody>
                    {parsedCsvData &&
                        parsedCsvData.map((parsedData, index) => (
                            <tr key={index}>
                                <td>{parsedData[""]}</td>
                                <td>{parsedData[0] != 0.0? "X": "-"}</td>
                                <td>{parsedData[1] != 0.0? "X": "-"}</td>
                                <td>{parsedData[2] != 0.0? "X": "-"}</td>
                                <td>{parsedData[3] != 0.0? "X": "-"}</td>
                                <td>{parsedData[4] != 0.0? "X": "-"}</td>
                                <td>{parsedData[5] != 0.0? "X": "-"}</td>
                                <td>{parsedData[6] != 0.0? "X": "-"}</td>
                                <td>{parsedData[7] != 0.0? "X": "-"}</td>
                                <td>{parsedData[8] != 0.0? "X": "-"}</td>
                                <td>{parsedData[9] != 0.0? "X": "-"}</td>
                                <td>{parsedData[10] != 0.0? "X": "-"}</td>
                                <td>{parsedData[11] != 0.0? "X": "-"}</td>
                                <td>{parsedData[12] != 0.0? "X": "-"}</td>
                                <td>{parsedData[13] != 0.0? "X": "-"}</td>
                                <td>{parsedData[14] != 0.0? "X": "-"}</td>
                                <td>{parsedData[15] != 0.0? "X": "-"}</td>
                                <td>{parsedData[16] != 0.0? "X": "-"}</td>
                                <td>{parsedData[17] != 0.0? "X": "-"}</td>
                                <td>{parsedData[18] != 0.0? "X": "-"}</td>
                                <td>{parsedData[19] != 0.0? "X": "-"}</td>
                                <td>{parsedData[20] != 0.0? "X": "-"}</td>
                                <td>{parsedData[21] != 0.0? "X": "-"}</td>
                                <td>{parsedData[22] != 0.0? "X": "-"}</td>
                                <td>{parsedData[23] != 0.0? "X": "-"}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        
                <div className='proposition' onChange={handleOnChange}>
                    <span className='radioBtns'>Cela vous convient-il ?  
                        <input className='radioBtn' type="radio" name="yes" value="Oui" checked={answer === "Oui"}/> Oui 
                        <input className='radioBtn' type="radio" name="no" value="Non" checked={answer === "Non"}/> Non 
                    </span>
                    {answer === "Non"?(
                        <div>Voulez-vous une proposition différente ? <input className="newProposition" type="button" value="Nouvelle proposition"/></div> 
                        ):(<span></span>)
                    }
                </div>
              
            </fieldset>
        </div>
    );
}

export default UseRange;