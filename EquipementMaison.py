import pandas as pd

class EquipementMaison:

    def __init__(self):
        self.data = pd.read_excel("./data use case SPIE.xlsx", sheet_name=2, usecols=[2,3,5,6,7,8,9,10,11,12,13,14,15], names=('id', 'type', 'LV', 'LL', 'SL', 'TV', 'FG1', 'CE1', 'CG', 'FO', 'PL', 'FG2', 'CE2'))
        self.data = self.data[7:]
        self.data = self.data[['id', 'type', 'TV', 'FG1', 'CG', 'FG2', 'SL', 'PL', 'LV', 'FO', 'LL', 'CE1', 'CE2']]
        print(self.data)

    def convert(self, equipment):
        for key in equipment:
            if equipment[key]:
                equipment[key] = 1
            else:
                equipment[key] = 0
        return equipment

    def find_close(self, type, equipment, level=10):
        data = self.data.query('type == @type')
        list_equip = list(equipment.keys())
        list_row = ['TV', 'FG1', 'CG', 'FG2', 'SL', 'PL', 'LV', 'FO', 'LL', 'CE1', 'CE2']
        for index, row in self.data.iterrows():
            score = 0
            extras = []
            for i in range(11):
                if equipment[list_equip[i]] == row[list_row[i]]:
                    score += 1
                else:
                    extras.append(list_equip[i])
            if score == level:
                return row.id, extras
        return self.find_close(type, equipment, level-1)

    def find_id(self, type, equipment):
        equipment = self.convert(equipment)
        list_equip = list(equipment.keys())
        for index, row in self.data.iterrows():
            if type == row.type and equipment[list_equip[0]] == row.TV and equipment[list_equip[1]] == row.FG1 and equipment[list_equip[2]] == row.CG and equipment[list_equip[3]] == row.FG2 and equipment[list_equip[4]] == row.SL and equipment[list_equip[5]] == row.PL and equipment[list_equip[6]] == row.LV and equipment[list_equip[7]] == row.FO and equipment[list_equip[8]] == row.LL and equipment[list_equip[9]] == row.CE1 and equipment[list_equip[10]] == row.CE2:
                return row.id, []
        return self.find_close(type, equipment)

equipment = {
    "TV" : True,
    "FG1" : True,
    "CG" : True,
    "FG2" : True,
    "SL" : True,
    "PL" : True,
    "LV" : True,
    "FO" : True,
    "LL" : True,
    "CE1" : True,
    "CE2" : True
}

em = EquipementMaison()
print(em.find_id("A100-3", equipment))