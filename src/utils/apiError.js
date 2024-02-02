class apiError extends Error {
    constructor(statusCode = 500, message = "Some error Occured", errors = []){
        super();
        this.statusCode = statusCode,
        this.message = message,
        this.success = false,
        this.errors = errors
    }
}

module.exports = { apiError }