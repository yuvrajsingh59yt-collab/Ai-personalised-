const API_KEY = "AIzaSyBjuxqscWJP6Sz2uVdVi8FBpf-7HF4I3lM";

const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

const chat = document.getElementById("chat");
const input = document.getElementById("input");

let history = [];

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

    history.push({
        role: "user",
        parts: [{ text: text }]
    });

    try {

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: history
            })
        });

        const data = await response.json();

        let reply = "Zenith could not respond.";

        if (data.candidates && data.candidates.length > 0) {
            reply = data.candidates[0].content.parts[0].text;
        }

        history.push({
            role: "model",
            parts: [{ text: reply }]
        });

        add(reply, "ai");

    } catch (error) {

        console.error(error);

        add("⚠️ Connection error with AI service.", "ai");

    }
}

document.querySelector("button").onclick = send;

input.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        send();
    }
});
