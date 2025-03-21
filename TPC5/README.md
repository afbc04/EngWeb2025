# TPC5 - a104618 - Engenharia Web 2025

**Titulo :** TPC5 da UC Engenharia Web  
**Data :** 2025-03-18  
**UC :** Engenharia Web  
**Curso :** Licenciatura de Engenharia Informática 3º ano 2º semestre  
**Autor :**  
- **Nome :** André Filipe Barros Campos  
- **Número de aluno :** a104618  

![Fotografia do Aluno](../image.png)

## Resumo do TPC

1. Usaremos o dataset, num ficheiro csv, para o nosso servidor, onde nele contem entradas de **alunos**, onde nelas encontra-se o ID, nome e o _link do github_ de cada aluno  
2. Deveremos ter um **servidor em mongoDB** que deverá usar este dataset para servir como base de dados do serviço que vamos fornecer.  
3. Devemos criar um **servidor** em _Java Script_ onde este servidor irá buscar os pedidos dos clientes e responder-lhes.  
4. Os pedidos serão efetuados por **HTTP** onde iremos usar o **url** para identificar o que o cliente deseja.  
5. O servidor usará o json-server para buscar as informações na base de dados e depois irá apresentar a informação ao cliente.  
6. O servidor deverá ter uma **página de alunos** que listará os **alunos** nesta Escola.  
7. Na lista de alunos, o cliente poderá clicar numa entrada, onde será apresentado apenas essa entrada com o seu **id** como título.
8. Neste TPC deveremos usar **EXPRESS** e templates **PUG** para frontend dos alunos. Este frontend deverá suportar as operações **CRUD :**  
    - **Create :** inserir dados
    - **Retrieve :** consultar/listar dados
    - **Update :** atualizar dados
    - **Delete :** apagar dados
8. A novidade deste TPC é que usaremos **MongoDB** num docker em vez de json-server.

## Procedimentos para a resolução deste TPC

Para a realização deste TPC foi necessário configurar 3 servidores diferentes: 
- MongoDB
- API
- Interface Web

### MongoDB

1. Para a criação do **mongoDB**, criei um volume em **docker** na aula teórica e vou usar essa, cujo nome é **mongoEW**  
2. A conversão do ficheiro csv de alunos para ficheiro json já foi realizada no TPC anterior:
    - **[TPC Base : TPC3](../TPC3/)**
    - [Ficheiro csv dos alunos](../TPC3/alunos.csv)
    - [Ficheiro json dos alunos](../TPC3/db.json)
3. Para que o json fosse legível para mongoDB, fiz alterações no ficheiro json, fazendo com que o mesmo fosse uma única lista formada de alunos. Ficheiro resultante é **[database/alunos.json](apiAlunos/database/alunos.json)**  
4. Após isso, importei o ficheiro para o docker e criei a base de dados **EW2025**, onde nela encontra-se a coleção **alunos**, coleção que foi criada com base no [ficheiro json](apiAlunos/database/alunos.json) mencionada anteriormente. Um passo-a-passo para me auxiliar na realização destes procedimentos encontra-se no ficheiro [openServer.md](apiAlunos/openServer.md)

### API

1. Para a criação da **API**, usei o **Express** para criar o servidor que irá suportar as operações CRUD dos alunos registados na base de dados em MongoDB.
2. Este servidor encontra-se na diretoria [apiAlunos](apiAlunos/), configurei-o para que use a porta **3000** e que usasse o router **alunos**.
3. No servidor API, temos 3 principais componentes:
    - **Model :** representa os dados na base de dados, valida-os, define-os e interage com a base de dados em MongoDB. O model encontra-se em [apiAlunos/models](apiAlunos/models/aluno.js)
    - **Controller :** contém a lógica de como as operações CRUD serão realizadas na base de dados, usando o model. O controller encontra-se em [apiAlunos/controllers](apiAlunos/controllers/aluno.js)
    - **Routes :** mapeiam quais operações CRUD terão que ser realizadas com base na **URL** e no método **HTTP**. O router encontra-se em [apiAlunos/routes](apiAlunos/routes/alunos.js)
