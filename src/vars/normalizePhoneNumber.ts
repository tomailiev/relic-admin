export default function normalizePhoneNumber(numberStr = '') {
    let normalizedNum = '';
    Array.from(numberStr).forEach((char) => {
        if (char !== ' ' && Number(char) <= 9) {
            normalizedNum += char;
            if (normalizedNum.length === 3 || normalizedNum.length === 7) {
                normalizedNum += '-';
            }
        }
    });
    return normalizedNum;
}