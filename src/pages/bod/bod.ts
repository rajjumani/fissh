import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import {MyModal} from '../modal/modal';

@Component({
  selector: 'page-bod',
  templateUrl: 'bod.html'
})
export class BodPage {

  constructor(public modalCtrl: ModalController) {
  }
  presentModal() {
    let myModal = this.modalCtrl.create(MyModal);
    myModal.present();
  }
}