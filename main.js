$(function () {
  /* -----------------------------
   現在，お酒を飲みますか？
  ----------------------------- */
  // drinkStop　やめた人の回答エリア
  // drinkNow　飲む人とやめた人の回答エリア
  // requency　飲酒頻度
  // liquorType 酒の組み合わせ回答エリア
  let drinkStop = $(".drink-stop");
  let drinkNow = $(".drink-now");
  let frequency = $(".drink-now input[name=drfreq]");

  let liquorType = $(".liquorType"); 
  let noAnswere = liquorType.find(".hidden input");
   /* お酒を「飲まない」or 飲んでも頻度が「ほとんど飲まない」場合
  <label class="hidden"><input type="radio" name="●" value="0">>回答なし</label>
  value値を0にする（各種酒の量を0でかえす）
  */

  drinkNow.hide();
  drinkStop.hide();
  liquorType.hide();

  //name="drink"「飲む」「やめた」「飲まない」
  $("input[name=drink]").on("change", function () {
    if ($(this).val() == "1") {
      //「飲む」
      drinkNow.show().prop("disabled", false);
      drinkStop.hide().prop("disabled", true);
      liquorType.removeClass("deactivate");
      noAnswere.prop("checked", false);
    } else if ($(this).val() == "2") {
      //「やめた」
      drinkNow.show().prop("disabled", false);
      drinkStop.show().prop("disabled", false);
      liquorType.removeClass("deactivate");
      noAnswere.prop("checked", false);
    } else if ($(this).val() == "3") {
      //「飲まない」
      drinkNow.hide().prop("disabled", true);
      drinkStop.hide().prop("disabled", true);
      noAnswere.prop("checked", true);
      liquorType.addClass("deactivate");
    } else if ($(this).val() == "1" && frequency.val() == "1") {
      //「飲む」→「頻度：ほとんど飲まない」→「量：0」
      noAnswere.prop("checked", true);
    } else if ($(this).val() == "2" && frequency.val() == "1") {
      //「やめた」→「頻度：ほとんど飲まない」→「量：0」
      noAnswere.prop("checked", true);
    }
  });

  //name="drfreq" 飲酒頻度
  frequency.on("change", function () {
    if ($(this).val() == "1") {
      //「ほとんど飲まない」
      liquorType.hide();
      noAnswere.prop("checked", true);
    } else {
      //それ以外
      liquorType.show();
      noAnswere.prop("checked", false);
    }
  });

  // .liquor-type その他 酒種類に記入があったら、摂取量項目を入力可
  let other = $('input[name="drot_tgk"]');
  other.on("change", function () {
    let otherVal = other.val();
    let amount = $(".amount");
    let amountVal = $(".amount input[type=radio]");

    if (otherVal == null || otherVal == "") {
      amount.prop("disabled", true);
      amountVal.prop("checked", false);
    } else {
      amount.prop("disabled", false);
    }
  });

   /* ------------------------------------------
   あなたの性別は？
  ------------------------------------------ */
  $(".sex input[type=radio]").on("change", function () {
    if ($(this).val() == "1") {
      // 男
      $(".pregnant").prop("disabled", true).removeClass("is-active").find("input").prop("checked", false);
    } else {
      // 女
      $(".pregnant").prop("disabled", false).addClass("is-active");
    }
  });

  /* ------------------------------------------
   最近５年以内に食習慣が大きく変わりましたか？
  ------------------------------------------ */
  $(".eatingHabit input[type=radio]").on("change", function () {
    let otherRsn = $("#DPCrsn_tgk");

    if ($(this).val() == "1") {
      //「変わらない」の場合
      $(".eatingHabit-reason").prop("disabled", true).removeClass("is-active").find("input").prop("checked", false);
      otherRsn.hide().prop("disabled", true);
    } else {
      //「変わらない」以外の場合
      $(".eatingHabit-reason").prop("disabled", false).addClass("is-active");
    }
  });

  /* ------------------------------------------
   摂取頻度と1回の食べる量(少ない・同じ・多い)
  ------------------------------------------ */
  $(".divideUp input[type=radio]").on("change", function () {
    let divideUpItems = $(this).parents(".divideUp").next(".divideUp-items");
    let divideUpItemsVal = divideUpItems.find("input").not(".hidden input");
    let unAnswered = divideUpItems.find(".hidden input");

    if ($(this).val() == "1") {
      //「月に１回未満」の場合
      divideUpItems.removeClass("is-active");
      divideUpItemsVal.prop("checked", false);
      unAnswered.prop("checked", true); //value値を0にする
    } else {
      //「月に１回未満」以外の場合
      divideUpItems.addClass("is-active");
      unAnswered.prop("checked", false);
    }
  });
});

{
  //5年以内食生活変わった理由-その他
  const textboxFunc = () => {
    const other = document.querySelector("#other-rsn"); //ラジオボタン「その他」
    const text = document.querySelector("#DPCrsn_tgk"); //テキストボックス「その他の内容」

	if(other){
    other.addEventListener(
      "click",
      (e) => {
        if (e.target.checked) {
          text.style.display = "block";
          text.disabled = false;
        } else {
          text.style.display = "none";
          text.disabled = true;
        }
      },
      false
    );
    }
  };
  textboxFunc();
}
