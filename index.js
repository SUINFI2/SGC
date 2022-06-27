const express = require('express');
const routerApi = require('./routes/index');
const app = express();

const port = 3000;

routerApi(app);

app.listen(port, ()=>{
  console.log('Mi port'+port);
});
