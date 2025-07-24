// アンケート回答日
(function () {
  // ライブラリ
  /**
   * 任意の年が閏年であるかをチェックする
   * @param {number} チェックしたい西暦年号
   * @return {boolean} 閏年であるかを示す真偽値
   */
  const isLeapYear = (year) => (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

  /**
   * 任意の年の2月の日数を数える
   * @param {number} チェックしたい西暦年号
   * @return {number} その年の2月の日数
   */
  const countDatesOfFeb = (year) => (isLeapYear(year) ? 29 : 28);

  /**
   * セレクトボックスの中にオプションを生成する
   * @param {string} セレクトボックスのDOMのid属性値
   * @param {number} オプションを生成する最初の数値
   * @param {number} オプションを生成する最後の数値
   * @param {number} 現在の日付にマッチする数値
   */
  const createOption = (id, startNum, endNum, current) => {
    const selectDom = document.getElementById(id);
    let optionDom = "";
    for (let i = startNum; i <= endNum; i++) {
      if (i === current) {
        option = '<option value="' + i + '" selected>' + i + "</option>";
      } else {
        option = '<option value="' + i + '">' + i + "</option>";
      }
      optionDom += option;
    }
    selectDom.insertAdjacentHTML("beforeend", optionDom);
  };

  // DOM
  const yearBox = document.getElementById("year");
  const monthBox = document.getElementById("month");
  const dateBox = document.getElementById("date");

  // 日付データ
  const today = new Date();
  const thisYear = today.getFullYear();
  const thisMonth = today.getMonth() + 1;
  const thisDate = today.getDate();

  let datesOfYear = [31, countDatesOfFeb(thisYear), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // イベント
  monthBox.addEventListener("change", (e) => {
    dateBox.innerHTML = "";
    const selectedMonth = e.target.value;
    createOption("date", 1, datesOfYear[selectedMonth - 1], 1);
  });

  yearBox.addEventListener("change", (e) => {
    monthBox.innerHTML = "";
    dateBox.innerHTML = "";
    const updatedYear = e.target.value;
    datesOfYear = [31, countDatesOfFeb(updatedYear), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    createOption("month", 1, 12, 1);
    createOption("date", 1, datesOfYear[0], 1);
  });

  // ロード時
  createOption("year", 2021, thisYear, thisYear);
  createOption("month", 1, 12, thisMonth);
  createOption("date", 1, datesOfYear[thisMonth - 1], thisDate);
})();
