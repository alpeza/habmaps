# Deploy en una maquina EC2 de Amazon

0.- Desplegamos una instancia `Ubuntu Server 20.04 LTS (HVM)` con el siguiente 
_Security Group_

![red.png](red.png)

1.- Nos conectamos a la maquina EC2
```
ssh -i "miubuntuone.pem" ubuntu@ec2-13-212-71-88.ap-southeast-1.compute.amazonaws.com
```

2.- Descargamos el instalador

```
https://raw.githubusercontent.com/alpeza/habmaps/ci/EC2Deploy/prepare.sh
chmod +x prepare.sh
```

3.- Lanzamos

```
./prepare.sh
```

4.- Configuramos el cliente mqtt. Para ello entramos en la consola `/admin/config`.
Configuramos el parametro de `mosquittows*` con la DNS de amazon. Por ejemplo:
`ws://ec2-18-191-143-166.us-east-2.compute.amazonaws.com:8081/socket`
