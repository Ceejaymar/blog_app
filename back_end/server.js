const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('./posts/posts_model')
const Post = mongoose.model('Post');
//allows you to create paths using relative notation
const path = require('path');
const router = require('express').Router();

mongoose.connect('mongodb://localhost/blog_app_test');

const db = mongoose.connection;

//creates an absolute path based on your file location
const absolutePath = path.join(__dirname, "../")

  //Find all that match specific title
    // Post.find({title: 'find this title'}, (err, data) => {
    //   console.log('Database data found', data);
    // })

function home(req, res) {
    //function that sends out our index.html file when someone pulls up our website for the first time
      res.sendFile(absolutePath + "./front_end/index.html")
  }
router.route('/').get(home)


db.on('open', () => {
  console.log('db connection opened');

  app.listen(5555, () => {
    console.log("The app is listening on port 5555");
    //this line makes our bundle file available for express router to find and display on screen
  app.use(express.static('bundle'))
  app.use('/posts', (req,res) => {
    Post.find({}, (err, data) => {
        res.send(data);
      });
  });

  app.use('/newpost', (req,res) => {
    Post.create({title:"Test Post 3"}, (err,data) => {
        if(err) console.log('NewPost Error with database');
        else console.log('NewPost Post created');
        res.send(data);

    })
  })

  app.use('*', router);
      
  });
})

db.on('error', () => {
  console.log('error in db connection!');
})
