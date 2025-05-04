import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { firestoreDB } from "../../../FirebaseConfig";


// Admin
// Collection
const adminCollection = collection(firestoreDB, "admin");

// Doc
const adminDoc = (id) => {
    return doc(firestoreDB, "admin", id);
}


export const GetAdminFirebase = async (identifier, isEmailCheck = false) => {
    try {

        if (isEmailCheck) {
            const q = query(
                adminCollection,
                where("email", "==", identifier.toLowerCase().trim())
            );

            const res = await getDocs(q);
            console.log("Get-Q-Admin++", res);

            if (!res?.empty) {
                return res.docs[0];
            }
            return null;

        } else {
            const res = await getDoc(adminDoc(identifier));
            console.log("Get-Admin++", res);

            if (res?.exists()) {
                return res;
            }
            return null;

        }
    } catch (err) {
        console.error('Error-Get-Admin--', err);
    }
}