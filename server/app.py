import json
import urllib.parse as urlparse

import requests
from flask import Flask, request
from flask_cors import CORS

from env import Env
from utils import Token

app = Flask(__name__)
token = Token()
env = Env()
CORS(app, resources={r"/*": {"origins": "*"}})


@app.route("/login")
def login():
    return {
        "client_id": env.get_oauth_client_id(),
        "state": token.generate_token(),
    }


@app.route("/authenticate", methods=["POST"])
def authenticate():
    code = request.args.get("code")
    req = requests.request(method="POST", url="https://github.com/login/oauth/access_token",
                           params={
                               "client_id": env.get_oauth_client_id(),
                               "client_secret": env.get_oauth_client_secret(),
                               "code": code,
                           })
    response = urlparse.parse_qs(str(req.text))
    if "access_token" in response:
        access_token = response["access_token"][0]
        app.logger.info(access_token)

        userdata = requests.request(method="GET", url="https://api.github.com/user",
                                    headers={'Authorization': 'token ' + access_token})
        app.logger.info(userdata.text)

        return {
            "token": access_token,
            "user": json.loads(userdata.text)
        }
    else:
        return {
            "token": "Unable to authenticate token",
            "user": "Unable to authenticate user"
        }


if __name__ == "__main__":
    app.run(debug=True)
