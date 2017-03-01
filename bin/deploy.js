#!/usr/bin/env node

var program = require('commander');
var fs = require('fs');
var Sftp = require('sftp-uploads');

program
  .version(require('../package.json').version)
  .usage('[project name] [options] ')
  .option('-C, --config <str>', 'specify your config file, default is deploy.json')
  .parse(process.argv);

var deploy_env = program.args[0];
var config = program.config ? program.config : 'deploy.json';
var log = function(file, cb) {
  console.log(file.path);
  cb(null, file);
};
fs.readFile(config, function(err,data) {
    if (!err) {
         // logic here
        var config = JSON.parse(data.toString('utf-8'))[deploy_env];
        if (config) {
             sftp = new Sftp(config);
             sftp.on('error', function(err){
                throw err;
             })
             .on('uploading', function(pgs){
                console.log('Uploading', pgs.file);
                console.log(pgs.percent+'% completed');
             })
             .on('completed', function(){
                console.log('Upload Completed');
             })
             .upload();
        } else {
            console.error('deploy_env', deploy_env, 'is not found');
        }
    } else {
        console.error('config file', config, 'is not found');
    }
});
// print uncaughtException for debug
process.on('uncaughtException', function (err) {
    console.log(err);
}); 