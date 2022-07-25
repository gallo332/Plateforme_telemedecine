import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboadHomeComponent } from './dashboad-home/dashboad-home.component';
import { PatientDashboardComponent } from './patient-dashboard/patient-dashboard.component';
import { RvComponent } from './rv/rv.component';
import { ViewRecordComponent } from './view-record/view-record.component';

const routes: Routes = [
  {
    path: '',
    component: PatientDashboardComponent,
    children: [
      { path: 'patient-dashboard', component: DashboadHomeComponent },
      {path:'view-record',component:ViewRecordComponent},
      { path: 'rv', component: RvComponent }
    ],
  },
  {
    path: '',
    component: PatientDashboardComponent,
    redirectTo: 'patient/rv',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientRoutingModule {}
