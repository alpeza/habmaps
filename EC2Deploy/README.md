# Deploy en una maquina EC2 de Amazon

1.- Nos conectamos
```
ssh -i "miubuntuone.pem" ubuntu@ec2-13-212-71-88.ap-southeast-1.compute.amazonaws.com
```

2.- Creamos el instalador

```
nano prepare.sh
```

```
chmod +x prepare.sh
```

3.- Lanzamos

4.-

```
git clone https://github.com/alpeza/habmaps.git
cd habmaps
sudo docker-compose up -d
```
