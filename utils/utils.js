export const capitalizeFirstChar = (input) => {
    if (typeof input === 'number') return input;
    if (!input || typeof input !== 'string') return input;
    return input.charAt(0).toUpperCase() + input.slice(1);
};