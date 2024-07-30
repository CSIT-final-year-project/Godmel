import pickle


from flask import Flask, request, json
from markupsafe import Markup
import pandas as pd
# import config
import requests
from flask_cors import CORS

import numpy as np
from utils.fertilizer import fertilizer_dic

# Define crop dictionary
crop_dict = {
    'rice': 1,
    'maize': 2,
    'jute': 3,
    'cotton': 4,
    'coconut': 5,
    'papaya': 6,
    'orange': 7,
    'apple': 8,
    'muskmelon': 9,
    'watermelon': 10,
    'grapes': 11,
    'mango': 12,
    'banana': 13,
    'pomegranate': 14,
    'lentil': 15,
    'blackgram': 16,
    'mungbean': 17,
    'mothbeans': 18,
    'pigeonpeas': 19,
    'kidneybeans': 20,
    'chickpea': 21,
    'coffee': 22
}

class DecisionTree:
    def __init__(self, max_depth=None):
        self.max_depth = max_depth
 
    def fit(self, X, y):
        self.tree = self._grow_tree(X, y)
 
    def _grow_tree(self, X, y, depth=0):
        num_samples, num_features = X.shape
        num_classes = len(np.unique(y))
 
        # Stopping criteria
        if (self.max_depth is not None and depth >= self.max_depth) or num_classes == 1:
            return {'class': np.bincount(y).argmax(), 'num_samples': num_samples, 'depth': depth}
 
        # Find the best split
        best_feature = None
        best_threshold = None
        best_gini = np.inf
        for feature in range(num_features):
            thresholds = np.unique(X[:, feature])
            for threshold in thresholds:
                left_indices = np.where(X[:, feature] <= threshold)[0]
                right_indices = np.where(X[:, feature] > threshold)[0]
                if len(left_indices) == 0 or len(right_indices) == 0:
                    continue
                gini = self._gini_impurity(y[left_indices], y[right_indices])
                if gini < best_gini:
                    best_feature = feature
                    best_threshold = threshold
                    best_gini = gini
 
        if best_gini == np.inf:
            return {'class': np.bincount(y).argmax(), 'num_samples': num_samples, 'depth': depth}
 
        # Split the dataset
        left_indices = np.where(X[:, best_feature] <= best_threshold)[0]
        right_indices = np.where(X[:, best_feature] > best_threshold)[0]
        left_tree = self._grow_tree(X[left_indices, :], y[left_indices], depth + 1)
        right_tree = self._grow_tree(X[right_indices, :], y[right_indices], depth + 1)
 
        return {'feature': best_feature, 'threshold': best_threshold,
                'left': left_tree, 'right': right_tree, 'num_samples': num_samples, 'depth': depth}
 
    def _gini_impurity(self, left_y, right_y):
        p_left = len(left_y) / (len(left_y) + len(right_y))
        p_right = len(right_y) / (len(left_y) + len(right_y))
        return p_left * self._gini(left_y) + p_right * self._gini(right_y)
 
    def _gini(self, y):
        if len(y) == 0:
            return 0
        p = np.bincount(y) / len(y)
        return 1 - np.sum(p ** 2)
 
    def predict(self, X):
        return np.array([self._predict(x) for x in X])
 
    def _predict(self, x, tree=None):
        if tree is None:
            tree = self.tree
        if 'class' in tree:
            return tree['class']
        if x[tree['feature']] <= tree['threshold']:
            return self._predict(x, tree['left'])
        else:
            return self._predict(x, tree['right'])
 
 
class RandomForest:
    def __init__(self, n_estimators=100, max_depth=None, sample_size=None):
        self.n_estimators = n_estimators
        self.max_depth = max_depth
        self.sample_size = sample_size
        self.estimators = []
 
    def fit(self, X, y):
        for _ in range(self.n_estimators):
            tree = DecisionTree(max_depth=self.max_depth)
            if self.sample_size:
                indices = np.random.choice(len(X), size=self.sample_size, replace=True)
                X_sample = X[indices]
                y_sample = y[indices]
            else:
                X_sample = X
                y_sample = y
            tree.fit(X_sample, y_sample)
            self.estimators.append(tree)
 
    def predict(self, X):
        predictions = np.array([estimator.predict(X) for estimator in self.estimators])
        return np.apply_along_axis(lambda x: np.bincount(x).argmax(), axis=0, arr=predictions)
    
