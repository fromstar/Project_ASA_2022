const Alarm = require('./Alarm');
const Light = require('./Light');
const Shutter = require('./Shutter');
const Person = require('./Person');
const Room = require('./Room');
const Thermostat = require('./Thermostat');
const FotoPanel = require('./FotoPanel');

class House{
    constructor(){
        this.total_consumption = 0;
        this.people = {
            davide: new Person(this, 'Davide', 'kitchen'),
            elisa: new Person(this, 'Elisa', 'bedroom')
        };

        this.fotopanel = new FotoPanel(this);

        this.alarm = new Alarm(this, false);
        
        this.lights = {
            l_office: new Light(this,'office'),
            l_basement_bath: new Light(this,'basement_bathroom'),
            l_tavern: new Light(this,'tavern'),
            l_entrance: new Light(this,'entrance'),
            l_living_room: new Light(this,'living_room'),
            l_guest_bathroom: new Light(this,'guest_bathroom'),
            l_kitchen: new Light(this,'kitchen'),
            l_dining_room: new Light(this,'dining_room'),
            l_bedroom: new Light(this,'bedroom'),
            l_bedroom_bathroom: new Light(this,'bedroom_bathroom')
        };

        this.shutters = {
            s_entrance: new Shutter(this, 'entrance'),
            s_living_room: new Shutter(this, 'living_room'),
            s_guest_bathroom: new Shutter(this, 'guest_bathroom'),
            s_kitchen: new Shutter(this, 'kitchen'),
            s_dining_room: new Shutter(this, 'dining_room'),
            s_bedroom: new Shutter(this, 'bedroom'),
            s_bedroom_bathroom: new Shutter(this, 'bedroom_bathroom')
        }

        this.thermostats = {
            t_office: new Thermostat(this),
            t_basement_bath: new Thermostat(this),
            t_tavern: new Thermostat(this),
            t_entrance: new Thermostat(this),
            t_living_room: new Thermostat(this),
            t_guest_bathroom: new Thermostat(this),
            t_kitchen: new Thermostat(this),
            t_dining_room: new Thermostat(this),
            t_bedroom: new Thermostat(this),
            t_bedroom_bathroom: new Thermostat(this)
        };

        this.rooms = {
            office: new Room(this,'office',this.lights.l_office, this.thermostats.t_office, 'basement', 40, ['tavern']),
            basement_bath: new Room(this,'basement bathroom',this.lights.l_basement_bath, this.thermostats.t_basement_bath, 'basement', 20, ['tavern']),
            tavern: new Room(this,'tavern',this.lights.l_tavern, this.thermostats.t_tavern, 'basement', 90, ['office', 'basement bathroom']),
            entrance: new Room(this,'entrance',this.lights.l_entrance, this.thermostats.t_entrance, 'ground floor', 60, ['living room', 'guest bathroom', 'kitchen', 'bedroom'],this.shutters.s_entrance),
            living_room: new Room(this,'living room',this.lights.l_living_room, this.thermostats.t_living_room, 'ground floor', 50, ['entrance'],this.shutters.s_living_room),
            guest_bath: new Room(this,'guest bathroom',this.lights.l_guest_bathroom, this.thermostats.t_guest_bathroom, 'ground floor', 30, ['entrance'],this.shutters.s_guest_bathroom),
            kitchen: new Room(this,'kitchen',this.lights.l_kitchen, this.thermostats.t_kitchen, 'ground floor', 20, ['entrance','dining room'],this.shutters.s_kitchen),
            dining_room: new Room(this,'dining room',this.lights.l_dining_room, this.thermostats.t_dining_room, 'ground floor', 30, ['kitchen'],this.shutters.s_dining_room),
            bedroom: new Room(this,'bedroom',this.lights.l_bedroom, this.thermostats.t_bedroom, 'ground floor', 30, ['entrance','bedroom bathroom'],this.shutters.s_bedroom),
            bedroom_bath: new Room(this,'bedroom bathroom',this.lights.l_bedroom_bathroom, this.thermostats.t_bedroom_bathroom, 'ground floor', 20, ['bedroom'],this.shutters.s_bedroom_bathroom)
        };
    }
}

module.exports = House;