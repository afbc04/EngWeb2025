# Ficha de Aferição - a104618 - Engenharia Web 2025

**Titulo :** Ficha de Aferição da UC Engenharia Web  
**Data :** 2025-04-06  
**UC :** Engenharia Web  
**Curso :** Licenciatura de Engenharia Informática 3º ano 2º semestre  
**Autor :**  
- **Nome :** André Filipe Barros Campos  
- **Número de aluno :** a104618  

![Fotografia do Aluno](../image.png)

## Resumo da Ficha

1. Esta ficha encontra-se num ficheiro pdf chamado **[engweb2025_afericao.pdf](engweb2025_afericao.pdf)**
2. Usaremos um dataset, num ficheiro json chamado [dataset.json](ex1/database/dataset.json), para o nosso servidor, onde nele contém entradas de **livros**, onde nelas encontram-se várias informações sobre cada livro.
2. Deveremos ter um **servidor em mongoDB** que deverá usar este dataset para servir como base de dados do serviço que vamos fornecer.  
3. Devemos criar um **servidor** em _NodeJS_ onde este servidor irá buscar os pedidos dos utilizadores e responder-lhes.  
4. Os pedidos serão efetuados por **HTTP** onde iremos usar o **url** para identificar o que o utilizador deseja.  
5. O servidor usará o mongoDB para buscar as informações na base de dados e depois irá apresentar a informação ao utilizador.  
6. O servidor deverá ter uma **página de livros** que listará os **livros** nesta Aplicação Web. Deverá ter também **páginas de entidades**, que listará os autores existentes e os seus respetivos livros.
7. Na lista de livros, o utilizador poderá clicar numa entrada, onde será apresentado apenas essa entrada com o seu **id** como título e as suas informações. O utilizador também poderá clicar num autor e obter informações sobre esse autor.
8. Neste TPC deveremos usar **EXPRESS** e templates **PUG** para frontend dos contratos. Este frontend deverá suportar as operações **CRUD :**  
    - **Create :** inserir dados
    - **Retrieve :** consultar/listar dados
    - **Update :** atualizar dados
    - **Delete :** apagar dados

## Procedimentos para a resolução desta Ficha

Para a realização desta Ficha foi necessário realizar queries em MongoDB e configurar 3 servidores diferentes: 
- MongoDB
- API
- Interface Web

### Queries MongoDB

A queries pedidas no **ponto 1.2.** encontram-se resolvidas no ficheiro em Markdown chamado **[queries.md](queries.md)**

### MongoDB

1. Para a criação do **mongoDB**, criei um volume em **docker** na aula teórica e irei usar essa, cujo nome é **mongoEW**  
2. Após analisar o [dataset](ex1/database/dataset.json), apercebi-me que as listas estavam em formato de string em vez de lista e os números estavam em string em vez de números.
3. Alterei o campo **bookId** por **_id** para que o mongoDB reconheça esse campo como identificador da entrada e fiz as alterações necessárias para que o mongoDB conseguisse incorporar esse ficheiro json. 
4. Fiz um programa chamado **[gerarDB.py](ex1/database/gerarDB.py)** que criava os datasets prontos para serem importados no mongoDB.
5. Apercebi-me que iria precisar de um outro dataset contendo todos os autores e os seus livros, por isso fiz com que esse programa em python gerasse esse dataset com os autores.
6. Os datasets resultantes são:
    - **[livros.json](ex1/database/livros.json)** : dataset dos livros
    - **[autores.json](ex1/database/autores.json)** : dataset dos autores
7. Posteriormente, importei os ficheiros para o docker e criei a base de dados **livros**, onde nela encontra-se as coleções **livros**, coleção que foi criada com base no [livros.json](ex1/database/livros.json), e **autores**, coleção que foi criada com base no [autores.json](ex1/database/autores.json). 

#### Como importei os datasets para o mongoDB

1. **docker start mongoEW** : Iniciar o mongoDB
2. **docker cp ex1/database/livros.json mongoEW:/tmp** : Importar dataset dos livros
3. **docker cp ex1/database/autores.json mongoEW:/tmp** : Importar dataset dos autores
4. **docker exec -it mongoEW sh** : Abrir o interpretador de comandos no terminal
5. **mongoimport -d livros -c livros /tmp/livros.json --jsonArray** : Importar a coleção "livros" da base de dados "livros" para o mongoDB
6. **mongoimport -d livros -c autores /tmp/autores.json --jsonArray** : Importar a coleção "autores" da base de dados "livros" para o mongoDB
7. **mongosh** : Bash do MongoDB
8. **use livros** : Selecionar a base de dados "livros"

### API

