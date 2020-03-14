export default {
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
  },
  getDaysArray (start, end, perDay) {
    // 引数の日数間隔を開けた日付のリストを生成して返す
    for (var arr = [], dt = start; dt <= end; dt.setDate(dt.getDate() + perDay)) {
      arr.push(new Date(dt));
    }
    return arr;
  },
  /**
   * 引数のフォーマットに応じて日付オブジェクトをフォーマットする
   * date: 日付オブジェクト, format: 書式フォーマット
   */
  formatDate (date, format) {
    format = format.replace(/yyyy/g, date.getFullYear());
    format = format.replace(
      /yy/g,
      date
        .getFullYear()
        .toString()
        .substr(-2)
    );
    format = format.replace(/MM/g, ("0" + (date.getMonth() + 1)).slice(-2));
    format = format.replace(/dd/g, ("0" + date.getDate()).slice(-2));
    format = format.replace(/HH/g, ("0" + date.getHours()).slice(-2));
    format = format.replace(/mm/g, ("0" + date.getMinutes()).slice(-2));
    format = format.replace(/ss/g, ("0" + date.getSeconds()).slice(-2));
    format = format.replace(
      /SSS/g,
      ("00" + date.getMilliseconds()).slice(-3)
    );
    return format;
  },
  getDate235959: (d) => {
    d.setHours(23);
    d.setMinutes(59);
    d.setSeconds(59);
    return d
  }
}