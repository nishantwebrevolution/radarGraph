import { Component } from '@angular/core';
 
@Component({
  selector: 'radar',
  templateUrl: './radar.html'
})
export class RadarChartComponent {
  // Radar
  public demoradarChartLabels:string[] = ['Designer', 'Developer', 'Tester', 'Clients', 'HR','test'];
 
  public demoradarChartData:any = [
    {data: [40, 40,40, 40, 40,40],borderColor:'#090254', label: 'Company A',backgroundColor:'rgba(255, 255, 255,0.5)'},
    {data: [30, 40, 20, 35, 15,1],borderWidth:2, label: 'Company B',backgroundColor:'rgba(255, 255, 255,0.5)'}
  ];
  public radarChartType:string = 'radar';
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
}