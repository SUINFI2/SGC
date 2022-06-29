const express = require('express');
const routerApi = require('./routes/index');
const app = express();

const port = 3000;
// para poder manejar datos tipo json
app.use(express.json());
routerApi(app);

app.listen(port, ()=>{
  console.log('Mi port'+port);
});
