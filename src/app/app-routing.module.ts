import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { PlannerViwerComponent } from './content/photoViwer/planner-viwer/planner-viwer.component';

const routes: Routes = [
  {
    path:'',
    component:AboutComponent
  },
  {
    path:'about',
    component:AboutComponent
  }
 ,{
    path:'planner_viwer',
    component:PlannerViwerComponent
  }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
