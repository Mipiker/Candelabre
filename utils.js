// In an async function use await sleep(ms)
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
    sleep:sleep
}