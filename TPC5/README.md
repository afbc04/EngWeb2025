# TPC5 - a104618 - Engenharia Web 2025

**Titulo :** TPC5 da UC Engenharia Web  
**Data :** 2025-03-18  
**UC :** Engenharia Web  
**Curso :** Licenciatura de Engenharia Informática 3º ano 2º semestre  
**Autor :**  
- **Nome :** André Filipe Barros Campos  
- **Número de aluno :** a104618  

![Fotografia do Aluno](../image.png)

## Resumo

1. Usaremos o dataset, num ficheiro csv, _[alunos.csv](alunos.csv)_ para o nosso servidor, onde nele contem entradas de **alunos**, onde nelas encontra-se o ID, nome e o _link do github_ de cada aluno  
2. Deveremos ter um **json-server** que deverá usar este dataset para servir como base de dados do serviço que vamos fornecer.  
3. Devemos criar um **servidor** em _Java Script_ onde este servidor irá buscar os pedidos dos clientes e responder-lhes.  
4. Os pedidos serão efetuados por **HTTP** onde iremos usar o **url** para identificar o que o cliente deseja.  
5. O servidor usará o json-server para buscar as informações na base de dados e depois irá apresentar a informação ao cliente.  
6. O servidor deverá ter uma **página inicial**, contendo _links_, que listará os **alunos** nesta Escola.  
7. Na lista de alunos, o cliente poderá usar _Queries String_ ou clicar numa entrada, onde será apresentado apenas essa entrada com o seu **id** como título.  
8. Neste TPC, para além de obter entradas de alunos, teremos as opções de inserir, atualizar ou eliminar entradas de alunos.  

## Lista de Resultados

1. Para criar o json-server, devo converter o ficheiro csv [alunos.csv](alunos.csv) num ficheiro JSON. Para este efeito, utilizo o website **[csvjson.com](https://csvjson.com/csv2json)** para converter o ficheiro CSV em JSON e altero o ficheiro JSON resultante para que este seja utilizado pelo json-server.  
2. Após obter o dataset **[db.json](db.json)**, criei o json-server onde irei usar a porta **3000** para me comunicar com ele.  
3. Para a criação do servidor, criei o ficheiro _[server.js](server.js)_ onde estou a usar a porta **7777** onde os clientes irão se comunicar com ele.  
4. Nesse servidor, apenas os métodos _HTTP_ **GET** e **POST** estão implementados, fazendo com que qualquer outro método dará o erro **501**, indicando que não foi implementado.  
5. Dentro dos métodos, existem possíveis _URLs_ que serão atendidas:  
    - **GET :**
        1. **/** : Página Inicial que apenas tem uma entrada para a página de alunos  
        2. **/alunos** : Página que lista todos os alunos. Este método aceita _Query Strings_.  
        3. **/alunos/:id** : Página que apresenta as informações de um único aluno cujo ID é _:id_.  
        4. **/alunos/registo** : Página que contém um formulário onde é possivel criar um novo aluno  
        5. **/alunos/edit/:id** : Página que contém um formuĺario onde é possivel alterar as informações do aluno cujo ID é _:id_  
        6. **/alunos/delete/:id** : Página que elimina o aluno com ID _:id_ da base de dados  
    - **POST :**
        1. **/alunos/registo** : Como o URL é _/alunos/registo_, então significa que devo adicionar o aluno com base nos dados recebidos pelo pacote **HTTP** enviado pelo Cliente  
        2. **/alunos/edit/:id** : Como o URL é _/alunos/edit/:id_, então significa que devo alterar os dados do aluno cujo ID é _:id_ com base nos dados recebidos pelo pacote **HTTP** enviado pelo Cliente.  
    - Caso o cliente utilize outros métodos ou URLs não reconhecidas, então envio ao cliente mensagens com o _status code_ 501 ou 404, respetivamente, indicando que esses métodos não estão disponíveis ou URL não existe.    
6. O servidor utiliza o ficheiro **[static.js](static.js)** para tratar de pedidos estáticos, ou seja, imagens ([favicon.png](public/favicon.png) e [student.png](public/student.png)) ou ficheiros [CSS](public/w3.css).  
7. O servidor também utiliza o ficheiro **[templates.js](templates.json)**, ficheiro este que dado certos argumentos, cria automáticamente páginas HTML e pacotes HTTP que serão usados para responder aos clientes.  

## Exemplos de Uso

1. **Criar json-server :** json-server -w db.json  
2. **Abrir servidor :** node server.js  
3. **Ver página inicial :** http://localhost:7777  
4. **Ver página dos alunos :** http://localhost:7777/alunos  
5. **Ver página do aluno A100893 :** http://localhost:7777/alunos/A100893
6. **Ver página com todos os alunos que contém a palavra "IA" no nome ordenados alfabéticamente de forma decrescente :** http://localhost:7777/alunos?nome_like=IA&_sort=nome&_order=desc
7. **Ver página para registar um novo aluno :** http://localhost:7777/alunos/registo  
8. **Ver página para editar o aluno A100893 :** http://localhost:7777/alunos/edit/A100893  
9. **Ver página dos alunos após eliminar o aluno A100893 :** http://localhost:7777/alunos/delete/A100893
