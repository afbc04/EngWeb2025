# TPC1 - a104618 - Engenharia Web 2025

**Titulo :** TPC1 da UC Engenharia Web  
**Data :** 2025-02-13  
**UC :** Engenharia Web
**Curso :** Licenciatura de Engenharia Informática 3º ano 2º semestre  
**Autor :**  
- **Nome :** André Filipe Barros Campos  
- **Número de aluno :** a104618  
- **Email Institucional :** a104618@alunos.uminho.pt  
- **Email Pessoal :** andrefbc2004@gmail.com  
 
![Imagem](image.png)

## Resumo

1. Dado o dataset _[dataset_reparacoes.json](databases/dataset_reparacoes.json)_, devemos criar um novo dataset onde, para além dos dados do dataset mencionado, deverá incluir:  
    1. Entradas de **intervenções**, onde as entradas encontram-se ordenadas pelo seu código e entradas estas constituidas pelo código, nome e descrição da intervenção  
    2. Entradas de **veiculos**, onde as entradas encontram-se ordenadas alfabéticamente pela marca do veículos. Em cada marca, teremos a quantidade de veículos dessa marca e uma lista de modelos associados a essa marca, onde cada modelo teremos a sua quantidade  
2. Deveremos ter um **json-server** que deverá usar este novo dataset para servir como base de dados do serviço que vamos fornecer.  
3. Devemos criar um **servidor** em _Java Script_ onde este servidor irá buscar os pedidos dos clientes e responder-lhes.  
4. Os pedidos serão efetuados por **HTTP** onde iremos usar o **url** para identificar o que o cliente deseja.  
5. O servidor usará o json-server para buscar as informações na base de dados e depois irá apresentar a informação ao cliente usando html.  
6. O servidor deverá ter uma **página inicial** contendo _links_ que listarão as **reparações**, **intervenções** ou **veículos**.  
7. Em cada lista, o cliente poderá usar _Queries String_ ou clicar numa entrada, onde será apresentado apenas essa entrada com o seu **id** como título.  

## Lista de Resultados

1. Para cumprir os requisitos, eu criei o ficheiro _[gerarDB.py](gerarDB.py)_ para que conseguisse criar o novo dataset através do dataset dado ([dataset_reparacoes.json](databases/dataset_reparacoes.json)).  
Neste ficheiro, crio um dicionário com 3 entradas. Numa entrada com o nome **"reparacoes"** coloquei o dataset dado com todas as reparações, noutra entrada com o nome **"intervencoes"** coloquei uma lista ordenada com todas as intervenções e por fim, noutra entrada chamada **"veiculos"** coloquei uma lista de marcas, onde dentro de cada marca tem uma lista de modelos, com as suas respetivas quantidades.  
Após esse dicionário, consegui criar de forma automática o dataset pretendido, a que eu apelidei de **[db.json](databases/db.json)**  
Com a criação deste dataset, consegui criar o json-server onde irei usar a porta **3000** para me comunicar com ele
2. Para a criação do servidor, criei o ficheiro _[server.js](server.js)_ onde estou a usar a porta **1234** para me comunicar com ele, e onde os clientes também irão se comunicar.  
Nesse servidor, apenas os métodos _HTTP_ **GET** está implementado, fazendo com que qualquer outro método deia o erro **501**, indicando que não foi implementado.  
Dentro dos métodos GET, existem possíveis _URLs_ que serão atendidos:  
    1. **/** : Este será a página inicial, onde irá apresentar os _links_ para as listagens do dataset;  
    2. **lista/item** : Este URL é um URL genérico para reparações, intervenções e veículos. O parâmetro **lista** indica em que lista estamos a navegar e o parâmetro **item** indica qual item/entrada desejo ver, geralmente indicando o id desta entrada. Este URL apenas serve para indicar a informação de **uma única** entrada;  
    3. **lista** : Este URL também é um URL genérico e é usado quando o URL não ser match com o URL acima apresentado. Neste URL pode estar a _Query String_ que o cliente pretende efetuar, essa query string é enviada ao json-server e o servidor irá apresentar ao cliente todas as entradas que fizeram match;  
    4. Caso exista outra possível URL, o servidor indica um erro **404** indicando que não existe informação que satisfaça o pedido do cliente.  
3. O servidor utiliza o ficheiro **[html_aux.js](server/html_aux.js)**, ficheiro este que dado certos argumentos, cria automáticamente pacotes **HTTP** e cria ficheiros **HTML** que serão usados pelos browsers para expor os dados aos clientes

## Exemplos de Uso

1. **Criar json-server :** json-server -w databses/db.json  
2. **Abrir servidor :** node server.js  
3. **Ver página inicial :** http://localhost:1234  
4. **Ver página das intervenções :** http://localhost:1234/intervencoes  
5. **Ver página da intervenção R003 :** http://localhost:1234/intervencoes/R003  
6. **Ver página de todas as intervenções que contém a palavra "troca" nas suas descrições :** http://localhost:1234/intervencoes?descricao_like=troca  
