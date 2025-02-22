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
exports.criaHTTPError = (res,status_code,error) => {

    res.writeHead(status_code, {'Content-Type' : 'text/html;charset=utf-8'})
    console.log(error)
    res.end()

}

exports.home_page = (data) => {

    var string = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Escola de Música</title>
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
                        <li>
                            <a href="/cursos">Lista de Cursos</a>
                        </li>
                        <li>
                            <a href="/instrumentos">Lista de Instrumentos</a>
                        </li>
                    </ul>
                </div>


                <footer class="w3-container w3-gray">
                    <h5>EngWeb2025 - TPC2 - a104618 ${data}</h5>
                </footer>
            </div>
        </body>
    </html>
    `

    return string

}

exports.alunos = (alunos,aluno_id,data) => {

    var string = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Alunos</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-red">
                    <h1>Alunos${aluno_id == null ? '':' - ' + aluno_id}</h1>
                </header>
                <div class="w3-container">
                    <a href=${aluno_id == null ? "/" : "/alunos"} class="w3-button w3-gray">Voltar</a>
                    <table class="w3-table-all">
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Data de Nascimento</th>
                            <th>Curso</th>
                            <th>Ano do Curso</th>
                            <th>Instrumento</th>
                        </tr>`

    alunos.forEach(a => {
        string += `
        <tr>
            <td><a href=/alunos/${a.id}>${a.id}</a></td>
            <td>${a.nome}</td>
            <td>${a.dataNasc}</td>
            <td>${a.curso}</td>
            <td>${a.anoCurso}</td>
            <td>${a.instrumento}</td>
        </tr>
        `
    })

    string += `
                    </table>
                </div>


                <footer class="w3-container w3-red">
                    <h5>EngWeb2025 - TPC2 - a104618 ${data}</h5>
                </footer>
            </div>
        </body>
    </html>
    `
    return string

}

exports.cursos = (cursos,cursos_id,data) => {

    var string = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Cursos</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-yellow">
                    <h1>Cursos${cursos_id == null ? '':' - ' + cursos_id}</h1>
                </header>
                <div class="w3-container">
                    <a href=${cursos_id == null ? "/" : "/cursos"} class="w3-button w3-gray">Voltar</a>
                    <table class="w3-table-all">
                        <tr>
                            <th>ID</th>
                            <th>Designação</th>
                            <th>Duração</th>
                            <th>Instrumento - ID</th>
                            <th>Instrumento - Nome</th>
                        </tr>`

    cursos.forEach(c => {
        string += `
        <tr>
            <td><a href=/cursos/${c.id}>${c.id}</a></td>
            <td>${c.designacao}</td>
            <td>${c.duracao}</td>
            <td>${c.instrumento["id"]}</td>
            <td>${c.instrumento['#text']}</td>
        </tr>
        `
    })

    string += `
                    </table>
                </div>


                <footer class="w3-container w3-yellow">
                    <h5>EngWeb2025 - TPC2 - a104618 ${data}</h5>
                </footer>
            </div>
        </body>
    </html>
    `
    return string

}

exports.curso = (cursos,cursos_id,alunos,data) => {

    var string = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Curso</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-yellow">
                    <h1>Curso - ${cursos_id}</h1>
                </header>
                <div class="w3-container">
                    <a href="/cursos" class="w3-button w3-gray">Voltar</a>
                    <ul>`

    curso = cursos[0]

    string += `
            <li><b>ID : </b>${curso.id}</li>
            <li><b>Designação : </b>${curso.designacao}</li>
            <li><b>Duração : </b>${curso.duracao}</li>
            <li><b>Instrumento - ID : </b>${curso.instrumento["id"]}</li>
            <li><b>Instrumento - Nome : </b>${curso.instrumento['#text']}</li>
                `

    string += `     </ul>
                <p><b>Lista de Alunos do Curso:</b></p>
                </div>
                <div class="w3-container">
                    <table class="w3-table-all">
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Data de Nascimento</th>
                            <th>Curso</th>
                            <th>Ano do Curso</th>
                            <th>Instrumento</th>
                        </tr>`

    alunos.forEach(a => {
        string += `
        <tr>
            <td><a href=/alunos/${a.id}>${a.id}</a></td>
            <td>${a.nome}</td>
            <td>${a.dataNasc}</td>
            <td>${a.curso}</td>
            <td>${a.anoCurso}</td>
            <td>${a.instrumento}</td>
        </tr>
        `
    })

    string += `
                    </table>
                </div>


                <footer class="w3-container w3-yellow">
                    <h5>EngWeb2025 - TPC2 - a104618 ${data}</h5>
                </footer>
            </div>
        </body>
    </html>
    `
    return string

}
exports.instrumentos = (instrumentos,instrumento_id,data) => {

    var string = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Instrumentos</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-blue">
                    <h1>Instrumentos${instrumento_id == null ? '':' - ' + instrumento_id}</h1>
                </header>
                <div class="w3-container">
                    <a href=${instrumento_id == null ? "/" : "/instrumentos"} class="w3-button w3-gray">Voltar</a>
                    <table class="w3-table-all">
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                        </tr>`

    instrumentos.forEach(i => {
        string += `
        <tr>
            <td><a href=/instrumentos/${i['id']}>${i['id']}</a></td>
            <td>${i['#text']}</td>
        </tr>
        `
    })

    string += `
                    </table>
                </div>


                <footer class="w3-container w3-blue">
                    <h5>EngWeb2025 - TPC2 - a104618 ${data}</h5>
                </footer>
            </div>
        </body>
    </html>
    `
    return string

}

exports.instrumento = (instrumentos,instrumento_id,alunos,data) => {

    var string = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Instrumento</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-blue">
                    <h1>Instrumento - ${instrumento_id}</h1>
                </header>
                <div class="w3-container">
                    <a href="/instrumentos" class="w3-button w3-gray">Voltar</a>
                    <ul>`

    instrumento = instrumentos[0]

    string += `
            <li><b>ID : </b>${instrumento['id']}</li>
            <li><b>Nome : </b>${instrumento['#text']}</li>
                `

    string += `     </ul>
                <p><b>Lista de Alunos que tocam este Instrumento:</b></p>
                </div>
                <div class="w3-container">
                    <table class="w3-table-all">
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Data de Nascimento</th>
                            <th>Curso</th>
                            <th>Ano do Curso</th>
                            <th>Instrumento</th>
                        </tr>`

    alunos.forEach(a => {
        string += `
        <tr>
            <td><a href=/alunos/${a.id}>${a.id}</a></td>
            <td>${a.nome}</td>
            <td>${a.dataNasc}</td>
            <td>${a.curso}</td>
            <td>${a.anoCurso}</td>
            <td>${a.instrumento}</td>
        </tr>
        `
    })

    string += `
                    </table>
                </div>


                <footer class="w3-container w3-blue">
                    <h5>EngWeb2025 - TPC2 - a104618 ${data}</h5>
                </footer>
            </div>
        </body>
    </html>
    `
    return string

}