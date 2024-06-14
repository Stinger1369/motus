from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

API_URL = "https://random-word-api.herokuapp.com/word"

@app.route('/generate-word', methods=['GET'])
def generate_word():
    length = request.args.get('length', default=5, type=int)
    response = requests.get(f'{API_URL}?number=1')
    word = response.json()[0]

    while len(word) != length:
        response = requests.get(f'{API_URL}?number=1')
        word = response.json()[0]

    return jsonify({"word": word})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)
