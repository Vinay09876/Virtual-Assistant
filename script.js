let btn = document.getElementById("btn");
let content = document.getElementById("content");
let voice = document.getElementById("voice");

function speak(text) {
  let text_speak = new SpeechSynthesisUtterance(text);
  text_speak.rate = 1;
  text_speak.volume = 1;
  text_speak.pitch = 1;
  text_speak.lang = "en-GB";
  window.speechSynthesis.speak(text_speak);
}

function wishme() {
  let day = new Date();
  let hours = day.getHours();
  console.log(hours);

  if (hours >= 0 && hours < 12) {
    speak(" Hello! Good Morning");
  } else if (hours >= 12 && hours < 16) {
    speak("Hello! Good Afternoon");
  } else if (hours >= 16 && hours < 20) {
    speak("Hello! Good Evening");
  } else {
    speak("Hello! Good Night");
  }
}
// window.addEventListener("load", () => {
//   wishme();
// });

let speechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();

recognition.onresult = (event) => {
  let currentIndex = event.resultIndex;
  let transcript = event.results[currentIndex][0].transcript;
  content.innerText = transcript;
  takeCommand(transcript.toLowerCase());
};

btn.addEventListener("click", () => {
  recognition.start();
  btn.style.display = "none";
  voice.style.display = "block";
});

function takeCommand(message) {
  btn.style.display = "flex";
  voice.style.display = "none";
  if (
    message.includes("hello") ||
    message.includes("hi") ||
    message.includes("hey")
  ) {
    speak("Hello Sir, How are you");
  } else if (message.includes("open google")) {
    speak("opening google");
    window.open("https://www.google.com");
  } else if (message.includes("open instagram")) {
    speak("opening instagram");
    window.open("https://www.instagram.com");
  } else if (message.includes("open facebook")) {
    speak("opening facebook");
    window.open("https://www.facebook.com");
  } else if (message.includes("open youtube")) {
    speak("opening youtube");
    window.open("https://www.youtube.com");
  } else if (message.includes("open whatsapp")) {
    speak("opening whatsapp");
    window.open("https://www.whatsapp.com");
  } else if (message.includes("open calculator")) {
    speak("opening calculator");
    window.open("calculator://");
  } else if (message.includes("time")) {
    let time = new Date().toLocaleString(undefined, {
      hour: "numeric",
      minute: "numeric",
    });
    speak(time);
  } else if (message.includes("date")) {
    let date = new Date().toLocaleString(undefined, {
      day: "numeric",
      month: "short",
    });
    speak(date);
  } else {
    let finalText =
      "This is what I found on Internet regarding" +
      message.replace("siri", "");
    speak(finalText);
    window.open(
      `https://www.google.com/search?q=${message.replace("siri", "")}`,
      "_blank"
    );
  }
}
