const API_URL="https://your-vercel-app.vercel.app/api/ai"

const chat=document.getElementById("chat")
const input=document.getElementById("input")

let username=""
let interest=""
let purpose=""

function start(){

username=document.getElementById("name").value
interest=document.getElementById("interest").value
purpose=document.getElementById("purpose").value

document.getElementById("setup").style.display="none"

add(`Hello ${username}. Zenith AI online.`,"ai")

}

function add(text,type){

let d=document.createElement("div")
d.className="msg "+type
d.innerText=text

chat.appendChild(d)
chat.scrollTop=chat.scrollHeight

}

async function send(){

let text=input.value
if(!text) return

add(text,"user")
input.value=""

let prompt=`
User name: ${username}
User interests: ${interest}
Purpose: ${purpose}

You are Zenith AI like JARVIS.
Respond professionally.
`

let res=await fetch(API_URL,{
method:"POST",
headers:{'Content-Type':'application/json'},
body:JSON.stringify({
prompt:prompt+"\n"+text
})
})

let data=await res.json()

add(data.reply,"ai")

speak(data.reply)

}

function speak(text){

let speech=new SpeechSynthesisUtterance(text)
speech.rate=1
speech.pitch=1

speechSynthesis.speak(speech)

}

function voice(){

let rec=new webkitSpeechRecognition()
rec.lang="en-IN"

rec.onresult=function(e){

input.value=e.results[0][0].transcript
send()

}

rec.start()

}
