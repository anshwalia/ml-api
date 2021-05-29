# Importing Packages
import joblib
import sys

# Loading Salary Model
model = joblib.load(sys.argv[1])

# Input Data
input = float(sys.argv[2])

# Predicting Salary
salary = model.predict([[input]])

# Printing Output
print("{:.2f}".format(salary[0]))

# Flushing Stdout and Stderr
sys.stdout.flush()
sys.stderr.flush()

