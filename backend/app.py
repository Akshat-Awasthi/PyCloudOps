import psutil
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def index():
    cpu_percent = psutil.cpu_percent()
    mem_percent = psutil.virtual_memory().percent
    message = None
    if cpu_percent > 80 or mem_percent > 80:
        message = "High CPU or Memory Utilization detected. Please scale up"
    else:
        message = "CPU or Memory Utilization is fine"
    return jsonify(cpu_percent=cpu_percent, mem_percent=mem_percent, message=message)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)
