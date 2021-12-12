# Importing Packages
import sys
import joblib
import re
# import json

from nltk import WordNetLemmatizer
from nltk import word_tokenize
from nltk.corpus import stopwords
stopwords = stopwords.words('english')

# Input
input_text = sys.argv[3]

# Lemmatization
lemmatizer = WordNetLemmatizer()
sentence = re.sub('[^a-zA-z]',' ',input_text.lower())
words = word_tokenize(sentence)
lemma = [lemmatizer.lemmatize(word) for word in words if word not in set(stopwords)]
lemma = ' '.join(words)

# Loading Count Vectorizer
vectorizer = joblib.load(sys.argv[1])

# Vectorizing Lemmatized Text
vector = vectorizer.transform([lemma]).toarray()

# # Loding Model
model = joblib.load(sys.argv[2])

# Predicting Results
result = model.predict(vector)

print(result[0])

