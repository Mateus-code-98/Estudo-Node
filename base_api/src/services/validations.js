// Retorna se um objeto JSON(Obj) passado no corpo de uma requisição possui todos os atributos(Attrs) obrigatórios
const JsonValidation = (Obj,Attrs) => {
    for( let i = 0 ; i < Attrs.length ; i++)if(!Obj[Attrs[i]])return {status:false,message:`Atributo '${Attrs[i]}' obrigatório!`}
    return {status:true}
}

// Retorna quais foram os atributos(Attrs) passados em um objeto JSON(Obj) no corpo de uma requisição
const JsonScanner = (Obj) => {
    const Attrs = []
    for (let property in Obj)Attrs.push(property)
    return Attrs
}

module.exports = { JsonValidation, JsonScanner }