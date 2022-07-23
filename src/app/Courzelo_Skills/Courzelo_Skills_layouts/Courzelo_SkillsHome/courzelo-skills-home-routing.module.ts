import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourzeloSkillsHomeComponent } from './courzelo-skills-home.component';
import { ShowMacroHardSkillsComponent } from '../../Modules/show-macro-hard-skills/show-macro-hard-skills.component';
import { ShowMacroSoftSkillsComponent } from '../../Modules/show-macro-soft-skills/show-macro-soft-skills.component';
import { ShowMicroHardSkillsComponent } from '../../Modules/show-micro-hard-skills/show-micro-hard-skills.component';
import { ShowMicroSoftSkillsComponent } from '../../Modules/show-micro-soft-skills/show-micro-soft-skills.component';
import { InformativePageComponent } from '../../Modules/informative-page/informative-page.component';
const routes: Routes = [
  { path:'', component: CourzeloSkillsHomeComponent,
    children: [     
      { path: '', component: InformativePageComponent },
      { path: 'Macrohard', component: ShowMacroHardSkillsComponent },
      { path: 'Macrohard/:name', component: ShowMicroHardSkillsComponent },
      { path: 'Macrosoft', component: ShowMacroSoftSkillsComponent },
      { path: 'Macrosoft/:name', component: ShowMicroSoftSkillsComponent },
    ] }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourzeloSkillsHomeRoutingModule { }
