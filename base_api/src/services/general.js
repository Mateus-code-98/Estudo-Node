// Retorna se um objeto JSON(Obj) passado no corpo de uma requisição possui todos os atributos(Attrs) obrigatórios
const JsonValidation = (Obj,Attrs) => {
    for( let i = 0 ; i < Attrs.length ; i++)if(!Obj[Attrs[i]])return {status:false,message:`Atributo '${Attrs[i]}' obrigatório!`}
    return {status:true}
}

// Retorna o objeto JSON(Obj) apenas com os atributos necessários
const JsonOnlyAttrs = (Obj,Attrs) => {
    const newObj = {}
    for( let i = 0 ; i < Attrs.length ; i++)if(Obj[Attrs[i]])newObj[Attrs[i]] = Obj[Attrs[i]]
    return newObj
}

module.exports = { JsonValidation, JsonOnlyAttrs }