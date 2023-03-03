const {StatusCodes}=require('http-status-codes')
const CustomerApiError=require('./custom-api');

class BadRequestError extends CustomerApiError {
    constructor(message) {
        super(message);
        this.statusCode =StatusCodes.BAD_REQUEST;
        
    }
 }
 
 
 module.exports = BadRequestError;
    
 
 