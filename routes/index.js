const express = require('express');
/*
const categoriasRouter = require('./categorias.router');
const clientesRouter = require('./clientes.router');
const cobrosRouter = require('./cobros.router');
const comprasRouter = require('./compras.router');
const cuentasRouter = require('./cuentas.router');
const gastosRouter = require('./gastos.router');
const impresorasRouter = require('./impresoras.router');
const negociosRouter = require('./negocios.router');
const pagosRouter = require('./pagos.router');
const personasRouter = require('./personas.router');
const produccionesRouter = require('./producciones.router');
*/
const productosRouter = require('./productos.router.js');
/*
const proveedoresRouter = require('./proveedores.router');
const rolesRouter = require('./roles.router');
const trasladosMPRouter = require('./trasladosMP.router');
const trasladosProductoRouter = require('./trasladosProducto.router');
const usuariosRouter = require('./usuarios.router');
const ventasRouter = require('./ventas.router');
*/
function routerApi(app) {
    const router = express.Router();
    app.use('/api/v1',router);
    router.use('/productos', productosRouter);
/*
 app.use('/categorias', categoriasRouter);
 app.use('/clientes', clientesRouter);
 app.use('/cobros', cobrosRouter);
 app.use('/compras', comprasRouter);
 app.use('/cuentas', cuentasRouter);
 app.use('/gastos', gastosRouter);
 app.use('/impresoras', impresorasRouter);
 app.use('/negocios', negociosRouter);
 app.use('/pagos', pagosRouter);
 app.use('/personas', personasRouter);
 app.use('/producciones', produccionesRouter);
  */

/*
 router.use('/proveedores', proveedoresRouter);
 router.use('/roles', rolesRouter);
 router.use('/trasladosmp', trasladosMPRouter);
 router.use('/trasladosproducto', trasladosProductoRouter);
 router.use('/usuarios', usuariosRouter);
 router.use('/ventas', ventasRouter); */
}
module.exports = routerApi;
