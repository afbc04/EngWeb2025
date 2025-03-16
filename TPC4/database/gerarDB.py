import json

#Função que vai gerar o novo dataset
def main():
    
    #Obtem as reparações
    cinema = abrirJSON("cinema.json")
    #Obtem os filmes
    filmes = criarJSON_filmes(cinema)
    #Obtem os atores
    atores = criarJSON_atores(cinema)
    
    #Cria dicionário onde será visto como modelo para o json
    db = {}
    db['filmes'] = filmes
    db['atores'] = atores
    
    #Cria JSON
    with open("db.json","w", encoding="utf-8") as f:
        json.dump(db,f, indent=4, ensure_ascii=False)
    
#Abrir JSON
def abrirJSON(path):
    with open(path,"r") as f:
        data = json.load(f)
        return data

#Dá uma estrutura com os filmes
def criarJSON_filmes(json_origem):
    
    #Dicionário com os filmes
    filmes = []
    for f in json_origem:
        obj = {}
        obj['id'] = f['title']
        obj['ano'] = f['year']
        obj['atores'] = f['cast']
        obj['genero'] = f['genres']
        filmes.append(obj)
        
    return filmes
    
#Dá uma estrutura com os atores
def criarJSON_atores(json_origem):
    
    #Dicionário com os atores
    atores = {}
    for f in json_origem:
        filme_id = f['title']
        cast = f['cast']
        
        #Itera sobre o cast
        for a in cast:
            
            if a in atores:
                atores[a].append(filme_id)
            else:
                atores[a] = [filme_id]
        
    atores_final = []
    for key in atores.keys():
        obj = {}
        obj['id'] = key
        obj['filmes'] = atores[key]
        atores_final.append(obj)
        
    return atores_final


#Chama a main
main()