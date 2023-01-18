import pandas as pd

class EquipementMaison:

    def __init__(self):
        self.data = pd.read_excel("./data use case SPIE.xlsx", sheet_name=2, usecols=[2,3,5,6,7,8,9,10,11,12,13,14,15], names=('id', 'type', 'LV', 'LL', 'SL', 'TV', 'FG1', 'CE1', 'CG', 'FO', 'PL', 'FG2', 'CE2'))
        self.data = self.data[7:]
        self.data = self.data[['id', 'type', 'TV', 'FG1', 'CG', 'FG2', 'SL', 'PL', 'LV', 'FO', 'LL', 'CE1', 'CE2']]

    def convert(self, equipment):
        for key in equipment:
            if equipment[key]:
                equipment[key] = 1
            else:
                equipment[key] = 0
        return equipment

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
                    if j == 10: return row.id, extras
        return self.find_close(type, equipment, nb_equipment+1)

    def find_id(self, type, equipment):
        equipment = self.convert(equipment)
        list_equip = list(equipment.keys())
        for index, row in self.data.iterrows():
            if type == row.type and equipment[list_equip[0]] == row.TV and equipment[list_equip[1]] == row.FG1 and equipment[list_equip[2]] == row.CG and equipment[list_equip[3]] == row.FG2 and equipment[list_equip[4]] == row.SL and equipment[list_equip[5]] == row.PL and equipment[list_equip[6]] == row.LV and equipment[list_equip[7]] == row.FO and equipment[list_equip[8]] == row.LL and equipment[list_equip[9]] == row.CE1 and equipment[list_equip[10]] == row.CE2:
                return row.id, []
        nb_equipment = 0
        for i in equipment:
            if equipment[i]: nb_equipment += 1
        return self.find_close(type, equipment, nb_equipment+1)

equipment = {
    "TV" : True,
    "FG1" : True,
    "CG" : True,
    "FG2" : False,
    "SL" : True,
    "PL" : False,
    "LV" : False,
    "FO" : True,
    "LL" : False,
    "CE1" : True,
    "CE2" : False
}

em = EquipementMaison()
print(em.find_id("M180-5", equipment))