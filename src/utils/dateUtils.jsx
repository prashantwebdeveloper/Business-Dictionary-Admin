// Formate-Date from Post-Category in Firebase-Firestore
export const FormatDate = (date) => {
    const formattedDate = date.toLocaleString("en-GB", {
        day: "2-digit",      // Day in two-digit format
        month: "2-digit",    // Month in two-digit format
        year: "numeric",     // Full year
        hour: "2-digit",     // Hour in two-digit format (12-hour format)
        minute: "2-digit",   // Minute in two-digit format
        second: "2-digit",   // Second in two-digit format
        hour12: true,        // Use AM/PM
    }).replace(/\//g, "-");  // Replace '/' with '-' for the date format

    return formattedDate.replace(/\s(am|pm)$/i, (match) => match.toUpperCase());
};