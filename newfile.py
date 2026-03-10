import os
import google.generativeai as genai
from fastapi import FastAPI
from pydantic import BaseModel
import uvicorn

# --- MANUAL KEY LOADING ---
API_KEY = None

# Check if .env exists and read it line by line
if os.path.exists(".env"):
    with open(".env", "r") as f:
        for line in f:
            if "GEMINI_API_KEY" in line:
                # This splits the line at '=' and takes the second part
                API_KEY = line.split("=")[1].strip()
                break

if API_KEY:
    print(f"✅ Key found! Starts with: {API_KEY[:7]}")
    genai.configure(api_key=API_KEY)
else:
    print("❌ Error: Could not find 'GEMINI_API_KEY=' inside the .env file.")
    print("Make sure it looks like: GEMINI_API_KEY=your_key")

# --- FASTAPI CODE ---
app = FastAPI()

class UserProfile(BaseModel):
    ai_role: str
    tone: str
    depth: str

class ChatRequest(BaseModel):
    message: str
    profile: UserProfile

@app.post("/chat")
async def get_response(request: ChatRequest):
    p = request.profile
    system_instruction = f"Role: {p.ai_role}, Tone: {p.tone}, Depth: {p.depth}"
    model = genai.GenerativeModel("gemini-1.5-flash-latest")
    response = m
0
