import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, Timestamp, updateDoc, where } from "firebase/firestore";
import { firestoreDB } from "../../FirebaseConfig";
import { FormatDate } from "../../../utils/dateUtils.jsx";

// Category
// Collection
const categoryCollection = collection(firestoreDB, "category");

// Doc
const categoryDoc = (id) => {
    return doc(firestoreDB, "category", id);
}


// Get
export const GetCategoryFirebase = async () => {
    try {
        const res = await getDocs(categoryCollection);
        console.log("Get-Category++", res);

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
        console.error('Error-Get-Category--', err);
    }
}


// Get-Detail
export const GetCategoryDetailsFirebase = async (id) => {
    try {
        const res = await getDoc(categoryDoc(id));
        console.log("Get-Category-Details++", res);

        if (res?.exists()) {
            return {
                ...res.data(),
                id: res.id,
            };
        }
    } catch (err) {
        console.error('Error-Get-Category-Details--', err);
    }
}


// Post
export const PostCategoryFirebase = async (data) => {
    try {
        const payload = {
            ...data,
            createdAt: FormatDate(new Date()),
            updatedAt: null,
        }

        const res = await addDoc(categoryCollection, payload);
        console.log("Post-Category++", res);

        if (res?.id) {
            return res;
        }
    } catch (err) {
        console.error('Error-Post-Category--', err);
    }
}


// Update
export const PutCategoryFirebase = async (id, data) => {
    try {
        const payload = {
            ...data,
            updatedAt: FormatDate(new Date()),
        }

        const res = await updateDoc(categoryDoc(id), payload);
        console.log("Put-Category++", res);

        return { success: true };
    } catch (err) {
        console.error('Error-Put-Category--', err);

        return { success: false, error: err };
    }
}


// Delete
export const DeleteCategoryFirebase = async (id) => {
    try {
        const res = await deleteDoc(categoryDoc(id));
        console.log("Delete-Category++", res);

        return res;
    } catch (err) {
        console.error('Error-Delete-Category--', err);
    }
}
