import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { SkillsService } from '../../Shared/Services/Skills.service';
@Component({
  selector: 'app-show-macro-soft-skills',
  templateUrl: './show-macro-soft-skills.component.html',
  styleUrls: ['./show-macro-soft-skills.component.css']
})
export class ShowMacroSoftSkillsComponent implements OnInit {

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
      { data: this.nb, label: 'total_progress',
      backgroundColor: 'rgba(152,150,83, 0.5)',
      borderColor: '#6A693A',
      pointBackgroundColor: '#6A693A',
     },

    ]
  };
  constructor(private _router:Router, private skillsservice : SkillsService) { }

  ngOnInit(): void {
    this.skillsservice.GetMacrosoftskills().subscribe(data=>{
      data.map(res=>{this.name.push(res.name)
      this.nb.push(res.totalprogress)
    
      }
      )
      this.loaded = true;

    }
      );
  }
  chartClicked (e: any): void {
    
   this._router.navigateByUrl("/skillsSpace/Macrosoft/"+this.radarChartLabels[e.active[0].index]);
  
   

}
}
