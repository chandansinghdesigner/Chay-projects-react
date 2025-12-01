// Utilities
export const toUpper = (text) => text.toUpperCase();
export const toLower = (text) => text.toLowerCase();
export const reverseStr = s => [...s].reverse().join('');
export const trimExtra = s => s.replace(/\s+/g, ' ').trim();