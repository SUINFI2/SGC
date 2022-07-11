const {Usuario, usuarioSchema}= require('./usuario.model');
function setupModels(sequelize){
Usuario.init(usuarioSchema,Usuario.config(sequelize));
}
module.exports = setupModels;
