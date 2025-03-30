var mongoose = require('mongoose')

//Tabela de Contratos
var contratosSchema = new mongoose.Schema({
    _id : Number,
    nAnuncio : String,
    tipoprocedimento : String,
    objectoContrato : String,
    dataPublicacao : String,
    dataCelebracaoContrato : String,
    precoContratual : Number,
    prazoExecucao : Number,
    NIPC_entidade_comunicante : Number,
    entidade_comunicante : String,
    fundamentacao : String,
}, {versionKey : false})

//Conectar à tabela "Contratos"
module.exports = mongoose.model('contratos', contratosSchema)
