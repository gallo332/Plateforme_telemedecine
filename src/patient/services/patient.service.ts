import { Injectable } from '@angular/core';
import { rejects } from 'assert';
import { resolve } from 'dns';
import { Observable } from 'rxjs';
import { BlockchainService } from 'src/services/blockchain.service';
import { IpfsService } from 'src/services/ipfs.service';


@Injectable({
  providedIn: 'root'
})
export class PatientService {

  web3: any;
  contract: any;
  account: any;

  isPatient: boolean = false;
  Patients: any = [];
  checkComplete: boolean = false;

  // DoctorDetails: any = {};

  PatientDetails: any = {};
  patientId: string = '';

  ipfs: any;

  constructor(
    private blockchainService: BlockchainService,
    private ipfsService: IpfsService
  ) {
    this.web3 = blockchainService.getWeb3();
    this.contract = blockchainService.getContract();
    this.account = blockchainService.getAccount();

    this.ipfs = ipfsService.getIPFS();
  }

  checkisPt() {
    this.contract = this.blockchainService.contract;
    console.log(this.contract);

    this.account = this.blockchainService.account;
    console.log(this.account);

    this.contract.methods
      .getAllPts()
      .call()
      .then((result: any) => {
        console.log(result);
        this.Patients = result;
        if (this.Patients.length >= 0) {
          for (var i = 0; i <= this.Patients.length; i++) {
            if (this.Patients[i] == this.account) {
              this.isPatient = true;
            }
          }
        }
        this.checkComplete = true;
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  async getPatient(): Promise<any> {
    this.contract = this.blockchainService.contract;
    return new Promise((resolve, reject) => {
      this.contract.methods
        .getPt(this.account)
        .call()
        .then(async (result: any) => {
          console.log(result);
          await this.ipfs.cat(result).then((data: any) => {
            this.PatientDetails = data;
            resolve(this.PatientDetails);
            JSON.parse(this.PatientDetails);
            return this.PatientDetails;
          });
        });
    });
  }

  async checkIsPatient(id: string): Promise<any> {
    this.patientId = id;
    return new Promise((resolve, reject) => {
      this.contract.methods
        .isPat(id)
        .call()
        .then((result: any) => {
          console.log(result);
          resolve(result);
        })
        .catch((err: any) => {
          console.log(err);
          reject(err);
        });
    });
  }

  async getPatientDetails(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.contract.methods
        .getPatInfo(id)
        .call()
        .then((result: any) => {
          console.log(result);
          this.ipfs.cat(result).then((data: any) => {
            console.log(data);
            resolve(data);
          });
        })
        .catch((err: any) => {
          console.log(err);
          reject(err);
        });
    });
  }

  async getPatientRecords(id: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.contract.methods
        .viewMedRec(id)
        .call()
        .then((result: any) => {
          console.log(result);
          if (result.length >= 1) {
            this.ipfs
              .cat(result)
              .then((record: any) => {
                console.log(JSON.parse(record));
                resolve(JSON.parse(record));
              })
              .catch((err: any) => {
                console.log(err);
                reject(err);
              });
          }
          else{
            resolve(null)
          }
        })
        .catch((err: any) => {
          console.log(err);
          reject(err);
        });
    });
  }
}
