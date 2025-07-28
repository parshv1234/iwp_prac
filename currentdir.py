import os

def print_folder_structure(start_path):
    """Prints a human-readable representation of the folder structure."""
    print(f"Folder structure for: '{start_path}'")
    try:
        for root, dirs, files in os.walk(start_path):
            level = root.replace(start_path, '').count(os.sep)
            indent = ' ' * 4 * (level)
            print(f'{indent}{os.path.basename(root)}/')
            subindent = ' ' * 4 * (level + 1)
            for f in files:
                print(f'{subindent}{f}')
        print("\nTraversal complete.")
    except FileNotFoundError:
        print(f"Error: Path not found - '{start_path}'")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")

# Example Usage:
# You can replace '.' with a specific path
print_folder_structure("my_test_folder") # Assuming you created this dummy folder
print("\n" + "="*50 + "\n")
print_folder_structure(os.getcwd()) # For the current working directory