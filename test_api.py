from fastapi import FastAPI, Form
import pandas as pd
from statsmodels.tsa.arima.model import ARIMA

app = FastAPI()


@app.post("/prediction_consommation")
def electricity_prediction(type_habitation: str = Form(..., title = "Le type d'habitation (ex: 'M : maison' ou 'A : appartement')", enum=["M","A"]),
                            surface: int = Form(..., title = "Taille de l'habitation en mètres carrés"),
                            habitants: int = Form(..., title = "Nombre de personnes qui y vivent"),
                            plage_horaire: str = Form(..., title = "Moment de la journée (ex: '0:00' ou '9:30')")):
    # Charger les données en utilisant pandas
    data = pd.read_csv("{}{}-{}.csv".format(type_habitation[0], surface,habitants), parse_dates=["Date"])

    # Convertir la colonne "date" en format de date
    data["Date"] = pd.to_datetime(data["Date"])

    # Définir la colonne "date" comme étant la variable cible
    data = data.set_index("Date")

    #focus sur une plage de 30min
    model = ARIMA(data[plage_horaire], order=(2,1,2)).fit()
    prediction = model.forecast(steps=1)
    return {"prediction_conso": prediction.values[0],
            "unité": "kWh"}

#uvicorn test_api:app --reload