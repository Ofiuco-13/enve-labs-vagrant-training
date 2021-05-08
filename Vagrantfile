# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|

  config.vm.box = "ubuntu/focal64"
  config.vm.hostname = "enve-labs-vagrant-vm"
  config.vm.network :public_network, bridge: ''
  config.vm.network "forwarded_port", guest: 80, host: 80
  config.vm.network "forwarded_port", guest: 8080, host: 8080

  config.vm.synced_folder "./share/", "/home/vagrant/share"

  config.vm.provider :virtualbox do |vb|
    vb.name = "enve-labs-vagrant-vm"
  end

  config.vm.provision "shell", inline: <<-SHELL
      sudo apt-get update && sudo apt-get install -y apt-transport-https ca-certificates software-properties-common curl git jq
  SHELL

end
