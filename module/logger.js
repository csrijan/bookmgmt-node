var winston = require('winston');
winston.add(winston.transports.File, { filename: 'mainlogfile.log' });
winston.remove(winston.transports.Console);

function logInfo(msg)
{
    winston.log('info', msg);
}

function logErr(msg)
{
    winston.log('error', msg);
}

module.exports.logInfo=logInfo;
module.exports.logErr=logErr;