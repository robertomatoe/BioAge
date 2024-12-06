import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import StandardScaler
import joblib


class BioAgeModel:
    def __init__(self):
        """
        Initialize the BioAgeModel with a RandomForestRegressor and StandardScaler.
        """
        self.model = RandomForestRegressor(
            n_estimators=100,
            max_depth=10,
            min_samples_split=5,
            min_samples_leaf=2,
            random_state=42
        )
        self.scaler = StandardScaler()

        # Define expected feature columns
        self.feature_columns = [
            'red_blood_cells',
            'white_blood_cells',
            'hemoglobin',
            'platelets',
            'weight',
            'height',
            'bmi',
            'systolic_bp',
            'diastolic_bp',
            'gender'
        ]

    def train(self, data):
        """
        Train the model on the given data.

        Args:
            data (pd.DataFrame): DataFrame with feature columns and a target column ('age').

        Returns:
            None
        """
        X = data[self.feature_columns]
        y = data['age']

        # Scale features
        X_scaled = self.scaler.fit_transform(X)

        # Fit the model
        self.model.fit(X_scaled, y)
        print("Model training complete.")

    def predict(self, input_data):
        """
        Predict biological age for a single input.

        Args:
            input_data (dict): Dictionary containing feature values.

        Returns:
            float: Predicted biological age.
        """
        input_df = pd.DataFrame([input_data], columns=self.feature_columns)
        input_scaled = self.scaler.transform(input_df)
        return round(self.model.predict(input_scaled)[0], 2)

    def save_model(self, model_path='models/bioage_model.joblib', scaler_path='models/bioage_scaler.joblib'):
        """
        Save the model and scaler to disk.
        """
        joblib.dump(self.model, model_path)
        joblib.dump(self.scaler, scaler_path)
        print(f"Model saved to {model_path} and scaler to {scaler_path}.")

    def load_model(self, model_path='models/bioage_model.joblib', scaler_path='models/bioage_scaler.joblib'):
        """
        Load the model and scaler from disk.
        """
        self.model = joblib.load(model_path)
        self.scaler = joblib.load(scaler_path)
        print(f"Model loaded from {model_path} and scaler from {scaler_path}.")