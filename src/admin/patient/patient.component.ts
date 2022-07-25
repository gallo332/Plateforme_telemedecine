import { Component, OnInit } from '@angular/core';
import { NgxImageCompressService } from 'ngx-image-compress';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.sass'],
})
export class PatientComponent implements OnInit {
  model: any = {
    patID: '',
    fName: 'prénom',
    lName: 'nom',
    phone: '123456789',
    city: 'ville',
    state: 'état',
  };

  show: boolean = false;
  msg_text: string = '';
  warn: boolean = false;
  success:boolean = false

  ipfs: any;

  constructor(private patientService: PatientService) {}

  ngOnInit(): void {
    this.ipfs=this.patientService.ipfs
  }
  onSubmit() {
    this.show = true;
    this.msg_text = 'Adding Patient to the Network....';
    this.warn = false;

    // this.model.imageHash = this.image_url;
    // add doctor
    // await this.doctorService.addDoctor(this.model, this.model.docID);

    let data = this.model;

    this.ipfs.addJSON(data).then((IPFShash: string) => {
      console.log(IPFShash);
      this.msg_text = 'Data added to IPFS...';
      //add data to blockchain
      this.patientService.contract.methods
        .addPtInfo(this.model.patID, IPFShash)
        .send({ from: this.patientService.account })
        .on("confirmation",(result: any) => {
          console.log('result', result);
          if (result == 1) {
            this.msg_text += '<br>User Added to the Blockchain';
            console.log('User added Successfully');
            this.success = true
            this.model = {};
            return result;
          } else {
            this.warn = !this.warn;
            this.msg_text = this.patientService.msg_text;
            console.log(result);
            return result;
          }
        })
        .catch((err: any) => {
          this.warn = !this.warn;
          this.msg_text =
            'Adding Patient Failed<br> <small class="fw-light text-danger"><b>"</b>' +
            this.model.docID +
            '<b>"</b></small><br>1.not a valid address or <br>2.Already have a role';
          console.log(err);
          return err;
        });
    });
  }
  // onSubmit() {
  //   this.show = true
  //   this.msg_text = "Ajouter Patient au réseau..."
  //   console.log(this.model);
  //   this.checkAddProgress()
  //   this.patientService.addPatient(this.model.patID, this.model);
  // }

  // checkAddProgress(){
  //   console.log("Checking progress");
    
  //   let checkProgress = setInterval(() => {
  //     if(this.patientService.added){
  //       this.msg_text = "Patient ajouté au réseau"
  //       this.success = true
  //       clearInterval(checkProgress)
  //     }
  //     if(this.patientService.failed){
  //       this.warn = true
  //       this.msg_text = "Patient adding Failed"
  //       clearInterval(checkProgress)
  //     }
  //   },500)
  // }

  onClose() {
    this.show = false
    this.warn = false
  }
}
