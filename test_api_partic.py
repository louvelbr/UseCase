import plotly.graph_objects as go
import plotly
import json
from fastapi import FastAPI
import pandas as pd
from statsmodels.tsa.arima.model import ARIMA
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
from EquipementMaison import EquipementMaison

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
    data = pd.read_csv("data_maison_{}{}-{}-659.csv".format(item.type_habitation[0].upper(), item.surface, item.habitants), parse_dates=["Date"])

    # Convertir la colonne "date" en format de date
    data["Date"] = pd.to_datetime(data["Date"])
    data = data.set_index("Date")

    #prediction
    # model = ARIMA(data[item.debut_plage_horaire], order=(2,1,0)).fit()
    # prediction = model.forecast(steps=1)
    # y = list(prediction.values[0])
    # x = list(data.index)

    # Entraîner le modèle ARIMA
    models = {}
    for col in data.columns:
        models[col] = ARIMA(data[col], order=(2,1,0)).fit()

    forecast = []
    # Afficher les prévisions pour chaque modèle
    for col in models:
        forecast.append(models[col].forecast(steps=1))

    x = list(data.columns)[1:]
    y = list(forecast)[1:]

    # Create a trace
    trace = go.Scatter(
        x=x,
        y=y,
        mode='lines+markers',
        name='Prediction'
    )

    data = [trace]

    # Convert the plot to JSON
    plot_json = json.dumps(data, cls=plotly.utils.PlotlyJSONEncoder)
    return {"prediction_conso": forecast[0],
            "unité": "kWh",
            "graphique": plot_json}

@app.post("/optimisation_consommation")
def electricity_optimisation(item: Optim):
    em = EquipementMaison()
    tmp = em.find_id(item)
    dossier = em.find_id(item)[0].split("-")[0].split("M")[1]
    dossier_binaire = em.find_id(item)[2]
    fichier = em.find_id(item)[0]
    chemin_acces = "data_optim/res_optim/"+dossier+"/"+dossier_binaire+"/"+fichier+".csv"
    print("chemin d'accès = ", chemin_acces)
    return (chemin_acces)


#uvicorn test_api_partic:app --reload