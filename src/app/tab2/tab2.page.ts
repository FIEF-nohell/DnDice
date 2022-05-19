import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  ngOnInit(){
    this.storage.create()
    this.readFromStorage()
  }

  ionViewDidEnter(){
    this.storage.create()
    this.readFromStorage()
  }

  constructor(public alertController: AlertController, public storage: Storage) {}

  bigSetArray: Array<any> = []

  deleteSet(set){
    let counter = 0
    let index = 0
    this.bigSetArray.forEach(subset => {
      if(subset[8] == set[8]){
        index = counter
      }
      else{
        counter++
      }
    });
    if (index > -1) {
      this.bigSetArray.splice(index, 1);
    }
    this.writeToStorage()
  }

  writeToStorage(){
    try{
      this.storage.set("set", this.bigSetArray)
    }
    catch{
    }
  }

  readFromStorage(){
    try{
      this.storage.get("set").then((bigSetArray) => {
        if(bigSetArray != null){
          this.bigSetArray = bigSetArray
        }
      })
    }
    catch{
    }
  }

  async rollSet(set){
    let sum = await this.decodeSet(set)
    this.presentAlert(set[0], sum)
  }

  async decodeSet(set){
    let sum = 0
    if(set[1] != 0){
      for(let i = 0; i < set[1]; i++) sum = sum + (1 + Math.floor(Math.random() * 100))      
    }
    if(set[2] != 0){
      for(let i = 0; i < set[2]; i++) sum = sum + (1 + Math.floor(Math.random() * 20))
    }
    if(set[3] != 0){
      for(let i = 0; i < set[3]; i++) sum = sum + (1 + Math.floor(Math.random() * 12))
    }
    if(set[4] != 0){
      for(let i = 0; i < set[4]; i++) sum = sum + (1 + Math.floor(Math.random() * 10))
    }
    if(set[5] != 0){
      for(let i = 0; i < set[5]; i++) sum = sum + (1 + Math.floor(Math.random() * 8))
    }
    if(set[6] != 0){
      for(let i = 0; i < set[6]; i++) sum = sum + (1 + Math.floor(Math.random() * 6))
    }
    if(set[7] != 0){
      for(let i = 0; i < set[7]; i++) sum = sum + (1 + Math.floor(Math.random() * 4))
    }
    return sum
  }

  async presentAlert(setName, result) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: setName,
      message: 'The result is: ' + result,
      buttons: ['OK']
    });
    await alert.present();
  }
}