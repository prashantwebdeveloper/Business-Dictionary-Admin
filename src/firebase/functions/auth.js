const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });

admin.initializeApp();

// exports.deleteUserById = functions.https.onCall(async (data, context) => {
//     if (!context.auth || context.auth.token.email !== 'admin@example.com') {
//         throw new functions.https.HttpsError('permission-denied', 'Only admins can delete users');
//     }


//     const uid = data.uid;

//     try {
//         if (!uid) {
//             throw new functions.https.HttpsError(
//                 'invalid-argument',
//                 'User UID is required'
//             );
//         }

//         await admin.auth().deleteUser(uid);

//         return {
//             success: true,
//             message: `User account ${uid} deleted successfully`
//         }
//     } catch (error) {
//         console.error('Error deleting user account:', error);

//         throw new functions.https.HttpsError('internal', 'Error deleting user account', error.message);
//     }
// });


exports.deleteUserById = functions.https.onRequest(async (req, res) => {
    // Handle preflight CORS requests
    if (req.method === "OPTIONS") {
        res.set("Access-Control-Allow-Origin", "*");
        res.set("Access-Control-Allow-Methods", "POST");
        res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
        res.set("Access-Control-Allow-Credentials", "true"); // If you need credentials
        return res.status(204).send('');
    }
    // Handle main request
    cors(req, res, async () => {
        try {
            // Verify admin (use Authorization header instead of context)
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith("Bearer ")) {
                return res.status(403).json({ error: "Unauthorized" });
            }

            const idToken = authHeader.split("Bearer ")[1];
            const decodedToken = await admin.auth().verifyIdToken(idToken);

            if (decodedToken.email !== "admin@example.com") {
                return res.status(403).json({ error: "Only admins can delete users" });
            }

            const { uid } = req.body;
            if (!uid) {
                return res.status(400).json({ error: "User UID is required" });
            }

            await admin.auth().deleteUser(uid);
            return res.status(200).json({
                success: true,
                message: `User account ${uid} deleted successfully`
            });
        } catch (error) {
            console.error("Error deleting user:", error);
            return res.status(500).json({ error: error.message });
        }
    });
});
