from fastapi import FastAPI, Form
import pandas as pd
from statsmodels.tsa.arima.model import ARIMA
from pydantic import BaseModel

app = FastAPI()

class Item(BaseModel):
    type_habitation: str
    surface: int
    habitants: int
    debut_plage_horaire: str

@app.post("/prediction_consommation")
def electricity_prediction(item: Item):
    
    data = pd.read_csv("{}{}-{}.csv".format(item.type_habitation[0], item.surface, item.habitants), parse_dates=["Date"])

    # Convertir la colonne "date" en format de date
    data["Date"] = pd.to_datetime(data["Date"])

    # Définir la colonne "date" comme étant la variable cible
    data = data.set_index("Date")

    #focus sur une plage de 30min
    model = ARIMA(data[item.debut_plage_horaire], order=(2,1,2)).fit()
    prediction = model.forecast(steps=1)
    return {"prediction_conso": prediction.values[0],
            "unité": "kWh"}

#uvicorn test_api_json:app --reload