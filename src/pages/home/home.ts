import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { CreateContractPage } from '../create-contract/create-contract';
import { Web3Provider } from '../../providers/web3/web3';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public contractAddress: String;
  public web3: any;
  public haveContract: Boolean = false;
  public numOfCandidates = 0;
  public numOfVoters = 0;
  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public web3provider: Web3Provider) {
    this.web3 = web3provider.get();
  }

  createContract() {
    // this.navCtrl.push(CreateContractPage);
    let chooseModal = this.modalCtrl.create(CreateContractPage);
    chooseModal.present();
    chooseModal.onDidDismiss(data => {
      console.log(data);
      this.contractAddress = data;
      this.haveContract = true;
      this.setContractData();
    });
  }

  setContractData() {
      this.haveContract = true;
      let contract = this.web3.eth.contract([{"constant":true,"inputs":[],"name":"getCandidateCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":true,"inputs":[],"name":"getNumOfVoters","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteCandidate","outputs":[],"payable":false,"type":"function","stateMutability":"nonpayable"},{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"getCandidateVotes","outputs":[{"name":"","type":"bytes32"},{"name":"","type":"uint256"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":true,"inputs":[],"name":"getSenderVoteCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function","stateMutability":"view"},{"inputs":[{"name":"_candidateNames","type":"bytes32[]"}],"payable":false,"type":"constructor","stateMutability":"nonpayable"},{"anonymous":false,"inputs":[{"indexed":false,"name":"","type":"address"},{"indexed":false,"name":"","type":"bytes32"},{"indexed":false,"name":"","type":"uint256"},{"indexed":false,"name":"","type":"uint256"}],"name":"Voted","type":"event"}]);
      let contractInfo = contract.at(this.contractAddress);
      console.log(contractInfo);
      contractInfo.getCandidateCount((err, response) => {
        if (err) return console.log(err);
        console.log(response.c[0]);
        this.numOfCandidates = response.c[0];
      });

      contractInfo.getNumOfVoters((err, res) => {
        if (err) return console.log(err)
        this.numOfVoters = res.c[0];
      })
  }
  
}
