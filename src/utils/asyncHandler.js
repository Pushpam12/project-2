const asyncHandler = (reqHandler) => async function(req, res, next){
        try {
             await reqHandler(req, res, next)
        } catch (error) {
          //    console.log("Error", error);
              next(error)
        }  
}


module.exports = asyncHandler