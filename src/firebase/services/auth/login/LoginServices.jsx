import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, firestoreDB } from "../../../FirebaseConfig";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { FormatDate } from "../../../../utils/dateUtils";


export const SignInAdmin = async (data) => {
    try {
        const res = await signInWithEmailAndPassword(auth, data.email, data.password);
        console.log("Login++", res);

        if (res?.user?.accessToken) {
            return res;
        }
    } catch (err) {
        console.error('Error-Login--', err);

        throw err;
    }
}