import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'radar-chart',
  templateUrl: './rader-chart.component.html',
  styleUrls: ['./rader-chart.component.css']
})
export class RaderChartComponent implements OnInit {

  height = 600;
  width = 600;
  polygon = 7;
  numberOfPoints=5;
  points:Points[]=[];
  circles:Circle[]=[];
  init={cr:0,cx:300,cy:300}

  extraAngle =20-0.020;
 

  labels:string[]=["HR","Manager","IT","Developer","PHP","C++","Java"]



  innerCircle = {cx:0,cy:0,cr:2};
  outerCircle = {cx:0,cy:0,cr:2};
  startCircle = {cx:0,cy:0,cr:2,data:[]}
  startCircleOuter = {cx:0,cy:0,cr:2,data:[]}
  
  startPoints = []
 

  constructor() { }

  ngOnInit() {
      // this.numberOfPoints=this.labels.length;
      this.polygon = this.labels.length;
      this.createCircle();
     
      // this.coordinates();
  }

  createCircle()
  {
    this.innerCircle.cx = this.width/2;
    this.innerCircle.cy = this.height/2;
    this.innerCircle.cr = 10;
    this.outerCircle.cx = this.width/2;
    this.outerCircle.cy = this.height/2;
    this.outerCircle.cr = this.height/2>10 ?(this.height/2)-100:this.height/2;

    /**Initial value */
    this.init.cr = 10;
    this.init.cx = this.width/2;
    this.init.cy = this.height/2;
    let maxCircleRadius =this.height/2>10 ?(this.height/2)-100:this.height/2;


    for(let i =0,r=0;i<=this.numberOfPoints+1;i++)
    {
       r=((maxCircleRadius/this.numberOfPoints)*i);  //this.height/2>10 ?((this.height/2)/this.numberOfPoints)-i*10:this.height/2;
        let tempCircle = this.coordinates(new Circle([],r,this.init.cx,this.init.cy),i);
        this.circles.push(tempCircle);
        // console.log(tempCircle.data);
        if(i !=0 && i <=this.numberOfPoints  )
          this.points=this.points.concat(tempCircle.data);
        else if(i == this.numberOfPoints+1)
        {
          this.startCircleOuter.data =tempCircle.data;
        }
        console.log("I : "+i+" R :"+r)
       
    }

    console.log(this.circles);

    this.createStar();
  }

  getAngle()
  {
    return  360/this.polygon;
      
  }

  coordinates(circle:Circle,index)
  {
    /*x(t) = r cos(t) + j
    y(t) = r sin(t) + k*/
    // let points={x:0,y:0};
/**
    for(let i =0 ;i< this.polygon; i++ )
    {
      let x=this.outerCircle.cr * (Math.cos((this.getAngle()*i)*Math.PI/180))
      let y=this.outerCircle.cr * (Math.sin((this.getAngle()*i)*Math.PI/180))
      this.points.push(new Points(x+300,y+300));

      x=this.innerCircle.cr * (Math.cos((this.getAngle()*i)*Math.PI/180))
      y=this.innerCircle.cr * (Math.sin((this.getAngle()*i)*Math.PI/180))
      this.points.push(new Points(x+300,y+300));
    }
    */

   for(let i =0 ;i< this.polygon; i++ )
   {
     let x=circle.r * (Math.cos((this.getAngle()*i)*Math.PI/180+this.extraAngle))
     let y=circle.r * (Math.sin((this.getAngle()*i)*Math.PI/180+this.extraAngle))
     circle.data.push(new Points(x+300,y+300,index));

    //  x=this.innerCircle.cr * (Math.cos((this.getAngle()*i)*Math.PI/180))
    //  y=this.innerCircle.cr * (Math.sin((this.getAngle()*i)*Math.PI/180))
    //  this.points.push(new Points(x+300,y+300));
   }

    return circle;

  //    x=this.outerCircle.cr * (Math.cos((this.getAngle()*1)*Math.PI/180))
  //    y=this.outerCircle.cr * (Math.sin((this.getAngle()*1)*Math.PI/180))
  //   this.points.push(new Points(x+300,y+300));
  //   x=this.innerCircle.cr * (Math.cos((this.getAngle()*1)*Math.PI/180))
  //   y=this.innerCircle.cr * (Math.sin((this.getAngle()*1)*Math.PI/180))
  //   this.points.push(new Points(x+300,y+300));

  //   x=this.outerCircle.cr * (Math.cos((this.getAngle()*2)*Math.PI/180))
  //   y=this.outerCircle.cr * (Math.sin((this.getAngle()*2)*Math.PI/180))
  //  this.points.push(new Points(x+300,y+300));
  //  x=this.innerCircle.cr * (Math.cos((this.getAngle()*2)*Math.PI/180))
  //  y=this.innerCircle.cr * (Math.sin((this.getAngle()*2)*Math.PI/180))
  //  this.points.push(new Points(x+300,y+300));

  //   this.points.push(new Points(300,300));

  }

