import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BlockchainService } from 'src/services/blockchain.service';
import { IpfsService } from 'src/services/ipfs.service';
import { rejects } from 'assert';
import { resolve } from 'dns';
import { exit } from 'process';
import { from, Observable } from 'rxjs';
import Web3 from 'web3';
import { JsonPipe } from '@angular/common';

const Contract = require('../../../build/contracts/Contract.json');

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  abi: any = {};
  netWorkData: any = {};
  netId: any;
  address: any;
  web3: any;
  contract: any;
  account: any;

  ipfs: any;

  msg_text: string = '';

  result: any;

  Patients: any;

  PatientDetails: string[] = [];

  PtInfoload: boolean = false;

  // addprogress:boolean = false;
  // added:boolean = false
  // failed:boolean = false

  constructor(
    private blockchainService: BlockchainService,
    private ipfsService:IpfsService,
    private http:HttpClient
   ) 
  //  {
  //   this.web3 = blockchainService.getWeb3();

  //   this.contract = blockchainService.getContract();
    
  //   this.getAcccount();

  //   this.ipfs = ipfsService.getIPFS();
  // }
    {
        this.web3 = blockchainService.getWeb3();

        this.web3.eth.getAccounts((err: any, accs: any) => {
        this.account = accs[0];
        });

        this.web3.eth.net.getId().then((r: number) => {
          this.netId = r;
          this.abi = Contract.abi;
          this.netWorkData = Contract.networks[this.netId];
    
          console.log(this.netWorkData);
    
          if (this.netWorkData) {
            this.address = this.netWorkData.address;
            this.contract = this.web3.eth.Contract(this.abi, this.address);
    
            console.log(this.contract.methods.getAdmin.call());
            this.Patients = this.contract.methods.getAllPts
              .call()
              .then((docs: string[]) => {
                this.Patients = docs;
                console.log(this.Patients);
              });
            console.log('Patients', this.Patients);
          } else {
            console.log('Contract not Deployed');
          }
        });
    
        //IPFS
        this.ipfs = ipfsService.getIPFS();
      }
    
      getPts(): Promise<any> {
        return new Promise((resolve, rejects) => {
          this.blockchainService.getContract().then((contract: any) => {
            this.Patients = contract.methods.getAllDrs()
              .call()
              .then((docs: any) => {
                this.Patients = docs;
                console.log(this.Patients);
                resolve(this.Patients)
              });
          })
    
        })
      }
    
      getPatientDetails(ptID: any): Promise<any> {
        console.log('PtID', ptID);
        return new Promise((resolve, reject) => {
          this.blockchainService.getContract().then((contract: any) => {
            contract.methods
              .getPt(ptID)
              .call()
              .then((ipfsHash: string) => {
                console.log(ipfsHash);
                this.http.get('https://ipfs.infura.io/ipfs/' + ipfsHash)
                  .subscribe((data: any) => {
                    console.log(data);
                    resolve(data);
                  });
              });
          })
    
        })
      }
  // addPatient(pat_id: any, data: any) {
  //   console.log("adding Patient");
  //   this.contract = this.blockchainService.getContract()

  //   this.ipfs.addJSON(data).then((IPFSHash: any) => {
  //     console.log("IPFS hash : ",IPFSHash);
  //     this.contract.methods
  //       .addPatInfo(pat_id, IPFSHash)
  //       .send({ from: this.account })
  //       .on("confirmation",(result: any) => {
  //         console.log("result",result);
  //         if(result){
  //           this.addprogress = true
  //           this.added = true
  //         }
  //       })
  //       .catch((err: any) => {
  //         console.log("error",err);
  //         this.addprogress = true
  //         this.added = false
  //         this.failed = true
  //       });
  //   });
  // }

  // getAcccount() {
  //   console.log('geting Account...');
  //   let getacc = setInterval(() => {
  //     this.account = this.blockchainService.getAccount();
  //     if (this.account != null) {
  //       clearInterval(getacc);
  //       return this.account;
  //     }
  //   }, 1000);
  // }
}