# Function to read CSV file
def read_csv(filename):
    data = []
    with open(filename, 'r') as file:
        header = next(file)  # Skip the header row
        for line in file:
            data.append(line.strip().split(','))
    return data

# Convert data to numpy array and preprocess
def preprocess_data(data):
    data_array = np.array(data)
    X = data_array[:, :-1].astype(float)
    y = data_array[:, -1]
    # Convert labels to integers using crop_dict
    y = np.array([crop_dict[label] for label in y])
    return X, y

def accuracy_score(y_true, y_pred):
    correct_predictions = np.sum(y_true == y_pred)
    total_predictions = len(y_true)
    accuracy = correct_predictions / total_predictions
    return accuracy
    

def crop_recommendation(condn):
    data = read_csv("Data/Crop_recommendation.csv")
    features, labels = preprocess_data(data)

    # Split data into training and testing sets
    train_size = int(0.8 * len(features))
    X_train, X_test = features[:train_size], features[train_size:]
    y_train, y_test = labels[:train_size], labels[train_size:]

    # Create a RandomForestClassifier object
    rf_classifier = RandomForest(n_estimators=100)

    # Train the model
    rf_classifier.fit(X_train, y_train)

    # Make predictions
    predictions = rf_classifier.predict(condn)

    # Reverse label encoding to get original labels
    original_labels = [list(crop_dict.keys())[list(crop_dict.values()).index(pred)] for pred in predictions]

    return original_labels


#open weather map for weather
def weather_fetch(city):
    key = "3eb4f1f6009603675f9f8a403a32f0ab"
    base_url = "https://api.openweathermap.org/data/2.5/weather?"
    complete_url = base_url + "appid=" + key + "&q=" + city

    response = requests.get(complete_url)
    x = response.json()

    if x["cod"] != "404":
        y = x["main"]

        temperature = round((y["temp"] - 273.15), 2)
        humidity = y["humidity"]
        return temperature, humidity
    else:
        return None

app = Flask(__name__)
CORS(app, resources={r"/crop-predict": {"origins": "http://localhost:5173"}})
CORS(app, resources={r"/fertilizer-predict": {"origins": "http://localhost:5173"}})


#for crop prediction
@ app.route('/crop-predict', methods=['POST'])
def crop_prediction():
    title = 'Crop Recommendation Module'
    print("hello")
    if request.method == 'POST':
        N = int(request.form['nitrogen'])
        P = int(request.form['phosphorous'])
        K = int(request.form['potassium'])
        ph = float(request.form['ph'])
        rainfall = float(request.form['rainfall'])
        # temperature = float(request.form['temperature'])
        # humidity = float(request.form['humidity'])

        city = request.form.get("city")

        if weather_fetch(city) is not None:
            temperature, humidity = weather_fetch(city)
        else:
            return json.dumps({"error": "City not found"})

        feature_list = [N, P, K, temperature, humidity, ph, rainfall]
        single_pred = np.array(feature_list).reshape(1, -1)


        prediction = crop_recommendation(single_pred)

        response = {
            "result": prediction[0],
            "message": "Crop Predicted"
        }

        return json.dumps(response)
    
@ app.route('/fertilizer-predict', methods=['POST'])
def fert_recommend():
    title = 'Fertilizer Suggestion'

    crop_name = str(request.form['cropname'])
    N = int(request.form['nitrogen'])
    P = int(request.form['phosphorous'])
    K = int(request.form['potassium'])
    # ph = float(request.form['ph'])

    df = pd.read_csv('Data/fertilizer.csv')

    nr = df[df['Crop'] == crop_name]['N'].iloc[0]
    pr = df[df['Crop'] == crop_name]['P'].iloc[0]
    kr = df[df['Crop'] == crop_name]['K'].iloc[0]

    n = nr - N
    p = pr - P
    k = kr - K
    temp = {abs(n): "N", abs(p): "P", abs(k): "K"}
    max_value = temp[max(temp.keys())]
    if max_value == "N":
        if n < 0:
            key = 'NHigh'
        else:
            key = "Nlow"
    elif max_value == "P":
        if p < 0:
            key = 'PHigh'
        else:
            key = "Plow"
    else:
        if k < 0:
            key = 'KHigh'
        else:
            key = "Klow"

    response = Markup(str(fertilizer_dic[key]))
    res = {
            "result": response,
            "message": "Recommended cure"
        }

    return json.dumps(res)

    
if __name__ == "__main__":
    app.run(debug=True,port=8000)
