# Schemas de mensaje válidos

def getHab():
    return {
        "type" : "object",
        "properties" : {
            "id" : {"type" : "string"},
            "pos" : {"type" : "object","properties" : {
                "lat" : {"type" : "number"},
                "lon" : {"type" : "number"},
            },
            "required": ["lat", "lon"]
            }
        },
        "required": ["id", "pos"]
        }

positionMessage = {
    "type" : "object",
    "additionalProperties": True,
    "properties" : {
        "type" : {"type" : "string"},
        "ftime" : {"type" : "string"},
        "hab" : getHab(),
        "payload" : {"type" : "array"},
        "basestation" : getHab()
    },
    "required": ["type", "ftime","hab","basestation"]
}

healthMessage = {
    "type" : "object",
    "additionalProperties": False,
    "properties" : {
        "type" : {"type" : "string"},
        "ftime" : {"type" : "string"},
        "id" : {"type" : "string"}
    },
    "required": ["type", "ftime","id"]
}



schemas = [healthMessage,positionMessage]