  createStar()
  {
    this.startCircle.cr = (this.height/2>10 ?(this.height/2)-100:this.height/2)/2; // r of the middle circle
    this.startCircle.cx = this.init.cx; //x of origin
    this.startCircle.cy = this.init.cy; // y of origin
    let points =[];
   
 
    //find points on circle

    for(let i =0 ;i< this.polygon*2; i++ )
    {
      let x=this.startCircle.cr * (Math.cos(((360/(this.polygon*2))*i)*Math.PI/180+this.extraAngle))+this.startCircle.cx
      let y=this.startCircle.cr * (Math.sin(((360/(this.polygon*2))*i)*Math.PI/180+this.extraAngle))+this.startCircle.cy
      
      if(this.isOdd(i))
        this.startCircle.data.push({x,y})
    }
 
    let innerRadius =this.startCircle.cr
    let outerRadius =this.circles[this.numberOfPoints+1].r;
    for (let i = 0,inner =0,outer=0; i < this.polygon * 2; i++) {
      if(i & 1)
      {
        // Start inner Circle
        points.push(this.startCircle.data[inner].x);
        points.push(this.startCircle.data[inner++].y);
      }
      else
      {
          // star outer circle
          points.push(this.startCircleOuter.data[outer].x);
          points.push(this.startCircleOuter.data[outer++].y);
      }   
     
    }
    console.log(this.startCircle.data);
    this.startPoints = points;

  }

 isOdd(x:number) { return x & 1; };

}

export class Points
{
  public x:number;
  public y:number;
  public index:number;
  constructor(x:number,y:number,index:number)
  {
    this.x =x;
    this.y = y;
    this.index = index;
  }
  
} 

export class Circle
{
    public data:Points[];
    public r:number;
    public x:number;
    public y:number;


    constructor(data:Points[],r:number,x:number,y:number)
    {
      this.data = data;
      this.r = r;
      this.x = x;
      this.y = y;
     
    }
}

/******
 * 
 * 
 * 
 * 
 * 
 * 
var star = {
  node: $("#star"),  
  get points() { 
    var val = +$("#star-points").val();
    $("#star-points-val").text(val);
    return val; 
  },
  get innerRadius() { 
    var val = +$("#inner-radius").val();
    $("#inner-radius-val").text(val);
    return val; 
  },
  get outerRadius() { 
    var val = +$("#outer-radius").val();
    $("#outer-radius-val").text(val);
    return val; 
  },  
  set points(points) {    
    this.node.attr("points", points);
  }
};

var polygon = {
  node: $("#polygon"),  
  get sides() { 
    var val = +$("#sides").val();
    $("#sides-val").text(val);
    return val; 
  },
  get radius() { 
    var val = +$("#radius").val();
    $("#radius-val").text(val);
    return val; 
  },
  set points(points) {    
    this.node.attr("points", points);
  }
};

$("#star-container input").on("input", updateStar);
$("#polygon-container input").on("input", updatePolygon);

updateStar();
updatePolygon();

function updatePolygon() {
  var sides  = polygon.sides;
  var radius = polygon.radius;
  var angle  = 2 * Math.PI / sides;
  var points = []; 
  
  for (var i = 0; i < sides; i++) {
    points.push(radius + radius * Math.sin(i * angle));
    points.push(radius - radius * Math.cos(i * angle));
  }
  
  polygon.points = points;
}

function updateStar() {  
  var innerRadius = star.innerRadius;
  var outerRadius = star.outerRadius;
  var numPoints = star.points;
  var center = Math.max(innerRadius, outerRadius);
  var angle  = Math.PI / numPoints;
  var points = [];  
  
  for (var i = 0; i < numPoints * 2; i++) {
    var radius = i & 1 ? innerRadius : outerRadius;  
    points.push(center + radius * Math.sin(i * angle));
    points.push(center - radius * Math.cos(i * angle));
  }
  
  star.points = points;
}







 */