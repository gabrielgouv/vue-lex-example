import AWS from 'aws-sdk'
import { aws as config } from '../../commons/variables'

AWS.config.region = config.region;
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: config.cognito.identyPoolId,
})

const lexRuntime = new AWS.LexRuntime()
var sessionAttributes = {}

const userId = 'user-' + Date.now()

export const postText = (text, callback) => {

    const params = {
        botAlias: config.lex.botAlias,
        botName: config.lex.botAlias,
        inputText: text,
        userId: userId,
        sessionAttributes: sessionAttributes
    }

    lexRuntime.postText(params, (err, data) => {
        if (err) {
            callback(err, data)
        }
        if (data) {
            sessionAttributes = data.sessionAttributes
            callback(err, data)
        }
    })

}
