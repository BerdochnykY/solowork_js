"use strict";
window.fineList = {
  searchFines: searchFines,
};

//Ця зміна містить всі дані які в нас зберігаються у файлі data
let DB = data.finesData;

function searchFines(searchKey) {
  function onlyDigits(searchValue) {
    let reNumbers = /^\d+$/;
    return reNumbers.test(searchValue);
  }

  function onlyThreeTypes(searchValue) {
    let reTypes = /^(Перевищення швидкості|Невірне паркування|Їзда у не тверезому стані)$/;
    return reTypes.test(searchValue);
  }

  // Функція формує значення з номером як в базі, щоб на початку були "нулі", якщо їх не було введено при пошуку.
  function correctValue(searchValue) {
    if (searchValue.length === 1) {
      return "00" + searchValue;
    } else if (searchValue.length === 2) {
      return "0" + searchValue;
    } else if (searchValue.length === 3) {
      return searchValue;
    } else {
      return searchValue;
    }
  }

  // Якщо є номер, відбувається спроба знайти такий номер в базі
  if (onlyDigits(searchKey)) {
    // Пошук по номеру штрафа
    let correctKey = correctValue(searchKey);

    for (let row in DB) {
      if (correctKey === DB[row]["номер"]) {
        return [
          {номер: DB[row]["номер"], тип: DB[row]["тип"], сума: DB[row]["сума"], дата: DB[row]["дата"]},
        ];
      }
    }
    alert("В базі не знайшлося такого номеру. :(");
    // Щоб не було помилки в "forEach", повертаю всю базу або можна повернути прочерки
    // return [{ номер: "-", тип: "-", сума: "-", дата: "-" }];
    return DB
  } 
  // Якщо було введено один з 3-х типів, будуть віддаватися всі знайдені значення з таблиці з цим типом
  else if (onlyThreeTypes(searchKey)) {
    // Пошук за Типом штрафу
    var resultValues = [];
    for (let row in DB) {
      if (searchKey === DB[row]["тип"]) {
        resultValues.push(
          {номер: DB[row]["номер"], тип: DB[row]["тип"], сума: DB[row]["сума"], дата: DB[row]["дата"]}
        );
      }
    }
    
    // Якщо буде хоча б одне знайдене значення - воно повернеться. Якщо не знайдено - відпрацює помилка
    if (resultValues.length > 0) {
      return resultValues;
    }
    else {
      alert("В базі не знайшлося таких типів. :(");
      // Щоб не було помилки в "forEach", повертаю всю базу або можна повернути прочерки
      // return [{ номер: "-", тип: "-", сума: "-", дата: "-" }];
      return DB
    }
  }
  else {
    alert(`Пошук працює тільки:\n - За номером\n - За типом штрафу`);
    // Щоб не було помилки в "forEach", повертаю всю базу або можна повернути прочерки
    // return [{ номер: "-", тип: "-", сума: "-", дата: "-" }];
    return DB
  }

  /*
     Напишіть свій код тут!
     Як ви бачите функція повертає статичні дані.
     Замість масиву який прописаний хардкодом, вам необхідно реалізувати цю функцію
     так, щоб вона повертала масив відповідно переданому значенню в функцію.
     Саме значення - це "Пошук за номером" або "Пошук за типом штрафу"
     Тип штрафу може бути тільки
     - Перевищення швидкості
     - Невірне паркування
     - Їзда у не тверезому стані
     */

  // return [
  //     {номер: '001', тип: 'Перевищення швидкості', сума: 100, дата: '2023-01-15'}
  // ];
}
