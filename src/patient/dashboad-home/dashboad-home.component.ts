import { Component, OnInit } from '@angular/core';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-dashboad-home',
  templateUrl: './dashboad-home.component.html',
  styleUrls: ['./dashboad-home.component.sass']
})
export class DashboadHomeComponent implements OnInit {

  PatientDetails: any = {
    ptID: '',
    fName: 'First Name',
    lName: 'Last Name',
    mobile: '123456789',
    ville: 'ville',
    etat: 'etat',
    speciality: 'speciality',
    
  };

  constructor(private patientService: PatientService) {
    this.PatientDetails = [];
  }

  ngOnInit(): void {
    // this.check();
    setTimeout(()=>{
      this.getPatientDetails()
    },3000)
    
  }

  async getPatientDetails(){
    this.patientService.getPatient().then((data:any) =>{
      
      this.PatientDetails = JSON.parse(data)
    })
  }

}
