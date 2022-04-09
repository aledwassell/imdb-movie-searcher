from tf_model import *
import os
from uvicorn import run
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import math

"""
Fir development run 'python -m uvicorn main:app --host 127.0.0.1 --port 5000 --reload' 
runs the app on port 127.0.0.1:5000.
It will reload the app each time we make a change to the code.
"""
app = FastAPI()

origins = ["*"]
methods = ["*"]
headers = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=methods,
    allow_headers=headers
)


class PredictBody(BaseModel):
    text: str


@app.get("/")
async def root():
    return {"message": "Welcome to my application serving some kick-ass machine learning IMDB shit!!"}


ON_HEROKU = os.environ.get('ON_HEROKU')
if ON_HEROKU:
    print('HEROKU')
    port = int(os.environ.get('PORT', 17995))
else:
    print('NOT HEROKU')
    port = int(os.environ.get('PORT', 8000))

if __name__ == "__main__":
    run(app, host="0.0.0.0", port=port)


@app.get("/accuracy")
async def get_model_accuracy():
    results = model.evaluate(test_data, test_labels)
    return {"results": {"loss": math.floor(results[0]), "accuracy": math.floor(results[1])}}


@app.post("/train")
async def train_model(epochs: int = 10):
    await fit_model(epochs)
    return {"results": evaluate_model()}


@app.post("/predict")
async def make_prediction(req: PredictBody):
    if req.text == "":
        return {"error": "Please provide movie review text"}
    result = round(predict(req.text)[0] * 100, 2)
    return {"prediction": result}


@app.get("/evaluate-model")
async def get_evaluate_model():
    return {"message": evaluate_model()}


@app.get("/save-model-weights")
async def get_save_model_weights():
    save_model_weights()
    return {"message": "Model saved"}


@app.get("/load-model-weights")
async def get_load_model_weights():
    if model_weights_exists:
        load_model_weights()
        return {"message": "Model loaded"}
    else:
        return {"error": "Model h5 file has not been created yet"}

