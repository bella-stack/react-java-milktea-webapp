// Time.js
export function formatDate(date) {
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, '0'); // +1 because months are 0-indexed
    let day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
}

export function formatTime(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes().toString().padStart(2, '0');
    let seconds = date.getSeconds().toString().padStart(2, '0');
    let milliseconds = date.getMilliseconds().toString().padStart(2, '0').substr(0, 2);
    if(hours < 10) {
        hours = "0" + hours;
    }
    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

// let now = new Date();

// console.log(formatDate(now)); "2022-09-01" format
// console.log(formatTime(now));"9:00:00.55" format
