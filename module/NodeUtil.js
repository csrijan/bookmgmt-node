var http = require('http');
var qs=require('querystring');
var log = require("./logger");

    function get_Data(callOptions,callback)
    {                 
       var data='';              
       try
           {
                pRequest= http.request(callOptions, function(response){             
                    response.on('data', function (chunk) {                                        
                    data+=chunk;                                                                                                 
                });
                response.on('end',function(){                     
                    try
                        {   
                            //Returning data to parent function                                  
                            callback(data)
                        }
                    catch(e)
                        {                            
                            log.logErr("Error in NodeUtil : " + e.message);
                        }
                });
                response.on('error', function(err){
                    console.log("Error Occurred: "+err.message);                    
                    log.logErr("Error in NodeUtil : " + err.message);                    
                    }); 
                });
                
                pRequest.end();
                
                pRequest.on('error', function(e) {                                
                callback('error');      
                log.logErr("Error in NodeUtil : " + e.message);                 
                });
            }
       catch(e)
       {
           callback('error');
           console.log("From Error: " +e);
       }
    }

    
    function post_Data(callOptions,postData,callback)
    {   
        //console.log(postData);   
        var data=''; 
        var req = http.request(callOptions, function(res) {
                console.log('STATUS: ' + res.statusCode);
                console.log('HEADERS: ' + JSON.stringify(res.headers));
                res.setEncoding('utf8');
            res.on('data', function (chunk) { 
                   data+=chunk;            
                
                });
                res.on('end',function(){
                    try
                        {
                            callback(data);
                            }
                    catch(e)
                    {
                        log.logErr("Error occured in NotdeUtil Post " +e.message);
                        }
                    });
            });
            req.on('error', function(e) {
            console.log('problem with request: ' + e.message);
            log.logErr("Error in POST Data : "+e.message);
            });

            // write data to request body
            req.write(postData);
            req.end();        
    }

    module.exports.get_Data=get_Data;
    module.exports.post_Data=post_Data;