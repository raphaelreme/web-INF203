"use strict";

const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
var bodyParser = require('body-parser');


var PORT = process.argv[2];
var DB = "db.json";
var DB_S = "db_save.json";

const app = express();

app.use(morgan("combined"));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/exit', function (req, res) {
  res.send("The server will stop now");
  process.exit(0);
});

app.get('/restore', function (req, res) {
  console.log("get /restore");
  fs.writeFileSync(DB, fs.readFileSync(DB_S));
  res.send("db.json reloaded");
});

app.get('/papercount', function (req, res) {
  var array = JSON.parse(fs.readFileSync(DB).toString());
  res.type("text/plain");
  res.send(""+array.length);
});

app.get('/author/:authorID', function (req, res) {
  var author = req.params.authorID;
  var array = JSON.parse(fs.readFileSync(DB).toString());
  var count = array.reduce(function (c, doc) {
    for (var auth of doc.authors) {
      if (auth.toLowerCase().includes(author.toLowerCase()))
        return c+1;
    }
    return c;
  }, 0);
  res.type("text/plain");
  res.send(""+count);
});

app.get('/papersfrom/:authorID', function (req, res) {
  var author = req.params.authorID;
  var all = JSON.parse(fs.readFileSync(DB).toString());
  var papers = all.reduce(function (papers, doc) {
    for (var auth of doc.authors) {
      if (auth.toLowerCase().includes(author.toLowerCase())) {
        papers.push(doc);
        return papers;
      }
    }
    return papers;
  }, []);
  res.json(papers);
});


app.get('/titles/:authorID', function (req, res) {
  var author = req.params.authorID;
  var all = JSON.parse(fs.readFileSync(DB).toString());
  var titles = all.reduce(function (titles, doc) {
    for (var auth of doc.authors) {
      if (auth.toLowerCase().includes(author.toLowerCase())) {
        titles.push(doc.title);
        return titles;
      }
    }
    return titles;
  }, []);
  res.json(titles);
});


app.get('/reference/:ID', function (req, res) {
  var ID = req.params.ID;
  var all = JSON.parse(fs.readFileSync(DB).toString());
  for (var doc of all) {
    if (doc.key == ID) {
      res.json(doc);
      return;
    }
  }
  res.sendStatus(404);
});

app.delete('/reference/:ID', function (req, res) {
  var ID = req.params.ID;
  var all = JSON.parse(fs.readFileSync(DB).toString());
  var index = -1;
  for (var i = 0; i < all.length; i++) {
    if (all[i].key == ID) {
      index = i;
      break;
    }
  }
  if (index == -1) {
    res.sendStatus(404);
    return;
  }
  let json = JSON.stringify(all.slice(0, index).concat(all.slice(index+1)));
  fs.writeFileSync(DB, json);
  res.sendStatus(200);
});

app.post('/reference' , function (req, res) {
  var all = JSON.parse(fs.readFileSync(DB).toString());
  all.push(req.body);
  fs.writeFileSync(DB, JSON.stringify(all));
  res.sendStatus(200);
});


app.put('/reference/:ID' , function (req, res) {
  var ID = req.params.ID;
  var all = JSON.parse(fs.readFileSync(DB).toString());
  var modified = false;
  console.log(req.body);
  for (var doc of all) {
    if (doc.key == ID) {
      for (var key in req.body)
        doc[key] = req.body[key];
      modified = true;
    }
  }
  if (modified) {
    fs.writeFileSync(DB, JSON.stringify(all));
    res.sendStatus(200);
    return;
  } else {
    all.push(req.body);
    fs.writeFileSync(DB, JSON.stringify(all));
    res.sendStatus(200);
  }
});


app.listen(PORT, () => console.log('Example app listening on port ' + PORT));
