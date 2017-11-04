function f(p){
  var th=Math.atan2(p.x,p.y)
  return {
    x: (Math.sin(5*th)+th*th*th*(th*th-1)/4)*(1-1/(1+10*(p.x*p.x+p.y*p.y)))*4/5,
    y: 1.8*p.x*p.x+0.65*p.y*p.y
  }
}
function star(x,y,n){
  return 80*(x*x+y*y)*Math.cos(5/6*Math.asin(Math.sin(n*Math.atan2(x,-y))))-1
}
function christmastree(x,y){
  var p0={x:x,y:y},p1=f(p0),p2=f(p1),p3=f(p2),p4=f(p3),p5=f(p4)
  var a=(p5.x*p5.x+p5.y*p5.y-1)*(Math.pow(star(x,y-1.64,9/2),2)-0.2)-0.2
  var b=star((Math.pow(3*x+2*y-1.5,2)-1)/3,(Math.pow(3*y-2*x-2.5,2)-1)/3,4)
  var c=star((Math.pow(3*x-y+0.4,2)-1)/3,(Math.pow(3*y+x-2,2)-1.2)/3,4)
  return a*b*c<0
}
