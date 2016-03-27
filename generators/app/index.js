'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({

  prompting: {
    dir: function(){

      if(this.options.createDirectory !== undefined){
        return true;
      }

      var done = this.async();
      var prompt = [{
        type: 'confirm',
        name: 'createDirectory',
        message: '你是否要为你的项目创建一个新的目录?'
      }];

      this.prompt(prompt, function (response) {
        this.options.createDirectory = response.createDirectory;
        done();
      }.bind(this));
    },

    dirname: function () {
      if(!this.options.createDirectory || this.options.dirname){
        return;
      }

      var done = this.async();
      var prompt = [{
        type: 'input',
        name: 'dirname',
        message: '请输入目录名称'
      }];

      this.prompt(prompt, function (response) {
        this.options.dirname = response.dirname;
        done();
      }.bind(this));
    },

    install: function () {

      if(this.options.install){
        return true;
      }

      var done = this.async();
      var prompt = [{
        type: 'list',
        name: 'install',
        message: '选取是否自动安装项目依赖?',
        choices: [
            '不安装,  项目创建完后可自己手动安装',
            '安装, 根据网络情况可能花费较长时间'
        ],
        store: true
      }];

      this.prompt(prompt, function (response) {
        this.options.install = response.install;
        done();
      }.bind(this));
    }
  },


  writing: {

    buildEnv: function () {
      //创建目录
      if(this.options.createDirectory){
        this.destinationRoot(this.options.dirname);
        this.appname = this.options.dirname;
      }
    },

    assetsDirs: function(){
      this.fs.copy(
          this.templatePath(),
          this.destinationPath()
      );
      this.fs.copy(
          this.templatePath('.babelrc'),
          this.destinationPath('.babelrc')
      );
    }

  },

  install: function () {
    var autoInstall = this.options.install;
    if((/^安装/).test(autoInstall)){
      this.installDependencies();
    }
    //this.installDependencies();
  }
});
