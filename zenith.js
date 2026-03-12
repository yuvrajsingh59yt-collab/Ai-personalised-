const API_URL = "https://your-project-name.vercel.app/api/ai"

const chat = document.getElementById("chat")
const input = document.getElementById("input")

let username = ""
let interest = ""
let purpose = ""

function start(){

username = document.getElementById("name").value || "User"
interest = document.getElementById("interest").value || ""
purpose = document.getElementById("purpose").value || ""

document.getElementById("setup").style.display = "none"

add(`Hello ${username}. Zenith AI online. How may I assist you today?`, "ai")

}

function add(text,type){

let msg = document.createElement("div")
msg.className = "msg " + type
msg.innerText = text

chat.appendChild(msg)
chat.scrollTop = chat.scrollHeight

}

async function send(){

let text = input.value.trim()
if(!text) return

add(text,"user")
input.value = ""

let prompt = `
User name: ${username}
User interests: ${interest}
Purpose: ${purpose}

You are Zenith AI, an intelligent assistant like JARVIS.
Respond professionally and helpfully.
`

try{

let res = await fetch(API_URL,{
method:"POST",
headers:{'Content-Type':'application/json'},
body:JSON.stringify({
prompt: prompt + "\n" + text
})
})

let data = await res.json()

let reply = data.reply || "Zenith encountered an error."

add(reply,"ai")

speak(reply)

}catch(e){

add("Connection error with AI server.","ai")

}

}

function speak(text){

let speech = new SpeechSynthesisUtterance(text)

speech.rate = 1
speech.pitch = 1

speechSynthesis.speak(speech)

}

function voice(){

let recognition = new webkitSpeechRecognition()

recognition.lang = "en-IN"

recognition.onresult = function(e){

input.value = e.results
