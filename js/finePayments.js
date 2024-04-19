"use strict";
/**
Перед вами список полів. Це можна сказати пряме посилання на кожне із полів форми.
Якщо ви додасте до змінної .value (fineNumber.value) то отримаєте значення
яке зберігається в цьому полі.
 */
let fineNumber = document.getElementById("fineNumber");
let passport = document.getElementById("passport");
let creditCardNumber = document.getElementById("creditCardNumber");
let cvv = document.getElementById("cvv");
let amount = document.getElementById("amount");
let buttonSubmit = document.getElementById("payFine");

//Ця зміна містить всі дані які в нас зберігаються у файлі data
let DB = data.finesData;

/**
Вам необхідно реалізувати наступний функціонал.
Зробити валідацію до всіх полів
1. Номер та сума повинні бути однакові як в існуючого штрафу - якщо ні видавати
alert "Номер не співпадає" або "Сума не співпадає"

2. Паспортні дані у форматі - перші дві літери укр алфавіту, та 6 цифр.
Якщо не співпадає то видавати alert "Не вірний паспортний номер"

3. Номер кредитної карки 16 цифр -
якщо не співпадає то видавати alert "Не вірна кредитна картка"

4. cvv 3 цифри - якщо не співпадає то видавати alert "Не вірний cvv".

Якщо валідація проходить успішно, то виконати оплату,
 тобто вам потрібно видалити обєкт з DB
 */
buttonSubmit.addEventListener("click", payFine);
function payFine() {
  // Валідація для номеру і суми
  function validNumberAndAmount(fineNum, fineAmount) {
    for (let row in DB) {
      if (
        fineNum === DB[row]["номер"] &&
        Number(fineAmount) === DB[row]["сума"]
      ) {
        return true;
      } else if (
        fineNum === DB[row]["номер"] &&
        Number(fineAmount) !== DB[row]["сума"]
      ) {
        alert("Сума не співпадає");
        return false;
      }
    }
    alert("Номер не співпадає");
    return false;
  }

  // Валідація для паспорта
  function validPasport(pasportValue) {
    let rePasport = /^[А-ЯҐЄІЇ]{2}\d{6}$/;

    if (rePasport.test(pasportValue)) {
      return true;
    } else {
      alert("Не вірний паспортний номер");
      return false;
    }
  }

  // Валідація для карти
  function validCard(cardValue) {
    let reCard = /^\d{16}$/;

    // На всяк випадок приберемо "-" якщо було введено карту з ними
    let newCard = String(cardValue).replace(/-/g, "");
    if (reCard.test(newCard)) {
      return true;
    } else {
      alert("Не вірна кредитна картка");
      return false;
    }
  }

  // Валідація для cvv
  function validCvv(cvvValue) {
    let reCvv = /^\d{3}$/;

    if (reCvv.test(cvvValue)) {
      return true;
    } else {
      alert("Не вірний cvv");
      return false;
    }
  }

  // Основий перебір всіх перевірок і видалення з "бази"
  // Першочергово перевірка на заповненість всіх полів
  if (
    (fineNumber.value,
    amount.value,
    passport.value,
    creditCardNumber.value,
    cvv.value)
  ) {
    var test1 = validNumberAndAmount(fineNumber.value, amount.value);
    var test2 = validPasport(passport.value);
    var test3 = validCard(creditCardNumber.value);
    var test4 = validCvv(cvv.value);
    if (test1 && test2 && test3 && test4) {
      for (let i = 0; i < DB.length; i++) {
        // Якщо є співпадіння по номеру видаємо повідомлення для підтвердження оплати
        if (DB[i]["номер"] === fineNumber.value) {
          var searchResult = confirm(
            `Було знайдено штраф:\n - номер: ${fineNumber.value}\n - сума: ${amount.value}\nПідтвердіть оплату`
          );
          if (searchResult) {
            // Видалення з "бази"
            DB.splice(i, 1);
            console.log("Штраф сплачено");
            // Робимо очистку полів пусля успішної "оплати" штрафу
            fineNumber.value = "";
            passport.value = "";
            creditCardNumber.value = "";
            cvv.value = "";
            amount.value = "";
            break;
          } else {
            console.log("Оплату скасовано");
            break;
          }
        }
      }
    }
  } else {
    alert("Всі поля обовʼязкові до заповнення!");
  }
}
