import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { firestoreDB } from "../../FirebaseConfig";

// Subscription
// Collection
const subscriptionCollection = collection(firestoreDB, "subscription");

// Doc
const subscriptionDoc = (id) => {
    return doc(firestoreDB, "subscription", id);
}


// Get
export const GetSubscriptionFirebase = async () => {
    try {
        const res = await getDocs(subscriptionCollection);
        console.log("Get-Subscription++", res);

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
        console.error('Error-Get-Subscription--', err);
    }
}


// Delete
export const DeleteSubscriptionFirebase = async (id) => {
    try {
        const res = await deleteDoc(subscriptionDoc(id));
        console.log("Delete-Subscription++", res);

        return res;
    } catch (err) {
        console.error('Error-Delete-Subscription--', err);
    }
}
