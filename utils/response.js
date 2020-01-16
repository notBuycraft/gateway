let errorType = {
    authError: "authError",
    invalidToken: "authTokenInvalid",
    teapot: "serviceCannotComply",
    credInvalid: "credentialInvalid",
    credError: "credentialInterference"
};

let buildError = (statusCode, errorType, responseMessage) => {
    return {
        status: statusCode,
        type: errorType,
        message: responseMessage
    };
};

module.exports.errorType = errorType;
module.exports.buildError = buildError;