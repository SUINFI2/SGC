const pool = require('../libs/postgres.pool');
class UsuariosService {
  constructor(){
    this.pool = pool;
    this.pool.on('error',(err)=> console.log('err'));
  }
  async create(negocioId,data){}
  async find(negocioId){
    const query = 'SELECT * FROM tasks';
    const rta = await this.pool.query(query);
  return rta.rows;
  }
  async findOne(negocioId,usuarioId){}
  async update(negocioId,usuarioId,changes){}
  async delete(negocioId,usuarioId){}
}
module.exports = UsuariosService;
