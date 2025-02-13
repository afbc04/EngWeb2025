import json

#Função que vai gerar o novo dataset
def main():
    
    #Obtem as reparações
    reparacoes = abrirJSON("databases/dataset_reparacoes.json")
    #Obtem as intervenções
    intervencoes = criarJSON_intervencoes(reparacoes)
    #Obtem os veículos
    veiculos = criarJSON_veiculos(reparacoes)
    
    #Cria dicionário onde será visto como modelo para o json
    db = {}
    db['reparacoes'] = reparacoes['reparacoes']
    db['intervencoes'] = intervencoes
    db['veiculos'] = veiculos
    
    #Cria JSON
    with open("databases/db.json","w", encoding="utf-8") as f:
        json.dump(db,f, indent=4, ensure_ascii=False)
    
#Abrir JSON
def abrirJSON(path):
    with open(path,"r") as f:
        data = json.load(f)
        return data

#Dá uma estrutura com as intervenções
def criarJSON_intervencoes(json_origem):
    
    #Dicionário com as intervenções
    intervencao_map = {}
    for reparacao in json_origem['reparacoes']:
        for intervencao in reparacao['intervencoes']:
            intervencao_map[intervencao['codigo']] = intervencao
            
            
    intervencao_final = []
    #Ordenar pelo código
    for codigo in sorted(intervencao_map.keys()):
        
        r = intervencao_map[codigo]
        
        mapa = {}
        mapa['codigo'] = codigo
        mapa['nome'] = r['nome']
        mapa['descricao'] = r['descricao']
        
        intervencao_final.append(mapa)
    
    return intervencao_final
    
#Dá uma estrutura com as marcas e modelos
def criarJSON_veiculos(json_origem):
    
    map_marcas = {} #Quantidade de marcas
    map_marcas_modelos = {} #Quantidade de modelos de uma marca
    
    for r in json_origem['reparacoes']:
        
        #Obtem marca
        marca = r['viatura']['marca']
        
        #Se marca está no map
        if marca in map_marcas:
            map_marcas[marca] += 1 #Incrementa
            
        #Se marca não está no map
        else:
            map_marcas[marca] = 1 #Inicializa a 1
            map_marcas_modelos[marca] = {} #Inicializa o map dos modelos com um map vazio
            
        #Obtem modelo
        modelo = r['viatura']['modelo']
        
        #Modelo está no map
        if modelo in map_marcas_modelos[marca]:
            map_marcas_modelos[marca][modelo] += 1 #Incrementa
        
        #Modelo não está no map
        else:
            map_marcas_modelos[marca][modelo] = 1 #Inicializa a entrada no map a 1
        
    veiculos = []
    #Ordenar
    for marca in sorted(map_marcas.keys()):
        
        modelo_item = {}
        modelo_lista = []
        
        #Iterar sobre os modelos desta marca                        
        for modelo in sorted(map_marcas_modelos[marca].keys()):
    
            modelo_mapa = {}
            modelo_mapa['modelo'] = modelo
            modelo_mapa['quantidade'] = map_marcas_modelos[marca][modelo]
            
            modelo_lista.append(modelo_mapa)
            
        modelo_item['marca'] = marca
        modelo_item['quantidade'] = map_marcas[marca]
        modelo_item['modelos'] = modelo_lista
        veiculos.append(modelo_item)
            
    return veiculos

#Chama a main
main()