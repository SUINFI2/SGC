const {Usuario, usuarioSchema}= require('./usuario.model');
function setupModels(sequelize){
Usuario.schema(usuarioSchema,Usuario.config(sequelize))
}
module.exports = setupModels;
