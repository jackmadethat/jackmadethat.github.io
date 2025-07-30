const Zodiac = ({ date }) => {
  const getZodiac = (month, day) => {
    const bound = [20,19,20,20,20,21,22,22,21,22,21,21];
    const startMonth = ["Capricorn","Aquarius","Pisces","Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius"];
    const monthIndex = month + 1;
    let signMonthIndex;

    if (day <= bound[monthIndex]) {
      signMonthIndex = monthIndex;
    } else {
      signMonthIndex = (monthIndex + 1) % 12; // mod 12 to loop around to January index.
    }
    return startMonth[signMonthIndex];
  }

  return getZodiac(date.getMonth(), date.getDay());
}

export default Zodiac