4. A lógica deste servidor de Rest API inicia-se no ficheiro [apiAlunos/app.js](apiAlunos/app.js)

### Interface Web

1. Para a criação do servidor usei o **express-generator** com views em **PUG**. O servidor inicia-se no ficheiro **[app.js](app.js)** e uso a porta **7777**.
2. Nesse servidor, apenas os métodos _HTTP_ **GET** e **POST** estão implementados, fazendo com que qualquer outro método dará o erro **500**.  
3. Dentro dos métodos, existem possíveis _URLs_ que serão atendidas:  
    - **GET :**
        1. **/** : Redireciono para a página **/alunos**, pois é a única coleção no servidor. 
        2. **/alunos** : Página que lista todos os alunos.  
        3. **/alunos/:id** : Página que apresenta as informações de um único aluno cujo ID é _:id_.  
        4. **/alunos/registo** : Página que contém um formulário onde é possivel criar um novo aluno  
        5. **/alunos/edit/:id** : Página que contém um formuĺario onde é possivel alterar as informações do aluno cujo ID é _:id_  
        6. **/alunos/delete/:id** : Página que elimina o aluno com ID _:id_ da base de dados  
    - **POST :**
        1. **/alunos/registo** : Como o URL é _/alunos/registo_, então significa que devo adicionar o aluno com base nos dados recebidos pelo pacote **HTTP** enviado pelo Cliente  
        2. **/alunos/edit/:id** : Como o URL é _/alunos/edit/:id_, então significa que devo alterar os dados do aluno cujo ID é _:id_ com base nos dados recebidos pelo pacote **HTTP** enviado pelo Cliente.  
    - Caso o cliente utilize outros métodos ou URLs não reconhecidas, então envio ao cliente mensagens com o _status code_ 500 ou 404, respetivamente, indicando que esses métodos não são atendidos ou URL não existe.  
4. O Express trata automáticamente dos pedidos estáticos, ou seja, imagens ([favicon.png](public/images/favicon.png)) ou ficheiros [CSS](public/stylesheets/w3.css).  
5. As templates para os ficheiros HTML são feitas via **PUG**, templates estes que se encontram na pasta [views/](views/). Fiz template [layout](views/layout.pug) que será usada pelos outros templates, fiz template [error](views/error.pug) que apresenta unicamente erros e refiz todas as templates no [ficheiro JavaScript de templates](../TPC3/templates.js) em PUG.
6. Por fim, usei **Routers** para definir o que o servidor deve fazer com base na **URL** e no método **HTTP** _(foi definido acima)_, onde uso:
    - **alunos :** para definir as URLs começadas com **/alunos/**. Ficheiro chama-se [alunos.js](routes/alunos.js)
    - **index :** para definir as URLs começadas com **/**. Ficheiro chama-se [index.js](routes/index.js), mas como dito acima, apenas é usado para redirecionar o cliente para a página /alunos

## Exemplos de Uso

Aqui estão exemplos de como usar o servidor web

### API

1. **Abrir docker :** sudo docker start mongoEW
2. **Iniciar servidor :** npm start  

_**Nota :** Toda a API está na diretoria apiAlunos/_  

### Interface Web

1. **Abrir servidor :** npm start 
2. **Ver página dos alunos :** http://localhost:7777/alunos  
3. **Ver página do aluno A100893 :** http://localhost:7777/alunos/A100893
4. **Ver página para registar um novo aluno :** http://localhost:7777/alunos/registo  
5. **Ver página para editar o aluno A100893 :** http://localhost:7777/alunos/edit/A100893  
6. **Ver página dos alunos após eliminar o aluno A100893 :** http://localhost:7777/alunos/delete/A100893
