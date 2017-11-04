function render(option,func){
  var size = option.size || 512
  var quality = option.quality || 1
  var xmin=option.x[0],xmax=option.x[1]
  var ymin=option.y[0],ymax=option.y[1]
  var canvas = document.createElement('canvas')
  var ctx = canvas.getContext('2d')
  var w = xmax - xmin, h = ymax - ymin
  canvas.width = size
  canvas.height = Math.round(size * h / w)
  dx = w / canvas.width / quality
  dy = h / canvas.height / quality
  var imgdata = ctx.getImageData(0,0,canvas.width,canvas.height)
  function plot(x,y){
    var ix = Math.round(canvas.width*(x-xmin)/w)
    var iy = canvas.height-Math.round(canvas.height*(y-ymin)/h)-1
    var idx = 4*(iy*canvas.width+ix)
    imgdata.data[idx+3]+=0xff/quality/quality
  }
  func(plot,dx,dy)
  ctx.putImageData(imgdata, 0, 0)
  function add(){document.body.appendChild(canvas)}
  if(document.body)add()
  else window.addEventListener('load', add)
}
