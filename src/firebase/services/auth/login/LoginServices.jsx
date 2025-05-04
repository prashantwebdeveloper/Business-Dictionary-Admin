import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../FirebaseConfig";
import { GetAdminFirebase } from "../admin/AdminServices";
import { SignOutUser } from "../logout/LogoutServices";


export const SignInAdmin = async (data) => {
    try {

        const resQAdminEmail = await GetAdminFirebase(data.email, true);
        console.log("Res-Q-Admin", resQAdminEmail);

        if (!resQAdminEmail) {
            throw { code: "auth/not-admin" };
        }


        const res = await signInWithEmailAndPassword(auth, data.email, data.password);
        console.log("Login++", res);

        if (res?.user?.uid) {
            const resAdmin = await GetAdminFirebase(res?.user?.uid);
            console.log("Res-Admin", resAdmin);

            if (!resAdmin?.exists()) {
                const resSignOut = await SignOutUser();
                console.log("Res-Logout++", resSignOut);

                if (resSignOut?.success) {
                    localStorage.removeItem("business-admin-token");
                }

                throw { code: "auth/not-admin" };
            } else {
                return res;
            }

        }
    } catch (err) {
        console.error('Error-Login--', err);

        throw err;
    }
}