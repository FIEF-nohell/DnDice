import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page  implements OnInit{

  ngOnInit(){
    this.storage.create()
    this.readFromStorage()
  }

  ionViewDidEnter(){
    this.storage.create()
    this.readFromStorage()
  }

  constructor(public alertController: AlertController, public storage: Storage) {}

  diceSet: Array<any> = []
  bigSetArray: Array<any> = []
  clearArray: Array<any> = []
  saveName: string = ""
  d4 = 0
  d6 = 0
  d8 = 0
  d10 = 0
  d12 = 0
  d20 = 0
  d100 = 0

  addDice(DiceNumber){
    switch(DiceNumber){
      case 4:
      this.d4++
      break
      case 6:
      this.d6++
      break
      case 8:
      this.d8++
      break
      case 10:
      this.d10++
      break
      case 12:
      this.d12++
      break
      case 20:
      this.d20++
      break
      case 100:
      this.d100++
      break
    }
  }

  removeDice(DiceNumber){
    switch(DiceNumber){
      case 4:
      this.d4--
      break
      case 6:
      this.d6--
      break
      case 8:
      this.d8--
      break
      case 10:
      this.d10--
      break
      case 12:
      this.d12--
      break
      case 20:
      this.d20--
      break
      case 100:
      this.d100--
      break
    }
  }

  saveDiceSet(){
    if(this.saveName.length < 2){
      this.presentAlert()
    }
    else{
      this.diceSet.push(this.saveName)
      this.diceSet.push(this.d100)
      this.diceSet.push(this.d20)
      this.diceSet.push(this.d12)
      this.diceSet.push(this.d10)
      this.diceSet.push(this.d8)
      this.diceSet.push(this.d6)
      this.diceSet.push(this.d4)
      let now = new Date()
      this.diceSet.push(now.getTime())
      this.d4 = 0
      this.d6 = 0
      this.d8 = 0
      this.d10 = 0
      this.d12 = 0
      this.d20 = 0
      this.d100 = 0
      this.saveName = ""
      this.bigSetArray.push(this.diceSet)
      this.diceSet = null
      this.diceSet = []
      this.writeToStorage()
      }    
  }

  writeToStorage(){
    try{
      this.storage.set("set", this.bigSetArray)
    }
    catch{
    }
  }

  clearStorage(){
    try{
      this.storage.set("set", this.clearArray)
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

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      message: 'Please enter a name with at least 2 letters.',
      buttons: ['OK']
    });
    await alert.present();
  }

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

  async rollSet(set){
    let sum = await this.decodeSet(set)
    this.presentResult(set[0], sum)
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

  async presentResult(setName, result) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: setName,
      message: 'The result is: ' + result,
      buttons: ['OK']
    });
    await alert.present();
  }

}
