# Importar Dataset

sudo docker cp <nome_do_ficheiro> <nome_docker>:<pasta_do_docker>

# Abrir o docker

_sudo docker run_ -> criar um container

sudo docker start <nome_docker>
_(sudo docker ps)_ 
sudo docker exec -it <nome_docker> sh

# Dentro do docker

mongoimport -d <nome_da_BD> -c <nome_da_tabela> <ficheiro> [--jsonArray]

## Mongo DB

**mongosh :** Abrir shell do mongoDB  

**show dbs :** Ver base de dados  
**use <nome_BD> :** Usar BD

# Alterar JSON dentro do mongo

cat /tmp/db.json | jq .

**alterar json**
jq 'map(.idcontrato as $id | del(.idcontrato) | ._id= $id)' /tmp/db.json > out.json

**ver as 15 linhas**
head -n 15 out.json