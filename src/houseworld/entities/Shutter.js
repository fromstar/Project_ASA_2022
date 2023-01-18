const Observable = require("../../utils/Observable");
const Clock = require("../../utils/Clock");

class Shutter extends Observable{
    constructor(house,room){
        super(Shutter);
        this.house = house;
        this.room = room;
        this.set('status', false);
    }

    turnOn(){
        if(this.status == false)
        {
            this.status = true;
            console.log(Clock.global.hh + ":" + Clock.global.mm + " - Shutters turned on");
        }
    }

    turnOff(){
        if(this.status == true)
        {
            this.status = false;
            console.log(Clock.global.hh + ":" + Clock.global.mm + " - Shutters turned off");
        }
    }
}

module.exports = Shutter;