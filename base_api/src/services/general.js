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

// Retorna se o objeto JSON(obj) possui algum dos atríbutos únicos(Attrs) já cadastrado por outro usuário 
const CheckOnlyAttrs = async (Model,Attrs,Obj) => {
    for(let i = 0; i < Attrs.length ; i++)
    {
        let user = await Model.findOne({where:{[Attrs[i]]:Obj[Attrs[i]]}})
        if(user)return {status:false,message:`Atributo ${Attrs[i]} já foi cadastrado por outro usuário`}
    }
   
    return {status:true}
}

module.exports = { JsonValidation, JsonOnlyAttrs, CheckOnlyAttrs }