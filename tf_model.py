import sys

import keras.preprocessing.text
from keras.datasets import imdb
from keras.preprocessing import sequence
import tensorflow as tf
import tensorflow.keras

import numpy as np
from os.path import exists

"""
Log Tensorflow versions.
"""
print(f"######################################")
print(f"Tensor Flow Version: {tf.__version__}")
print(f"Keras Version: {tensorflow.keras.__version__}")
print()
print(f"Python {sys.version}")
gpu = len(tf.config.list_physical_devices('GPU')) > 0
print("GPU is", "available" if gpu else "NOT AVAILABLE")
print(f"######################################")

VOCAB_SIZE = 88584

MAXLEN = 250
BATCH_SIZE = 64

(train_data, train_labels), (test_data, test_labels) = imdb.load_data(num_words=VOCAB_SIZE)

train_data = sequence.pad_sequences(train_data, MAXLEN)
test_data = sequence.pad_sequences(test_data, MAXLEN)

model = tf.keras.Sequential([
    tf.keras.layers.Embedding(VOCAB_SIZE, 32),
    tf.keras.layers.LSTM(32),
    tf.keras.layers.Dense(1, activation="sigmoid")
])

model.summary()

model.compile(loss="binary_crossentropy", optimizer="rmsprop", metrics=["acc"])

model_weights_exists = exists('model_weights.h5')

async def fit_model(epochs: int = 10):
    print("Training model")
    model.fit(train_data, train_labels, epochs=epochs, validation_split=0.2)


word_index = imdb.get_word_index()


def encode_text(text):
    tokens = keras.preprocessing.text.text_to_word_sequence(text)
    tokens = [word_index[word] if word in word_index else 0 for word in tokens]
    return sequence.pad_sequences([tokens], MAXLEN)[0]


reverse_word_index = {value: key for (key, value) in word_index.items()}


def decode_integers(integers):
    PAD = 0
    text = ""
    for num in integers:
        if num != PAD:
            text += reverse_word_index[num] + " "

    return text[:-1]


def predict(text):
    encoded_text = encode_text(text)
    pred = np.zeros((1, 250))
    pred[0] = encoded_text
    result = model.predict(pred)[0]
    return result


def evaluate_model():
    [loss, accuracy] = model.evaluate(test_data, test_labels)
    return {"loss": loss, "accuracy": accuracy}


def save_model_weights():
    model.save_weights(
        'model_weights.h5',
        overwrite=True,
        save_format=None,
        options=None
    )


def load_model_weights():
    model.load_weights(
        'model_weights.h5',
        by_name=False,
        skip_mismatch=False,
        options=None
    )


if model_weights_exists:
    load_model_weights()