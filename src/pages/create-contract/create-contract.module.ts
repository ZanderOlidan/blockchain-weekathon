import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateContractPage } from './create-contract';

@NgModule({
  declarations: [
    CreateContractPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateContractPage),
  ],
})
export class CreateContractPageModule {}
