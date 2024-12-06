import pandas as pd
from bioage_model import BioAgeModel
import os

def fetch_nhanes_data():
    """
    Load and preprocess NHANES data from local files.
    """
    data_dir = 'data'

    # Load datasets
    demo_data = pd.read_sas(os.path.join(data_dir, 'DEMO_J.XPT'))
    cbc_data = pd.read_sas(os.path.join(data_dir, 'CBC_J.XPT'))
    bmx_data = pd.read_sas(os.path.join(data_dir, 'BMX_J.XPT'))
    bpx_data = pd.read_sas(os.path.join(data_dir, 'BPX_J.XPT'))

    # Merge datasets
    data = demo_data[['SEQN', 'RIDAGEYR', 'RIAGENDR']]
    data = data.merge(cbc_data[['SEQN', 'LBXRBCSI', 'LBXWBCSI', 'LBXHGB', 'LBXPLTSI']], on='SEQN')
    data = data.merge(bmx_data[['SEQN', 'BMXWT', 'BMXHT', 'BMXBMI']], on='SEQN')
    data = data.merge(bpx_data[['SEQN', 'BPXSY1', 'BPXDI1']], on='SEQN')

    # Rename columns
    data = data.rename(columns={
        'RIDAGEYR': 'age',
        'RIAGENDR': 'gender',
        'LBXRBCSI': 'red_blood_cells',
        'LBXWBCSI': 'white_blood_cells',
        'LBXHGB': 'hemoglobin',
        'LBXPLTSI': 'platelets',
        'BMXWT': 'weight',
        'BMXHT': 'height',
        'BMXBMI': 'bmi',
        'BPXSY1': 'systolic_bp',
        'BPXDI1': 'diastolic_bp'
    })

    # Drop rows with missing values
    return data.dropna()

def train_model():
    """
    Train and save the BioAgeModel using NHANES data.
    """
    data = fetch_nhanes_data()
    print(f"Loaded {len(data)} samples for training.")

    model = BioAgeModel()
    model.train(data)
    model.save_model()
    print("Model training complete and saved.")

if __name__ == "__main__":
    train_model()