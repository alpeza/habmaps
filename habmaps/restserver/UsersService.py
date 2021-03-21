import logging
import sys,datetime
import jwt
sys.path.append('../')
import helpers
ch = helpers.config.Config(file='../config.yaml')

JWT_SECRET = "estaesmisignature"
JWT_ALGORITHM = "HS256"

def login(login):
    message = {
        "login": False,
        "reason": "Unknown user or password",
        "token": ""
    }

    if 'user' in login and 'password' in login:
        users = ch.getConfig()['ui']['users']
        # Validamos que existe el usuario
        for u in users:
            for el in u:
                if el == login['user'] and u[el] == login['password']:
                    logging.info("Valid authentication")
                    # Componemos el token de vuelta
                    message['reason'] = "Loged !"
                    message['login'] = True
                    message['token'] = jwt.encode({
                                                    "loggedInAs": login['user'],
                                                    "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=60)
                                                   },
                                                   JWT_SECRET,
                                                   algorithm=JWT_ALGORITHM)
                    return message

        logging.error("Invalid username or password")
        return message
    else:
        logging.error("Unknown login request :U")
        message['reason'] = "Unknown login request :U"
        message['login'] = False
    return message

def validateToken(tokenson):
    message = { "isValid" : False }

    token = tokenson['token']
    try:
        deco=jwt.decode(token, JWT_SECRET, JWT_ALGORITHM)
        if deco:
            print(deco)
            message["isValid"] = True
            return message
    except jwt.ExpiredSignatureError:
        logging.error("Token has expired")
        return message
    except Exception as e:
        return message
