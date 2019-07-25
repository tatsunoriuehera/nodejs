var http=require('http'),
  fs=require('fs'),
  ejs=require('ejs'),
  qs=require('querystring');
//server setting read
var settings=require('./setting');
console.log(settings);
var server=http.createServer();
var template=fs.readFileSync(__dirname+'/bbs.ejs','utf-8');
var posts=[];
function renderForm(posts,res){
  var data=ejs.render(template,{
    posts:posts
  });
  res.writeHead(200,{'Content-Type':'text/html'});
  res.write(data);
  res.end();
}
server.on('request',function(req,res){
/*
  n++;
  var data=ejs.render(template,{
    title:"welcome",
    content:"<strong>hello</strong>",
    n:n
  });
*/
  if(req.method === 'POST'){
    req.data="";
    req.on("readable",function(){
      req.data+=req.read();
    });
    req.on("end",function(){
      var query=qs.parse(req.data);
      posts.push(query.name);
      renderForm(posts,res);
    });
  }else{
    renderForm(posts,res);
  }
/*
    res.writeHead(200,{'Content-Type':'text/html'});
    res.write(data);
    res.end();
*/
  });


server.listen(settings.port,settings.host);
console.log("server listening ...");
