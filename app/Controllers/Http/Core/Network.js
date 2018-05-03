'use strict'

    const data = use('App/Utils/Data')
    var wifi = require('node-wifi');
    
    class Network {
        async index  ({ view,request, response, auth, session }) {
          var wait = ms => new Promise((r, j)=>setTimeout(r, ms))
          await  wifi.init({
                iface : null // network interface, choose a random wifi interface if set to null
            });
            
            var redes =[];
            var error="";
            const redes_ = await wifi.scan(function(err, networks) {
              if (err) {
                  error=err;
              } else {
                  redes=networks;
                // console.log(redes)
                
              }
            });
            await wait(5000)
              var network = {redes:redes,error:error}
              
              return view.render('core/network/index',  {network:network});
        
        } 
        async scan  ({ view,request, response, auth, session }) {
          var wait = ms => new Promise((r, j)=>setTimeout(r, ms))
          await  wifi.init({
                iface : null // network interface, choose a random wifi interface if set to null
            });
            
            var redes =[];
            var error="";
            const redes_ = await wifi.scan(function(err, networks) {
              if (err) {
                  error=err;
              } else {
                  redes=networks;
                // console.log(redes)
                
              }
            });
            await wait(5000)
              var network = {redes:redes,error:error}
              
              return network;
        
        } 
        async connect  ({ view,request, response, auth, session }) {
          await  wifi.init({
            iface : null // network interface, choose a random wifi interface if set to null
        });
          var ssid = request.input("ssid");
          var password = request.input("password");
          var wait = ms => new Promise((r, j)=>setTimeout(r, ms))
          var mensaje = "OK";
          await wifi.connect({ ssid :ssid, password : password}, function(err) {
            if (err) {
               mensaje=err;
            }
          });

          await wait(5000)
          return {mensaje:mensaje}

        }

        async getStatus({view,request, response, auth, session}){
          var wait = ms => new Promise((r, j)=>setTimeout(r, ms))
          await  wifi.init({
            iface : null // network interface, choose a random wifi interface if set to null
          });
          var coneccion = "";
          await wifi.getCurrentConnections(function(err, currentConnections) {
            if (err) {
                console.log(err);
            }
            
            for(var c in currentConnections){
              if(currentConnections[c].ssid!="HRMPi"){
                coneccion = currentConnections[c];
              }
            }
            
            /*
            // you may have several connections
            [
                {
                    iface: '...', // network interface used for the connection, not available on macOS
                    ssid: '...',
                    bssid: '...',
                    mac: '...', // equals to bssid (for retrocompatibility)
                    channel: <number>,
                    frequency: <number>, // in MHz
                    signal_level: <number>, // in dB
                    security: '...' //
                    security_flags: '...' // encryption protocols (format currently depending of the OS)
                    mode: '...' // network mode like Infra (format currently depending of the OS)
                }
            ]
            */
          });
          await wait(2000)
          return coneccion;
        }
      }
      
    module.exports = Network