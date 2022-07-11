const { ValidationError } = require('sequelize');

function longError(error,req,res, next){
  console.error(error);
  next(error);
}

// crear uno enespecifico que que va adeteectar un error, pero va a crear un formato para devovler a nuestro cliente

function errorHandler(err,req,res,next){
  res.status(500).json({
    mesagge: err.message,
    stack: err.stack
  });
}
function BoomErrorHandler(err,req,res,next){
  if(err.isBoom){
    const {output}= err;
    res.status(output.statusCode).json(output.payload);
  }
  next(err);
  // si no es de tipo boom, ejecuta el siguiente middleware
}

function ormErrorHandler(err,req,res,next){
  if(err instanceof ValidationError){
    res.status(409).json({
      statusCode: 409,
      message: err.name,
      errors: err.errors
    });

  }
  next(err);
}
module.exports = {longError,errorHandler, BoomErrorHandler,ormErrorHandler};
