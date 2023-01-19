from fastapi import FastAPI
import pandas as pd
from statsmodels.tsa.arima.model import ARIMA
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional

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
        
        

@app.post("/prediction_consommation")
def electricity_prediction(item: Item):
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

@app.post("/optimisation_consommation")
def electricity_optimisation(item: Optim):
    print("je suis ici", item.size)
    
    return ("hello ohohohoh ",item.size, item.nbPeople, "yay")
#uvicorn test_api_json:app --reload
