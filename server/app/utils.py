import os
import random
from string import ascii_letters, digits
from uuid import uuid4

from werkzeug.utils import secure_filename

secure_random = random.SystemRandom()


def generate_random_string(length):
    return "".join(secure_random.choice(ascii_letters) for x in range(length))


def generate_random_integer(length):
    return "".join(secure_random.choice(digits) for x in range(length))


def generate_random_alphanumerics(length):
    return "".join(secure_random.choice(ascii_letters + digits) for x in range(length))


def generate_random_real_number(length=20):
    flt = secure_random.uniform(0.01, 99999.9999)
    if len(str(flt)) > 20:
        return str(flt)[0: length + 1]
    return str(flt)


def get_random_object(argument, length=20) -> str:
    switcher = {
        0: generate_random_string,
        1: generate_random_integer,
        2: generate_random_alphanumerics,
        3: generate_random_real_number,
    }
    func = switcher.get(argument, None)
    return str(func(length))


def get_object_type(argument) -> str:
    switcher = {0: "string", 1: "integer", 2: "alphanumerics", 3: "real_number"}
    value = switcher.get(argument, None)
    return value


def generate_txt_file(contents: str):
    file_name = secure_filename(f"{uuid4()}.txt")
    file_path = os.path.join("./app/static", file_name)
    file = open(file_path, "w")
    file.write(contents)
    file.close()
    return file_name
