// export default function normalizePhoneNumber(numberStr = '') {
//     let normalizedNum = '';
//     Array.from(numberStr).forEach((char) => {
//         if (char !== ' ' && Number(char) <= 9) {
//             normalizedNum += char;
//             if (normalizedNum.length === 3 || normalizedNum.length === 7) {
//                 normalizedNum += '-';
//             }
//         }
//     });
//     return normalizedNum;
// }

export default function normalizePhoneNumber(numberStr = "") {
    const trimmed = numberStr.trim();

    // International number entered with +
    if (trimmed.startsWith("+")) {
        let normalized = "+";

        for (const char of trimmed.slice(1)) {
            if (/\d/.test(char)) {
                normalized += char;
            }
        }

        return normalized;
    }

    // Remove all non-digits
    const digits = trimmed.replace(/\D/g, "");

    // Existing database format:
    // 503-555-1212
    if (digits.length === 10) {
        return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
    }

    // US/Canada number entered as:
    // 1-503-555-1212
    // +1 503 555 1212 (if '+' was removed somewhere)
    if (digits.length === 11 && digits.startsWith("1")) {
        const local = digits.slice(1);

        return `${local.slice(0, 3)}-${local.slice(3, 6)}-${local.slice(6)}`;
    }

    // Non-US number entered without +
    // Store digits only rather than mangling it
    return digits;
}