import { signOut } from "firebase/auth";
import { auth } from "../../../FirebaseConfig";


export const SignOutUser = async () => {
    try {
        const res = await signOut(auth);
        console.log("Logout++", res);

        return { success : true };
    } catch (err) {
        console.error('Error-Logout--', err);

        return { success : false, error: err };
    }
}