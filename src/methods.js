export default {
  daysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
  },

  startingDayInWeek(year, month) {
    return new Date(year, month, 1).getDay();
  }
};
