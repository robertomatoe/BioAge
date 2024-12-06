# test_app.py
from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello():
    return 'Hello, World!'

if __name__ == '__main__':
    port = 5001
    print(f"Starting server on port {port}")
    app.run(port=port)