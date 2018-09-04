module.exports = (value, total) => {
    return total > 0 ? ((value / total) * 100).toFixed(2) : "Error: a number lower than 1 was passed in as total number";
 } 