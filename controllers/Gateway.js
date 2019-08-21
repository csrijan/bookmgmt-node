var express = require('express');
var router = express.Router();
var http = require('http');
var url = require( "url" );
var queryString = require( "querystring" );
var util=require("../module/NodeUtil");
var express = require('express');
var router = express.Router();
var sett=require('../config/contracts');
var log = require("../module/logger");

module.exports.controller = function(app) {
    app.post('/PostGateway',function(req,res){     
            //Getting JSON from URL            
            inputJson=req.body;
            console.log("Actual Json : " + JSON.stringify(inputJson));
            var key;           
            try
            {   
                //Extract key from JSON to get Service Contract
                key=inputJson.key;             
                //Removing key from JSON
                delete inputJson["key"];
                console.log("Modified JSON : " + JSON.stringify(inputJson));
                
                var _protocol=sett.protocol;             
                var _server=sett.server;             
                var _port=sett.port;             
                var _url;               
                var _dir=sett.dir;      
                var _service=sett[key];                        
                var _inputJSON= JSON.stringify(inputJson);

                var options = {
                                hostname: _server, 
                                path: _dir + _service,
                                method: 'POST', 
                                port: _port,                   
                                headers: {
                                            'Content-Type': 'application/json',
                                            'Content-Length': _inputJSON.length
                                         } 
                                };
                console.log(JSON.stringify(options));
                util.post_Data(options,_inputJSON,printLog);
                function printLog(result)
                { 
                    console.log("Try to send : " + result);
                    res.send(result);                    
                }
            }
            catch(err)
            {
                log.logErr(err); 
                console.log("Gateway error: " + err.message);               
            }       
        });
    app.get('/GetGateway',function(req,res){
         
        log.logInfo("In GetGateway.");
        console.log("In GetGateway.");
		
        //Get JSON from URL
        var inputJson= url.parse(req.url,true).query;          
        var key;           
         try
         {   
             //Extracting key from JSON
             key=inputJson.key;
             //Deleting key object from JSON
             delete inputJson["key"];             
         }
         catch(err)
         {
             console.log(err);
             log.logErr(err);
         }
        try{            
            var _protocol=sett.protocol;             
            var _server=sett.server;             
            var _port=sett.port;             
            var _url;             
            var _dir=sett.dir;        
            var _service=sett[key];                        
            var _inputJSON=JSON.stringify(inputJson);          
            

            var options = {
                            hostname: _server, 
                            path: _dir + _service + '?' + queryString.stringify(inputJson),
                            method: 'GET',
                            port: _port,
                            dataType:"json",
                            contentType: "application/json",            
                            headers: { } 
                          };
            log.logInfo("User trying to access : " + _service);
            log.logInfo("Input Prepared for HTTP Call : "+ options);
            
            util.get_Data(options,printLog);       
            //Callback function to hold and return JSON      
            function printLog(result)
            {  
                //Return error only if service or server is down. 
                if(result=='error')
                {
                       console.log("Inside error : " +result);
                       res.send(result);   
                       return;
                }               
             console.log(result);
             res.send(result);               
            }    
        }
        catch(err)
        {
            log.logErr(err);
            console.log(err);
        }
   });
};