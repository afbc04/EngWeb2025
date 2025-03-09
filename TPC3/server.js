var http = require('http')
var axios = require('axios')
const { parse } = require('querystring');

var templates = require('./templates')
var static = require('./static.js')

// Aux functions
function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

var alunosServer = http.createServer((req, res) => {

    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    //São métodos estáticos
    if(static.IsStatic(req)){
        static.StaticHandler(req, res)
    }
    //Não são métodos estáticos
    else{
        switch(req.method){
            case "GET": 

                //Home page
                if (req.url == "/") {

                    templates.criaHTTP(res,200,templates.HomePage(d))

                }

                // GET /alunos/:id --------------------------------------------------------------------
                else if (req.url.match(/\/alunos\/(A|PG)\d+$/)) {

                    id = req.url.split("/")[2]
                    axios.get("http://localhost:3000/alunos?id=" + id)
                        .then(resp => {

                            var aluno = resp.data
                            templates.criaHTTP(res,200,templates.studentPage(aluno[0],d,0,null))
                            
                        })
                        .catch(erro => {
                            templates.criaHTTPError(res,500,d,erro)
                        })

                } 

                // GET /alunos/registo --------------------------------------------------------------------
                else if (req.url == "/alunos/registo") {

                    templates.criaHTTP(res,200,templates.studentFormPage(d))

                }   


                // GET /alunos/edit/:id --------------------------------------------------------------------
                else if (req.url.match(/\/alunos\/edit\/(A|PG)\d+$/)) {

                    id = req.url.split("/")[3]

                    axios.get("http://localhost:3000/alunos/" + id)
                        .then(resp => {
                            templates.criaHTTP(res,200,templates.studentFormEditPage(resp.data,d))
                        })
                        .catch(erro => {
                            templates.criaHTTPError(res,500,d,erro)
                        })

                }   


                // GET /alunos/delete/:id --------------------------------------------------------------------
                else if (req.url.match(/\/alunos\/delete\/(A|PG)\d+$/)) {

                    id = req.url.split("/")[3]
                    axios.delete("http://localhost:3000/alunos/" + id)
                        .then(() => {

                            axios.get("http://localhost:3000/alunos")
                                .then(resp => {
                                
                                    var alunos = resp.data
                                    templates.criaHTTP(res,200,templates.studentsListPage(alunos,d,3,id))

                                })
                                .catch(erro => {
                                    templates.criaHTTPError(res,500,d,erro)
                                })
                            
                        })
                        .catch(erro => {
                            templates.criaHTTPError(res,500,d,erro)
                        })

                }   


                // GET /alunos --------------------------------------------------------------------
                else if (req.url.match(/\/alunos/)) {

                    axios.get("http://localhost:3000" + req.url)
                        .then(resp => {

                            var alunos = resp.data
                            templates.criaHTTP(res,200,templates.studentsListPage(alunos,d,0,null))
                            
                        })
                        .catch(erro => {
                            templates.criaHTTPError(res,500,d,erro)
                        })

                }  

                // GET ? -> Lancar um erro
                else {
                    templates.criaHTTPError(res,404,d,"")
                }

            break


            case "POST":
                // POST /alunos/registo --------------------------------------------------------------------
                if (req.url == "/alunos/registo") {

                    collectRequestBodyData(req, result => {

                        if (result) {
                            
                            axios.post("http://localhost:3000/alunos",result)
                                .then(resp => {

                                    axios.get("http://localhost:3000/alunos")
                                        .then(resp => {

                                            var alunos = resp.data
                                            aluno_id = result.id
                                            templates.criaHTTP(res,201,templates.studentsListPage(alunos,d,1,aluno_id))
                            
                                        })
                                        .catch(erro => {
                                            templates.criaHTTPError(res,500,d,erro)
                                        })
                                        
                                })
                                .catch(erro => {
                                    templates.criaHTTPError(res,500,d,erro)
                                })

                        }
                        //Resultado não existe
                        else {
                            templates.criaHTTPError(res,500,d,"NO BODY DATA")
                        }

                    })

                }   


                // POST /alunos/edit/:id --------------------------------------------------------------------
                // PUT -> é update
                else if (req.url.match(/\/alunos\/edit\/(A|PG)\d+$/)) {

                    collectRequestBodyData(req, result => {

                        if (result) {

                            axios.put("http://localhost:3000/alunos/" + result.id,result)
                                .then(resp => {

                                    axios.get("http://localhost:3000/alunos")
                                        .then(resp => {

                                            var alunos = resp.data
                                            aluno_id = result.id
                                            templates.criaHTTP(res,201,templates.studentsListPage(alunos,d,2,aluno_id))
                            
                                        })
                                        .catch(erro => {
                                            templates.criaHTTPError(res,500,d,erro)
                                        })

                                })
                                .catch(erro => {
                                    templates.criaHTTPError(res,500,d,erro)
                                })

                        }
                        //Resultado não existe
                        else {
                            templates.criaHTTPError(res,500,d,"NO BODY DATA")
                        }

                    })

                }   


                // POST ? -> Lancar um erro
                else  {
                    templates.criaHTTPError(res,404,d,"")
                }   

            break;

            default: 
                // Outros metodos nao sao suportados
                templates.criaHTTPError(res,501,d,"")
            break;

                
        }
    }
})

alunosServer.listen(7777, ()=>{
    console.log("Servidor à escuta na porta 7777...")
})



