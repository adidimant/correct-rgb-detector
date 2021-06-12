const aws = require('aws-sdk');
const defaultRegion = 'us-east-1';

const createInvocationParams = (args, functionName, invocationType) => {
    let payload = Buffer.from(JSON.stringify(args));
    return {
        FunctionName: functionName,
        Payload: payload,
        ...(invocationType ? { InvocationType: invocationType } : {}),
    };
};

const createInvocationPromise = (lambda, params) => {
    return new Promise((resolve, reject) => {
        lambda.invoke(params, (err, data) => {
            if (err || data.FunctionError) {
                reject(err || data.Payload);
            } else {
                resolve(data.StatusCode === 202 ? '' : JSON.parse(data.Payload));
            }
        });
    });
};

const invoke = (args, functionName, invocationType = null, region = defaultRegion) => {
    let lambda = new aws.Lambda({ region });
    const params = createInvocationParams(args, functionName, invocationType);
    return createInvocationPromise(lambda, params);
};

module.exports = {
    invoke
};