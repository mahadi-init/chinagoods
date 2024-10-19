export const parseTextAreaInput = (inputText?: string) => {
  if (!inputText) {
    return;
  }

  return inputText
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0); // Optional: filter out empty lines
};
