echo "Updateando ..."
set -x
sudo apt-get update
set +x

echo "Instalando dependencias ..."
set -x
sudo apt-get install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

echo \
  "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
set +x



echo "Instalando docker ..."

set -x
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io
set +x

echo "Instalando compose ..."
set -x
sudo curl -L "https://github.com/docker/compose/releases/download/1.28.5/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
set +x


echo "Instalando git ..."
set -x
sudo apt install -y git
set +x

echo "Deployando ..."
set -x
git clone https://github.com/alpeza/habmaps.git
sudo chmod -R 777 habmaps
cd habmaps

sudo snap remove amazon-ssm-agent

sudo docker-compose up -d
sudo docker logs -f habmaps_habmaps_1
set +x
