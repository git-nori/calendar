export default {
  // getTimeMin: () => {
  //   // googleCalendarから取得する集計開始日を算出する
  //   let date = new Date();
  //   if (this.termType.indexOf("w") != -1) {
  //     date.setDate(
  //       date.getDate() - 7 * parseInt(this.termType.replace("w", ""))
  //     );
  //   } else if (this.termType.indexOf("m") != -1) {
  //     date.setMonth(
  //       date.getMonth() - parseInt(this.termType.replace("m", ""))
  //     );
  //   }
  //   date.setHours(0);
  //   date.setMinutes(0);
  //   date.setSeconds(0);
  //   return date;
  // }
  getTimeMin: (termType) => {
    // googleCalendarから取得する集計開始日を算出する
    let date = new Date();
    if (termType.indexOf("w") != -1) {
      date.setDate(
        date.getDate() - 7 * parseInt(termType.replace("w", ""))
      );
    } else if (termType.indexOf("m") != -1) {
      date.setMonth(
        date.getMonth() - parseInt(termType.replace("m", ""))
      );
    }
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    return date;
  }
}