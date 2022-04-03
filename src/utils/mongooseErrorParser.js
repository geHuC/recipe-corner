function parseError(err){
    if(err.name == 'ValidationError'){
        return Object.values(err.errors).map(e => e.properties.message);
    } else if(err.name == 'CustomError' ){
        return err.errors;
    } else {
        return [err.message];
    }
}

module.exports = {
    parseError,
}