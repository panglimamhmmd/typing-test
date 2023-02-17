const timer = document.getElementById("timer");
timer.textContent = "00:30";
const userInput = document.getElementById("typing_area");
const wordsValid = document.getElementById("wordsValid");
const wordsContainer = document.getElementById("words_container");
const words =
  "dan yang di tidak untuk dari dengan pada dalam itu saya ini adalah kamu kita bisa apa sudah jika atau mereka harus ke ada juga tapi akan atas karena baru dia lagi punya hanya mengapa bisa ya bagaimana saat sekarang pada semua mungkin sedang memang jadi benar harusnya banyak kalau sudah seperti tetapi ada sendiri terus jangan kamu dari pun sebelum masih untuk saja tapi tidak akan hari dalam tahu lalu sesuai karena sangat terlalu juga terbaik menurut pernah terjadi di namun belakang setiap lagi bahkan depan sini nanti sebagian mulai harus tiga setelah langsung memang menjadi memungkinkan mengalami secepatnya tinggi waktu menggunakan belajar milik bulan sepertinya awal sangatlah dalamnya sebab kecil paling sering memberikan kesempatan memperbaiki mengetahui mengambil semakin sekarang yang berada pasti bawah dihadapi keluar melalui melihat mengerti bisa dipastikan didalam menambahkan menangani terhadap memperoleh menunjukkan sekaligus tiga hal tanpa tempat waktu menerima kebutuhan tangan membawa menghasilkan sebenarnya meningkat menghadapi langsung mempersiapkan mengejar baru ada ke di yang dari dengan untuk ini tidak aku akan seperti atau mereka kita sudah tapi dalam lain ada ia juga bagi saya namun jadi oleh masih harus bisa kami ataupun sekarang atau jangan sebagai tersebut dapat semua karena hanya tentang saat terlalu dalam banyak telah memiliki sebelum setelah lebih semakin lebih banyak bahwa itu waktu saja sejak sini di mana orang sedang saja bagaimana ada demi lalu terhadap lainnya untuk saat sedangkan baru-baru beberapa melalui masa hidup masing berada selama kemudian kali lagi bagian bahwa mengapa sebelumnya sedikit segala sesuatu sebagian bawah hari selalu bisa jika terlihat sebelumnya berbagai keluar tersebut sekitar mendapatkan sejak akhir jauh melakukan memberikan memiliki sendiri kembali layak karena berarti merupakan sering terus demi terlihat mungkin hal kelompok perlu diberikan pada berkaitan menjadi sudut bertemu yang sebab terhadap walaupun dimana kemungkinan sehingga baru-baru apapun berkaitan masing-masing suatu tentu tinggi besar dalam pendek beberapa memang mampu sistem masing terutama mungkin belakang mudah memasukkan seluruh menunjukkan jelas menjadi sesuai terbuka memungkinkan juga tingkat berarti berbeda khususnya tersedia masih selain sebenarnya melihat berlaku membuat ada luar maka oleh sedikit dalam kecil sepertinya kepada biasa langsung menyediakan tidak sedikitpun sekitar hingga bersama nyata lebih saat itu termasuk banyak kesempatan tentang sebagai yang utama sejak termasuk hal karena berbagai pikiran di kedua sama melihat memilih bertanggungjawab mendapat dilakukan pikiran rencana senang tidak bersama-sama lebih sebagai memiliki setiap tinggi meningkat terus-menerus mendapat rencana seluruh bertindak";

const randomWords = randomizeWords(words.split(" "));
let duration = 30;

let validWord = 0;
let spacePressed = 0;
let isStarted = false;
let wordWillDisplay = 20;
let spaceAttemp = 20;
let typeAttemp = 1;
let validCharacterTotal = 0;
let validSpaceTotal = 0;

window.addEventListener("load", function () {
  wordsBuilder(randomWords, wordsContainer);
  wordsColor("highlight", 0);
  wordsHide(20, 0);
});

