from bioage_model import BioAgeModel

def create_model():
    """
    Create and save an untrained BioAgeModel.
    """
    model = BioAgeModel()
    model.save_model()
    print("Untrained model created and saved.")

if __name__ == "__main__":
    create_model()