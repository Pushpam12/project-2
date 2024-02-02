class apiResponse {
    constructor(statusCode, data, message = "Oh there" ){
        this.statusCode = statusCode,
        this.message = message,
        this.success = statusCode < 400 ,
        this.data = data
    }
}

module.exports = { apiResponse }