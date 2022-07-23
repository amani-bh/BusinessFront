import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { TokenStorageService } from 'src/app/Courzelo_Core/Shared/Service/token-storage.service';
import { SkillsService } from '../../Shared/Services/Skills.service';

@Component({
  selector: 'app-show-macro-hard-skills',
  templateUrl: './show-macro-hard-skills.component.html',
  styleUrls: ['./show-macro-hard-skills.component.css']
})
export class ShowMacroHardSkillsComponent implements OnInit {
  
   name:string[]=[];
  nb:number[]=[];
  currentUser: any;
loaded = false;//puisque sub est en asyn donc on attend les données des qu'ils sont chargés ,loaded=true pour les envoyer vers le html
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
      backgroundColor: 'rgba(44,66,89, 0.5)',
      borderColor: '#1f3e5e',
      pointBackgroundColor: '#1f3e5e',
      
     },

    ]
  };
  

  constructor(private _router:Router, private skillservice : SkillsService,private token: TokenStorageService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    console.log(this.currentUser)
      this.skillservice.GetMacrohardskills().subscribe(data=>{
     
        data.map(res=>{this.name.push(res.name)
        this.nb.push(res.totalprogress)
      
    
      }
        )
        this.loaded=true;
        

      }
      
      
        );
  }
  chartClicked (e: any): void {
    
    this._router.navigateByUrl("/skillsSpace/Macrohard/"+this.radarChartLabels[e.active[0].index]);
    
    
 
 }

 

 

}
