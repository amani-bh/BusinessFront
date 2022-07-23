import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { ActivatedRoute } from '@angular/router';
import { SkillsService } from '../../Shared/Services/Skills.service';
@Component({
  selector: 'app-show-micro-soft-skills',
  templateUrl: './show-micro-soft-skills.component.html',
  styleUrls: ['./show-micro-soft-skills.component.css']
})
export class ShowMicroSoftSkillsComponent implements OnInit {
  Macroname:string="";
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

  public radarChartLabels: string[] = this.name;

  public radarChartData: ChartData<'radar'> = {
    labels: this.radarChartLabels,
    datasets: [
      { data: this.nb, label: 'progress' ,
      backgroundColor: 'rgba(152,150,83, 0.5)',
      borderColor: '#6A693A',
      pointBackgroundColor: '#6A693A', },
      
    ]
  };
  public radarChartType: ChartType = 'radar';
  constructor(private ar :ActivatedRoute,  private skillsservice : SkillsService) { }

  ngOnInit(): void {
    this.ar.paramMap.subscribe(params => {
      this.Macroname = String(params.get('name'));
     
    });

    this.skillsservice.GetMicrosoftskills(this.Macroname
      ).subscribe(data=>{
      data.map(res=>{this.name.push(res.name)
      this.nb.push(res.progress)
  
   })
   this.loaded=true;
    }
      );


  }

}
