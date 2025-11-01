import joblib
import pandas as pd
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware  # <-- IMPORT THIS

# 1. Initialize the app
app = FastAPI(
    title="Titanic Survival Prediction API",
    description="An API to predict passenger survival on the Titanic.",
    version="1.0.0"
)

# ==========================================================
# 2. ADD THE CORS MIDDLEWARE SECTION
# ==========================================================
# This allows your React app (running on localhost:3000)
# to make requests to this API.
origins = [
    "http://localhost:3000",
    "http://localhost",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)
# ==========================================================

# 3. Load our saved model pipeline
try:
    model = joblib.load('titanic_model.joblib')
    print("Model loaded successfully.")
except FileNotFoundError:
    print("Error: 'titanic_model.joblib' not found.")
    model = None

# 4. Define the input data format (Pydantic model)
class Passenger(BaseModel):
    Pclass: int
    Sex: str
    Age: float
    SibSp: int
    Parch: int
    Fare: float
    Embarked: str

    class Config:
        schema_extra = {
            "example": {
                "Pclass": 3,
                "Sex": "male",
                "Age": 22.0,
                "SibSp": 1,
                "Parch": 0,
                "Fare": 7.25,
                "Embarked": "S"
            }
        }

# 5. Define endpoints
@app.get("/")
def read_root():
    return {"message": "Welcome to the Titanic Survival Prediction API. Go to /docs to see the endpoints."}

@app.post("/predict")
def predict_survival(passenger: Passenger):
    if model is None:
         return {"error": "Model not loaded. Please check server logs."}

    data = passenger.dict()
    input_df = pd.DataFrame([data])
    
    prediction = model.predict(input_df)[0]
    probability = model.predict_proba(input_df)[0][1]
    
    return {
        "prediction": int(prediction),
        "prediction_label": "Survived" if int(prediction) == 1 else "Did not survive",
        "survival_probability": float(probability)
    }