import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  ngOnInit(){
  }
  constructor(public alertController: AlertController) {}

  async roll(dice){
    let sum = await this.randomNumber(dice)
    this.presentAlert(dice, sum)
  }

  async randomNumber(dice){
    let sum = 0
    sum = (1 + Math.floor(Math.random() * dice))          
    return sum
  }

  async presentAlert(setName, result) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: "d" + setName + " roll",
      message: 'The result is: ' + result,
      buttons: ['OK']
    });
    await alert.present();
  }
}