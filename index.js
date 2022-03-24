const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const Correos = require('./models/correos.model');
const FormInfo = require('./models/form.model');
/*----Conexion a la base de datos MongoDb-----*/

const uri = 'mongodb+srv://RVGestion:RV155519-@appdecorreos.fmrsk.mongodb.net/users?retryWrites=true&w=majority';
mongoose.connect(uri).then(
    () => {console.log('Base de datos conectada')},
    (err) => {console.log(err)}
);

/*-------------MIDDLEWARES-----------------*/
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
/*---------------Rutas---------------------*/

app.get('/', (req, res)=> {
    res.sendFile(path.join(__dirname+'/index.html'));
})

app.get('/register', (req, res)=> {
    res.sendFile(path.join(__dirname+'/index.html'));
})

app.post('/register', async (req, res) => {
    res.type('application/json');

    

    if(req.body.Nombre !== '' && req.body.Apellido !== '' && 
        req.body.Pais !== '' && req.body.Telefono !== '' &&
        req.body.Correo !== ''
    ){
        let correosVerificar = await Correos.findOne({email: req.body.Correo});
        let formVerificar = await FormInfo.findOne({correo: req.body.Correo});
        if(formVerificar === null){
            try {
                await FormInfo.create({
                    nombre: req.body.Nombre,
                    apellido: req.body.Apellido,
                    pais: req.body.Pais,
                    telefono: req.body.Telefono,
                    correo: req.body.Correo
                })
                res.status(200).write('Datos registrados correctamente.');
        
            } catch (error) {
                console.log(error);
                res.status(200).write('Algo salió mal, intentalo de nuevo.');
            }

            if(correosVerificar === null){
                await Correos.create({
                    email: req.body.Correo
                })
            }

        }else{
            if(formVerificar.correo === req.body.Correo){
                res.status(200).write('El correo ya ha sido registrado, porfavor coloca otro.')
            }
        }
    }else{
        res.status(200).write('¡Error! Verifica los campos');
    }
    
    
    res.end();

    


});

/*--------------Servidor-------------------*/
const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log('Servidor escuchando en el puerto: ', port);
});