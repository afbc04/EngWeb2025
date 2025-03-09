var fs = require('fs')

//Verifica se é estático
exports.IsStatic = (request) => {
    return /\/w3.css$/.test(request.url) || 
            /\/favicon.png$/.test(request.url) ||
            /\/student.png$/.test(request.url) ||
            /\/favicon.ico$/.test(request.url)
}

//Função que vai servir pedidos estáticos
exports.StaticHandler = (req, res) => {

    var partes = req.url.split('/')
    var file = partes[partes.length -1 ]

    fs.readFile('public/' + file, (erro, dados)=>{

        //Houve erros
        if(erro){
            console.log('Erro: ficheiro não encontrado ' + erro)
            res.statusCode = 404
            res.end('Erro: ficheiro não encontrado ' + erro)
        }
        //Não houve erros
        else{
            //Favicon
            if (file == 'favicon.ico') {
                res.setHeader('Content-Type', 'image/x-icon')
                res.end(dados)
            }
            //CSS
            else if (file == 'w3.css') {
                res.setHeader('Content-Type', 'text/css')
                res.end(dados)
            }
            //PNG
            else {
                res.setHeader('Content-Type', 'image/png')
                res.end(dados)
            }   

        }

    })

}