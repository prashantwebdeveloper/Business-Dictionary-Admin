import { collection, deleteDoc, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { app, auth, firestoreDB } from "../../FirebaseConfig";
import { getAuth } from "firebase/auth";
import { getFunctions, httpsCallable } from "firebase/functions";

// Users
// Collection
const usersCollection = collection(firestoreDB, "users");

// Doc
const userDoc = (id) => {
    return doc(firestoreDB, "users", id);
}


// Get
export const GetUsersFirebase = async () => {
    try {
        const res = await getDocs(usersCollection);
        console.log("Get-Users++", res);

        if (!res?.empty) {
            return res.docs.map(doc => ({
                ...doc.data(),
                id: doc.id,
            }))
                .sort((a, b) => {
                    const parseDate = (str) => {
                        const [dateStr, timeStr, ampm] = str.split(/, | /);
                        const [day, month, year] = dateStr.split("-").map(Number);
                        let [hour, minute, second] = timeStr.split(":").map(Number);

                        if (ampm === "PM" && hour < 12) hour += 12;
                        if (ampm === "AM" && hour === 12) hour = 0;

                        return new Date(year, month - 1, day, hour, minute, second);
                    };

                    const dateA = parseDate(a.createdAt);
                    const dateB = parseDate(b.createdAt);

                    return dateB - dateA;
                });
        }
    } catch (err) {
        console.error('Error-Get-Users--', err);
    }
}


// Get-Detail   
export const GetUserDetailsFirebase = async (id) => {
    try {
        const res = await getDoc(userDoc(id));
        console.log("Get-User-Details++", res);

        if (res?.exists()) {
            return {
                ...res.data(),
                id: res.id,
            };
        }
    } catch (err) {
        console.error('Error-Get-User-Details--', err);
    }
}


// Delete
export const DeleteUserFirebase = async (id) => {
    try {
        const res = await deleteDoc(userDoc(id));
        console.log("Delete-User++", res);

        return res;
    } catch (err) {
        console.error('Error-Delete-User--', err);
    }
}



// Delete-User-Account
export const DeleteUserAccountFirebase = async (uid) => {
    try {
        const user = auth.currentUser;
        console.log(user, uid);

        if (user.email !== "admin@example.com") {
            throw new Error("Only admin can delete users");
        }

        // const userToDelete = await getUserByUid(uid);
        // console.log(userToDelete);
        
        // if (!userToDelete) {
        //     throw new Error("User not found");
        // }

        const functions = getFunctions(app, "us-central1");
        const deleteUserByUID = httpsCallable(functions, "deleteUserByUID");

        const del= await deleteUserByUID({uid})
        console.log("deleteUserByUID response:", del.data);


        // const res = await deleteUser();
        // console.log("Delete-User-Account++", res);

        // return user;
        return del.data;
    } catch (err) {
        console.error('Error-Delete-User-Account--', err);
    }
}




const getUserByUid = async (uid) => {
    try {
        const auth = getAuth();
        console.log(auth);

        const q = query(usersCollection, where("uid", "==", uid));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            return {
                uid: uid,
                email: querySnapshot.docs[0].data().email,
            };
        }
        return null;
    } catch (err) {
        console.error('Error getting user by UID:', err);
        throw err;
    }
};
