const http = require('http')
const html_aux = require('./server/html_aux')
const axios = require('axios')

http.createServer((req,res, err) => {

    //Indica qual o método e qual o url requisitados pelo cliente
    console.log("METHOD: " + req.method)
    console.log("URL: " + req.url)

    //Método do request
    switch (req.method) {

        case "GET":
            
            //Página Inicial
            if (req.url == "/") {
                html_aux.criaHTTP(res,200,html_aux.home_page);
            }

            //Uma Reparação
            else if (req.url.match(/\/reparacoes\/.+/)) {

                //Obtem nif
                id = req.url.split("/")[2]

                axios.get(`http://localhost:3000/reparacoes?nif=${id}`)
                     //Em caso de sucesso
                     .then(resp => {

                        var reparacoes = resp.data

                        lista_reparacoes = []
                        //Inserir todas as reparações na lista
                        reparacoes.forEach(c => {
                            lista_reparacoes.push(c)
                        })

                        //Reparação não existe
                        if (lista_reparacoes.length == 0)
                            html_aux.criaHTTPError(res,404)
                        //Reparação existe
                        else
                            html_aux.criaHTTP(res,200,html_aux.reparacoes_id(lista_reparacoes))

                     })
                     //Em caso de erro
                     .catch(err => { html_aux.criaHTTPError(res,500,err) })

            }

            //Lista de Reparações
            else if (req.url.match(/\/reparacoes/)) {

                axios.get(`http://localhost:3000${req.url}`)
                     //Em caso de sucesso
                     .then(resp => {

                        var reparacoes = resp.data

                        lista_reparacoes = []
                        //Inserir todas as reparações na lista
                        reparacoes.forEach(c => {
                            lista_reparacoes.push(c)
                        })

                        html_aux.criaHTTP(res,200,html_aux.reparacoes(lista_reparacoes))

                     })
                     //Em caso de erro
                     .catch(err => { html_aux.criaHTTPError(res,500,err) })

            }

            //Uma Intervenção
            else if (req.url.match(/\/intervencoes\/.+/)) {

                //Obtem codigo
                id = req.url.split("/")[2]

                axios.get(`http://localhost:3000/intervencoes?codigo=${id}`)
                     //Em caso de sucesso
                     .then(resp => {

                        var intervencoes = resp.data

                        //Lista das intervenções
                        intervencoes_lista = []
                        //Colocar os dados chave-valor no map
                        intervencoes.forEach(i => {
                            intervencoes_lista.push(i)
                        })

                        //Intervenção não existe
                        if (intervencoes_lista.length == 0)
                            html_aux.criaHTTPError(res,404)
                        //Intervenção existe
                        else
                            html_aux.criaHTTP(res,200,html_aux.intervencoes_id(intervencoes_lista))

                     })
                     //Em caso de erro
                     .catch(err => { html_aux.criaHTTPError(res,500,err) })

            }

            //Lista de Intervenções
            else if (req.url.match(/\/intervencoes/)) {

                axios.get(`http://localhost:3000${req.url}`)
                     //Em caso de sucesso
                     .then(resp => {

                        var intervencoes = resp.data

                        //Lista de Intervenções
                        intervencoes_lista = []
                        //Colocar os dados chave-valor no map
                        intervencoes.forEach(i => {
                            intervencoes_lista.push(i)
                        })

                        //Cria html das intervenções
                        html_aux.criaHTTP(res,200,html_aux.intervencoes(intervencoes_lista))

                     })
                     //Em caso de erro
                     .catch(err => { html_aux.criaHTTPError(res,500,err) })

            }

            //Uma Marca
            else if (req.url.match(/\/veiculos\/.+/)) {

                //Obtem codigo
                id = req.url.split("/")[2]
                console.log(id)

                axios.get(`http://localhost:3000/veiculos?marca=${id}`)
                     //Em caso de sucesso
                     .then(resp => {

                        var marcas = resp.data

                        map_marcas = {}
                        map_marcas_modelos = {}
                        //Colocar os dados chave-valor no map
                        marcas.forEach(m => {

                            modelos_da_marca = m['modelos']
                            map_marcas_modelos[m['marca']] = {}

                            modelos_da_marca.forEach(mo => {

                                if (m['marca'][mo['modelo']] in map_marcas_modelos)
                                    map_marcas_modelos[m['marca']][mo['modelo']]++;
                                else 
                                    map_marcas_modelos[m['marca']][mo['modelo']] = 1

                            })

                            map_marcas[m['marca']] = m['quantidade']

                        })

                        //Marca existe
                        if (decodeURIComponent(id) in map_marcas) 
                            html_aux.criaHTTP(res,200,html_aux.veiculos_id(map_marcas,map_marcas_modelos,decodeURIComponent(id)))
                        //Marca não existe
                        else
                            html_aux.criaHTTPError(res,404)

                     })
                     //Em caso de erro
                     .catch(err => { html_aux.criaHTTPError(res,500,err) })

            }

            //Lista de Marcas
            else if (req.url.match(/\/veiculos/)) {

                axios.get(`http://localhost:3000${req.url}`)
                     //Em caso de sucesso
                     .then(resp => {

                        var marcas = resp.data

                        map_marcas = {}
                        map_marcas_modelos = {}
                        //Colocar os dados chave-valor no map
                        marcas.forEach(m => {

                            modelos_da_marca = m['modelos']
                            map_marcas_modelos[m['marca']] = {}

                            modelos_da_marca.forEach(mo => {

                                if (m['marca'][mo['modelo']] in map_marcas_modelos)
                                    map_marcas_modelos[m['marca']][mo['modelo']]++;
                                else
                                    map_marcas_modelos[m['marca']][mo['modelo']] = 1

                            })

                            map_marcas[m['marca']] = m['quantidade']

                        })

                        //Cria HTML para todas as marcas
                        html_aux.criaHTTP(res,200,html_aux.veiculos(map_marcas,map_marcas_modelos))

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