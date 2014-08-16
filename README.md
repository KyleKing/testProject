<p align="center">
  <a href="javascript:void(0)">
    <img height="200" width=auto src="https://bikeshare.rit.edu/assets/bike_logo_web-d52c19ea6ef7400d3cfdb26f42c0a8a5.png">
  </a>
</p>

# testProject ![Build Status][failed]
> Nothing to see here

## Guide (skip what you already have installed)

1. Go to: (nodejs.org)[http://nodejs.org/download/] and use the proper installer for your platform (remember to click on the download and follow the download procedure)
2. Then install [git local package management](http://git-scm.com/downloads)
3. Install Meteor:
    `curl https://install.meteor.com/ | sh`
4. Install meteorite (for package management)
    `sudo -H npm install -g meteorite`
5. Install gulp (for file compilation)
    `npm install --global gulp`
6. Now use it!
    * Navigate to your clone/download of testProject
    * Type `meteor` in the command line to view the project locally
        (point your browser to: [localhost:3000](http://localhost:3000))
    * To make changes or edit;
        - `meteor-npm #type inside your project`
        - Navigate to the .gulp directory (`cd .gulp`)
        - Run `sudo npm install -g meteor-npm #single time operation`
        - Run `gulp`

## Future Things
* Setup a trello roadmap for development: https://trello.com/b/hjBDflxp/meteor-roadmap

## Internet/Google to the Rescue
1. [Steps to ignore gulpfile](http://stackoverflow.com/questions/23443301/how-to-tell-meteor-to-ignore-gulpfile-js) - may also need to add npm to mrt
2. [Add NPM to Meteor](https://github.com/arunoda/meteor-npm/) - used non-mrt method
3. [Intro to GulpJS](https://www.codefellows.org/blog/quick-intro-to-gulp-js)
4. [Building with Gulp - Smashing Mag](http://www.smashingmagazine.com/2014/06/11/building-with-gulp/)
5. [Gulp Recipes](https://github.com/gulpjs/gulp/tree/master/docs/recipes)
6. [Articles](https://github.com/gulpjs/gulp/blob/master/docs/README.md#articles)
7. [Gulp API Docs](https://github.com/gulpjs/gulp/blob/master/docs/API.md)





## Sample `gulpfile.js`

```js
var gulp = require('gulp');
// This is what code looks like
```

[failed]: https://secure.travis-ci.org/twitter/scrooge.png
[passing]: http://img.shields.io/travis/gulpjs/gulp.svg





#gulp boilerplate v2 + METEOR!

a revised simple gulp boilerplate that gives you:

* static server with automatic live reload
* jade compilation
* less compilation
* coffeescript compilation
* Plus meteor capability for a realtime JS webapp

The aim is to get you up and running with meteor and a powerful task runner, _gulp_.

##usage
as a prerequisite it's assumed you have [`npm`](http://blog.nodeknockout.com/post/65463770933/how-to-install-node-js-and-npm) installed and the [`gulp-cli`](http://markgoodyear.com/2014/01/getting-started-with-gulp/).

1. clone the repo

        git clone https://github.com/KyleKing/gulp-boilerplate-v2.git

2. install dependencies

        npm install

3. start gulp

        cd tests/

        gulp

4. Start meteor

        meteor

5. start hacking away with super fast livereload goodness.

Any problems or questions, feel free to post an issue or tweet me, @_jh3y!

Made by: @jh3y 2014

Edited by: @kyleking 2014
