export function getFormattedDate(date?: Date) {
  const options: any = { day: '2-digit', month: '2-digit', year: 'numeric' };
  const formatter = new Intl.DateTimeFormat('en-GB', options);
  const formattedDate = formatter.format(date);

  return formattedDate
}

