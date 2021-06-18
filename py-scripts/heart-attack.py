# # Required Packages
import sys
import joblib
import json

# Loading Input JSON Data
input = json.loads(sys.argv[3])

# Loading Input Scaler
scaler = joblib.load(sys.argv[1])

# Scaling Input
scaled_input = scaler.transform([input])

# Loading Model
model = joblib.load(sys.argv[2])

# Prediction Results
results = model.predict(scaled_input)

print(results[0])
