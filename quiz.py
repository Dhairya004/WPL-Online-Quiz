import json
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

app = FastAPI()

templates = Jinja2Templates(directory="templates")
app.mount("/Images", StaticFiles(directory="Images"), name="images")
app.mount("/css", StaticFiles(directory="css"), name="css")
app.mount("/js", StaticFiles(directory="js"), name="js")

# ------------------- Custom Functions ------------------

def evaluate_quiz(answers, topic):
    mapping = {
        "gk": "General Knowledge",
        "science": "Science",
        "sports": "Sports",
        "sciencefiction": "Science Fiction",
        "currentaffairs": "Current Affairs",
        "environment": "Environment",
    }
    topicName = mapping.get(topic)
    with open('js/questions.json', 'r') as f:
        questions_data = json.load(f)

    topic_questions = questions_data.get(topicName, [])
    score = 0
    total = len(topic_questions)

    for i, question in enumerate(topic_questions):
        correct_answer = question.get("correctOptionIndex", 0)
        user_answer = answers.get(f"q{i}", None)
        if user_answer is not None and int(user_answer) == correct_answer:
            score += 1

    return {"score": score, "total": total, "percentage": (score / total * 100) if total > 0 else 0}


# ------------------- Routes ------------------

@app.get("/")
def read_root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.get("/topics")
def read_topics(request: Request):
    return templates.TemplateResponse("topics.html", {"request": request})

@app.get("/quiz/{topic}")
def read_quiz(request: Request, topic: str):
    return templates.TemplateResponse("quiz.html", {"request": request, "topic": topic})

@app.get("/signin")
def read_signin(request: Request):
    return templates.TemplateResponse("signin.html", {"request": request})

@app.get("/signup")
def read_signup(request: Request):
    return templates.TemplateResponse("signup.html", {"request": request})

@app.post("/submit_quiz/{topic}")
def submit_quiz(request: Request, topic: str, answers: dict):
    result = evaluate_quiz(answers, topic)
    return JSONResponse(content={"score": result["score"], "total": result["total"], "percentage": result["percentage"]})