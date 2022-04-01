import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import userRoute from './routes/usuario.route.js';
import employeeRoute from './routes/empleado.route.js';
import rentaRoute from './routes/renta.route.js';
//para el archivo de bd, se importa la función
import connectDB from './database.js';
// se ejecuta la función.
connectDB();


//se crea una variable que obtenga la funcionalidad de express
const app=express();

//Creamos el puerto por el que va a escuchar el servidor
app.set('Port',4000);
//agregamos morgan como dependencia de 
//desarrollo para poder ver las peticiones
//del backend en consola
app.use(morgan('dev'));
//Establecemos las respuestas del servidor en formato tipo JSON
app.use(express.urlencoded({extended:true}));
app.use(express.json());
//para que sepuedan recibir peticiones de todos lados
//no solo de una dirección ip
app.use(cors({origen:'*'}));

/*
app.use('/',(req,res)=>{
  res.status(200).json({
    ok:true,
    message:"mi primer progama en nodejs!!!"
  });
});
*/

//cuando acceda a la ruta principal/api accederá a las rutas de userRoute
app.use('/api',userRoute);
app.use('/api/employee',employeeRoute);
app.use('/api/renta',rentaRoute);

//se pone a correr el servidor
app.listen(app.get('Port'),()=>{
  // console.log('Servidor escuchando por el puerto',app.get('Port'))
   console.log(`Servidor escuchando por el puerto con el número ${app.get('Port')}`);
 })
 