from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes and origins

@app.route('/api/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        if not data:
            return jsonify({"error": "No data provided"}), 400

        # Example of prediction logic
        red_blood_cells = data.get("red_blood_cells", 5.0)
        white_blood_cells = data.get("white_blood_cells", 7.0)
        hemoglobin = data.get("hemoglobin", 15.0)
        platelets = data.get("platelets", 250)

        # Dummy biological age calculation
        biological_age = (
            50 - 0.1 * red_blood_cells - 0.2 * white_blood_cells +
            0.05 * hemoglobin - 0.03 * platelets
        )

        return jsonify({
            "biological_age": round(biological_age, 2),
            "status": "success"
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)