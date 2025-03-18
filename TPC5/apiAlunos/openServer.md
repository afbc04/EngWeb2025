# Importar Dataset

sudo docker cp <nome_do_ficheiro> <nome_docker>:<pasta_do_docker>

# Abrir o docker

docker exec -it <nome_docker> sh

# Dentro do docker

mongoimport -d <nome_da_BD> -c <nome_da_tabela> <ficheiro> [--jsonArray]

## Mongo DB

**mongosh :** Abrir shell do mongoDB  

**show dbs :** Ver base de dados  
**use <nome_BD> :** Usar BD
