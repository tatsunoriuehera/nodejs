var http=require('http'),
  fs=require('fs'),
  ejs=require('ejs');

//server setting read
var settings=require('./setting');
console.log(settings);
var server=http.createServer();
//var msg;
var template=fs.readFileSync(__dirname+'/welcome.ejs','utf-8');
var n=0;
server.on('request',function(req,res){
  n++;
  var data=ejs.render(template,{
    title:"welcome",
    content:"<strong>hello</strong>",
    n:n
  });
  /*
  fs.readFile(__dirname+'/welcome.html','utf-8',function(err,data){
    //welcome.html not found
    if(err){
      res.writeHead(404,{'Content-Type':'text/plane'});
      //res.write('connecting success'+req.url);
      res.write("not found!");
      return res.end();
    }
    */
    res.writeHead(200,{'Content-Type':'text/html'});
    //res.write('connecting success'+req.url);
    res.write(data);
    res.end();
  });
  /*
  switch(req.url){
    case'/about':
    msg="about this page";
    break;

    case'/prof':
    msg="about me";
    break;

    default:
    msg="404 error";
    break;
  }
  res.writeHead(200,{'Content-Type':'text/plane'});
  //res.write('connecting success'+req.url);
  res.write(msg);
  res.end();
*/




server.listen(settings.port,settings.host);
console.log("server listening ...");
