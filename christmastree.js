function fx(x,y){
  var th=Math.atan2(x,y)
  var r2=x*x+y*y
  return (Math.sin(5*th)+th*th*th*(th*th-1)/4)*(1-1/(1+10*r2))*4/5
}
function fy(x,y){
  var th=Math.atan2(x,y)
  return 1.8*x*x+0.65*y*y
}
function star(x,y,n,l){
  return 64*(x*x+y*y)*Math.cos(5/6*Math.asin(Math.sin(n*Math.atan2(x,-y))))-1
}
function stars(x,y,a,b){
  var p=a*x+b*y, q=a*y-b*x
  return star((Math.sqrt(p*p+1/8)-1)*3/4,(Math.sqrt(q*q+1/8)-1)*3/4,7/2)
}
function christmastree(x0,y0){
  var x1=fx(x0,y0),y1=fy(x0,y0)
  var x2=fx(x1,y1),y2=fy(x1,y1)
  var x3=fx(x2,y2),y3=fy(x2,y2)
  var x4=fx(x3,y3),y4=fy(x3,y3)
  var x5=fx(x4,y4),y5=fy(x4,y4)
  var a=Math.atan(x5*x5+y5*y5-1)*Math.atan(star(x0,y0-1.64,9/2)*star(x0*2,(y0-1.64)*2,-9/2))-0.2
  var b=stars(x0+0.05,(y0-0.85),3,2)*stars(x0-0.1,(y0-0.55),3,-1)
  return a*b<0
}
