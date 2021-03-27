import logging
import sys,datetime
sys.path.append('../')
import helpers
ch = helpers.config.Config(file='../config.yaml')
from genson import SchemaBuilder


def getConf():
    ch = helpers.config.Config(file='../config.yaml')
    return ch.getConfig()['sharedconfs']

def getConfSchema():
    ch = helpers.config.Config(file='../config.yaml')
    builder = SchemaBuilder()
    builder.add_schema({"type": "object", "properties": {}})
    sc = ch.getConfig()['sharedconfs']
    builder.add_object(sc)
    rsc = builder.to_schema()
    return {
        "schema": rsc,
        "formdata": sc
    }

def updateConf(newConf):
    ch = helpers.config.Config(file='../config.yaml')
    ch.update(newConf)
    return ch.getConfig()['sharedconfs']

