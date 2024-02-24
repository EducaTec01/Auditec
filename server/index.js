const express = require("express");
const app = express();
const router = require("./api/endpoints");


app.use('/', router);


app.listen(3001, ()=>{
    console.log("Corriendo en el puerto 3001")
})