const {Categoria, categoriaSchema}= require('./categoria.model');
const {Cliente, clienteSchema}= require('./cliente.model');
const {Proveedor, proveedorSchema}= require('./proveedor.model');
const {Usuario, usuarioSchema}= require('./usuario.model');
const {Producto, productoSchema}= require('./producto.model');
const {Negocio, negocioSchema}= require('./negocio.model');

function setupModels(sequelize){
/*Usuario.init(usuarioSchema,Usuario.config(sequelize));
Customer.init(customerSchema,Customer.config(sequelize));
Usuario.associate(sequelize.models);
Customer.associate(sequelize.models);*/
Negocio.init(negocioSchema,Negocio.config(sequelize));
Cliente.init(clienteSchema,Cliente.config(sequelize));
Proveedor.init(proveedorSchema,Proveedor.config(sequelize));
Categoria.init(categoriaSchema,Categoria.config(sequelize));
Producto.init(productoSchema,Producto.config(sequelize));

Negocio.associate(sequelize.models);
Cliente.associate(sequelize.models);
Proveedor.associate(sequelize.models);
Categoria.associate(sequelize.models);
Producto.associate(sequelize.models);


}
module.exports = setupModels;
