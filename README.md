# LocalsOnly

## Description

## What is LocalsOnly?

A Yelp like website with the focus on locals to add input about businesses and places of interest.
Focusing on the locals enables organic reach and growth to the community. Rather than allowing those
who are passing through town, allowing the locals to be the primary input gives a more honest and open
in-site to the community around them and allows any newcomers to see the community they have joined.
This website also encourages people to get out and interact with the community and not focus on
maintaining a digital community.

## Why is LocalsOnly being developed?

This is a 2 part response

### Part 1

This concept came about when I first moved to Arizona. Like many people coming to a new place; I wanted
to "become" a local. This meant that I needed to see what is popular among the locals, where they like to
hang out, etc. I also wanted to become apart of the community rather than online groups. There are plenty
of places online for this through various social medias, but I wanted a place where this concept is the
focus. The focus being a place for locals to engage with each other and a place for newcomers to jump in.

### Part 2

I have been developing in various small projects over the last few years, some on my own and others for
university courses. I wanted to start working on bigger projects and also delve into web development.
This website started with myself having no knowledge on the subject. This is also a project where I invite
others to join and learn about web development. My goal is to guide this site into a company to further
support those who want to learn and grow into the world of web development.

## Installation - How to get the site up and running

### Before making any changes

- __Never__ commit anything directly into `master`. Make sure you branch from `Dev` and name the branch appropriately. When you push back into Github, push your branch and make a __pull request__ into `Dev`.

- To make a new branch first `git checkout Dev` then `git checkout -b <new_branch>`.

- When you are done making changed; first \
  * `git add .` or `git add <file_name>` \
  * then `git commit -m "detailed message of what was done here..."` \
  * then, push your new branch by `git push origin <new_branch>`. \

### Clone LocalsOnly repo

- Open a Terminal window
  * Clone the LocalsOnly repo: `git clone https://github.com/nathanielMTucker/LocalsOnly <DIRECTORY>`
   * Change `<DIRECTORY>` to preferred location, i.e.: "/home/$USER/projects/LocalsOnly"
  * Using `git clone` in Ubuntu will ask for username & password in Terminal (enter credentials)

### Install nodejs & npm

- [Nodejs installer](https://nodejs.org/en/download/) (Latest LTS Version: 14.17.4 (includes npm 6.14.14))
  * Install help from [docs.npmjs.com](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm/)
  * Verify with `npm --version` and `nodejs --version`

### Install dependencies

**You may need superuser privileges to run `npm`.**

- Open Terminal and go to directory of LocalsOnly repo was downloaded
  * Run `npm install` in both _/server_ & _/client_ directories, separately
  * Note: If you have any install errors, ensure $USER "owns" LocalsOnly and its sub-directories, for example in Ubuntu: `sudo chown $USER:$USER -R ~/LocalsOnly/`
   * Then, run `npm clean-install` in both _/server_ & _/client_ directories to refresh the files

### Run LocalsOnly server

- Open a Terminal
  * Change directory to _/server_, run: `npm run dev`
Note: You may run only one server instance at a time. If `npm run dev` prompts a startup error, the program may be running in the background. Please find the instance and kill it.
For example in Ubuntu:
- Run `sudo lsof -t -i:5001` to get PID (i.e.: 7199)
- Kill PID `sudo kill -9 7199`
- Now go back to `~/LocalsOnly/server/` and run `npm run dev`; the program should now start

### Open the LocalsOnly webapp

- Open **another** Terminal
  * Change directory to _/client_, run: `npm start`

### Clone LocalsOnly repo
- Open a Terminal window
  * Clone the LocalsOnly repo: `git clone https://github.com/nathanielMTucker/LocalsOnly <DIRECTORY>`
  * Change <DIRECTORY> to preferred location, i.e.: "/home/$USER/projects/LocalsOnly"
  * Using `git clone` in Ubuntu will ask for username & password in Terminal (enter credentials)

Note: I received an email notification that the Terminal signin for cloning private `git` repos is going to soon be deprecated. This guide will need to be edited to reflect those changes, soon.
  
### Install nodejs & npm
- [Nodejs installer](https://nodejs.org/en/download/) (Latest LTS Version: 14.17.4 (includes npm 6.14.14))
  * Install help from [docs.npmjs.com](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm/)
  * Verify with `npm --version` and `nodejs --version`
  
### Install dependencies
_You may need superuser privileges to run `npm`._

- Open Terminal and go to directory of LocalsOnly repo was downloaded
  * Run `npm install` in both **/server** & **/client** directories, separately
  * Note: If you have any install errors, ensure $USER "owns" LocalsOnly and its sub-directories, for example in Ubuntu: `sudo chown $USER:$USER -R ~/LocalsOnly/`
    * Then, run `npm clean-install` in both **/server** & **/client** directories to refresh the files

  ### Run LocalsOnly server
- Open a Terminal
  * Change directory to **/server**, run: `npm run dev`
   * Note: You may run only one server instance at a time. If `npm run dev` prompts a startup error, the program may be running in the background. Please find the instance and kill it.
  
  For example in Ubuntu:
- Run `sudo lsof -t -i:5001` to get PID (i.e.: 7199)
- Kill PID `sudo kill -9 7199`
- Now go back to `~/LocalsOnly/server/` and run `npm run dev`; the program should now start.
  
### Open the LocalsOnly webapp
- Open **another** Terminal
  * Change directory to _/client_, run: `npm start`
  
### Configuring LocalsOnly
- Notify nathanielMTucker of `npm start` success to approve you into the dev team and then he will give the .env files.
  * Put the **/server** & **/client** `.env` files in their respective locations.
  * You must then make an account, after which let nathanielMTucker know and he will make you an admin.
