from fastapi import FastAPI
import pandas as pd
from statsmodels.tsa.arima.model import ARIMA
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
from EquipementMaison import EquipementMaison
import csv

app = FastAPI()

origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

class Item(BaseModel):
    type_habitation: str
    surface: int
    habitants: int
    debut_plage_horaire: str

class Range(BaseModel):
    begin: int
    end: int

class Optim(BaseModel):
    type: str
    size: int
    nbPeople: int
    washingMachine: bool
    clothesDryer: bool
    dishWasher: bool
    fridge1: bool
    fridge2: Optional[bool] = None
    waterHeater1: bool
    waterHeater2: Optional[bool] = None
    freezer: bool
    oven: bool
    hotplates: bool
    TV: bool
    range1: Range
    range2: Optional[Range] = None
    range3: Optional[Range] = None
    range4: Optional[Range] = None
        
        

@app.post("/prediction_consommation_type")
def electricity_prediction(item: Item):
    print("laaaaaaaaaaaaaaaaaaaaaaaa")
    data = pd.read_csv("{}{}-{}.csv".format(item.type_habitation[0].upper(), item.surface, item.habitants), parse_dates=["Date"])

    # Convertir la colonne "date" en format de date
    data["Date"] = pd.to_datetime(data["Date"])

    # Définir la colonne "date" comme étant la variable cible
    data = data.set_index("Date")

    #focus sur une plage de 30min
    model = ARIMA(data[item.debut_plage_horaire], order=(2,1,2)).fit()
    prediction = model.forecast(steps=1)
    return {"prediction_conso": prediction.values[0],
            "unité": "kWh"}

@app.post("/prediction_consommation_id")
def electricity_prediction(item: Item):
    print("iciiiiiiiiiiiiiiiiiiii")
    data = pd.read_csv("data_maison_{}{}-{}-659.csv".format(item.type_habitation[0].upper(), item.surface, item.habitants), parse_dates=["Date"])



    # Convertir la colonne "date" en format de date

    data["Date"] = pd.to_datetime(data["Date"])

    data = data.set_index("Date")



    #prediction

    model = ARIMA(data[item.debut_plage_horaire], order=(2,1,0)).fit()

    prediction = model.forecast(steps=1)

    return {"prediction_conso": prediction.values[0],

            "unité": "kWh"}

@app.post("/optimisation_consommation")
def electricity_optimisation(item: Optim):
    #print("laaaaaaaaaaaaaa", type(item["type"]))

    equipment = {
    "size": item.size,
    "nbPeople": item.nbPeople,
    "type": item.type, #"Appartement"
    "washingMachine": item.washingMachine,
    "clothesDryer": item.clothesDryer,
    "dishWasher": item.dishWasher,
    "fridge1": item.fridge1,
    "waterHeater1": item.waterHeater1,
    "waterHeater2": item.waterHeater2,
    "freezer": item.freezer,
    "oven": item.oven,
    "hotplates": item.hotplates,
    "television": item.TV,
    "range1": {
        "begin": item.range1.begin,
        "end": item.range1.end}
}
    print("laaaaa")
    em = EquipementMaison()
    print(equipment)
    find = em.find_id(equipment)
    dossier = find[0].split("-")[0].split("M")[1]
    dossier_binaire = find[2]
    fichier = find[0]
    csvString = ""
    chemin_acces = "data_opti/res_opti/"+dossier+"/"+dossier_binaire+"/"+fichier+".csv"
    with open("./use-case/src/"+chemin_acces, 'r') as file:
        csvreader = csv.reader(file)
        for row in csvreader:
            print(row[0])
            csvString += row[0] + '\n'
    print("aaaaaaaaaaaaaaaa")
    print(csvString)
    return (csvString)
#uvicorn test_api_json:app --reload
