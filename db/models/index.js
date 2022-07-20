const {Categoria, categoriaSchema}= require('./categoria.model');
const {Cliente, clienteSchema}= require('./cliente.model');
const {Cuenta, cuentaSchema}= require('./cuenta.model');
const {Compra,compraSchema}= require('./compra.model');
const {Venta,ventaSchema}= require('./venta.model');
const {VentaProducto, ventaProductoSchema}= require('./venta-producto');
const {CompraProducto, compraProductoSchema}= require('./compra-producto.model');
const {DepositoProducto, depositoProductoSchema}= require('./deposito-producto');
const {Deposito, depositoSchema}= require('./deposito.model');
const {Descuento, descuentoSchema}= require('./descuento.model');
const {Proveedor, proveedorSchema}= require('./proveedor.model');
const {Usuario, usuarioSchema}= require('./usuario.model');
const {Producto, productoSchema}= require('./producto.model');
const {Negocio, negocioSchema}= require('./negocio.model');
const {Pago, pagoSchema}= require('./pago.model');
const {Cobro, cobroSchema}= require('./cobro.model');

function setupModels(sequelize){

Negocio.init(negocioSchema,Negocio.config(sequelize));
Usuario.init(usuarioSchema,Usuario.config(sequelize));
Cliente.init(clienteSchema,Cliente.config(sequelize));
Proveedor.init(proveedorSchema,Proveedor.config(sequelize));
Cuenta.init(cuentaSchema,Cuenta.config(sequelize));
Categoria.init(categoriaSchema,Categoria.config(sequelize));
Producto.init(productoSchema,Producto.config(sequelize));
Deposito.init(depositoSchema,Deposito.config(sequelize));
Descuento.init(descuentoSchema,Descuento.config(sequelize));

Cobro.init(cobroSchema,Cobro.config(sequelize));
Compra.init(compraSchema,Compra.config(sequelize));
Pago.init(pagoSchema,Pago.config(sequelize));
Venta.init(ventaSchema,Venta.config(sequelize));
VentaProducto.init(ventaProductoSchema,VentaProducto.config(sequelize));
CompraProducto.init(compraProductoSchema,CompraProducto.config(sequelize));
DepositoProducto.init(depositoProductoSchema,DepositoProducto.config(sequelize));

Negocio.associate(sequelize.models);
Usuario.associate(sequelize.models);
Cliente.associate(sequelize.models);
Proveedor.associate(sequelize.models);
Cuenta.associate(sequelize.models);
Categoria.associate(sequelize.models);
Producto.associate(sequelize.models);
Deposito.associate(sequelize.models);
Descuento.associate(sequelize.models);
Cobro.associate(sequelize.models);
Venta.associate(sequelize.models);
Compra.associate(sequelize.models);
Pago.associate(sequelize.models);

}
module.exports = setupModels;
