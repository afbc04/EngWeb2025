var Aluno = require('../models/aluno')

//Lista todos os alunos
module.exports.list = () => {
    return Aluno
        .find()
        .sort({nome : 1})
        .exec() //Faz a query
}

//Encontra um aluno específico
module.exports.findById = (id) => {
    return Aluno
        .findOne({"_id" : id})
        .exec() //Faz a query
}

//Inserir o aluno
module.exports.insert = aluno => {
    var newAluno = new Aluno(aluno)
    return newAluno.save()
}

//Atualizar o aluno
module.exports.update = (id,aluno) => {
    return Aluno
        .findByIdAndUpdate(id,aluno, {new : true}) //{new : true} -> retorna o novo objeto
        .exec()
}

//Elimine o aluno
module.exports.delete = (id) => {
    return Aluno
        .findByIdAndDelete(id) //{new : true} -> retorna o novo objeto
        .exec()
}

/*
module.exports.inverteTpc = (id,tpcID) => {
    return Aluno
        .findById(id)
        .exec()
        .then(aluno => {
            var tpc = "tpc" + tpcID
            if (aluno[tpc] != null) {
                aluno[tpc] = !aluno[tpc]
            }
            else {
                aluno[tpc] = true
            }

            return Aluno
                .findByIdAndUpdate(id,aluno, {new : true})
                .exec()
        })
}*/

//Listar alunos que fizeram os tpcs
//Listar apenas os alunos que fizeram o tpc X
//Calcular médias de testes