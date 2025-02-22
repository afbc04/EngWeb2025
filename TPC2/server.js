const http = require('http')
const html_aux = require('./html_aux')
const axios = require('axios')
const readFile = require('fs')

http.createServer((req,res, err) => {

    //Coletar data
    var data = new Date().toISOString().substring(0,16)
    //Indica qual o método e qual o url requisitados pelo cliente
    console.log(req.method + " " + req.url + " " + data)

    //Método do request
    switch (req.method) {

        case "GET":
            
            //Página Inicial
            if (req.url == "/") {
                html_aux.criaHTTP(res,200,html_aux.home_page(data))
            }
            //Obter CSS
            else if (req.url.match(/w3\.css$/)) {

                readFile.readFile("w3.css",function(erro,dados) {
        
                    if (erro) {
                        html_aux.criaHTTPError(res,404,erro)
                    }
                    else {
                        html_aux.criaHTTPCSS(res,200,dados)
                    }
        
                })
        
            }
            //Obter icon
            else if (req.url.match(/favicon\.ico$/)) {

                readFile.readFile("favicon.png",function(erro,dados) {
        
                    if (erro) {
                        html_aux.criaHTTPError(res,404,erro)
                    }
                    else {
                        html_aux.criaHTTPImage(res,200,dados)
                    }
        
                })
        
            }
            //Um Aluno
            else if (req.url.match(/\/alunos\/.+/)) {
                var aluno_id = req.url.split('/')[2]

                axios.get(`http://localhost:3000/alunos?id=${aluno_id}`)
                     //Em caso de sucesso
                     .then(resp => {

                        var alunos = resp.data
                        html_aux.criaHTTP(res,200,html_aux.alunos(alunos,aluno_id,data))

                     })
                     //Em caso de erro
                     .catch(err => { html_aux.criaHTTPError(res,500,err) })

            }
            //Lista de Alunos
            else if (req.url.match(/\/alunos.*/)) {

                axios.get(`http://localhost:3000${req.url}`)
                     //Em caso de sucesso
                     .then(resp => {

                        var alunos = resp.data
                        html_aux.criaHTTP(res,200,html_aux.alunos(alunos,null,data))

                     })
                     //Em caso de erro
                     .catch(err => { html_aux.criaHTTPError(res,500,err) })

            }
            //Um Curso
            else if (req.url.match(/\/cursos\/.+/)) {
                var curso_id = req.url.split('/')[2]

                axios.get(`http://localhost:3000/cursos?id=${curso_id}`)
                     //Em caso de sucesso
                     .then(resp => {

                        var cursos = resp.data

                        axios.get(`http://localhost:3000/alunos?curso=${curso_id}`)
                            .then(resp2 => {
                                alunos = resp2.data
                                html_aux.criaHTTP(res,200,html_aux.curso(cursos,curso_id,alunos,data))
                            })
                            .catch(err2 => {})


                     })
                     //Em caso de erro
                     .catch(err => { html_aux.criaHTTPError(res,500,err) })

            }
            //Lista de Cursos
            else if (req.url.match(/\/cursos.*/)) {

                axios.get(`http://localhost:3000${req.url}`)
                     //Em caso de sucesso
                     .then(resp => {

                        var cursos = resp.data
                        html_aux.criaHTTP(res,200,html_aux.cursos(cursos,null,data))

                     })
                     //Em caso de erro
                     .catch(err => { html_aux.criaHTTPError(res,500,err) })

            }
            //Um Instrumento
            else if (req.url.match(/\/instrumentos\/.+/)) {
                var instrumento_id = req.url.split('/')[2]

                axios.get(`http://localhost:3000/instrumentos?id=${instrumento_id}`)
                     //Em caso de sucesso
                     .then(resp => {

                        var instrumentos = resp.data

                        axios.get(`http://localhost:3000/alunos?instrumento=${instrumentos[0]['#text']}`)
                            .then(resp2 => {
                                alunos = resp2.data
                                html_aux.criaHTTP(res,200,html_aux.instrumento(instrumentos,instrumento_id,alunos,data))
                            })
                            .catch(err2 => {})


                     })
                     //Em caso de erro
                     .catch(err => { html_aux.criaHTTPError(res,500,err) })

            }
            //Lista de Instrumentos
            else if (req.url.match(/\/instrumentos.*/)) {

                axios.get(`http://localhost:3000${req.url}`)
                     //Em caso de sucesso
                     .then(resp => {

                        var instrumentos = resp.data
                        html_aux.criaHTTP(res,200,html_aux.instrumentos(instrumentos,null,data))

                     })
                     //Em caso de erro
                     .catch(err => { html_aux.criaHTTPError(res,500,err) })

            }
            //Não foi encontrado nenhum url válido
            else {
                html_aux.criaHTTPError(res,404)        
            }

        break;

        //Outros métodos (POST,DELETE,UPDATE)
        default:
            res.writeHead(501, {'Content-Type' : 'text/html;charset=utf-8'})
            res.end()
        break;
        
    }
    

}).listen(1234)

console.log("Servidor na porta 1234")
