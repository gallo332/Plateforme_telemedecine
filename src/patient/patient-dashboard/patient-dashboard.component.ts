import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PatientService } from 'src/patient/services/patient.service';

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.sass']
})
export class PatientDashboardComponent implements OnInit {

  isPatient: boolean = false;

  isCollapse: boolean = false;

  checkProgress: boolean = true;
  progressWarn: boolean = false;
  progressMsg: string = 'Checking Patient....';

  constructor(private router: Router,private patientService:PatientService) {
    //TODO
    router.navigate(['/patient/view-record']);
  }

  ngOnInit(): void {
     this.onCheckPatient();
  }

  onCheckPatient() {
    this.checkProgress = true;
    this.progressWarn = false;
    this.progressMsg = 'Checking Patient....';

    var count = 0;

    let checkPt = setInterval(() => {
      this.patientService.checkisPt();
      if (this.patientService.checkComplete) {
        if (this.patientService.isPatient) {
          this.isPatient = true;
        } else {
          this.progressWarn = true;
          this.progressMsg = 'Only Patients have acess to this page...';
        }
        clearInterval(checkPt);
      }

      if (count >= 50) {
        clearInterval(checkPt);
      }
      count++;
    }, 1000);
  }
}
