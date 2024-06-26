export function convertBengaliToEnglish(bengaliNumber: string): string {
  const bengaliToEnglishMap: { [key: string]: string } = {
    '০': '0',
    '১': '1',
    '২': '2',
    '৩': '3',
    '৪': '4',
    '৫': '5',
    '৬': '6',
    '৭': '7',
    '৮': '8',
    '৯': '9'
  };

  let englishNumber = '';
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