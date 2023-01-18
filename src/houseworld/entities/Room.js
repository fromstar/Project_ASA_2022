const Observable =  require('../../utils/Observable');

class Room extends Observable{
    constructor(house,name,light,thermostat, floor, cleaning_time, door, shutter = []){
        super(Room);
        this.house = house;
        this.name = name;
        this.light = light;
        this.shutter = shutter;
        this.thermostat = thermostat;
        this.floor = floor;
        this.cleaning_time = cleaning_time;
        this.doors_to = door;
        this.set('temperature', 18);
    }

    update_temperatue()
    {
        if (this.thermostat.status == true){
            this.temperature += 1;
        } 
        else {
            this.temperature -= 1;
        }
    }
}

module.exports = Room;