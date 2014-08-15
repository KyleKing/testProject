testProject
===========

Nothing to see here, but if you are on a given team with only two females and far too many men:

##Guide (skip what you already have installed)

1. Go to: (nodejs.org)[http://nodejs.org/download/] and use the proper installer for your platform (remember to click on the download and follow the download procedure)
2. Then install [git local package management](http://git-scm.com/downloads)
3. Install Meteor:
    curl https://install.meteor.com/ | sh
4. Install meteorite (for package management)
    sudo -H npm install -g meteorite
5. Install gulp (for file compilation)
    npm install --global gulp
6. Now use it!
    * Navigate to your clone/download of testProject
    * Type "meteor" in the command line to view the project locally
        (point your browser to: [localhost:3000](http://localhost:3000))
    * To make changes or edit, run "gulp" inside the .gulp directory

####Future Things
* Setup a trello roadmap for development: https://trello.com/b/hjBDflxp/meteor-roadmap

####Internet/Google to the Rescue
1. [Steps to ignore gulpfile](http://stackoverflow.com/questions/23443301/how-to-tell-meteor-to-ignore-gulpfile-js) - may also need to add npm to mrt