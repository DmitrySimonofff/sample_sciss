import { makeAutoObservable } from "mobx";

class homeState {

  selectedHand = null;
  rightHand = null;
  changed = false;
  rightSpeed = 3000;

  constructor() {
    makeAutoObservable(this);
  }

  changeSelectedHand(value) {   
    this.selectedHand = value;
  }
  changeRightHand(value) {   
    this.rightHand = value;
  }
  changeSpeed(s) {   
    this.rightSpeed = s;
  }
  changeChanged(status) {   
    this.changed = status;
  }

  get changedStatus() {
    return this.changed;
  }
  get selHand() {
    return this.selectedHand;
  }
  get rHand() {
    return this.rightHand;
  }
  get speed() {
    return this.rightSpeed;
  }

}

export default new homeState();
