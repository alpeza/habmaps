cur=$(pwd)
echo "Launching the rest server ..."
cd ../habmaps/restserver
pm2 start main.py --name restserver
cd $cur
echo "Launching the MQ listener ..."
cd ../habmaps/listeners
pm2 start FrameParser.py --name mqttlistener
cd $cur
echo "Launching the ui server ..."
cd ../habmaps/uiserver
pm2 start run.sh --name uiserver
cd $cur
