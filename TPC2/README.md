# TPC2 - a104618 - Engenharia Web 2025

**Titulo :** TPC2 da UC Engenharia Web  
**Data :** 2025-02-22  
**UC :** Engenharia Web  
**Curso :** Licenciatura de Engenharia Informática 3º ano 2º semestre  
**Autor :**  
- **Nome :** André Filipe Barros Campos  
- **Número de aluno :** a104618  

## Resumo

1. Usaremos o dataset _[db.json](dataset/db.json)_ para o nosso servidor, onde nele contem:  
    1. Entradas de **alunos**, onde nelas encontra-se o ID, nome, cursos e instrumentos de cada aluno  
    1. Entradas de **cursos**, onde nelas encontra-se o ID, designação, duração e instrumento de cada curso  
    2. Entradas de **instrumentos**, onde nelas encontra-se o ID e o nome de cada instrumento  
2. Deveremos ter um **json-server** que deverá usar este dataset para servir como base de dados do serviço que vamos fornecer.  
3. Devemos criar um **servidor** em _Java Script_ onde este servidor irá buscar os pedidos dos clientes e responder-lhes.  
4. Os pedidos serão efetuados por **HTTP** onde iremos usar o **url** para identificar o que o cliente deseja.  
5. O servidor usará o json-server para buscar as informações na base de dados e depois irá apresentar a informação ao cliente.  
6. O servidor deverá ter uma **página inicial**, contendo _links_, que listará os **alunos**, **cursos** e **instrumentos** nesta Escola de Música.  
7. Em cada lista, o cliente poderá usar _Queries String_ ou clicar numa entrada, onde será apresentado apenas essa entrada com o seu **id** como título.  

## Lista de Resultados

1. Usando o dataset _[db.json](dataset/db.json)_, criei o json-server onde irei usar a porta **3000** para me comunicar com ele  
2. Para a criação do servidor, criei o ficheiro _[server.js](server.js)_ onde estou a usar a porta **1234** onde os clientes irão se comunicar com ele.  
Nesse servidor, apenas o método _HTTP_ **GET** está implementado, fazendo com que qualquer outro método dará o erro **501**, indicando que não foi implementado.  
Dentro dos métodos GET, existem possíveis _URLs_ que serão atendidas:  
    1. **/** : Este será a página inicial, onde irá apresentar os _links_ para as listagens do dataset;  
    2. **lista/item** : Este URL é um URL genérico para alunos, cursos e instrumentos. O parâmetro **lista** indica em que lista estamos a navegar e o parâmetro **item** indica qual item/entrada desejo ver, geralmente indicando o id desta entrada. Este URL apenas serve para indicar a informação de **uma única** entrada;  
    3. **lista** : Este URL também é um URL genérico e é usado quando o URL não ser match com o URL acima apresentado. Neste URL pode estar a _Query String_ que o cliente pretende efetuar, essa query string é enviada ao json-server e o servidor irá apresentar ao cliente todas as entradas que fizeram match;  
    4. Caso exista outra possível URL, o servidor indica um erro **404** indicando que não existe informação que satisfaça o pedido do cliente.  
3. O servidor utiliza o ficheiro **[html_aux.js](html_aux.js)**, ficheiro este que dado certos argumentos, cria automáticamente pacotes **HTTP** e cria ficheiros **HTML** que serão usados pelos browsers para apresentar os dados aos clientes  
4. Este TPC usa um _[favicon.ico](favicon.png)_ e um _[.css](w3.css)_ para apresentar as informações de uma maneira mais bonita. Usando tabelas e botões, em vez de linhas e links como foi usado no TPC anterior.  

## Exemplos de Uso

1. **Criar json-server :** json-server -w dataset/db.json  
2. **Abrir servidor :** node server.js  
3. **Ver página inicial :** http://localhost:1234  
4. **Ver página dos alunos :** http://localhost:1234/alunos  
5. **Ver página do aluno A36539 :** http://localhost:1234/alunos/A36539
6. **Ver página com todos os alunos que contém a palavra "IA" no nome ordenados alfabéticamente de forma decrescente :** http://localhost:1234/alunos?nome_like=IA&_sort=nome&_order=desc
