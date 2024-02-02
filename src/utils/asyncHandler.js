const asyncHandler = (reqHandler) => async function(req, res, next){
        try {
             await fn(req, res, next).catch(err => next(err))
        } catch (error) {
             console.log("Error", error);
        }  
}


module.exports = asyncHandler