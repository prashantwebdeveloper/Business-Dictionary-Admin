// Date
export const CreatedDate = (createdDate) => {
    const date = new Date(createdDate);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${day}-${month}-${year}, ${hours}:${minutes}:${seconds}`;
}



// Time 
export const FormatTimeTo12Hour = (time) => {
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? "pm" : "am";
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
}

export const ConvertTo24HourFormat = (time) => {
    let [hours, minutesPart] = time?.split(':');
    let minutes = minutesPart?.slice(0, 2);
    let period = minutesPart?.slice(-2).toUpperCase();

    hours = parseInt(hours, 10);

    if (period === "AM" && hours === 12) {
        hours = 0; // 12 AM becomes 00
    }
    if (period === "PM" && hours !== 12) {
        hours += 12; // Convert PM times except 12 PM
    }

    return `${hours.toString().padStart(2, '0')}:${minutes}`;
};