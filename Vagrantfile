# -*- mode: ruby -*-
# # vi: set ft=ruby :
#
Vagrant.configure("2") do |config|

   config.vm.box = "hashicorp/bionic64"
   config.vm.hostname = "enve-labs-docker-vm"
   config.vm.network "private_network", ip: "192.168.33.100"
   config.vm.network "forwarded_port", guest: 3000, host: 3000

   config.vm.synced_folder "./", "/home/vagrant/shared"

   config.vm.provider :virtualbox do |vb|
     vb.name = "enve-labs-docker-vm"
   end

   config.vm.provision "shell", inline: <<-SHELL
       sudo apt-get remove docker docker-engine docker.io
       sudo apt-get update && sudo apt-get install -y apt-transport-https ca-certificates software-properties-common curl jq
       curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
       sudo apt-key fingerprint 0EBFCD88
       sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
       sudo apt-get update
       sudo apt-get install -y docker-ce
      #  curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
      #  sudo apt-get install -y nodejs

   SHELL

end
