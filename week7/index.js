var express = require('express');

var app = express();
var exphbs = require('express-handlebars');

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.set('port', 3000);

app.get('/', function(req, res){
    var qParams = [];
    for (var p in req.query){
      qParams.push({'name':p,'value':req.query[p]})
    }
    var context = {};
    context.dataList = qParams;
    res.render('home-get', context);
});

app.post('/', function(req, res){
    var qParams1 = [];
    for (var p in req.query){
      qParams1.push({'name':p,'value':req.query[p]})
    }

    var qParams = [];
    for (var p in req.body){
      qParams.push({'name-post':p,'value-post':req.body[p]})
    }
    //console.log(qParams);
    //console.log(req.body);
    var context = {};
    context.dataList2 = qParams;
    context.dataList1 = qParams1;
    res.render('home-post', context);
});

app.use(function(req,res){
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not Found');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.send('500 - Server Error');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});