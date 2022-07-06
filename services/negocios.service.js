const { boom } = require("@hapi/boom");

class NegociosService {
  constructor(){
    this.negocios = [
    {id: 'a1', nombre:"ng1"},
    {id: 'a2', nombre:"ng2"},
    {id: 'a3', nombre:"ng3"}
    ];
  }
  async create(data){}
  async find(){}
  async findOne(id){
    const negocio = await this.negocios.find(item => item.id===id);
    if(!negocio){ return false; }
    return negocio;
  }
  async update(id,changes){}
  async delete(){}
}
module.exports = NegociosService;
