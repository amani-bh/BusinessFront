import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { ActivatedRoute,  Router } from '@angular/router';
import { SkillsService } from '../../Shared/Services/Skills.service';
@Component({
  selector: 'app-show-micro-hard-skills',
  templateUrl: './show-micro-hard-skills.component.html',
  styleUrls: ['./show-micro-hard-skills.component.css']
})
export class ShowMicroHardSkillsComponent implements OnInit {

  Macroname: string="";
  name:string[]=[];
  nb:number[]=[];
  loaded = false;
  public radarChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      r: {
        ticks: {
          stepSize: 20
      },
          min: 0,
          max: 100
      }
  }
    
  };
  public radarChartType: ChartType = 'radar';
  public radarChartLabels: string[] = this.name;

  public radarChartData: ChartData<'radar'> = {
    labels: this.radarChartLabels,
    datasets: [
      { data: this.nb, label: 'progress' ,
      backgroundColor: 'rgba(44,66,89, 0.5)',
      borderColor: '#1f3e5e',
      pointBackgroundColor: '#1f3e5e',},
      
    ]
  };
  
  
  constructor(private ar :ActivatedRoute, private skillsservice : SkillsService) { }

  ngOnInit(): void {
    this.ar.paramMap.subscribe(params => {
      this.Macroname = String(params.get('name'));
     
    });

    this.skillsservice.GetMicrohardskills(this.Macroname
      ).subscribe(data=>{
      data.map(res=>{this.name.push(res.name)
      this.nb.push(res.progress)

   })
   this.loaded=true;
    }
      );
  }

}
