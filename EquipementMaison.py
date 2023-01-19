import pandas as pd

class EquipementMaison:

    def __init__(self):
        self.data = pd.read_excel("./data use case SPIE.xlsx", sheet_name=2, usecols=[2,3,5,6,7,8,9,10,11,12,13,14,15], names=('id', 'type', 'LV', 'LL', 'SL', 'TV', 'FG1', 'CE1', 'CG', 'FO', 'PL', 'FG2', 'CE2'))
        self.data = self.data[7:]
        self.data = self.data[['id', 'type', 'TV', 'FG1', 'CG', 'FG2', 'SL', 'PL', 'LV', 'FO', 'LL', 'CE1', 'CE2']]

    def convert(self, equipment):
        new = {}
        new["TV"] = 1 if equipment["television"] else 0
        new["FG1"] = 1 if equipment["fridge1"] else 0
        new["CG"] = 1 if equipment["freezer"] else 0
        if "fridge2" in equipment:
            new["FG2"] = 1 if equipment["fridge2"] else 0
        else:
            new["FG2"] = 0
        new["SL"] = 1 if equipment["clothesDryer"] else 0
        new["PL"] = 1 if equipment["hotplates"] else 0
        new["LV"] = 1 if equipment["dishWasher"] else 0
        new["FO"] = 1 if equipment["oven"] else 0
        new["LL"] = 1 if equipment["washingMachine"] else 0
        new["CE1"] = 1 if equipment["waterHeater1"] else 0
        if "waterHeater2" in equipment:
            new["CE2"] = 1 if equipment["waterHeater2"] else 0
        else:
            new["CE2"] = 0
        return new
    
    def getBinary(self, row):
        binary = ""
        binary += str(row.LV)
        binary += str(row.LL)
        binary += str(row.SL)
        binary += str(row.TV)
        binary += str(row.FG1)
        binary += str(row.CE1)
        binary += str(row.CG)
        binary += str(row.FO)
        binary += str(row.PL)
        binary += str(row.FG2)
        binary += str(row.CE2)
        return binary

    def find_close(self, type, equipment, nb_equipment):
        if nb_equipment == 12: return None
        data = self.data.query('type == @type')
        data.sort_values(['TV', 'FG1', 'CG', 'FG2', 'SL', 'PL', 'LV', 'FO', 'LL', 'CE1', 'CE2'], ascending=[False, False, False, False, False, False, False, False, False, False, False], inplace=True)
        list_equip = list(equipment.keys())
        list_row = ['TV', 'FG1', 'CG', 'FG2', 'SL', 'PL', 'LV', 'FO', 'LL', 'CE1', 'CE2']
        for index, row in data.iterrows():
            score = 0
            extras = []
            for i in range(11):
                if row[list_row[i]] == 1:
                    score += 1
            if score == nb_equipment:
                for j in range(11):
                    if equipment[list_equip[j]] == 1 and row[list_row[j]] == 0: break
                    if equipment[list_equip[j]] == 0 and row[list_row[j]] == 1: extras.append(list_row[j])
                    if j == 10: return row.id, extras, self.getBinary(row)
        return self.find_close(type, equipment, nb_equipment+1)

    def find_id(self, equipment):
        if equipment["type"] == "Maison":
            type = "M" + str(equipment["size"]) + "-" + str(equipment["nbPeople"])
        else:
            type = "A" + str(equipment["size"]) + "-" + str(equipment["nbPeople"])
        equipment = self.convert(equipment)
        list_equip = list(equipment.keys())
        for index, row in self.data.iterrows():
            if type == row.type and equipment[list_equip[0]] == row.TV and equipment[list_equip[1]] == row.FG1 and equipment[list_equip[2]] == row.CG and equipment[list_equip[3]] == row.FG2 and equipment[list_equip[4]] == row.SL and equipment[list_equip[5]] == row.PL and equipment[list_equip[6]] == row.LV and equipment[list_equip[7]] == row.FO and equipment[list_equip[8]] == row.LL and equipment[list_equip[9]] == row.CE1 and equipment[list_equip[10]] == row.CE2:
                return row.id, [], self.getBinary(row)
        nb_equipment = 0
        for i in equipment:
            if equipment[i]: nb_equipment += 1
        return self.find_close(type, equipment, nb_equipment+1)

"""equipment = {
    "size": 180,
    "nbPeople": 5,
    "type": "Maison", #"Appartement"
    "washingMachine": True,
    "clothesDryer": False,
    "dishWasher": True,
    "fridge1": False,
    "waterHeater1": True,
    "waterHeater2": False,
    "freezer": True,
    "oven": True,
    "hotplates": True,
    "television": True,
    "range1": {
        "begin": 0,
        "end": 0}
}

em = EquipementMaison()
print(em.find_id(equipment))"""