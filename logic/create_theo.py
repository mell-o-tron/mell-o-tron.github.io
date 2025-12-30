import os
import sys
import json

def create_files_and_update_index(s):
    # Define directories
    proofs_dir = "./proofs"
    theorems_dir = "./theorems"
    index_file = "./index.json"
    
    # Ensure directories exist
    os.makedirs(proofs_dir, exist_ok=True)
    os.makedirs(theorems_dir, exist_ok=True)
    
    # Create files in proofs and theorems directories
    for directory in [proofs_dir, theorems_dir]:
        file_path = os.path.join(directory, f"{s}.md")
        
        if os.path.isfile(file_path):
            print("Already exists")
            exit(1)

        with open(file_path, "w") as f:
            f.write(f"# {s}\n")
    
    # Update index.json
    if os.path.exists(index_file):
        with open(index_file, "r") as f:
            index_data = json.load(f)
    else:
        index_data = {"theorems": [], "definitions": []}
    
    # Append theorem name if not already present
    if s not in index_data["theorems"]:
        index_data["theorems"].append(s)
    else:
        print("Already exists")
        exit(1)
    
    # Save updated index.json
    with open(index_file, "w") as f:
        json.dump(index_data, f, indent=4)

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python3 script.py <theorem_name>")
        sys.exit(1)
    
    theorem_name = sys.argv[1]
    create_files_and_update_index(theorem_name)
    print(f"Created {theorem_name}.md in ./proofs and ./theorems and updated index.json") 
