const log4js = require("log4js");
const contextService = require('request-context');
const getRequestId = function() {
  return contextService.get('request:requestId');
};

log4js.configure({
  appenders: {
    console:{
      type:'console',
      layout:{
        type:'pattern',
        pattern:'[%d] [%x{requestId}] %[[%p]%] [%c] %m',
        tokens: {
          requestId: getRequestId
        }
      }
    }
  },
  categories:{
    default:{appenders:['console'], level:'info'}
  }
});

exports.logger = function(){
  const logger = log4js.getLogger('default');
  return logger;
};
