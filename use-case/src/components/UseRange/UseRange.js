import axios from 'axios';
import React, { useEffect, useState } from 'react';
//import { CsvToHtmlTable } from 'react-csv-to-table';
import csvFile from '../../A100-3-1.csv';
//import cs from '../../data_opti'
import Papa from 'papaparse';
import './UseRange.css'
import Loading from '../Loading/Loading'
// affiche le planning d'utilisation des équipements (algo de thomas sur la matrice de jenna)
function UseRange({tab_infos_user_optimisation}) {
    const[answer, setAnswer] = useState("Oui")
    const[rows, setRows] = useState([])
    const[chemin, setChemin] = useState()
    const[tabLength, setTabLength] = useState(0)
    console.log("csvFiel = ", csvFile)
    console.log("tab_infos_user_optimisation ohohohoho = ", tab_infos_user_optimisation)

    useEffect(() => {
        axios.post('http://127.0.0.1:8000/optimisation_consommation', tab_infos_user_optimisation)
        .then(function (response) {
            setChemin(response.data);
            console.log("response  = ",response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }, []);
    //var csvFile = require('../../'+chemin)
        // State to store parsed data
  const [parsedCsvData, setParsedData] = useState([]);

  //State to store table Column name
  const [tableRows, setTableRows] = useState([]);

//   //State to store the values
  const [values, setValues] = useState([]);

  let tab = []
 
  if (chemin){
    var split_data = chemin.split("\n")
    console.log("split_data", split_data)
    for (let i=0; i<split_data.length; i++){
        if (i != 0){
            let split_row = split_data[i].split(";")
            for (let j=1; j<split_row.length; j++){
                if(split_row[j] != 0.0){
                    split_row[j] = "X"
                }else{
                    split_row[j] = "-"
                }
            }
            let join_row = []
            join_row = split_row.join()
            tab.push(join_row)
        }else{
            tab.push(split_data[0])
        }
       
       // console.log("row = ", join_row)
       
    }
}
    //setTab(tab)
    console.log('tab jjjejejejje = ', tab)
  
//     // split_data.map((elts) => {
//     //     print("elts = ", elts)
//     //     //let elt = elts.split(";")
//     //     print("elt = ", elt)
//     // })
 

//   console.log(chemin)
//   useEffect(() => {
//     setTimeout(() => {
//     Papa.parse(csvFile, {
//         download: true,
//         header : true,
//         delimiter: ";",
//         complete: function (results) {
//             const rowsArray = [];
//             const valuesArray = [];
    
//             // Iterating data to get column name and their values
//             results.data.map((d) => {
//               rowsArray.push(Object.keys(d));
//               valuesArray.push(Object.values(d));
//             });
    
//             // Parsed Data Response in array format
//             setParsedData(results.data);
    
//             // Filtered Column Names
//             setTableRows(rowsArray[0]);
    
//             // Filtered Values
//             setValues(valuesArray);
//        }})
//     }, 20000);
//     }, []);

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
      console.log('tabLenght = ', tabLength)

    return (
        <div className='block'>
            <fieldset className='fieldset'>
                <legend>Plage d'utilisation proposée</legend>
                <table className="ArchiveTable">
                <thead>
                {tab && tab.length == 9? 
                <tr>
                    <th>{tab[0].split(";")[0]}</th>
                    <th>{tab[0].split(";")[1]}</th>
                    <th>{tab[0].split(";")[2]}</th>
                    <th>{tab[0].split(";")[3]}</th>
                    <th>{tab[0].split(";")[4]}</th>
                    <th>{tab[0].split(";")[5]}</th>
                    <th>{tab[0].split(";")[6]}</th>
                    <th>{tab[0].split(";")[7]}</th>
                    <th>{tab[0].split(";")[8]}</th>
                    <th>{tab[0].split(";")[9]}</th>
                    <th>{tab[0].split(";")[10]}</th>
                    <th>{tab[0].split(";")[11]}</th>
                    <th>{tab[0].split(";")[12]}</th>
                    <th>{tab[0].split(";")[13]}</th>
                    <th>{tab[0].split(";")[14]}</th>
                    <th>{tab[0].split(";")[15]}</th>
                    <th>{tab[0].split(";")[16]}</th>
                    <th>{tab[0].split(";")[17]}</th>
                    <th>{tab[0].split(";")[18]}</th>
                    <th>{tab[0].split(";")[19]}</th>
                    <th>{tab[0].split(";")[20]}</th>
                    <th>{tab[0].split(";")[21]}</th>
                    <th>{tab[0].split(";")[22]}</th>
                    <th>{tab[0].split(";")[23]}</th>
                </tr>
                : <tr></tr>}
                </thead>
                {tab && tab.length == 9? 
                <tbody>
                    <tr>
                        <td>{tab[1].split(",")[0]}</td>
                        <td>{tab[1].split(",")[1]}</td>
                        <td>{tab[1].split(",")[2]}</td>
                        <td>{tab[1].split(",")[3]}</td>
                        <td>{tab[1].split(",")[4]}</td>
                        <td>{tab[1].split(",")[5]}</td>
                        <td>{tab[1].split(",")[6]}</td>
                        <td>{tab[1].split(",")[7]}</td>
                        <td>{tab[1].split(",")[8]}</td>
                        <td>{tab[1].split(",")[9]}</td>
                        <td>{tab[1].split(",")[10]}</td>
                        <td>{tab[1].split(",")[11]}</td>
                        <td>{tab[1].split(",")[12]}</td>
                        <td>{tab[1].split(",")[13]}</td>
                        <td>{tab[1].split(",")[14]}</td>
                        <td>{tab[1].split(",")[15]}</td>
                        <td>{tab[1].split(",")[16]}</td>
                        <td>{tab[1].split(",")[17]}</td>
                        <td>{tab[1].split(",")[18]}</td>
                        <td>{tab[1].split(",")[19]}</td>
                        <td>{tab[1].split(",")[20]}</td>
                        <td>{tab[1].split(",")[21]}</td>
                        <td>{tab[1].split(",")[22]}</td>
                        <td>{tab[1].split(",")[23]}</td>
                    </tr>
                    <tr>
                        <td>{tab[2].split(",")[0]}</td>
                        <td>{tab[2].split(",")[1]}</td>
                        <td>{tab[2].split(",")[2]}</td>
                        <td>{tab[2].split(",")[3]}</td>
                        <td>{tab[2].split(",")[4]}</td>
                        <td>{tab[2].split(",")[5]}</td>
                        <td>{tab[2].split(",")[6]}</td>
                        <td>{tab[2].split(",")[7]}</td>
                        <td>{tab[2].split(",")[8]}</td>
                        <td>{tab[2].split(",")[9]}</td>
                        <td>{tab[2].split(",")[10]}</td>
                        <td>{tab[2].split(",")[11]}</td>
                        <td>{tab[2].split(",")[12]}</td>
                        <td>{tab[2].split(",")[13]}</td>
                        <td>{tab[2].split(",")[14]}</td>
                        <td>{tab[2].split(",")[15]}</td>
                        <td>{tab[2].split(",")[16]}</td>
                        <td>{tab[2].split(",")[17]}</td>
                        <td>{tab[2].split(",")[18]}</td>
                        <td>{tab[2].split(",")[19]}</td>
                        <td>{tab[2].split(",")[20]}</td>
                        <td>{tab[2].split(",")[21]}</td>
                        <td>{tab[2].split(",")[22]}</td>
                        <td>{tab[2].split(",")[23]}</td>
                    </tr>
                    <tr>
                        <td>{tab[3].split(",")[0]}</td>
                        <td>{tab[3].split(",")[1]}</td>
                        <td>{tab[3].split(",")[2]}</td>
                        <td>{tab[3].split(",")[3]}</td>
                        <td>{tab[3].split(",")[4]}</td>
                        <td>{tab[3].split(",")[5]}</td>
                        <td>{tab[3].split(",")[6]}</td>
                        <td>{tab[3].split(",")[7]}</td>
                        <td>{tab[3].split(",")[8]}</td>
                        <td>{tab[3].split(",")[9]}</td>
                        <td>{tab[3].split(",")[10]}</td>
                        <td>{tab[3].split(",")[11]}</td>
                        <td>{tab[3].split(",")[12]}</td>
                        <td>{tab[3].split(",")[13]}</td>
                        <td>{tab[3].split(",")[14]}</td>
                        <td>{tab[3].split(",")[15]}</td>
                        <td>{tab[3].split(",")[16]}</td>
                        <td>{tab[3].split(",")[17]}</td>
                        <td>{tab[3].split(",")[18]}</td>
                        <td>{tab[3].split(",")[19]}</td>
                        <td>{tab[3].split(",")[20]}</td>
                        <td>{tab[3].split(",")[21]}</td>
                        <td>{tab[3].split(",")[22]}</td>
                        <td>{tab[3].split(",")[23]}</td>
                    </tr>
                    <tr>
                        <td>{tab[4].split(",")[0]}</td>
                        <td>{tab[4].split(",")[1]}</td>
                        <td>{tab[4].split(",")[2]}</td>
                        <td>{tab[4].split(",")[3]}</td>
                        <td>{tab[4].split(",")[4]}</td>
                        <td>{tab[4].split(",")[5]}</td>
                        <td>{tab[4].split(",")[6]}</td>
                        <td>{tab[4].split(",")[7]}</td>
                        <td>{tab[4].split(",")[8]}</td>
                        <td>{tab[4].split(",")[9]}</td>
                        <td>{tab[4].split(",")[10]}</td>
                        <td>{tab[4].split(",")[11]}</td>
                        <td>{tab[4].split(",")[21]}</td>
                        <td>{tab[4].split(",")[31]}</td>
                        <td>{tab[4].split(",")[41]}</td>
                        <td>{tab[4].split(",")[51]}</td>
                        <td>{tab[4].split(",")[61]}</td>
                        <td>{tab[4].split(",")[71]}</td>
                        <td>{tab[4].split(",")[81]}</td>
                        <td>{tab[4].split(",")[91]}</td>
                        <td>{tab[4].split(",")[20]}</td>
                        <td>{tab[4].split(",")[21]}</td>
                        <td>{tab[4].split(",")[22]}</td>
                        <td>{tab[4].split(",")[23]}</td>
                    </tr>
                    <tr>
                        <td>{tab[5].split(",")[0]}</td>
                        <td>{tab[5].split(",")[1]}</td>
                        <td>{tab[5].split(",")[2]}</td>
                        <td>{tab[5].split(",")[3]}</td>
                        <td>{tab[5].split(",")[4]}</td>
                        <td>{tab[5].split(",")[5]}</td>
                        <td>{tab[5].split(",")[6]}</td>
                        <td>{tab[5].split(",")[7]}</td>
                        <td>{tab[5].split(",")[8]}</td>
                        <td>{tab[5].split(",")[9]}</td>
                        <td>{tab[5].split(",")[10]}</td>
                        <td>{tab[5].split(",")[11]}</td>
                        <td>{tab[5].split(",")[12]}</td>
                        <td>{tab[5].split(",")[13]}</td>
                        <td>{tab[5].split(",")[14]}</td>
                        <td>{tab[5].split(",")[15]}</td>
                        <td>{tab[5].split(",")[16]}</td>
                        <td>{tab[5].split(",")[17]}</td>
                        <td>{tab[5].split(",")[18]}</td>
                        <td>{tab[5].split(",")[19]}</td>
                        <td>{tab[5].split(",")[20]}</td>
                        <td>{tab[5].split(",")[21]}</td>
                        <td>{tab[5].split(",")[22]}</td>
                        <td>{tab[5].split(",")[23]}</td>
                    </tr>
                    <tr>
                        <td>{tab[6].split(",")[0]}</td>
                        <td>{tab[6].split(",")[1]}</td>
                        <td>{tab[6].split(",")[2]}</td>
                        <td>{tab[6].split(",")[3]}</td>
                        <td>{tab[6].split(",")[4]}</td>
                        <td>{tab[6].split(",")[5]}</td>
                        <td>{tab[6].split(",")[6]}</td>
                        <td>{tab[6].split(",")[7]}</td>
                        <td>{tab[6].split(",")[8]}</td>
                        <td>{tab[6].split(",")[9]}</td>
                        <td>{tab[6].split(",")[10]}</td>
                        <td>{tab[6].split(",")[11]}</td>
                        <td>{tab[6].split(",")[12]}</td>
                        <td>{tab[6].split(",")[13]}</td>
                        <td>{tab[6].split(",")[14]}</td>
                        <td>{tab[6].split(",")[15]}</td>
                        <td>{tab[6].split(",")[16]}</td>
                        <td>{tab[6].split(",")[17]}</td>
                        <td>{tab[6].split(",")[18]}</td>
                        <td>{tab[6].split(",")[19]}</td>
                        <td>{tab[6].split(",")[20]}</td>
                        <td>{tab[6].split(",")[21]}</td>
                        <td>{tab[6].split(",")[22]}</td>
                        <td>{tab[6].split(",")[23]}</td>
                    </tr>
                    <tr>
                        <td>{tab[7].split(",")[0]}</td>
                        <td>{tab[7].split(",")[1]}</td>
                        <td>{tab[7].split(",")[2]}</td>
                        <td>{tab[7].split(",")[3]}</td>
                        <td>{tab[7].split(",")[4]}</td>
                        <td>{tab[7].split(",")[5]}</td>
                        <td>{tab[7].split(",")[6]}</td>
                        <td>{tab[7].split(",")[7]}</td>
                        <td>{tab[7].split(",")[8]}</td>
                        <td>{tab[7].split(",")[9]}</td>
                        <td>{tab[7].split(",")[10]}</td>
                        <td>{tab[7].split(",")[11]}</td>
                        <td>{tab[7].split(",")[12]}</td>
                        <td>{tab[7].split(",")[13]}</td>
                        <td>{tab[7].split(",")[14]}</td>
                        <td>{tab[7].split(",")[15]}</td>
                        <td>{tab[7].split(",")[16]}</td>
                        <td>{tab[7].split(",")[17]}</td>
                        <td>{tab[7].split(",")[18]}</td>
                        <td>{tab[7].split(",")[19]}</td>
                        <td>{tab[7].split(",")[20]}</td>
                        <td>{tab[7].split(",")[21]}</td>
                        <td>{tab[7].split(",")[22]}</td>
                        <td>{tab[7].split(",")[23]}</td>
                        
                    </tr>
                    <tr>
                        <td>{tab[8].split(",")[0]}</td>
                        <td>{tab[8].split(",")[1]}</td>
                        <td>{tab[8].split(",")[2]}</td>
                        <td>{tab[8].split(",")[3]}</td>
                        <td>{tab[8].split(",")[4]}</td>
                        <td>{tab[8].split(",")[5]}</td>
                        <td>{tab[8].split(",")[6]}</td>
                        <td>{tab[8].split(",")[7]}</td>
                        <td>{tab[8].split(",")[8]}</td>
                        <td>{tab[8].split(",")[9]}</td>
                        <td>{tab[8].split(",")[10]}</td>
                        <td>{tab[8].split(",")[11]}</td>
                        <td>{tab[8].split(",")[12]}</td>
                        <td>{tab[8].split(",")[13]}</td>
                        <td>{tab[8].split(",")[14]}</td>
                        <td>{tab[8].split(",")[15]}</td>
                        <td>{tab[8].split(",")[16]}</td>
                        <td>{tab[8].split(",")[17]}</td>
                        <td>{tab[8].split(",")[18]}</td>
                        <td>{tab[8].split(",")[19]}</td>
                        <td>{tab[8].split(",")[20]}</td>
                        <td>{tab[8].split(",")[21]}</td>
                        <td>{tab[8].split(",")[22]}</td>
                        <td>{tab[8].split(",")[23]}</td>
                    </tr>
                </tbody>
                : <div className="loading-container"><Loading /></div>}
            </table>
        
                {/* <div className='proposition' onChange={handleOnChange}>
                    <span className='radioBtns'>Cela vous convient-il ?  
                        <input className='radioBtn' type="radio" name="yes" value="Oui" checked={answer === "Oui"}/> Oui 
                        <input className='radioBtn' type="radio" name="no" value="Non" checked={answer === "Non"}/> Non 
                    </span>
                    {answer === "Non"?(
                        <div>Voulez-vous une proposition différente ? <input className="newProposition" type="button" value="Nouvelle proposition"/></div> 
                        ):(<span></span>)
                    }
                </div> */}
              
            </fieldset>
        </div>
    );
}

export default UseRange;