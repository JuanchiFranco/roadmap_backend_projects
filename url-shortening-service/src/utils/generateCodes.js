import { customAlphabet } from "nanoid";

const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const getRandomChars = customAlphabet(letters, 6);

export const generateShortCode = () => {
  const randomPart = getRandomChars();
  return `${randomPart}`;
};
