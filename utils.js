// In an async function use await sleep(ms)
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Return date as 'dd/mm/yyyy hh:mm:ss'
function getDate(date) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

module.exports = {
    sleep:sleep,
    getDate:getDate
}