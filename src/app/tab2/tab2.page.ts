import { Component, OnInit } from '@angular/core';
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

  constructor(public storage: Storage) {}

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
}