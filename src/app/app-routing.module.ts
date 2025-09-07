import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AgentComponent } from './agent/agent.component';

const routes: Routes = [
  {path : 'admin', component:AdminComponent},
  {path : 'agent', component:AgentComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
