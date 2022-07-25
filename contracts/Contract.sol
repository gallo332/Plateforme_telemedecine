// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
//pragma experimental pragma abicoder v2;

import './Roles.sol';

contract Contract{

    using Roles for Roles.Role;

    Roles.Role private admin;
    Roles.Role private doctor;
    Roles.Role private patient;

    struct Doctor{
        string drHash;
    }

    struct Patient{
        string patHash;
    }

    struct MedRec{
        string RecordHash;
    }

    mapping(address => Doctor) Doctors;
    mapping(address => Patient) Patients;
    mapping(address => MedRec) Records;

    address[] public Dr_ids;
    address[] public Patient_ids;
    string[] public RecordHashes;

    address accountId;
    address admin_id;
    address doctor_id;
    address get_patient_id;
    address get_dr_id;

     constructor() {
        admin_id = msg.sender;
        admin.add(admin_id);
        doctor_id = msg.sender;
        doctor.add(doctor_id);
    }

    //get Admin

    function getAdmin() public view returns(address){
        return admin_id;
    }


    //Add Doctor

    function addDoctor(address _newdr) public{
        require(admin.has(msg.sender), 'Only For Admin'); 
        doctor.add(_newdr);
    }

    function addDrInfo(address dr_id,string memory _drInfo_hash) public{
        require(admin.has(msg.sender),'Only For Admin');

        Doctor storage drInfo = Doctors[msg.sender];
        drInfo.drHash = _drInfo_hash;
        Dr_ids.push(msg.sender);

        doctor.add(dr_id);
    }

    function getAllDrs() public view returns(address[] memory){
        return Dr_ids;
    }

    function getDr(address _id) public view returns(string memory){
        return (Doctors[_id].drHash);
    }
    //add patient

     function addPatient(address _newdr) public{
        require(admin.has(msg.sender), 'Only For Admin'); 
        patient.add(_newdr);
    }

    function addPtInfo(address pt_id,string memory _ptInfo_hash) public{
        require(admin.has(msg.sender),'Only For Admin');

        Patient storage ptInfo = Patients[msg.sender];
        ptInfo.patHash = _ptInfo_hash;
        Patient_ids.push(msg.sender);

        patient.add(pt_id);
    }

     function getAllPts() public view returns(address[] memory){
        return Patient_ids;
    }

    function getPt(address _id) public view returns(string memory){
        return (Patients[_id].patHash);
    }

   // check is Doctor

    function isDr(address id) public view returns(string memory){
        require(doctor.has(id), "Only for Doctors");
        return "1";
    }

    // Check is Patient

    function isPat(address id) public view returns(string memory){
        require(patient.has(id), "Only for Doctors");
        return "1";
    }

   

    // View Medical record return IPFS hash of record
    
    function viewMedRec(address id)public view returns(string memory){
        return (Records[id].RecordHash);
    }

    /*
        Modifiers
    */


    modifier onlyAdmin(){
        require(admin.has(msg.sender) == true, 'Only Admin Can Do That');
        _;
    }
    modifier onlyDoctor(){
        require(doctor.has(msg.sender) == true, 'Only Doctor Can Do That');
        _;
    }
    modifier onlyPatient(){
        require(patient.has(msg.sender) == true, 'Only Admin Can Do That');
        _;
    }

}