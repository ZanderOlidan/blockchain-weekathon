import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import Web3 from 'web3';

/*
  Generated class for the Web3Provider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class Web3Provider {

  private web3: Web3;
  constructor(public http: Http) {
    console.log('Hello Web3Provider Provider');
    // if (typeof this.localweb3 !== 'undefined') {
    //   this.localweb3 = new Web3(this.localweb3.currentProvider);
    // } else {
    //   this.localweb3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    // }

    // this.localweb3.eth.defaultAccount = this.localweb3.eth.accounts[0];
    
    if (typeof this.web3 !== 'undefined') {
      this.web3 = new Web3(this.web3.currentProvider);
    } else {
      this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }

    this.web3.eth.defaultAccount = this.web3.eth.accounts[0];
    console.log(this.web3);
  }

  get() {
    return this.web3;
  }


}
