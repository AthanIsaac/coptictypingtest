#!/usr/bin/env python3
"""
Convert coptictext.txt to JavaScript array format
"""

def convert_coptic_to_js():
    """Convert coptictext.txt to JavaScript array format"""
    
    # Read the coptic text file
    with open('coptictext.txt', 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    # Clean and filter lines
    coptic_lines = []
    for line in lines:
        line = line.strip()
        if line:  # Only non-empty lines
            # Escape quotes and backslashes for JavaScript
            escaped_line = line.replace('\\', '\\\\').replace('"', '\\"')
            coptic_lines.append(escaped_line)
    
    # Generate JavaScript file content
    js_content = f'''// Coptic Text Data - Auto-generated from coptictext.txt
const COPTIC_TEXT_LINES = [
'''
    
    # Add each line as a JavaScript string
    for i, line in enumerate(coptic_lines):
        comma = ',' if i < len(coptic_lines) - 1 else ''
        js_content += f'    "{line}"{comma}\n'
    
    js_content += '''];

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { COPTIC_TEXT_LINES };
}
'''
    
    # Write to JavaScript file
    with open('coptic-text-data.js', 'w', encoding='utf-8') as f:
        f.write(js_content)
    
    print(f"Successfully converted {len(coptic_lines)} lines to coptic-text-data.js")
    return len(coptic_lines)

if __name__ == "__main__":
    try:
        line_count = convert_coptic_to_js()
        print(f"Conversion complete! Generated JavaScript file with {line_count} Coptic text lines.")
    except FileNotFoundError:
        print("Error: coptictext.txt not found!")
    except Exception as e:
        print(f"Error: {e}")