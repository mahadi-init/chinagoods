// Function to calculate the difference in days
export function getDaysAgo(dateString: string) {
  const givenDate = new Date(dateString);
  const currentDate = new Date();

  // @ts-ignore
  const differenceInTime = currentDate - givenDate;
  const differenceInDays = Math.floor(differenceInTime / (1000 * 60 * 60 * 24));

  if (differenceInDays < 0) {
    return null;
  }

  return differenceInDays;
}
