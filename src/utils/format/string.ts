export function getInitials(name: string): string {
    const words = name.trim().split(/\s+/);

    if (words.length === 1) {
        // If there's only one word, return the first two characters
        return name.substring(0, 2).toUpperCase();
    } else {
        // If there are two or more words, return the first letter of the first and last word
        if (words.length === 1) {
            // If there's only one word, return the first two characters
            return name.substring(0, 2).toUpperCase();
        } else {
            // If there are two or more words, return the first letter of the first and last word
            const firstWord = words && words[0] ? words[0] : '';
            const lastWord = words && words.length > 0 ? words[words.length - 1] : '';

            return (firstWord.charAt(0) + lastWord?.charAt(0)).toUpperCase();
        }
    }
}

export function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;

        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}