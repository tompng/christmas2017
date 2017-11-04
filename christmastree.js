function f(p){
  var th=Math.atan2(p.x,p.y)
  return {
    x: (Math.sin(5*th)+th*th*th*(th*th-1)/4)*(1-1/(1+10*(p.x*p.x+p.y*p.y)))*4/5,
    y: 1.8*p.x*p.x+0.65*p.y*p.y
  }
}
function star(x,y,n){
  var r2=32*(x*x+y*y)
  var p=f(f(f(f({x:Math.sin(n*Math.atan2(x,y))*r2,y:r2+0.2}))))
  return Math.atan(p.x*p.x+p.y*p.y-0.5)
}
function christmastree(x,y){
  var p=f(f(f(f(f(f(f(f({x:x,y:y}))))))))
  var a=(p.x*p.x+p.y*p.y-1)*(Math.pow(star(x,y-1.64,9/2),2)-0.2)-0.2
  var b=star((Math.pow(3*x+2*y-1.5,2)-1)/3,(Math.pow(3*y-2*x-2.5,2)-1)/3,4)
  var c=star((Math.pow(3*x-y+0.4,2)-1)/3,(Math.pow(3*y+x-2,2)-1.2)/3,4)
  return a*b*c<0
}
