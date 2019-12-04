import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';

import { ChartsModule } from 'ng2-charts';
import { RadarChartComponent } from './radar/radar';
import { RaderChartComponent } from './rader-chart/rader-chart.component';


@NgModule({
  imports:      [ BrowserModule, FormsModule, ChartsModule ],
  declarations: [ AppComponent, HelloComponent, RadarChartComponent, RaderChartComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
