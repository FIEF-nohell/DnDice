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
    this.readFromStorage()
  }

  constructor(public alertController: AlertController, public storage: Storage) {}

  diceSet: Array<any> = []
  bigSetArray: Array<any> = []
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
      this.d4 = 0
      this.d6 = 0
      this.d8 = 0
      this.d10 = 0
      this.d12 = 0
      this.d20 = 0
      this.d100 = 0
      this.saveName = ""
      console.log(this.diceSet)
      this.bigSetArray.push(this.diceSet)
      this.diceSet = null
      this.diceSet = []
      this.writeToStorage()
      }    
  }

  writeToStorage(){
    try{
      this.storage.set("set", this.bigSetArray)
      console.log("saved data to device")
    }
    catch{
      console.log("error saving data to device")
    }
    this.storage.set("set", this.bigSetArray)
  }

  readFromStorage(){
    try{
      this.storage.get("set").then((bigSetArray) => {
        this.bigSetArray = bigSetArray
      })
      console.log("fetched data from device")
    }
    catch{
      console.log("error fetching data from device")
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

}
