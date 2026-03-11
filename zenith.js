const API_KEY = "AIzaSyBR5v1USUziTT4RehbPKOBcELDtzyCiGvU";

const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + API_KEY;

const chat = document.getElementById("chat");
const input = document.getElementById("input");

function add(text, type){
    const msg = document.createElement("div");
    msg.className = type;
    msg.innerText = text;
    chat.appendChild(msg);
}

async function send(){

let text = input.value.trim();
if(!text) return;

add(text,"user");
input.value="";

try{

const response = await fetch(url,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
contents:[
{
parts:[{text:text}]
}
]
})
});

const data = await response.json();

let reply="Error from AI.";

if(data.candidates){
reply=data.candidates[0].content.parts[0].text;
}

add(reply,"ai");

}catch(e){

add("Zenith connection error.","ai");

}

}

document.querySelector("button").onclick=send;
