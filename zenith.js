const API_KEY = "AIzaSyBR5v1USUziTT4RehbPKOBcELDtzyCiGvU";

const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

const chat = document.getElementById("chat");
const input = document.getElementById("input");

let username = "User";
let interest = "";

function start() {

username = document.getElementById("name").value || "User";
interest = document.getElementById("interest").value || "";

document.getElementById("setup").style.display = "none";

add(`Hello ${username}. Zenith AI online. How may I assist you today?`, "ai");

}

function add(text, type) {

let d = document.createElement("div");

d.className = "msg " + type;

d.innerText = text;

chat.appendChild(d);

chat.scrollTop = chat.scrollHeight;

}

async function send() {

let text = input.value.trim();

if (!text) return;

add(text, "user");

input.value = "";

let prompt = `User name: ${username}
User interests: ${interest}

You are Zenith AI, a professional personal assistant similar to JARVIS. Respond clearly and helpfully.`;

try {

let res = await fetch(url, {
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify({
contents: [
{
role: "user",
parts: [{ text: prompt + "\n" + text }]
}
]
})
});

let data = await res.json();

let reply = "Zenith encountered an error.";

if (data.candidates && data.candidates.length > 0) {
reply = data.candidates[0].content.parts[0].text;
}

add(reply, "ai");

} catch (error) {

add("⚠️ Connection error with AI.", "ai");

}

}

input.addEventListener("keypress", function(e) {
if (e.key === "Enter") send();
});
