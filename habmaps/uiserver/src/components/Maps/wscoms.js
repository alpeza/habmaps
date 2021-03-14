import React from "react";

const mqtth = (topic,resturl,compstate) => {
  //https://gist.github.com/smching/3582d2fbae417fc919e23b4e61c036d1
  var mqtt = require('mqtt')
  var client  = mqtt.connect('ws://localhost:8081/socket')
  //console.log("Se va a conectar ... " + topic )
  //1.- Conexión al topic
  client.subscribe(topic, (err,msg) => {
    //console.log("Subscrito al topic ..." + topic )
    //2.- Cargamos la información actual desde el buffer
    fetch(resturl, {crossDomain:true,method: 'GET',
      headers: {Accept: 'application/json',}})
      .then(res => res.json())
      .then(
        (result) => {
          compstate.setState({
            isLoaded: true,
            data: result
          });
        },
        (error) => {
          compstate.setState({
            isLoaded: true,
            error
          });
        }
      )
  });
  //3.- Mantenemos un conexión abierta con el broker de mq para cuando
  //lleguen mensajes
  client.on('message', (topic, message, packet) => {
    //console.log("Llega un mensaje de " + topic);
    //console.log(message.toString());
    // Cargamos el resultado que llega de mqtt
    compstate.setState({
      data: JSON.parse(message.toString())
    });
  });
}

export default mqtth;
