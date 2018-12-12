'use strict'
const uuidv1 = require('uuid/v1');
const kafka = require('kafka-node');
const { IncomingWebhook } = require('@slack/client');
/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler {
  /**
   * Handle exception thrown during the HTTP lifecycle
   *
   * @method handle
   *
   * @param  {Object} error
   * @param  {Object} options.request
   * @param  {Object} options.response
   *
   * @return {void}
   */
  async handle (error, { request, response,session,auth,view }) {
    const user = await auth.getUser();
    

    if (error.name === 'ValidationException') {
      session.withErrors(error.messages).flashAll()
      await session.commit()
      response.redirect('back')
      return
    }
    const content= view.render('core/errors/error',{error});
    
    response.status(error.status).send(content)
    
  }

  /**
   * Report exception for logging or debugging.
   *
   * @method report
   *
   * @param  {Object} error
   * @param  {Object} options.request
   *
   * @return {void}
   */
  async report (error, { request ,auth}) {
    
      const user = await auth.getUser();
      
      const url = "https://hooks.slack.com/services/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";
      const webhook = new IncomingWebhook(url);
      try {

        var codigo = uuidv1();
  
        var cliente = request.hostname();
        var idusers = user.username;
        var module = 'hrm';
        var controller = '';
        var action = request.url();
        var params = JSON.stringify(request.all());
        var type = 'CALL';
  
  
        var Producer = kafka.Producer;
        var KeyedMessage = kafka.KeyedMessage;
        var client = new kafka.Client('192.168.3.23:2181');
        var producer = new Producer(client);
        var km = new KeyedMessage('key', 'message');
  
        var obj = [{
          Log: {
            codigo: codigo,
            cliente: cliente,
            idusers: idusers,
            type: type,
            module,
            module,
            controller: controller,
            action: action,
            params: params
          }
        }];
        var jObj = JSON.stringify(obj);
  
        var payloads = [{
          topic: 'API_REQUEST',
          messages: [jObj],
          key: "API"
        }];
        producer.on('ready', function () {
          producer.send(payloads, function (err, data) {
            producer.close();
            client.close();
          });
        });
  
        producer.on('error', function (err) {
          console.log(err)
        })
  
        //const query =`call core_addLogApi('${codigo}', '${cliente}', '${idusers}',  '${type}', '${module}', '${controller}', '${action}', '${params}')`;
        //const respuesta   = await data.execQuery(cliente,query);
  
        /*console.log("module=>",request.params.module);
        console.log("controller=>",request.params.controller);
        console.log("action=>",request.params.action);
        console.log("cliente=>",request.input("cliente"));
        console.log("params=>",request.all()); 
        */
  
      } catch (error) {
        console.log(error);
      }
      webhook.send(`host:${request.hostname()},status:${error.status},message:"${error.message}",username:"${user.username}",url:"${request.url()}",params:${JSON.stringify(request.all())}`, 
      function(err, res) {
        
      });
      
  }
}

module.exports = ExceptionHandler
