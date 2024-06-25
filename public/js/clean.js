export function cleanString(str) {
    return str.replace(/\s+/g, '');
}

export function isValidName(str) {
    const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ-\s]+$/;
    return regex.test(str);
}