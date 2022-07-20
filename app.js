const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('pages'));

mongoose.connect('mongodb://localhost/vetdb', {useNewUrlParser:true, useUnifiedTopology:true})
    .then(()=> console.log('Se conecto con mongo DB: TRUE'))
    .catch(()=> console.log('Se conecto con mongo DB: FALSE')
)


const vetSchema = new mongoose.Schema({   
    nombre:         String,
    edad:           Number,
    direccion:      String,
    nresponsable:   String,
    date: {type:    Date, default: Date.now}

});
const Vet = mongoose.model('Vet', vetSchema);


app.get("/", function(req, res){
    res.sendFile(__dirname + "/pages/index.html" );
});


app.post("/", function(req, res){
    let newVet = new Vet({
        nombre:         req.body.nombre,
        edad:           req.body.edad,
        direccion:      req.body.direccion,     
        nresponsable:   req.body.nresponsable
    });
    newVet.save();
    res.redirect("/");
})


app.listen(3000, function() {
    console.log ("Servidor corriendo por el puerto 3000")
});