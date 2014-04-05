Whois.js
========

Basic, self-hosted Whois lookup written in Node.js

Installing
==========

1. Install a upstream version of Node.js and NPM, ensure that old versions are removed first.  
```
sudo apt-get install python-software-properties python g++ make
sudo add-apt-repository ppa:chris-lea/node.js
sudo apt-get update
sudo apt-get install nodejs
```
2. Upload the beacon files.  
3. Install Node.js packages.  
```
cd /PATH/To/Directory
npm install
```
4. Install the Upstart Script  
```
sudo service beacon start
sudo service beacon status # ensure that beacon did not crash
```
5. Setup the front end webserver to proxy the requests  
6. Upload the static `whois-front` HTML files and resources. 
7. Modify the `whois-front` files   
Ensure that line 13 of the `./whois-front/index.html` is correct. 
8. Complete, no other modifications are required.