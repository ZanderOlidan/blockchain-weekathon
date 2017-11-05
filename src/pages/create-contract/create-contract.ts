import { Component } from '@angular/core';
import { ViewController, LoadingController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { Web3Provider } from '../../providers/web3/web3';

/**
 * Generated class for the CreateContractPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-contract',
  templateUrl: 'create-contract.html',
})
export class CreateContractPage {
  public name: String;
  public candidates : Array<String>;
  public web3: any;
  public contractAddress: String = "";
  public addressSet = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public view: ViewController, public loadingCtrl: LoadingController, public web3service:Web3Provider) {
    this.candidates = new Array<String>();
    this.web3 = web3service.get();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreatePage');
  }

  addCandidate() {
    this.candidates.push(this.name);
    console.log("Candidates: " + this.candidates);
    console.log(this.candidates);
    this.name = "";
  }

  done() {

    let loading = this.loadingCtrl.create({
      content: 'Please wait while we mine the contract'
    });
    let contractAddress = this.contractAddress;

    loading.present();

    // Create the contract here

    var _candidateNames = this.candidates;
    var contract = this.web3.eth.contract([{"constant":true,"inputs":[],"name":"getCandidateCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":true,"inputs":[],"name":"getNumOfVoters","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteCandidate","outputs":[],"payable":false,"type":"function","stateMutability":"nonpayable"},{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"getCandidateVotes","outputs":[{"name":"","type":"bytes32"},{"name":"","type":"uint256"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":true,"inputs":[],"name":"getSenderVoteCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function","stateMutability":"view"},{"inputs":[{"name":"_candidateNames","type":"bytes32[]"}],"payable":false,"type":"constructor","stateMutability":"nonpayable"},{"anonymous":false,"inputs":[{"indexed":false,"name":"","type":"address"},{"indexed":false,"name":"","type":"bytes32"},{"indexed":false,"name":"","type":"uint256"},{"indexed":false,"name":"","type":"uint256"}],"name":"Voted","type":"event"}]);
    var contractInstance = contract.new(
       _candidateNames,
       {
         from: this.web3.eth.accounts[0], 
         data: '0x6060604052341561000f57600080fd5b60405161050f38038061050f833981016040528080518201919050505b806001908051906020019061004292919061008b565b5033600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b50610103565b8280548282559060005260206000209081019282156100cd579160200282015b828111156100cc5782518290600019169055916020019190600101906100ab565b5b5090506100da91906100de565b5090565b61010091905b808211156100fc5760008160009055506001016100e4565b5090565b90565b6103fd806101126000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806330a563471461006a57806365fc783c14610093578063831b7503146100bc578063a656234f146100e3578063d04ff2b11461012d575b600080fd5b341561007557600080fd5b61007d610156565b6040518082815260200191505060405180910390f35b341561009e57600080fd5b6100a6610164565b6040518082815260200191505060405180910390f35b34156100c757600080fd5b6100e160048080356000191690602001909190505061016f565b005b34156100ee57600080fd5b6101086004808035600019169060200190919050506102e3565b6040518083600019166000191681526020018281526020019250505060405180910390f35b341561013857600080fd5b610140610389565b6040518082815260200191505060405180910390f35b600060018054905090505b90565b600060045490505b90565b600160008083600019166000191681526020019081526020016000206001016000828254019250508190555080600080836000191660001916815260200190815260200160002060000181600019169055506001600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254019250508190555060016004600082825401925050819055507fdaf7488030e3c397e3ccb09e585d2b51afb0b3c477c5c2e392ee6ebcbecdf37033600080846000191660001916815260200190815260200160002060000154600080856000191660001916815260200190815260200160002060010154600454604051808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001846000191660001916815260200183815260200182815260200194505050505060405180910390a15b50565b600080600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561034257600080fd5b600080846000191660001916815260200190815260200160002060000154600080856000191660001916815260200190815260200160002060010154915091505b5b915091565b6000600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490505b905600a165627a7a72305820a87697d69dab4ac971cf31cb92579fc161ed3fc9e50026821e5dad31debaf4ec0029', 
         gas: '4700000'
       }, function (e, contract){
        console.log(e, contract);
        if (typeof contract.address !== 'undefined') {
             console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
             loading.dismiss();
            console.log(contractInstance);
        }
     });
    this.addressSet = true;
  }

  goBack() {
     this.view.dismiss();
  }
}
