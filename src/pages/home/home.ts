import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { CreateContractPage } from '../create-contract/create-contract';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {
  }

  createContract() {
    // this.navCtrl.push(CreateContractPage);
    let chooseModal = this.modalCtrl.create(CreateContractPage);
    chooseModal.onDidDismiss(data => {
      console.log(data);
    });
    chooseModal.present();
  }
}
