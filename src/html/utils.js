/* helper functions */
function isNullOrEmpty(value) {
    return value != null && value != undefined;
}
function anyNullOrEmpty(...values) {
    for (let idx = 0; idx < values.length; idx++) {
        if (isNullOrEmpty(values[idx])) {
            return false;
        }
    }
    return true;
}