#!/usr/bin/env python3
"""
Script to clean coptictext.txt by:
1. Removing lines that start with English characters
2. Removing empty lines
3. Removing lines that start with #
4. Removing punctuation from the text
"""

import re
import string

def is_english_start(line):
    """Check if line starts with an English character"""
    if not line:
        return False
    first_char = line[0]
    return first_char.isascii() and first_char.isalpha()

def remove_punctuation(text):
    """Remove specified punctuation marks from text"""
    # Define punctuation to remove
    punctuation_to_remove = ",./()...;:!@#$%^&*{}[]\"'';:\\|_-+="
    
    # Create translation table to remove punctuation
    translator = str.maketrans('', '', punctuation_to_remove)
    return text.translate(translator)

def process_coptic_file(input_file, output_file):
    """Process the Coptic text file according to requirements"""
    lines_processed = 0
    lines_kept = 0
    
    with open(input_file, 'r', encoding='utf-8') as infile:
        with open(output_file, 'w', encoding='utf-8') as outfile:
            for line in infile:
                lines_processed += 1
                
                # Strip whitespace for processing
                stripped_line = line.strip()
                
                # Skip empty lines
                if not stripped_line:
                    continue
                
                # Skip lines starting with #
                if stripped_line.startswith('#'):
                    continue
                
                # Skip lines starting with English characters
                if is_english_start(stripped_line):
                    continue
                
                # Remove punctuation from the line
                cleaned_line = remove_punctuation(stripped_line)
                
                # Only write non-empty lines after cleaning
                if cleaned_line.strip():
                    outfile.write(cleaned_line + '\n')
                    lines_kept += 1
    
    return lines_processed, lines_kept

if __name__ == "__main__":
    input_file = "coptictext.txt"
    output_file = "coptictext_cleaned.txt"
    
    try:
        lines_processed, lines_kept = process_coptic_file(input_file, output_file)
        print(f"Processing complete!")
        print(f"Lines processed: {lines_processed}")
        print(f"Lines kept: {lines_kept}")
        print(f"Lines removed: {lines_processed - lines_kept}")
        print(f"Cleaned file saved as: {output_file}")
        
        # Replace original file with cleaned version
        import shutil
        shutil.move(output_file, input_file)
        print(f"Original file updated: {input_file}")
        
    except FileNotFoundError:
        print(f"Error: {input_file} not found!")
    except Exception as e:
        print(f"Error processing file: {e}")