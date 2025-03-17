# TPC4 - a104618 - Engenharia Web 2025

**Titulo :** TPC4 da UC Engenharia Web  
**Data :** 2025-03-16  
**UC :** Engenharia Web  
**Curso :** Licenciatura de Engenharia Informática 3º ano 2º semestre  
**Autor :**  
- **Nome :** André Filipe Barros Campos  
- **Número de aluno :** a104618  

![Fotografia de Aluno](../image.png)

## Resumo

1. Usaremos o dataset chamado _[cinema.json](database/cinema.json)_ para o nosso servidor, onde nele contem entradas de **filmes**, onde nelas encontra-se o ID, ano, o elenco _(atores que participaram no filme)_ e os géneros do mesmo  
2. Deveremos ter um **json-server** que deverá usar este dataset para servir como base de dados do serviço que vamos fornecer.  
3. Devemos criar um **servidor** em _Java Script_ onde este servidor irá buscar os pedidos dos clientes e responder-lhes.  
4. Os pedidos serão efetuados por **HTTP** onde iremos usar o **url** para identificar o que o cliente deseja.  
5. O servidor usará o json-server para buscar as informações na base de dados e depois irá apresentar a informação ao cliente.  
6. O servidor deverá ter uma **página inicial**, contendo _links_, que listará os **filmes** e **atores** nesta App Cinematográfica.  
7. Neste TPC, devemos ter as opções de ver, editar e remover filmes em **EXPRESS** e usar a linguagem **pug**.  

## Lista de Resultados

1. Para criar o json-server, criei um ficheiro python chamado _[gerarDB.py](database/gerarDB.py)_ que usa o dataset acima mencionado ([cinema.json](database/cinema.json)) e cria um novo dataset onde os campos **titulo** são subtituidos por _id_ e são criadas entradas para cada ator, indicando o seu nome e uma lista com todos os filmes onde o mesmo participa.  
2. Após obter o dataset **[db.json](database/db.json)** (obtido através do ficheiro python mencionado acima), criei o json-server onde irei usar a porta **3000** para me comunicar com ele.  
3. Para a criação do servidor, usei o **express** para me gerar um template de servidor web.
4. No ficheiro **[app.js](app.js)** indico para que ele utilize 2 rotas (**atores** e **filmes**) e configurei o ficheiro **[www](bin/www)** para que o servidor usasse a porta **7777**.  
5. Nesse servidor, apenas os métodos _HTTP_ **GET** e **POST** estão implementados, fazendo com que qualquer outro método dará o erro **500**.  
6. Dentro dos métodos, existem possíveis _URLs_ que serão atendidas:  
    - **GET :**
        1. **/** : Página Inicial que apenas tem entradas para a página de filmes ou para a página de atores  
        2. **/filmes** : Página que lista todos os filmes.  
        3. **/filmes/:id** : Página que apresenta as informações de um único filme cujo título é _:id_.  
        5. **/filmes/edit/:id** : Página que contém um formuĺario onde é possivel alterar as informações do filme cujo título é _:id_  
        6. **/filmes/delete/:id** : Página que elimina o filme cujo título é _:id_ da base de dados  
        7. **/atores** : Página que lista todos os atores.  
        8. **/atores/:id** : Página que apresenta as informações de um único ator cujo nome é _:id_.  
    - **POST :**
        2. **/filmes/edit/:id** : Como o URL é _/filmes/edit/:id_, então significa que devo alterar os dados do filme cujo título é _:id_ com base nos dados recebidos pelo pacote **HTTP** enviado pelo Cliente.  
    - Caso o cliente utilize outros métodos ou URLs não reconhecidas, então envio ao cliente mensagens com o _status code_ 500 ou 404, respetivamente, indicando que ocorreu algum erro ou URL não existe.    
7. O servidor utiliza a pasta **[public](public/)** para tratar de pedidos estáticos, ou seja, imagens ([favicon.png](public/images/favicon.png)) ou ficheiros [CSS](public/stylesheets/w3.css).  
8. O servidor também utiliza a pasta **[routes](routes/)** para tratar das [rotas da página inicial](routes/homePage.js), das [rotas dos filmes](routes/filmes.js) ou das [rotas dos atores](routes/atores.js)  
8. Uma das novidades deste TPC é que em vez de usar templates em _JavaScript_, usamos a linguagem **pug** para nos auxiliar na criação de páginas HTML. Dito isto, usei a pasta **[views](views/)**, que contém todos os ficheiros template para HTML usando pug, onde os templates para filmes encontram-se na pasta **[views/filmes](views/filmes/)** e os templates para atores encontram-se na pasta **[views/atores](views/atores/)**

## Exemplos de Uso

1. **Criar json-server :** json-server -w database/db.json  
2. **Abrir servidor :** npm start
3. **Ver página inicial :** http://localhost:7777  
4. **Ver página dos filmes :** http://localhost:7777/filmes  
5. **Ver página do filme Bait :** http://localhost:7777/filmes/Bait
7. **Ver página para editar o filme Bait :** http://localhost:7777/filmes/edit/Bait 
8. **Ver página dos filmes após eliminar o filme Bait :** http://localhost:7777/filmes/delete/Bait
9. **Ver página dos atores :** http://localhost:7777/atores
10. **Ver página do Ator "Glenn Close" :** http://localhost:7777/atores/Glenn%20Close