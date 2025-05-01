const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.deleteUserById = functions.https.onCall(async (data, context) => {
    // OPTIONAL: ફક્ત એડમિન હોય તો જ ચાલે — આ લાઇન uncomment કરો જો જરૂર હોય
    // if (!context.auth.token.admin) {
    //     throw new functions.https.HttpsError('permission-denied', 'ફક્ત એડમિન વપરાશકર્તા યુઝર્સને ડિલીટ કરી શકે.');
    // }

    const uid = data.uid;
    try {
        await admin.auth().deleteUser(uid);
        return { success: true };
    } catch (error) {
        throw new functions.https.HttpsError('unknown', error.message, error);
    }
});
