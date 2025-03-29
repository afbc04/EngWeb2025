# TPC6 - a104618 - Engenharia Web 2025

**Titulo :** TPC6 da UC Engenharia Web  
**Data :** 2025-03-29  
**UC :** Engenharia Web  
**Curso :** Licenciatura de Engenharia Informática 3º ano 2º semestre  
**Autor :**  
- **Nome :** André Filipe Barros Campos  
- **Número de aluno :** a104618  

![Fotografia do Aluno](../image.png)

## Resumo do TPC

1. Este TPC consiste em resolver o enunciado de um teste passado de Engenharia Web, cujo enunciado encontra-se num ficheiro pdf chamado **[semana7_api_mdb_alunos.pdf](semana7_api_mdb_alunos.pdf)**
2. Usaremos um dataset, num ficheiro csv chamado [contratos2024.csv](contratos2024.csv), para o nosso servidor, onde nele contém entradas de **contratos públicos**, onde nelas encontram-se várias informações sobre cada contrato. Estas informações estão disponíveis no site [dados.gov.pt](https://dados.gov.pt/pt/)  
2. Deveremos ter um **servidor em mongoDB** que deverá usar este dataset para servir como base de dados do serviço que vamos fornecer.  
3. Devemos criar um **servidor** em _NodeJS_ onde este servidor irá buscar os pedidos dos utilizadores e responder-lhes.  
4. Os pedidos serão efetuados por **HTTP** onde iremos usar o **url** para identificar o que o utilizador deseja.  
5. O servidor usará o mongoDB para buscar as informações na base de dados e depois irá apresentar a informação ao utilizador.  
6. O servidor deverá ter uma **página de contratos** que listará os **contratos** nesta Aplicação Web. Deverá ter também **páginas de entidades**, que listará as entidades existentes e os seus respetivos contratos.
7. Na lista de contratos, o utilizador poderá clicar numa entrada, onde será apresentado apenas essa entrada com o seu **id** como título e as suas informações. O utilizador também poderá clicar numa entidade e obter informações sobre essa entidade.
8. Neste TPC deveremos usar **EXPRESS** e templates **PUG** para frontend dos contratos. Este frontend deverá suportar as operações **CRUD :**  
    - **Create :** inserir dados
    - **Retrieve :** consultar/listar dados
    - **Update :** atualizar dados
    - **Delete :** apagar dados

## Procedimentos para a resolução deste TPC

Para a realização deste TPC foi necessário realizar queries em MongoDB e configurar 3 servidores diferentes: 
- MongoDB
- API
- Interface Web

### Queries MongoDB

A queries pedidas no **ponto 1.2.** encontram-se resolvidas no ficheiro em Markdown chamado **[queries.md](queries.md)**

### MongoDB

1. Para a criação do **mongoDB**, criei um volume em **docker** na aula teórica e irei usar essa, cujo nome é **mongoEW**  
2. Após analisar o [dataset](contratos2024.csv), apercebi-me que os valores números decimais estão separados por vírgula. Isto é um problema porque o mongoDB usa o ponto como separador nos números decimais. Por isso, alterei o dataset para os números fossem separados por ponto em vez de vírgula.
3. Após isso, precisei converter o ficheiro csv de contratos para ficheiro json. Para isso, utilizei o website [csvjson.com](https://csvjson.com/csv2json).
4. Alterei o campo **idcontrato** por **_id** para que o mongoDB reconheça esse campo como identificador da entrada e fiz as alterações necessárias para que o mongoDB conseguisse incorporar esse ficheiro json. 
5. O ficheiro resultante de todos estes processos chama-se **[db.json](apiContratos/database/db.json)**, encontrado na diretoria [apiContratos/database](apiContratos/database/).
6. Posteriormente, importei o ficheiro para o docker e criei a base de dados **contratos**, onde nela encontra-se a coleção **contratos**, coleção que foi criada com base no [ficheiro json](apiContratos/database/db.json) mencionado anteriormente. Um passo-a-passo para me auxiliar na realização destes procedimentos encontra-se no ficheiro [openServer.md](apiContratos/openServer.md)

### API

1. Para a criação da **API**, usei o **Express** para criar o servidor que irá suportar as operações CRUD dos contratos registados na base de dados em MongoDB.
2. Este servidor encontra-se na diretoria [apiContratos](apiContratos/), configurei-o para que use a porta **16000** e que usasse o router **contratos**.
3. No servidor API, temos 3 principais componentes:
    - **Model :** representa os dados na base de dados, valida-os, define-os e interage com a base de dados em MongoDB. O model encontra-se em [apiContratos/models](apiContratos/models/contrato.js)
    - **Controller :** contém a lógica de como as operações CRUD serão realizadas na base de dados, usando o model. O controller encontra-se em [apiContratos/controllers](apiContratos/controllers/contrato.js)
    - **Routes :** mapeiam quais operações CRUD terão que ser realizadas com base na **URL** e no método **HTTP**. O router encontra-se em [apiContratos/routes](apiContratos/routes/contratos.js)
4. A API que foi desenvolvida foi:
    - **GET /contratos :** Lista todos os contratos
    - **GET /contratos/:id :** Retorna o registo do contrato cujo ID é :id
    - **GET /contratos?entidade=EEEE :** Lista todos os contratos cuja entidade é EEEE
    - **GET /contratos?tipo=AAA :** Lista todos os contratos cujo tipo é AAA
    - **GET /contratos/entidades :** Lista todas as entidades comunicantes ordenada alfabeticamente e sem repetições
    - **GET /contratos/tipos :** Lista todos os tipos de procedimentos ordenada alfabeticamente e sem repetições
    - **POST /contratos :** Adiciona um novo contrato à Base de Dados
    - **DELETE /contratos/:id :** Elimina um contrato da Base de Dados cujo identificador é :id
    - **PUT /contratos/:id :** Atualiza o contrato da Base de Dados cujo identificador é :id
5. A lógica deste servidor de Rest API inicia-se no ficheiro [apiContratos/app.js](apiContratos/app.js)

### Interface Web

1. Para a criação do servidor usei o **express-generator** com views em **PUG**. O servidor inicia-se no ficheiro **[app.js](app.js)** e usa a porta **16001**.
2. Nesse servidor, apenas os métodos _HTTP_ **GET** e **POST** estão implementados, fazendo com que qualquer outro método dará o erro **500**.  
3. Dentro dos métodos, existem possíveis _URLs_ que serão atendidas:  
    - **GET :**
        1. **/** : Página que lista todos os contratos, onde cada contrato contém os campos:
            - idcontrato _(Tem um link para a página deste contrato)_
            - objectoContrato
            - dataCelebracao
            - precoContratual
            - NIPC_entidade_comunicante _(Tem um link para a página desta entidade)_
            - entidade_comunicante
        3. **/:id** : Página que apresenta as informações de um único contrato cujo ID é _:id_. Contém também um link para voltar à página principal. 
        4. **/registo** : Página que contém um formulário onde é possivel criar um novo contrato _(Opcional)_  
        5. **/edit/:id** : Página que contém um formuĺario onde é possivel alterar as informações do contrato cujo ID é _:id_  _(Opcional)_
        6. **/delete/:id** : Página que elimina o contrato com ID _:id_ da base de dados _(Opcional)_ 
        7. **/entidades** : Página que lista todas as entidades comunicantes ordenadas alfabéticamente _(Opcional)_
        8. **/entidades/:id :** Página que apresenta as informações de uma entidade comunicante cujo ID é _:id_. Nesta página:
            - Contém o ID e o nome da entidade comunicante
            - O somatório do valor dos contratos da entidade comunicante
            - Link para voltar à página principal
            - Tabela com a lista de contratos dessa entidade

    - **POST :**
        1. **/registo** : Como o URL é _/registo_, então significa que devo adicionar o contrato com base nos dados recebidos pelo pacote **HTTP** enviado pelo Utilizador  
        2. **/edit/:id** : Como o URL é _/edit/:id_, então significa que devo alterar os dados do contrato cujo ID é _:id_ com base nos dados recebidos pelo pacote **HTTP** enviado pelo Utilizador.  
    - Caso o utilizador utilize outros métodos ou URLs não reconhecidas, então envio ao utilizador mensagens com o _status code_ 500 ou 404, respetivamente, indicando que esses métodos não são atendidos ou URL não existe. 
    - Como o dataset é enorme, adicionei paginação, o que permite com que apenas 50 registos sejam apresentados na listagem de contratos. Caso o utilizador queira obter mais contratos, deverá avançar para a próxima página. As paginas estão identificadas a partir da URL **/page/:index**, onde _:index_ é o identificador da página. 
4. O Express trata automáticamente dos pedidos estáticos, ou seja, imagens ([favicon.png](public/images/favicon.png)) ou ficheiros [CSS](public/stylesheets/w3.css).  
5. As templates para os ficheiros HTML são feitas via **PUG**, templates estes que se encontram na pasta [views/](views/). Fiz template [layout](views/layout.pug) que será usada pelos outros templates, fiz template [error](views/error.pug) que apresenta unicamente erros e fiz templates para apresentar a informação ao utilizador como, por exemplo, a listagem de contratos ([contractList.pug](views/contractList.pug)) e as informações de um contrato ([contractPage.pug](views/contractPage.pug))
6. Por fim, usei **Routers** para definir o que o servidor deve fazer com base na **URL** e no método **HTTP** _(foi definido acima)_, onde uso a rota **index** para definir as URLs começadas com **/**. Esta rota encontra-se no ficheiro chamado [index.js](routes/index.js)

## Exemplos de Uso

Aqui estão exemplos de como usar o servidor web

### API

1. **Abrir docker :** sudo docker start mongoEW
2. **Iniciar servidor :** npm start  

_**Nota :** Toda a API está na diretoria apiContratos/_  

### Interface Web

1. **Abrir servidor :** npm start 
2. **Ver página dos contratos :** http://localhost:16001/
3. **Ver página do contrato 10424331 :** http://localhost:16001/10424331
4. **Ver página para registar um novo contrato :** http://localhost:16001/registo  
5. **Ver página para editar o contrato 10424331 :** http://localhost:16001/edit/10424331  
6. **Ver página dos contratos após eliminar o contrato 10424331 :** http://localhost:16001/delete/10424331
7. **Ver página número 27 dos contratos :** http://localhost:16001/page/27
8. **Ver página das entidades comunicantes :** http://localhost:16001/entidades
9. **Ver página da entidade comunicante 503190985 :** http://localhost:16001/entidades/503190985
