import falcon
import json
import os

# Chargement de fonctions spécifique d'un fichier (pour la clarté du code)


class Predict:
    def on_post(self, req, resp):
        print("youyouy ", req)
        print("youyouy222 ", resp)
        # On traite les arguments envoyé par le POST, et on traite correctement l'erreur si le JSON n'est pas correct
        # A ne pas changer
        # print("cocuocucocuc ", item)
        # # Charger les données en utilisant pandas
        # data = pd.read_csv("{}{}-{}.csv".format(item.type_habitation[0], item.surface,item.habitants), parse_dates=["Date"])

        # # Convertir la colonne "date" en format de date
        # data["Date"] = pd.to_datetime(data["Date"])

        # # Définir la colonne "date" comme étant la variable cible
        # data = data.set_index("Date")

        # #focus sur une plage de 30min
        # model = ARIMA(data[item.plage_horaire], order=(2,1,2)).fit()
        # prediction = model.forecast(steps=1)
        # return {"prediction_conso": prediction.values[0],
        #         "unité": "kWh"}
       # resp.headers.add('Access-Control-Allow-Origin', '*')
         #resp.headers['Access-Control-Allow-Origin'] = '*'
       
       

# - end api
