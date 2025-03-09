//Cria automáticamente um pacote http
exports.criaHTTP = (res,status_code,html) => {

    res.writeHead(status_code, {'Content-Type' : 'text/html;charset=utf-8'})
    res.write(html)
    res.end()

}

//Cria automáticamente um pacote http para css
exports.criaHTTPCSS = (res,status_code,css) => {

    res.writeHead(status_code, {'Content-Type' : 'text/css'})
    res.write(css)
    res.end()

}

//Cria automáticamente um pacote http para imagem
exports.criaHTTPImage = (res,status_code,imagem) => {

    res.writeHead(status_code, {'Content-Type' : 'image/png'})
    res.write(imagem)
    res.end()

}

//Cria automáticamente um pacote http - erro
exports.criaHTTPError = (res,status_code,data,error) => {

    res.writeHead(status_code, {'Content-Type' : 'text/html;charset=utf-8'})
    res.write(HomeErro(data,error))
    console.log(error)
    res.end()

}

HomeErro = (data,erro) => {

    var string = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="icon" href="favicon.png"/>
            <title>:(</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-pink">
                    <h1>Ocorreu um erro :/</h1>
                </header>
                <div class="w3-container">
                    <p>Ocorreu um erro: ${erro}</p>
                    <p><b>Lista de Links uteis:</b></p>
                    <a class="w3-btn w3-ripple w3-round w3-gray" href="/alunos">Lista de Alunos</a>
                </div>


                <footer class="w3-container w3-pink">
                    <h5>EngWeb2025 - TPC3 - a104618 ${data}</h5>
                </footer>
            </div>
        </body>
    </html>
    `

    return string

}

exports.HomePage = (data) => {

    var string = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="icon" href="favicon.png"/>
            <title>Escola</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-gray">
                    <h1>Consultas</h1>
                </header>
                <div class="w3-container">
                    <ul class="w3-ul">
                        <li>
                            <a href="/alunos">Lista de Alunos</a>
                        </li>
                    </ul>
                </div>


                <footer class="w3-container w3-gray">
                    <h5>EngWeb2025 - TPC3 - a104618 ${data}</h5>
                </footer>
            </div>
        </body>
    </html>
    `

    return string

}


exports.studentsListPage = function(slist, d,tipo,aluno_id){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
            <title>Gestor de Alunos</title>
        </head>
        <body>
            <div class="w3-card-4">

                <header class="w3-container w3-indigo">
                    <h1>Lista de Alunos
                    </h1>
                    
                </header>`

    //Criado
    if (tipo == 1) {

        pagHTML += `<header class="w3-container w3-teal">
                    <h3>Aluno ${aluno_id} foi adicionado!
                    </h3>
                </header>`

    }

    //Editado
    if (tipo == 2) {

        pagHTML += `<header class="w3-container w3-light-blue">
                    <h3>Aluno ${aluno_id} foi editado!
                    </h3>
                </header>`

    }

    //Eliminado
    if (tipo == 3) {

        pagHTML += `<header class="w3-container w3-red">
                    <h3>Aluno ${aluno_id} foi removido!
                    </h3>
                </header>`

    }

    pagHTML += `<header class="w3-container w3-white">
                    <h6> 
                    </h6>
                    
                </header>

                <div class="w3-container">
                    <a href="/" class="w3-button w3-gray">Voltar</a>
                    <a class="w3-btn w3-ripple w3-round w3-teal" href="/alunos/registo">Adicionar Aluno</a>
                    <table class="w3-table-all">
                        <tr>
                            <th>ID</th><th>Nome</th><th>Link do Github</th>
                            <th>Actions</th>
                        </tr>
                `
    for(let i=0; i < slist.length ; i++){
        pagHTML += `
                <tr>
                    <td>${slist[i].id}</td>
                    <td>
                        <a href="/alunos/${slist[i].id}">
                            ${slist[i].nome}
                        </a>
                    </td>
                    <td>${slist[i].gitlink}</td>
                    <td>
                        <a href="/alunos/edit/${slist[i].id}"><i class="fa fa-edit"></i></a>
                        <a href="/alunos/delete/${slist[i].id}"><i class="fa fa-trash"></i></a>
                    </td>
                </tr>
        `
    }

    pagHTML += `
            </table>
            </div>
                <footer class="w3-container w3-indigo">
                    <h5>EngWeb2025 - TPC3 - a104618 ${d}</h5>
                </footer>
            </div>
        </body>
    </html>
    `
    return pagHTML
}

exports.studentFormPage = function(d){
    return `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
            <title>Adicionar Aluno</title>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-teal">
                    <h2>Adicionar Aluno</h2>
                </header>
            
                <a href="/alunos" class="w3-button w3-gray">Voltar</a>
                <form class="w3-container" method="POST">
                    <fieldset>
                        <legend>Dados</legend>
                        <label>ID</label>
                        <input class="w3-input w3-round" type="text" name="id" required pattern="^(A|PG).*" title="O ID deve começar com \"A\" ou \"PG\"."/>
                        <label>Nome</label>
                        <input class="w3-input w3-round" type="text" name="nome" required/>
                        <label>Link do Github</label>
                        <input class="w3-input w3-round" type="text" name="gitlink" required/>
                    </fieldset>

                    <fieldset>
                        <legend>TPC</legend>
                        <input class="w3-check" type="checkbox" name="tpc1" value="1"/>
                        <label>TPC1</label>
                        <input class="w3-check" type="checkbox" name="tpc2" value="1"/>
                        <label>TPC2</label>
                        <input class="w3-check" type="checkbox" name="tpc3" value="1"/>
                        <label>TPC3</label>
                        <input class="w3-check" type="checkbox" name="tpc4" value="1"/>
                        <label>TPC4</label>
                        <input class="w3-check" type="checkbox" name="tpc5" value="1"/>
                        <label>TPC5</label>
                        <input class="w3-check" type="checkbox" name="tpc6" value="1"/>
                        <label>TPC6</label>
                        <input class="w3-check" type="checkbox" name="tpc7" value="1"/>
                        <label>TPC7</label>
                        <input class="w3-check" type="checkbox" name="tpc8" value="1"/>
                        <label>TPC8</label>
                    </fieldset>  
                    <br/>
                    <button class="w3-btn w3-gray w3-mb-2" type="submit">Registar</button>
                </form>

                <footer class="w3-container w3-teal">
                    <h5>EngWeb2025 - TPC3 - a104618 ${d}</h5>
                </footer>
            
            </div>
    `
}

exports.studentFormEditPage = function(a, d){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
            <title>Editar Aluno</title>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-light-blue">
                    <h2>Editar Aluno</h2>
                </header>

                <a href="/alunos" class="w3-button w3-gray">Voltar</a>
                <form class="w3-container" method="POST">
                    <fieldset>
                        <legend>Dados</legend>
                        <label>ID</label>
                        <input class="w3-input w3-round" type="text" name="id" readonly value="${a.id}"/>
                        <label>Nome</label>
                        <input class="w3-input w3-round" type="text" name="nome" value="${a.nome}"/>
                        <label>Link do GitHub</label>
                        <input class="w3-input w3-round" type="text" name="gitlink" value="${a.gitlink}"/>
                    </fieldset>

                    <fieldset>
                        <legend>TPC</legend>
                    `

    for(i=1; i < 9; i++){
        var tpc = "tpc" + i
        if(tpc in a){
            pagHTML += `<input class="w3-check" type="checkbox" name="tpc${i}" value="1" checked/>
                        <label>TPC${i}</label>
                        `
        }
        else{
            pagHTML += `<input class="w3-check" type="checkbox" name="tpc${i}" value="1"/>
                        <label>TPC${i}</label>
                        `
        }
    }                

    pagHTML += `
                    </fieldset>  
                    <br/>
                    <button class="w3-btn w3-teal w3-mb-2" type="submit">Edit</button>
                </form>

                <footer class="w3-container w3-light-blue">
                    <h5>EngWeb2025 - TPC3 - a104618 ${d}</h5>
                </footer>
            
            </div>
    `
    return pagHTML
}

// ---------------Student's Page--------------------------------
// Change and adapt to current dataset...
exports.studentPage = function( aluno, d ){
    var pagHTML = `
    <html>
    <head>
        <title>Aluno: ${aluno.id}</title>
        <meta charset="utf-8"/>
        <link rel="icon" href="favicon.png"/>
        <link rel="stylesheet" href="w3.css"/>
    </head>
    <body>
        <div class="w3-card-4">
            <header class="w3-container w3-indigo">
                <h1>Aluno ${aluno.id}</h1>
            </header>

            <div class="w3-container">
                <a href="/alunos" class="w3-button w3-gray">Voltar</a>
                <a class="w3-btn w3-ripple w3-round w3-light-blue" href="/alunos/edit/${aluno.id}">Editar Aluno</a>
                <a class="w3-btn w3-ripple w3-round w3-red" href="/alunos/delete/${aluno.id}">Remover Aluno</a>
                <ul class="w3-ul w3-card-4" style="width:50%">
                    <li><b>ID: </b> ${aluno.id}</li>
                    <li><b>Nome: </b> ${aluno.nome}</li>
                    <li><b>Link do github: </b> <a href="${aluno.gitlink}">${aluno.gitlink}</a></li>
                </ul>
            </div>
            <div class="w3-container w3-margin-8">
                <ul class="w3-ul">
            `
            for(let i=1; i < 9; i++){
                key = `tpc${i}`
                if(key in aluno){
                    pagHTML += `
                        <li><b>TPC${i}</b></li>
                    `
                }
            }
    

    pagHTML +=     `</ul></div>
            <footer class="w3-container w3-indigo">
                    <h5>EngWeb2025 - TPC3 - a104618 ${d}</h5>
            </footer>
        </div>
    </body>
    </html>
    `
    return pagHTML
}

// -------------- Error Treatment ------------------------------
exports.errorPage = function(errorMessage, d){
    return `
    <p>${d}: Error: ${errorMessage}</p>
    `
}