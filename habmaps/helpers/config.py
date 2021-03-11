import yaml
class Config(object):
    """Clase encargada de cargar la configuración"""
    def __init__(self, file='config.yaml'):
        super(Config, self).__init__()
        self.configfile = file
        self.config = {}
        self.load()

    def load(self):
        with open(self.configfile) as file:
            self.config = yaml.load(file, Loader=yaml.FullLoader)

    def printf(self):
        print(self.config)

    def getConfig(self):
        return self.config