1. Para a criação da **API**, usei o **Express** para criar o servidor que irá suportar as operações CRUD dos contratos registados na base de dados em MongoDB.
2. Este servidor encontra-se na diretoria [ex1/](ex1/), configurei-o para que use a porta **17000** e que usasse o router **index**.
3. No servidor API, temos 3 principais componentes:
    - **Model :** representa os dados na base de dados, valida-os, define-os e interage com a base de dados em MongoDB. O model encontra-se em [ex1/models](ex1/models/)
    - **Controller :** contém a lógica de como as operações CRUD serão realizadas na base de dados, usando o model. O controller encontra-se em [ex1/controllers](ex1/controllers/)
    - **Routes :** mapeiam quais operações CRUD terão que ser realizadas com base na **URL** e no método **HTTP**. O router encontra-se em [ex1/routes](ex1/routes/index.js)
4. A API que foi desenvolvida foi:
    - **GET /books :** Lista todos os livros
    - **GET /books/:id :** Retorna o registo do livro cujo ID é :id
    - **GET /books?charater=EEEE :** Lista todos os livros que têm a personagem EEEE
    - **GET /books?genre=AAA :** Lista todos os livros cujo género é AAA
    - **GET /books/genres :** Lista todos os géneros de livros ordenados alfabeticamente e sem repetições
    - **GET /books/characters :** Lista todos os personagens ordenados alfabeticamente e sem repetições
    - **POST /books :** Adiciona um novo livro à Base de Dados
    - **DELETE /books/:id :** Elimina um livro da Base de Dados cujo identificador é :id
    - **PUT /books/:id :** Atualiza o livro da Base de Dados cujo identificador é :id
5. A lógica deste servidor de Rest API inicia-se no ficheiro [ex1/app.js](ex1/app.js)

### Interface Web

1. Para a criação do servidor usei o **express-generator** com views em **PUG**. O servidor inicia-se no ficheiro **[ex2/app.js](ex2/app.js)** e usa a porta **17001**.
2. Nesse servidor, apenas o método _HTTP_ **GET** está implementado, fazendo com que qualquer outro método dará o erro **500**.  
3. Dentro dos métodos, existem possíveis _URLs_ que serão atendidas:  
    - **GET :**
        1. **/** : Página que lista todos os livros, onde cada contrato contém os campos:
            - id _(Tem um link para a página deste livro)_
            - title
            - author _(Tem um link para a página deste autor)_
            - publishDate
            - pages
        2. **/:id** : Página que apresenta as informações de um único livro cujo ID é _:id_. Contém também um link para voltar à página principal. 
        3. **/entidades/:idAutor :** Página que apresenta as informações de um autor cujo ID é _:id_. Nesta página:
            - Contém o ID e o nome do autor
            - A quantidade de livros deste autor
            - Link para voltar à página principal
            - Tabela com a lista de livros deste autor

    - Caso o utilizador utilize outros métodos ou URLs não reconhecidas, então envio ao utilizador mensagens com o _status code_ 500 ou 404, respetivamente, indicando que esses métodos não são atendidos ou URL não existe. 
    - Como o dataset é enorme, adicionei paginação, o que permite com que apenas 50 registos sejam apresentados na listagem de contratos. Caso o utilizador queira obter mais contratos, deverá avançar para a próxima página. As paginas estão identificadas a partir da URL **/page/:index**, onde _:index_ é o identificador da página. 
4. O Express trata automáticamente dos pedidos estáticos, ou seja, imagens ([favicon.png](ex2/public/images/favicon.png)) ou ficheiros [CSS](ex2/public/stylesheets/w3.css).  
5. As templates para os ficheiros HTML são feitas via **PUG**, templates estes que se encontram na pasta [ex2/views/](ex2/views/). Fiz template [layout](ex2/views/layout.pug) que será usada pelos outros templates, fiz template [error](ex2/views/error.pug) que apresenta unicamente erros e fiz templates para apresentar a informação ao utilizador como, por exemplo, a listagem de livros ([booksList.pug](ex2/views/booksList.pug)) e as informações de um livro ([bookPage.pug](ex2/views/bookPage.pug))
6. Por fim, usei **Routers** para definir o que o servidor deve fazer com base na **URL** e no método **HTTP** _(foi definido acima)_, onde uso a rota **index** para definir as URLs começadas com **/**. Esta rota encontra-se no ficheiro chamado [index.js](ex2/routes/index.js)

## Exemplos de Uso

Aqui estão exemplos de como usar o servidor web

### API

1. **Abrir docker :** docker start mongoEW
2. **Iniciar servidor :** npm start  

_**Nota :** Toda a API está na diretoria ex1/_  

### Interface Web

1. **Abrir servidor :** npm start 
2. **Ver página dos livros :** http://localhost:17001/
3. **Ver página do livro 10424331 :** http://localhost:17001/2767052-the-hunger-games
4. **Ver página número 27 dos livros :** http://localhost:17001/page/27
5. **Ver página do autor Harper Lee:** http://localhost:17001/entidades/author3

_**Nota :** Todo o Frontend está na diretoria ex2/_  
