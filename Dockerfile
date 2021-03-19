FROM python:3
WORKDIR /usr/src/app

# 1.- We install the worker dependencies
RUN apt-get update && \
    apt-get install -y curl &&\
    curl -sL https://deb.nodesource.com/setup_12.x | bash &&\
    apt-get install -y nodejs &&\
    npm install pm2 -g

COPY habmaps/ ./habmaps

# 2.1- Instalamos la app web
ENV PATH /usr/src/app/habmaps/uiserver/node_modules/.bin:$PATH
RUN cd ./habmaps/uiserver &&\
    npm install

# 2.2- Instalamos la restapi
RUN cd ./habmaps &&\
    chmod -R 777 . &&\
    pip install --upgrade pip &&\
    pip install -r requirements.txt


# 3.- We copy the entrypoint
COPY docker-entrypoint.sh /usr/local/bin
RUN chmod 777 /usr/local/bin/docker-entrypoint.sh \
    && ln -s /usr/local/bin/docker-entrypoint.sh /


#ApiRest
EXPOSE 5000
#REACT SERVER
EXPOSE 3000

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["start"]
