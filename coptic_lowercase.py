#!/usr/bin/env python3
"""
Script to convert Coptic text to lowercase using proper Coptic Unicode mappings.
"""

def create_coptic_lowercase_mapping():
    """Create mapping from Coptic uppercase to lowercase characters"""
    # Coptic Unicode block: U+2C80–U+2CFF
    # Each uppercase letter is followed by its lowercase counterpart
    coptic_mapping = {}
    
    # Coptic alphabet uppercase to lowercase mappings
    coptic_pairs = [
        ('Ⲁ', 'ⲁ'),  # ALFA
        ('Ⲃ', 'ⲃ'),  # VIDA
        ('Ⲅ', 'ⲅ'),  # GAMMA
        ('Ⲇ', 'ⲇ'),  # DALDA
        ('Ⲉ', 'ⲉ'),  # EIE
        ('Ⲋ', 'ⲋ'),  # SOU
        ('Ⲍ', 'ⲍ'),  # ZATA
        ('Ⲏ', 'ⲏ'),  # HATE
        ('Ⲑ', 'ⲑ'),  # THETHE
        ('Ⲓ', 'ⲓ'),  # IAUDA
        ('Ⲕ', 'ⲕ'),  # KAPA
        ('Ⲗ', 'ⲗ'),  # LAULA
        ('Ⲙ', 'ⲙ'),  # MI
        ('Ⲛ', 'ⲛ'),  # NI
        ('Ⲝ', 'ⲝ'),  # KSI
        ('Ⲟ', 'ⲟ'),  # O
        ('Ⲡ', 'ⲡ'),  # PI
        ('Ⲣ', 'ⲣ'),  # RO
        ('Ⲥ', 'ⲥ'),  # SIMA
        ('Ⲧ', 'ⲧ'),  # TAU
        ('Ⲩ', 'ⲩ'),  # UA
        ('Ⲫ', 'ⲫ'),  # FI
        ('Ⲭ', 'ⲭ'),  # KHI
        ('Ⲯ', 'ⲯ'),  # PSI
        ('Ⲱ', 'ⲱ'),  # OOU
        ('Ⲳ', 'ⲳ'),  # DIALECT-P ALEF
        ('Ⲵ', 'ⲵ'),  # OLD COPTIC AIN
        ('Ⲷ', 'ⲷ'),  # CRYPTOGRAMMIC EIE
        ('Ⲹ', 'ⲹ'),  # DIALECT-P KAPA
        ('Ⲻ', 'ⲻ'),  # DIALECT-P NI
        ('Ⲽ', 'ⲽ'),  # CRYPTOGRAMMIC NI
        ('Ⲿ', 'ⲿ'),  # OLD COPTIC OOU
        ('Ⳁ', 'ⳁ'),  # SAMPI
        ('Ⳃ', 'ⳃ'),  # CROSSED SHEI
        ('Ⳅ', 'ⳅ'),  # OLD COPTIC SHEI
        ('Ⳇ', 'ⳇ'),  # OLD COPTIC ESH
        ('Ⳉ', 'ⳉ'),  # AKHMIMIC KHEI
        ('Ⳋ', 'ⳋ'),  # DIALECT-P HORI
        ('Ⳍ', 'ⳍ'),  # OLD COPTIC HORI
        ('Ⳏ', 'ⳏ'),  # OLD COPTIC HA
        ('Ⳑ', 'ⳑ'),  # L-SHAPED HA
        ('Ⳓ', 'ⳓ'),  # OLD COPTIC HEI
        ('Ⳕ', 'ⳕ'),  # OLD COPTIC HAT
        ('Ⳗ', 'ⳗ'),  # OLD COPTIC GANGIA
        ('Ⳙ', 'ⳙ'),  # OLD COPTIC DJA
        ('Ⳛ', 'ⳛ'),  # OLD COPTIC SHIMA
        # Additional Coptic characters
        ('Ϣ', 'ϣ'),  # SHEI
        ('Ϥ', 'ϥ'),  # FEI
        ('Ϧ', 'ϧ'),  # KHEI
        ('Ϩ', 'ϩ'),  # HORI
        ('Ϫ', 'ϫ'),  # JANJA
        ('Ϭ', 'ϭ'),  # CIMA
        ('Ϯ', 'ϯ'),  # TI
    ]
    
    # Create the mapping dictionary
    for upper, lower in coptic_pairs:
        coptic_mapping[upper] = lower
    
    return coptic_mapping

def convert_coptic_to_lowercase(text, mapping):
    """Convert Coptic text to lowercase using the provided mapping"""
    result = []
    for char in text:
        if char in mapping:
            result.append(mapping[char])
        else:
            # For non-Coptic characters, use standard lowercase
            result.append(char.lower())
    return ''.join(result)

def process_coptic_file_lowercase(input_file, output_file):
    """Process the Coptic text file to convert to lowercase"""
    mapping = create_coptic_lowercase_mapping()
    lines_processed = 0
    
    with open(input_file, 'r', encoding='utf-8') as infile:
        with open(output_file, 'w', encoding='utf-8') as outfile:
            for line in infile:
                lines_processed += 1
                lowercase_line = convert_coptic_to_lowercase(line.rstrip('\n'), mapping)
                outfile.write(lowercase_line + '\n')
    
    return lines_processed

if __name__ == "__main__":
    input_file = "coptictext.txt"
    output_file = "coptictext_lowercase.txt"
    
    try:
        lines_processed = process_coptic_file_lowercase(input_file, output_file)
        print(f"Lowercase conversion complete!")
        print(f"Lines processed: {lines_processed}")
        print(f"Lowercase file saved as: {output_file}")
        
        # Replace original file with lowercase version
        import shutil
        shutil.move(output_file, input_file)
        print(f"Original file updated: {input_file}")
        
    except FileNotFoundError:
        print(f"Error: {input_file} not found!")
    except Exception as e:
        print(f"Error processing file: {e}")