import xml.etree.ElementTree as ET
from unidecode import unidecode
import random
import os

def load_words(file_path):
    tree = ET.parse(file_path)
    root = tree.getroot()
    words = []

    for entry in root.findall('entry'):
        lemma = entry.find('lemma').text
        clean_lemma = unidecode(lemma).replace(' ', '').lower()
        if clean_lemma.isalpha():  # Ensure the word contains only letters
            words.append(clean_lemma)

    return words

def get_random_word(length, words):
    filtered_words = [word for word in words if len(word) == length]
    if filtered_words:
        return random.choice(filtered_words)
    else:
        return None

# Construct the path to Word.xml dynamically
script_dir = os.path.dirname(__file__)  # Get the directory of the current script
file_path = os.path.join(script_dir, 'Word.xml')  # Construct the full path

# Load words from the XML file
WORDS = load_words(file_path)
