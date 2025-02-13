//Cria automáticamente um pacote http
exports.criaHTTP = (res,status_code,html) => {

    res.writeHead(status_code, {'Content-Type' : 'text/html;charset=utf-8'})
    res.write(html)
    res.end()

}

//Cria automáticamente um pacote http - erro
exports.criaHTTPError = (res,status_code,error) => {

    res.writeHead(status_code, {'Content-Type' : 'text/html;charset=utf-8'})
    console.log(error)
    res.end()

}

exports.home_page = `
                    <h2>Oficina</h2>Indique o que deseja ver:<ul>
                    <li><b><a href=/reparacoes>Lista de Reparações</a></b>
                    <br>Todas as reparações identificadas pelos seus respetivos NIFs</li>
                    <br><li><b><a href=/intervencoes>Lista de Intervenções</a></b>
                    <br>Todas as intervenções identificadas pelos seus códigos</li>
                    <br><li><b><a href=/veiculos>Lista de Veículos</a></b>
                    <br>Todas as marcas e os seus respetivos modelos</li></ul>
                    `

//Cria HTML para todas as reparações
exports.reparacoes = (lista) => {

    string = `<h3><a href=/>Voltar</a></h3>`

    string += `<h1>Reparações</h1>
                <ul>`

    lista.forEach((r) => {

        data = r['data']
        nif = r['nif']
        nome = r['nome']
        viatura = r['viatura']
        marca = viatura['marca']
        modelo = viatura['modelo']
        matricula = viatura['matricula']
        nr_intervencoes = r['nr_intervencoes']

        string_url_reparacao = "/reparacoes/" + nif
        string_url_marca = "/veiculos/" + marca

        string += `<li>
                     \t<b>Data: </b>${data}<br>
                     \t<b>NIF: </b><a href=${string_url_reparacao}>${nif}</a><br>
                     \t<b>Nome: </b>${nome}<br>
                     \t<b>Marca: </b><a href=${string_url_marca}>${marca}</a><br>
                     \t<b>Modelo: </b>${modelo}<br>
                     \t<b>Matricula: </b>${matricula}<br>
                     \t<b>Número de Intervenções: </b>${nr_intervencoes}<br>
                     </li>`

        })

    string += "</ul>"
    
    return string

}

//Cria HTML para 1 única reparação
exports.reparacoes_id = (lista) => {

    string = `<h3><a href=/reparacoes>Voltar</a></h3>`

    r = lista[0]

    string += `<h1>${r['nif']}</h1>
                <ul>`

    data = r['data']
    nif = r['nif']
    nome = r['nome']
    viatura = r['viatura']
    marca = viatura['marca']
    modelo = viatura['modelo']
    matricula = viatura['matricula']
    nr_intervencoes = r['nr_intervencoes']

    string_url_marca = "/veiculos/" + marca

    string += `  \t<li><b>Data: </b>${data}<br></li>
                 \t<li><b>NIF: </b>${nif}<br></li>
                 \t<li><b>Nome: </b>${nome}<br></li>
                 \t<li><b>Marca: </b><a href=${string_url_marca}>${marca}</a><br></li>
                 \t<li><b>Modelo: </b>${modelo}<br></li>
                 \t<li><b>Matricula: </b>${matricula}<br></li>
                 \t<li><b>Número de Intervenções: </b>${nr_intervencoes}<br></li>`


    string += "</ul>"
    
    return string

}

//Cria HTML para todas as intervenções
exports.intervencoes = (lista) => {

    string = `<h3><a href=/>Voltar</a></h3>`

    string += `<h1>Intervenções</h1>
                <ul>`

    lista.forEach((i) => {
        
        codigo = i['codigo']
        nome = i['nome']
        descricao = i['descricao']

        string_url = "/intervencoes/" + codigo

        string += `<li>
                     \t<b>Código: </b><a href=${string_url}>${codigo}</a><br>
                     \t<b>Nome: </b>${nome}<br>
                     \t<b>Descrição: </b>${descricao}<br>
                     </li>`

        })

    string += "</ul>"
    
    return string

}

//Cria HTML para uma intervenção
exports.intervencoes_id = (lista) => {

    string = `<h3><a href=/intervencoes>Voltar</a></h3>`

    i = lista[0]

    string += `<h1>${i['codigo']}</h1>
                <ul>`

    codigo = i['codigo']
    nome = i['nome']
    descricao = i['descricao']

    string += ` \t<li><b>Código: </b>${codigo}<br></li>
                \t<li><b>Nome: </b>${nome}<br></li>
                \t<li><b>Descrição: </b>${descricao}<br></li>`

    string += "</ul>"
    
    return string

}

//Cria HTML para todas as marcas
exports.veiculos = (marcas,modelos) => {

    string = `<h3><a href=/>Voltar</a></h3>`

    string += `<h1>Veiculos</h1>
                <ul>`

    Object.keys(marcas).sort().forEach((ma) => {
        
        string += `<li><a href=/veiculos/${encodeURIComponent(ma)}><b>${ma}</b></a> - #${marcas[ma]}<ul>`

        //console.log(modelos[ma])

        Object.keys(modelos[ma]).sort().forEach((mo) => {
            //console.log(mo)
            string += `\t\t<li><b>${mo}</b> - #${modelos[ma][mo]}</li>`
        })

        string += `\t</ul></li>`

    })

    string += "</ul>"
    
    return string

}

//Cria HTML para uma marca
exports.veiculos_id = (marcas,modelos,id) => {

    string = `<h3><a href=/veiculos>Voltar</a></h3>`

    string += `<h1>${id}</h1>
                <ul>
                    <li><b>Quantidade :</b> ${marcas[id]}</li>
                    <li><b>Modelos :</b><ul>`

    Object.keys(modelos[id]).sort().forEach((mo) => {
        string += `\t\t<li><b>${mo}</b> - #${modelos[id][mo]}</li>`
    })

    string += "</ul></li></ul>"
    
    return string

}