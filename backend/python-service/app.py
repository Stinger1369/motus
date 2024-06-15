from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

API_URL = "https://random-word-api.herokuapp.com/word"

@app.route('/generate-word', methods=['GET'])
def generate_word():
    length = request.args.get('length', default=5, type=int)
    word = get_word_of_length(length)
    return jsonify({"word": word})

def get_word_of_length(length):
    while True:
        response = requests.get(f'{API_URL}?number=1')
        if response.status_code == 200:
            word = response.json()[0]
            if len(word) == length:
                return word
        else:
            raise Exception("Error fetching word from API")

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)
