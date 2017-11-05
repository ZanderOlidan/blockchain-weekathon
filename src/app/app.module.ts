import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';

import { TallyPage } from '../pages/tally/tally';
import { HomePage } from '../pages/home/home';
import { CreateContractPage } from '../pages/create-contract/create-contract';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Web3Provider } from '../providers/web3/web3';

@NgModule({
  declarations: [
    MyApp,
    TallyPage,    
    HomePage,
    CreateContractPage ,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TallyPage,    
    HomePage,
    CreateContractPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Web3Provider
  ]
})
export class AppModule {}
