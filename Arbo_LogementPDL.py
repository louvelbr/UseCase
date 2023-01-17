import pandas as pd

class PDL:

    def __init__(self, id, parent=None):
        self.id = id
        self.parent = parent
        self.children = []
        if id.startswith(('A', 'M')):
            self.path = "/data "+id.split('-')[0]+'-'+id.split('-')[1]+"/"+"data_maison_"+id+".csv"
            self.type = id.split('-')[0]+'-'+id.split('-')[1]
        else:
            self.path = None
            self.type = None

    def add_child(self, child):
        child.parent = self
        self.children.append(child)

    def print_tree(self, level=0):
        print(" "*level + self.id)
        for child in self.children:
            child.print_tree(level + 1)
        
    def to_string(self):
        return f'id: {self.id}, type: {self.type}, parent: {self.parent.id if self.parent else None}, children: {[child.id for child in self.children]}, path: {self.path}'

    def find_child(self, id):
        if self.id == id:
            return self
        for child in self.children:
            found = child.find_child(id)
            if found:
                return found
        return None

    def find_leaves(self, type=None):
        leaves = []
        if not self.children and (type is None or (type is not None and type == self.type)):
            leaves.append(self)
        else:
            for child in self.children:
                leaves.extend(child.find_leaves(type))
        return leaves