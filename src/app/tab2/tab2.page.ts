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

  readFromStorage(){
    try{
      this.storage.get("set").then((bigSetArray) => {
        if(bigSetArray != null){
          this.bigSetArray = bigSetArray
          console.log(bigSetArray)
        }
      })
      console.log("fetched data from device")
    }
    catch{
      console.log("error fetching data from device")
    }
  }

}
