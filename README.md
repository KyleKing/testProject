<p align="center">
  <a href="http://kyleking.github.io">
    <img height="200" width=auto src="/public/icons/BlockBike.png">
  </a>
</p>

# testProject
![Build Status][Build Passing] ![Built with GulpJS](http://b.repl.ca/v1/Built_with-GulpJS-orange.png) ![Using MeteorJS](http://b.repl.ca/v1/Using-MeteorJS-blue.png) ![Quality Status][Questionable] ![devDependencies Status][Out of Date]
<!--![Nothing To See Here](http://b.repl.ca/v1/Nothing-To_See%20Here-grey.png) -->
<!--![Move On?][On]-->
> Nothing to see here

## Usage
Skip what you already have installed

1. Get NPM and NodeJS
    * Go to: [nodejs.org](http://nodejs.org)
    * Click install
    * Open the package
        - For help click [here](http://blog.nodeknockout.com/post/65463770933/how-to-install-node-js-and-npm)

2. Then install [git local package management](http://git-scm.com/downloads)

3. Install Meteor:

        curl https://install.meteor.com/ | sh

4. Install meteorite (for package management)

        sudo -H npm install -g meteorite

<!-- 5. Install gulp (for file compilation)

        npm install - -global gulp

  or this (not really sure which one is the correct one needed - sorry)[`help for the gulp-cli`](http://markgoodyear.com/2014/01/getting-started-with-gulp/):

      npm install gulp -g
Scratch that....gulp should be installed with npm install.. -->

5. clone the repo

        git clone https://github.com/KyleKing/testProject.git
        cd testProject/

6. install dependencies

        npm install

7. start gulp

        cd tests/
        gulp

8. Start meteor (in new terminal window)

        meteor

9. start hacking away with super fast latency compensation and livereload goodness.

## Future Things
A queue of things to come

* [`Add scss support for gulp`](http://markgoodyear.com/2014/01/getting-started-with-gulp/)
* [Minify CSS Files](https://www.npmjs.org/package/gulp-minify-css)
* Optimize site for the web
* Setup a trello roadmap for development: https://trello.com/b/hjBDflxp/meteor-roadmap

## Internet/Google to the Rescue
1. [How to trick meteor into ignoring the gulpfile](http://stackoverflow.com/questions/23443301/how-to-tell-meteor-to-ignore-gulpfile-js)
2. Good Introductions to GulpJS
    * [Code Fellows](https://www.codefellows.org/blog/quick-intro-to-gulp-js)
    * [Smashing Mag](http://www.smashingmagazine.com/2014/06/11/building-with-gulp/)
    * [Articles](https://github.com/gulpjs/gulp/blob/master/docs/README.md#articles)
3. Gulp Docs
    * [Gulp Recipes](https://github.com/gulpjs/gulp/tree/master/docs/recipes)
    * [Gulp API Docs](https://github.com/gulpjs/gulp/blob/master/docs/API.md)
4. [Gulp-boilerplate-v2](https://github.com/jh3y/gulp-boilerplate-v2) - the basis for the gulp framework used in this repository, made by @[jh3y](https://github.com/jh3y)
5. Meteor Introductions
    * [Meteor reactivity explained in diagrams](https://meteorhacks.com/journey-into-meteors-reactivity.html)
    * [Reactive templating engine, blaze](https://meteorhacks.com/how-blaze-works.html)
    * [Fast render package](https://meteorhacks.com/introducing-fast-render.html)
    * [DDP socket transfer protocol](https://meteorhacks.com/introduction-to-ddp.html)
    * [Introduction to Latency Compensation](https://meteorhacks.com/introduction-to-latency-compensation.html)
6. Meteor Docs
    * [Official Docs](http://docs.meteor.com)
    * [Best Practices](http://andrewscala.com/meteor/)
7. [Best Learning Resources for Meteor.js](https://www.yauh.de/best-learning-resources-for-meteorjs/) filled with tons of links
8. Mediocore Meteor Tutorials
    * [Data contexts guide](https://www.discovermeteor.com/blog/a-guide-to-meteor-templates-data-contexts/)
    * [With Laika](http://mherman.org/blog/2014/01/29/meteor-dot-js-in-action-create-an-app-test-with-laika/#.U--XyEv1GzA)
    * [Building a Chatapp](http://sebastiandahlgren.se/2013/07/17/tutorial-writing-your-first-metor-application/)
    * [Openshift](https://www.openshift.com/blogs/day-15-meteor-building-a-web-app-from-scratch-in-meteor)
9. Github icons built with [Buckler](http://b.repl.ca)





## Sample `codefile.js`

```js
var code = require('codeJS');
// This is what code looks like
```


[Build Success!!!]: http://b.repl.ca/v1/Build-Success%21%21%21-brightgreen.png
[Build Passing]: http://b.repl.ca/v1/Build-Passing-lightgrey.png
[Build Failing]: http://b.repl.ca/v1/Build-Failing-red.png

[Questionable]: http://b.repl.ca/v1/Quality-Questionable-lightgrey.png

[Out of Date]: http://b.repl.ca/v1/devDependencies-Out_of%20Date-red.png

[On]: http://b.repl.ca/v1/Move-On-red.png
