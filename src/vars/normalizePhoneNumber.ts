export default function normalizePhoneNumber(numberStr: string) {
    let normalizedNum = '';
    Array.from(numberStr).forEach((char) => {
        if (char !== ' ' && char <= 9) {
            normalizedNum += char;
            if (normalizedNum.length === 3 || normalizedNum.length === 7) {
                normalizedNum += '-';
            }
        }
    });
    return normalizedNum;
}