const Observable = require('../../utils/Observable');
const Clock =  require('../../utils/Clock');

class Alarm extends Observable{
    constructor(house, status){
        super(Alarm)
        this.house = house;
        this.status = status;
        this.start_hh = 0;
        this.start_mm = 0;
        this.consumption = 30;
        this.set("alarm", false);
    }
    
    turnOn(){
        if(this.status == false){
            this.status = true;
            console.log(Clock.global.hh + ":" + Clock.global.mm + " - System alarm turned on");
        }
    }
    turnOff(){
        if(this.status == true && this.alarm == false){
            this.status = false;
            console.log(Clock.global.hh + ":" + Clock.global.mm + " - System alarm turned off");
        }
    }
    alarmOn(){
        if(this.status == ture && this.alarm == false){
            this.status = true;
            console.log(Clock.global.hh + ":" + Clock.global.mm + " - Alarm turned on");
        }

    }
    alarmOff(){
        if(this.status == ture && this.alarm == true){
            this.status = false;
            console.log(Clock.global.hh + ":" + Clock.global.mm + " - Alarm turned off");
        }
    }

    energyConsumption(Clock){
        if (this.status){
            var time_h = Clock.global.hh - this.start_hh;
            var time_m = 0;
            if (Clock.global.hh > this.start_hh){
                time_m = 60 - this.start_mm + Clock.global.mm;
            } else {
                time_m = Clock.global.mm - this.start_mm;
            }
            this.house.utilities.electricity.consumption += this.consumption*time_h + ((this.consumption/60)*time_m);

            this.start_hh = Clock.global.hh;
            this.start_mm = Clock.global.mm;
        }
    }   
}

module.exports = Alarm;