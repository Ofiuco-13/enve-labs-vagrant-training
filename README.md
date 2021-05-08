# Enve Labs Vagrant Training
Hashicorp Vagrant (https://www.vagrantup.com) is a software that allow us to build environments for the development of solutions allowing us to mirror production environments by providing the same operating system, software packages and configurations </br>
At the end, Vagrant act as an interface in order interact with VirtualBox, VMWare and Docker among others/br>

### Installation
the best approach to install Vagrant is through the download page from (https://www.vagrantup.com/downloads)

    curl -fsSL https://apt.releases.hashicorp.com/gpg | sudo apt-key add -
    sudo apt-add-repository "deb [arch=amd64] https://apt.releases.hashicorp.com $(lsb_release -cs) main"
    sudo apt-get update && sudo apt-get install vagrant

validate the installation

    vagrant --version


### Initialization
project directory creation and initialization

    mkdir project
    cd project
    vagrant init ubuntu/focal64

this will create a Vagrant config file, named *Vagrantfile*, that will allow us to config the VM through a declarative process in order to define the kind of machine we want to config and deploy


### Vagrantfile

    Vagrant.configure("2") do |config|
      config.vm.box = "hashicorp/focal64"
      config.vm.hostname = "enve-labs-vagrant-vm"
    end


### boot the environment

    vagrant up


### access to the environment

    vagrant ssh


### stop the virtual machine

    vagrant stop


### clean up
when you're done (this process will destroy de VM and all its content will be lost)

    vagrant destroy
