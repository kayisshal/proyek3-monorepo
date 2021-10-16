import Holidays from 'date-holidays'

let holidays
const getHolidays = () => {
  const hd = new Holidays('ID')
  const date = new Date()
  const temp = hd.getHolidays(date.getFullYear())
  holidays = temp.map(holiday => {
    const temp = holiday.date.split(' ')
    return {
      tanggal: temp[0],
      keterangan: holiday.name
    }
  })
  // console.log(holidays)
}
getHolidays()
export default holidays
