import jsonschema
import schemas
import json
import logging
import traceback


def msg_validate(msg):
    try:
        schem = json.loads(msg)
        for s in schemas.schemas:
            try:
                if jsonschema.Draft4Validator(s).is_valid(schem):
                    return True
                elif s != schemas.healthMessage:
                    jsonschema.validate(schem,s)
            except  Exception as ex:
                traceback.print_exc()
            except jsonschema.exceptions.ValidationError as err:
                traceback.print_exc()
                raise InvalidConfigurationError(err.message)
    except Exception as e:
        logging.error("Error cargando el json")
        raise
    return False
