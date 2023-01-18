import os

import falcon
from falcon.http_status import HTTPStatus
from resources.dossierprojet.api import Predict as Predict


class HandleCORS(object):
    def process_request(self, req, resp):
        resp.set_header('Access-Control-Allow-Origin', '*')
        resp.set_header('Access-Control-Allow-Methods', '*')
        resp.set_header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Authorization')
        
        resp.set_header("Content-type", "application/json")
        resp.set_header("mode", "cors")

        resp.set_header('Access-Control-Max-Age', 1728000)  # 20 days
        if req.method == 'OPTIONS':
            raise HTTPStatus(falcon.HTTP_200, body='\n')

api = falcon.API(middleware=[HandleCORS() ])

# Déclaration de la route qui sera utilisé lors de l'appel du web service
# exemple : http://serveur:port/modele/predict
api.add_route('/prediction_consommation', Predict())
