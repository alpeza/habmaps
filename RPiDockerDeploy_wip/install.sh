echo "=> STAGE 1: Installing Docker"
set -x
sudo apt-get update
sudo apt-get install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
sudo curl -sSL https://get.docker.com | sh
pi=$(which pip)
if [ -z $pi  ]; then
  echo "Trying to install pip"
  sudo curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py && sudo python3 get-pip.py
fi
sudo pip3 install docker-compose
docker-compose --version
set +x
echo "=> STAGE 2: Installing some dependencies"
set -x
sudo apt install -y git
set +x
echo "=> STAGE 3: Installing Habmaps"
set -x
git clone https://github.com/alpeza/habmaps.git
sudo chmod -R 777 habmaps
cd habmaps
sudo docker build -t habmaps4pi:latest .
cd RPiDockerDeploy
cp -r ../mosquitto .
sudo docker-compose up -d
sudo docker-compose logs --tail="all"
set +x
