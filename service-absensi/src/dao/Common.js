export const calculateWeekOfMonth = (tgl) => {
  const week = Math.ceil(tgl / 7)
  return week > 4 ? 4 : week
}