function randomizeWords(words) {
  // words type = array
  let newArr = [];
  for (let i = 0; i < 200; i++) {
    const index = Math.floor(Math.random() * words.length);
    newArr.push(words[index].toLowerCase());
  }
  return newArr;
}

// pembangun kata random
function wordsBuilder(words, destination) {
  words.forEach((word, index) => {
    destination.innerHTML += `<span id = wordrn${index}">${word}</span> `;
  });
}

// trigger timer
userInput.addEventListener("keypress", function (event) {
  // jika user mulai mengetik,  start timer
  if (event.key != undefined && !isStarted) {
    setTimer(duration, timer);
    isStarted = true;
  }
});

// spasi trigger, agar kata di validasi
userInput.addEventListener("keypress", function (event) {
  if (event.key == " ") {
    if (userInput.value.length > 1) {
      if (userInput.value[0] == " ") {
        wordValidating(userInput.value.substr(1), spacePressed);
      } else {
        wordValidating(userInput.value, spacePressed);
      }
    } else {
      userInput.value = "";
      return 0;
    }

    spacePressed++;
    if (spacePressed == spaceAttemp) {
      typeAttemp++;
      spaceAttemp += 20;
      console.log(spaceAttemp);
      wordsUnhide(wordWillDisplay, typeAttemp);
      wordsHide(wordWillDisplay, typeAttemp);
    }
    userInput.value = "";
  }
});

// timer jeuu

// validasi kata jika benar dan salah
function wordValidating(userWord, index) {
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
  const random_span = document.getElementsByTagName("span");

  // console.log(random_span);
  switch (condition) {
    case "highlight":
      random_span[word_index].className = "highlight";
      break;
    case "valid":
      random_span[word_index].className = "valid";
      break;
    case "invalid":
      random_span[word_index].className = "invalid";
      break;
  }
}

function wordsHide(hide, attemp) {
  const hidden_span = document.getElementsByTagName("span");
  // hide
  if (attemp == 0) {
    for (let i = hide; i < hidden_span.length; i++) {
      hidden_span[i].style.display = "none";
    }
  } else {
    for (let i = 0; i < hide * (attemp - 1); i++) {
      hidden_span[i].style.display = "none";
    }
  }
}

function wordsUnhide(unhide, attemp) {
  // unhide
  console.log("unhide");
  const hidden_span = document.getElementsByTagName("span");
  for (let i = 0; i < unhide * attemp; i++) {
    // console.log(i);
    console.log(attemp);
    hidden_span[i].style.display = "";
  }
  // unhide
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
      // wordsValid.innerHTML = `Sesi telah berakhir,  ${validWord}WPM`;
      clearInterval(intervalID);
      resultCount();
    }
  }, 1000);
}
function resultCount() {
  let characterTotal = 0;
  const wordsTyped = validSpaceTotal;
  wordsContainer.innerHTML = "";
  console.log(validCharacterTotal, " : ", spacePressed);
  randomWords.splice(0, spacePressed).forEach((element) => {
    characterTotal += element.length;
  });

  console.log(`
  jumlah karakter bener: ${validCharacterTotal}
  jumlah kata yang benar: ${wordsTyped}
  `);
  wordsValid.innerHTML = `
  <h5>WPM: ${(validCharacterTotal / 5) * 2}</h5>
  <p>(Words Per Minute)</p>
  <ul class="list-group">
    <li class="list-group-item">Total Karakter : (<span class="valid">${validCharacterTotal}</span>| <span class="invalid">${
    characterTotal - validCharacterTotal
  }</span>) ${characterTotal}</li>
    <li class="list-group-item">Accuracy : ${
      (validCharacterTotal / characterTotal) * 100
    }% </li>
    <li class="list-group-item valid">Correct Words : ${wordsTyped}</li>
    <li class="list-group-item invalid">Wrong Words : ${
      spacePressed - wordsTyped
    }</li>
  </ul>`;
}
