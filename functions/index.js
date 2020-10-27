const functions = require("firebase-functions");

exports.getAuthContext = functions.https.onCall((data, context) => {
  return context.rawRequest.headers;
});
