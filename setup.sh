#!/bin/bash

sudo apt-get update

wget https://nodejs.org/dist/v14.16.1/node-v14.16.1-linux-armv7l.tar.xz

sudo apt-get install python3-pip
sudo pip3 install quart quart-cors pillow 
sudo apt install libopenjp2-7

wget http://ftp.us.debian.org/debian/pool/main/libs/libseccomp/libseccomp2_2.5.1-1_armhf.deb
sudo dpkg -i libseccomp2_2.5.1-1_armhf.deb

sudo pip3 -v install docker-compose

curl https://raw.githubusercontent.com/adafruit/Raspberry-Pi-Installer-Scripts/master/rgb-matrix.sh >rgb-matrix.sh
sudo bash rgb-matrix.sh