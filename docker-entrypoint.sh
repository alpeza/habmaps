#!/bin/bash
set -e

echo "Starting ..."
if [ "$1" = 'start' ]; then

  if [ "${HABMAPS_CONFIGURATION}" ]; then
      echo "${HABMAPS_CONFIGURATION}" > /usr/src/app/habmaps/config.yaml
      echo "Settings: "
      echo ${HABMAPS_CONFIGURATION}
  fi

  echo "Launching the rest server ..."
  cd /usr/src/app/habmaps/restserver
  pm2 start main.py --name restserver
  echo "Launching the MQ listener ..."
  cd /usr/src/app/habmaps/listeners
  pm2 start FrameParser.py --name mqttlistener
  echo "Launching the ui server ..."
  cd /usr/src/app/habmaps/uiserver
  pm2 start run.sh --name uiserver

  pm2 logs -f 
fi


exec "$@"
