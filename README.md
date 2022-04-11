# IMDB movie search and review sentiment analysis app

This project uses a Python library called [FastAPI](https://fastapi.tiangolo.com/) to serve a pretrained sentiment analysis model created using [Tensorflow](https://www.tensorflow.org/) as a REST API service.

## Available Scripts

In the project root directory you will need to `pip install` using the requirements.txt into a new Conda(or equivalent) environment:

### `pip install -r requirements.txt`

In the project root directory, you can run:

### `python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload`

This will run the server in development mode and will reload when changes are made.

or simply run:

### `python main.py`

## API endpoints

###`/train` POST
Trains the model.

###`/predict` POST
Make prediction with request body `{"text": "This movie is not very good. I won't see it again"}`.

###`/evaluate-model` GET
Returns the model accuracy eg `{"results": {"loss": 0.75, "accuracy": 0.62}}`.

###`/save-model-weights` GET
Saves the trained weights to a file called model_weights.h5.

###`/load-model-weights` GET
Loads the model weights.


___
# React front end app

## .env and IMDB API key
You will need to visit [IMDB API](https://imdb-api.com/API) and get a freely available API key and then make a .env file in the client directory.

.env should contain `REACT_APP_API_KEY=<IMDB API key>`

## Available Scripts

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
