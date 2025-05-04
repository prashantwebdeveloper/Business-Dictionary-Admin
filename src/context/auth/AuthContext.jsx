import { createContext, useContext, useEffect, useState } from "react";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/FirebaseConfig";

import { GetAdminFirebase } from "../../firebase/services/auth/admin/AdminServices";
import { SignOutUser } from "../../firebase/services/auth/logout/LogoutServices";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

    const [isLoading, setIsLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        // const user = auth.currentUser;
        // console.log("currentUser-->", user);

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log("onAuthStateChanged++", currentUser?.email, currentUser?.uid);

            // if (currentUser) {
            //     const res = await GetAdminFirebase(currentUser?.uid);
            //     console.log("Res-Admin", res);

            //     if (!res?.exists()) {
            //         setCurrentUser(null);

            //         const res = await SignOutUser();
            //         console.log("Res-Logout++", res);

            //         if (res?.success) {
            //             localStorage.removeItem("business-admin-token");
            //         }
            //     } else {
            setCurrentUser(currentUser);
            // }
            // }

            setIsLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ currentUser }}>
            {/*{isLoading ? <Loader isLoading={isLoading} /> : children} */}
            {isLoading ? null : children}
            {/* children */}
        </AuthContext.Provider>
    )
}


export const useAuth = () => {
    return useContext(AuthContext);
};