import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientDashboardComponent } from './patient-dashboard/patient-dashboard.component';
import { HeaderComponent } from './patient-dashboard/header/header.component';
import { SidebarComponent } from './patient-dashboard/sidebar/sidebar.component';
import { DashboadHomeComponent } from './dashboad-home/dashboad-home.component';
import { ViewRecordComponent } from './view-record/view-record.component';
import { RecordComponent } from './record/record.component';
import { RvComponent } from './rv/rv.component';
import { PatientRoutingModule } from './patient-routing.module';
import { FormsModule } from '@angular/forms';
import { UtilsModule } from 'src/utils/utils.module';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    PatientDashboardComponent,
    HeaderComponent,
    SidebarComponent,
    DashboadHomeComponent,
    ViewRecordComponent,
    RecordComponent,
    RvComponent
  ],
  imports: [
    CommonModule, PatientRoutingModule,FormsModule,UtilsModule, HttpClientModule
  ]
})
export class PatientModule { }
