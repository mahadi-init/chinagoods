export function convertBengaliToEnglish(bengaliNumber: string): string {
  const bengaliToEnglishMap: { [key: string]: string } = {
    "০": "0",
    "১": "1",
    "২": "2",
    "৩": "3",
    "৪": "4",
    "৫": "5",
    "৬": "6",
    "৭": "7",
    "৮": "8",
    "৯": "9",
  };

  let englishNumber = "";
  for (let char of bengaliNumber) {
    if (bengaliToEnglishMap[char] !== undefined) {
      englishNumber += bengaliToEnglishMap[char];
    } else {
      // Handle cases where the character is not a Bengali numeral
      englishNumber += char;
    }
  }

  return englishNumber;
}

export function convertBengaliToEnglishNumber(bengaliNumber?: string) {
  if (!bengaliNumber) {
    return;
  }

  const bengaliToEnglishMap: { [key: string]: string } = {
    "০": "0",
    "১": "1",
    "২": "2",
    "৩": "3",
    "৪": "4",
    "৫": "5",
    "৬": "6",
    "৭": "7",
    "৮": "8",
    "৯": "9",
  };

  let englishNumber = "";
  for (let char of bengaliNumber) {
    if (bengaliToEnglishMap[char] !== undefined) {
      englishNumber += bengaliToEnglishMap[char];
    } else {
      // Handle cases where the character is not a Bengali numeral
      englishNumber += char;
    }
  }

  return Number(englishNumber);
}

export function convertEnglishToBengaliNumber(input: string | number): string {
  const englishToBengaliMap: { [key: string]: string } = {
    "0": "০",
    "1": "১",
    "2": "২",
    "3": "৩",
    "4": "৪",
    "5": "৫",
    "6": "৬",
    "7": "৭",
    "8": "৮",
    "9": "৯",
  };

  const englishNumber = input.toString(); // Ensure the input is a string

  let bengaliNumber = "";
  for (let char of englishNumber) {
    if (englishToBengaliMap[char] !== undefined) {
      bengaliNumber += englishToBengaliMap[char];
    } else {
      // Handle cases where the character is not an English numeral
      bengaliNumber += char;
    }
  }

  return bengaliNumber;
}
