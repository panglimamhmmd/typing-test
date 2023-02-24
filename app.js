let duration = 0;
if (!sessionStorage.getItem("duration")) {
  duration = 60; // defalt duration
} else {
  duration = sessionStorage.getItem("duration");
}

const timer = document.getElementById("timer");
const userInput = document.getElementById("typing_area");
const wordsValid = document.getElementById("wordsValid");
const wordsContainer = document.getElementById("words_container");

let wordsAmount = 8; // jumlah karakter = 8
let counter = wordsAmount; //
let repetition = 1;

let validWord = 0;
let spacePressed = 0;
let isStarted = false;
let validCharacterTotal = 0;
let validSpaceTotal = 0;
const words =
  "dan yang di tidak untuk dari dengan pada dalam itu saya ini adalah kamu kita bisa apa sudah jika atau mereka harus ke ada juga tapi akan atas karena baru dia lagi punya hanya mengapa bisa ya bagaimana saat sekarang pada semua mungkin sedang memang jadi benar harusnya banyak kalau sudah seperti tetapi ada sendiri terus jangan kamu dari pun sebelum masih untuk saja tapi tidak akan hari dalam tahu lalu sesuai karena sangat terlalu juga terbaik menurut pernah terjadi di namun belakang setiap lagi bahkan depan sini nanti sebagian mulai harus tiga setelah langsung memang menjadi memungkinkan mengalami secepatnya tinggi waktu menggunakan belajar milik bulan sepertinya awal sangatlah dalamnya sebab kecil paling sering memberikan kesempatan memperbaiki mengetahui mengambil semakin sekarang yang berada pasti bawah dihadapi keluar melalui melihat mengerti bisa dipastikan didalam menambahkan menangani terhadap memperoleh menunjukkan sekaligus tiga hal tanpa tempat waktu menerima kebutuhan tangan membawa menghasilkan sebenarnya meningkat menghadapi langsung mempersiapkan mengejar baru ada ke di yang dari dengan untuk ini tidak aku akan seperti atau mereka kita sudah tapi dalam lain ada ia juga bagi saya namun jadi oleh masih harus bisa kami ataupun sekarang atau jangan sebagai tersebut dapat semua karena hanya tentang saat terlalu dalam banyak telah memiliki sebelum setelah lebih semakin lebih banyak bahwa itu waktu saja sejak sini di mana orang sedang saja bagaimana ada demi lalu terhadap lainnya untuk saat sedangkan baru-baru beberapa melalui masa hidup masing berada selama kemudian kali lagi bagian bahwa mengapa sebelumnya sedikit segala sesuatu sebagian bawah hari selalu bisa jika terlihat sebelumnya berbagai keluar tersebut sekitar mendapatkan sejak akhir jauh melakukan memberikan memiliki sendiri kembali layak karena berarti merupakan sering terus demi terlihat mungkin hal kelompok perlu diberikan pada berkaitan menjadi sudut bertemu yang sebab terhadap walaupun dimana kemungkinan sehingga baru-baru apapun berkaitan masing-masing suatu tentu tinggi besar dalam pendek beberapa memang mampu sistem masing terutama mungkin belakang mudah memasukkan seluruh menunjukkan jelas menjadi sesuai terbuka memungkinkan juga tingkat berarti berbeda khususnya tersedia masih selain sebenarnya melihat berlaku membuat ada luar maka oleh sedikit dalam kecil sepertinya kepada biasa langsung menyediakan tidak sedikitpun sekitar hingga bersama nyata lebih saat itu termasuk banyak kesempatan tentang sebagai yang utama sejak termasuk hal karena berbagai pikiran di kedua sama melihat memilih bertanggungjawab mendapat dilakukan pikiran rencana senang tidak bersama-sama lebih sebagai memiliki setiap tinggi meningkat terus-menerus mendapat rencana seluruh bertindak";

const randomWords = randomizeWords(words.split(" "));

window.addEventListener("load", function () {
  wordsBuilder(randomWords, wordsContainer);
  wordsColor("highlight", 0);
  hideAll();
  displayWordsDefault();
  setDurationByDropdown(duration);
});

// trigger timer
userInput.addEventListener("input", function (event) {
  // jika user mulai mengetik,  start timer
  if (event.target.value != undefined && !isStarted) {
    setTimer(duration, timer);
    isStarted = true;
  }
});

userInput.addEventListener("input", function (event) {
  const val = userInput.value;
  const valValid = val.substr(0, val.length - 1); //karena spasi masuk ke value
  if (event.target.value.includes(" ")) {
    spaceDetected(valValid);
  }
});

function spaceDetected(value) {
  if (value.length >= 1) {
    if (value[0] == " ") {
      wordValidating(value.substr(1), spacePressed);
      console.log(value);
    } else {
      wordValidating(value, spacePressed);
      // console.log(value);
    }
  } else {
    userInput.value = "";
    // console.log(value.length);
    return 0;
  }

  // repetition words

  spacePressed++;
  if (spacePressed == counter) {
    repeatWords(repetition);
    repetition++;
    counter += wordsAmount;
  }
  userInput.value = "";
}

