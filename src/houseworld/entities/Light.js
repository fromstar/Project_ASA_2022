const Observable =  require('../../utils/Observable');
const Clock =  require('../../utils/Clock');

class Light extends Observable{
    constructor(house,room){
    super(Light)
    this.house = house;
    this.room = room;
    this.start_hh = 0;
    this.start_mm = 0;
    this.consumption = 10;
    this.set('status', false);
    }

    turnOn(){
        if (this.status == false){
            this.start_hh = Clock.global.hh;
            this.start_mm = Clock.global.mm;
            this.status = true;
            console.log(this.start_hh + ":" + this.start_mm + " - Light turned on in " + this.room);
        }
    }

    turnOff(){
        if (this.status == true){
            this.status = false;
            console.log(Clock.global.hh + ":" + Clock.global.mm + " - Light turned off in " + this.room);
        }
    }

    energyConsumption(){
        if(this.status == true){
            var time_hh = Clock.global.hh - this.start_hh;
            var time_mm = 0;
            if(Clock.global.hh > this.start_hh){
                time_mm = 60 - this.start_mm + Clock.global.mm;
            } else {
                time_mm = Clock.global.mm - this.start_mm;
            }
            this.house.total_consumption += this.consumption*time_hh + ((this.consumption/60)*time_mm);

            this.start_hh = Clock.global.hh;
            this.start_mm = Clock.global.mm;
        }
    }
}

module.exports = Light;