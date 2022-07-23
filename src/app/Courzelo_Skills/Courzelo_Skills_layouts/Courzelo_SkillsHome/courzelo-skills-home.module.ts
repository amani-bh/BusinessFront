import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourzeloSkillsHomeRoutingModule } from './courzelo-skills-home-routing.module';
import { CourzeloSkillsHomeComponent } from './courzelo-skills-home.component';
import { RouterModule } from '@angular/router';
import { SharedSkillsModule } from '../../Shared/shared-skills.module';
import { ShowMacroHardSkillsComponent } from '../../Modules/show-macro-hard-skills/show-macro-hard-skills.component';
import { ShowMacroSoftSkillsComponent } from '../../Modules/show-macro-soft-skills/show-macro-soft-skills.component';
import { ShowMicroHardSkillsComponent } from '../../Modules/show-micro-hard-skills/show-micro-hard-skills.component';
import { ShowMicroSoftSkillsComponent } from '../../Modules/show-micro-soft-skills/show-micro-soft-skills.component';
import { NgChartsModule } from 'ng2-charts';
import { InformativePageComponent } from '../../Modules/informative-page/informative-page.component';
import { HttpClientModule } from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatListModule} from '@angular/material/list';

@NgModule({
  declarations: [
    CourzeloSkillsHomeComponent,
    ShowMacroHardSkillsComponent,
    ShowMacroSoftSkillsComponent,
    ShowMicroHardSkillsComponent,
    InformativePageComponent,
    ShowMicroSoftSkillsComponent,
  ],
  imports: [
    CommonModule,
    CourzeloSkillsHomeRoutingModule,
    RouterModule,
    SharedSkillsModule,
    NgChartsModule,
    HttpClientModule,
    MatCardModule,
    MatGridListModule,
    MatListModule,
  ],
  exports:[
    CourzeloSkillsHomeComponent
  ]
})
export class CourzeloSkillsHomeModule { }
