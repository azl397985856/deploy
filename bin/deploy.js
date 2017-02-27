#!/usr/bin/env node

var program = require('commander');
var fs = require('fs');
var map = require('map-stream');
var vfs = require( 'vinyl-fs' );
var ftp = require( 'vinyl-ftp' );

program
  .version(require('../package.json').version)
  .usage('[options] [project name]')
  .option('-C, --config <str>', 'specify your config file')
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
        var config = JSON.parse(data.toString('utf-8'))[deploy_env]
        if (config) {   
            var conn = new ftp(config);
            vfs.src(config.workspace, { buffer: false } )
                .pipe(map(log)) // print the effected files
                .pipe( conn.dest(config.dest, {
                    sourcemaps: config.sourcemaps,
                }))
            console.log('deploy success!');
        } else {
            console.error('deploy_env not found');
        }
    } else {
        console.error('config file not found');
    }
});
// print uncaughtException for debug
process.on('uncaughtException', function (err) {
    console.log(err);
}); 