function randomizeWords(words) {
  // words type = array
  let newArr = [];
  // 200 untuk jumlah kata yang ada ada
  for (let i = 0; i < 200; i++) {
    const index = Math.floor(Math.random() * words.length);
    newArr.push(words[index].toLowerCase());
  }
  return newArr;
}
function wordsBuilder(words, destination) {
  let spaceAdd = 8; // setiap 10 kata dikasih <br>
  words.forEach((word, index) => {
    if (index + 1 == spaceAdd) {
      destination.innerHTML += `<span class = "renderWords" id = wordrn${index}">${word} <br></span>  `;
      spaceAdd += wordsAmount;
    } else {
      destination.innerHTML += `<span class = "renderWords" id = wordrn${index}">${word}</span> `;
    }
  });
}

function wordValidating(userWord, index) {
  // validasi kata jika benar dan salah
  if (userWord == randomWords[index]) {
    wordsColor("valid", index);
    validCharacterTotal += userWord.length;
    validSpaceTotal++;
  } else {
    wordsColor("invalid", index);
  }
  wordsColor("highlight", index + 1);
}

function wordsColor(condition, word_index) {
  const random_span1 = document.getElementsByClassName("renderWords");
  switch (condition) {
    case "highlight":
      random_span1[word_index].classList.add("highlight");
      break;
    case "valid":
      random_span1[word_index].className = "valid renderWords";
      break;
    case "invalid":
      random_span1[word_index].className = "invalid renderWords";
      break;
  }
}

function resultCount() {
  let characterTotal = 0;

  wordsContainer.innerHTML = "";

  randomWords.splice(0, spacePressed).forEach((element) => {
    characterTotal += element.length;
  });
  const minute = duration == 60 ? 1 : duration == 30 ? 0.5 : 0.25;
  const wpm = Math.floor(validCharacterTotal / 5 / minute);
  const correctWords = validSpaceTotal;
  const incorrectWords = spacePressed - validSpaceTotal;
  const accuracy = Math.floor((validCharacterTotal / characterTotal) * 100);
  const correctChar = validCharacterTotal;

  // console.log(wpm, correctWords, incorrectWords, accuracy, correctChar);
  wordsValid.innerHTML = `
  <h5>WPM: ${wpm}</h5>
  <p>(Words Per Minute)</p>
  <ul class="list-group">
    <li class="list-group-item">Total Character : ( <span class="valid">${correctChar}</span> | <span class="invalid">${
    characterTotal - correctChar
  }</span> ) ${characterTotal} </li>
    <li class="list-group-item">Accuracy : ${accuracy}% </li>
    <li class="list-group-item valid">Correct Words : ${correctWords}</li>
    <li class="list-group-item invalid">Wrong Words : ${incorrectWords}</li>
    </ul>`;
}

const dropdownItems = document.querySelectorAll(".dropdown-menu a");
dropdownItems.forEach(function (item) {
  item.addEventListener("click", function () {
    const selectedItem = parseInt(item.textContent);
    setDurationByDropdown(selectedItem);
    sessionStorage.setItem("duration", selectedItem);
    console.log(duration);
    window.location.reload();
  });
});

function setDurationByDropdown(time = 60) {
  time === 60
    ? (timer.textContent = "01:00")
    : (timer.textContent = "00:" + time);
  duration = time;
}

function setTimer(durasi, container) {
  let total = durasi - 1;
  intervalID = setInterval(function () {
    let total_menit = Math.floor(total / 60);
    let total_sekon = total % 60;

    total_menit < 10 ? (total_menit = "0" + total_menit) : total_menit;
    total_sekon < 10 ? (total_sekon = "0" + total_sekon) : total_sekon;

    container.textContent = total_menit + ":" + total_sekon;

    total--;
    if (total < 0) {
      clearInterval(intervalID);
      resultCount();
    }
  }, 1000);
}

const hideAll = () => {
  const words = document.getElementsByClassName("renderWords");
  // menghilangkan semua kata
  for (let i = 0; i < words.length; i++) {
    words[i].style.display = "none";
  }
};

const displayWordsDefault = () => {
  const words = document.getElementsByClassName("renderWords");
  for (let i = 0; i < wordsAmount * 2; i++) {
    words[i].style.display = "";
  }
};

const repeatWords = (repetition) => {
  const words = document.getElementsByClassName("renderWords");
  // hapus row pertama
  for (let i = 0; i < wordsAmount * repetition; i++) {
    words[i].style.display = "none";
  }

  let secondRowIndex = wordsAmount * (repetition + 1);
  let thirdRowIndex = wordsAmount * (repetition + 2);
  // show row ketiga
  for (let i = secondRowIndex; i < thirdRowIndex; i++) {
    words[i].style.display = "";
  }

  console.log(secondRowIndex, thirdRowIndex);
};
