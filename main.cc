#include <math.h>
#include "image.h"
#define X0 -1
#define Y0 -1
#define Z0 -0.2
#define XYZSIZE 2.0
#define SIZE 1024

typedef struct{double x,y,z;} Point;
Point f(Point p){
  double xy2=p.x*p.x+p.y*p.y;
  double r2=xy2+p.z*p.z;
  double th = atan2(sqrt(xy2),p.z);
  double a=1-1/(1+10*r2);
  double b=1-1/(1+10*xy2);
  return (Point){
    (sin(th*5)+th*th*th*(th*th-1)/4)*a*4/5,
    sin(4*atan2(p.y,p.x))*b,
    xy2*1.8+p.z*p.z*0.65
  };
}
int LEVEL=0;
double PHASE=0;
double THETA=0;
double shape(double x,double y,double z){
  Point p={x,y,z};
  for(int i=0;i<LEVEL;i++)p=f(p);
  Point q=f(p);
  p.x = p.x*(1-PHASE)+PHASE*q.x;
  p.y = p.y*(1-PHASE)+PHASE*q.y-0.5;
  p.z = p.z*(1-PHASE)+PHASE*q.z;
  return p.x*p.x+p.y*p.y+p.z*p.z-1;
}


int func(int ix,int iy,int iz){
  double x=X0+XYZSIZE*ix/SIZE;
  double y=Y0+XYZSIZE*iy/SIZE;
  double z=Z0+XYZSIZE*iz/SIZE;
  double c=cos(THETA);
  double s=sin(THETA);
  double _x=x;x=c*_x-s*y;y=s*_x+c*y;
  return shape(x,y,z)<0;
}
Image *image=new Image(SIZE, SIZE);
void plot(int x,int y,int z){
  if(image->data[x][z].r!=0)return;
  Color color={1-(double)y/SIZE,1-(double)y/SIZE,1-(double)y/SIZE};
  image->data[x][z]=color;
}
void renderRange(int,int,int,int);
void renderSubRange(int x,int y,int z,int size){
  bool flag=false;
  for(int i=0;i<size;i++)for(int j=0;j<size;j++){
    if(image->data[x+i][z+j].r==0){
      flag=true;
      break;
    }
  }
  if(!flag)return;
  for(int i=0; i<8; i++){
    int s = size / 2;
    renderRange(x+s*(i&1), y+s*((i>>1)&1), z+s*(i>>2), s);
  }
}
void renderRange(int x, int y, int z, int size){
  if(size<=4){
    for(int i=0;i<=size;i++)for(int j=0;j<=size;j++)for(int k=0;k<=size;k++){// <= should be < but it doesnot work
      if(func(x+i,y+j,z+k))plot(x+i,y+j,z+k);
    }
    return;
  }
  bool val=func(x,y,z);
  for(int i=1; i<size; i++)for(int j=1; j<size; j++){
    if(val!=func(x+i,y+j,z)||val!=func(x+i,y,z+j)||val!=func(x,y+i,z+j)
     ||val!=func(x+size,y+i,z+j)||val!=func(x+j,y+size,z+i)||val!=func(x+i,y+j,z+size))return renderSubRange(x,y,z,size);
  }
  for(int i=0; i<=size; i++){
    if(val!=func(x+i,y,z)||val!=func(x,y+i,z)||val!=func(x,y,z+i)
     ||val!=func(x+i,y+size,z+size)||val!=func(x+size,y+i,z+size)||val!=func(x+size,y+size,z+i)
     ||val!=func(x+i,y+size,z)||val!=func(x,y+i,z+size)||val!=func(x+size,y,z+i))return renderSubRange(x,y,z,size);
  }
}

void imgclear(){
  for(int x=0;x<image->w;x++)for(int y=0;y<image->h;y++){
    image->data[x][y].r=image->data[x][y].g=image->data[x][y].b=0;
  }
}

int main(){
  for(int i=0;i<=30;i++){
    imgclear();
    LEVEL = i/5;
    PHASE = i%5/5.0;
    THETA=i*0.02;
    renderSubRange(0,0,0,SIZE);
    char name[1000];
    sprintf(name, "out/%d.bmp", i);
    FILE *fp=fopen(name,"w");
    image->save(fp);
    fclose(fp);
  }
  return 0;
}
