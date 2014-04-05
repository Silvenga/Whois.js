// Allow to access the system
var sys = require('sys');
var exec = require('child_process').exec;

// Our responder
var express = require('express');
var app = express();
app.use(express.urlencoded());
var url = require('url');

// Methods
app.get('/whois', function(req, res) {

    whois(req, res);
});

app.post('/whois', function(req, res) {

    whois(req, res);
});

function whois(req, res) {

    var whoisOptions = url.parse(req.url,true).query;

    var address;
    if(req.body.address)
        // Is post request
        address = escape(req.body.address);
    else if(whoisOptions.address)
        // Is get request
        address = escape(whoisOptions.address);
    else{
        res.contentType('application/json');
        res.send(JSON.stringify("bad input"));
        res.end();
        return;
    }
    
    // Run BE Whois, quiet, and remove extra disclaimers, then remove duplicate lines
    var command = "/usr/bin/perl -T /usr/local/bin/whois2 -q -s " + address + " | uniq -u";

    exec(command, function(error, stdout, stderr) {

        var result = "";

        if (!isBlank(stdout)) 
            result += stdout;
        
        if (!isBlank(stderr)) 
            result += 'fail due to: ' + stderr;
        
        if (!isBlank(error)) 
            result += 'server error: ' + error;

        // Return  json
        res.contentType('application/json');
        res.send(JSON.stringify(clean(result)));
        res.end();
    });
}

function clean(str){
    // Remove everything after Admin's info
    str = str.replace(/Registry Admin ID:[\S\s]*/gi, "");
    // Remove any lines that contain no values
    str = str.replace(/[\w ]+[^ID]:[ ]*[\r\n]+/gi, "");
    return str;
}

// Remove any bad charactors on linuex
function escape(str){
    str = str.toLowerCase();
    return str.replace(/[;&|><*?`$\(\)\{\}\[\]!#]/gi, "");
}

// Check if string is blank, whitespace, null
function isBlank(str) {
    return (!str || /^\s*$/.test(str));
}

// Start the server
// Listen on port 6633 to allow for Apache proxing
var server = app.listen(6633, function() {
    console.log('Listening on port %d', server.address().port);
});