const messages = {};
//la forma común de enviar un mensaje, es la siguiente:
/*res.status(400).json({
      ok:false,
      message: "La contraseña es incorrecta!!!",
  });*/

//Mejor se simplifica en una clase mensajes con un método messageGeneral.
//el ok, es un valor booleano, que si el false indica error si es true indica ok
//recibe parámettros y envía parámetros
messages.messageGeneral = (res, statusCode, ok, data, message)=>{
  res.status(statusCode).json({
    ok,
    data,
    message,
  });
};

export default messages;
