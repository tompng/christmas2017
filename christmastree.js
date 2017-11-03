function fx(x,y){
  var th=Math.atan2(x,y)
  var r2=x*x+y*y
  return (Math.sin(5*th)+th*th*th*(th*th-1)/4)*(1-1/(1+10*r2))*4/5
}
function fy(x,y){
  var th=Math.atan2(x,y)
  return (2*Math.sqrt(4*x*x+y*y)-1)/1.4
}
function star(x,y,l){
  var a=64*(x*x+y*y)
  var b=Math.cos(5/6*Math.asin(Math.sin(9/2*Math.atan2(x,-y))))
  return (a*b+Math.cos(l*a*b))
}
function stars(x,y,a,b){
  var p=a*x+b*y, q=a*y-b*x
  return star((Math.sqrt(p*p+1/8)-1)*2/3,2/3*(Math.sqrt(q*q+1/8)-1),8)
}
function christmastree(x0,y0){
  var x1=fx(x0,y0),y1=fy(x0,y0)
  var x2=fx(x1,y1),y2=fy(x1,y1)
  var x3=fx(x2,y2),y3=fy(x2,y2)
  var x4=fx(x3,y3),y4=fy(x3,y3)
  var x5=fx(x4,y4),y5=fy(x4,y4)
  var a=(x5*x5+y5*y5-1)*star(x0,y0-13/8,15)
  var b=stars(x0+0.05,(y0-0.8),3,2)*stars(x0-0.1,(y0-0.5),3,-1)
  return a*b<0
}
