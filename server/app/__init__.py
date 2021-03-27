from random import randint

from flask import Flask, jsonify, make_response, request
from flask.helpers import send_from_directory
from flask_cors import CORS

from app.utils import generate_txt_file, get_object_type, get_random_object

character_length = 1048576 * 2


def create_app():
    app = Flask(__name__, instance_relative_config=True)
    CORS(app)
    register_endpoints(app)

    return app


def register_endpoints(app):
    @app.route("/", methods=["GET"])
    def root():
        contents = ""
        contents_size = 0
        response = {
            "string": 0,
            "integer": 0,
            "alphanumerics": 0,
            "real_number": 0,
            "file_link": "",
            "file_name": "",
        }
        while True:
            if contents_size == character_length:
                break
            num = randint(0, 3)
            word_length = randint(1, 100)
            object_type = get_object_type(num)
            if object_type is None:
                continue
            content = get_random_object(num, word_length)
            content_length = len(content)
            if contents_size + content_length > character_length:
                required_content_size = character_length - contents_size
                content = get_random_object(2, required_content_size)
                contents = contents + content
                response["alphanumerics"] = response["alphanumerics"] + 1
                contents_size = len(contents)
                break
            elif contents_size + content_length == character_length:
                contents = contents + content
                response[object_type] = response[object_type] + 1
            else:
                contents = contents + content + ","
                response[object_type] = response[object_type] + 1
            contents_size = len(contents)
        file_name = generate_txt_file(contents)
        response["file_name"] = file_name
        response["file_link"] = request.host_url + "static/" + file_name
        return jsonify(response)

    @app.route("/static/<path:path>")
    def download(path):
        print(path)
        return send_from_directory("static", path)

    @app.route("/status", methods=["GET"])
    @app.route("/health", methods=["GET"])
    def status():
        response = {"status": "OK"}
        return make_response(jsonify(response))

    @app.errorhandler(404)
    def page_not_found(error):
        app.logger.error("Page not found: %s", request.path)
        return make_response(jsonify({"message": f"{str(error)}"})), 404

    @app.errorhandler(500)
    def internal_server_error(error):
        app.logger.error("Server Error: %s", error)
        return make_response(jsonify({"message": f"{str(error)}"})), 500

    @app.errorhandler(Exception)
    def unhandled_exception(e):
        return make_response(jsonify({"message": f"{str(e)}"})), 500


def configure_app(app):
    app.url_map.strict_slashes = False
