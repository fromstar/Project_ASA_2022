const House = require('./entities/House');
const Clock = require('../utils/Clock');
const Agent = require('../bdi/Agent');
const Goal = require('../bdi/Goal');
const Intention = require('../bdi/Intention');
const PlanningGoal = require('../pddl/PlanningGoal');
const {SensorMovementGoal, SensorMovementIntention} = require('./agents/MovementSensorAgent');
const {LightsGoal, LightsIntention} = require('./agents/LightAgent');
const {ShuttersGoal, ShuttersIntention} = require('./agents/ShutterAgent');
const {HouseAgent,HouseGoal,HouseIntention} = require('./agents/HouseAgent');
const pddlActionIntention = require('../pddl/actions/pddlActionIntention')

var house = new House();

Clock.global.observe('mm', (key,mm) =>{
    var time = Clock.global
    if(time.dd <5){
        if(time.hh == 7 && time.mm == 0){
            house.people.davide.is_in_room = 'bedroom';
            house.people.elisa.is_in_room = 'bedroom_bathroom';
        }
        if(time.hh == 7 && time.mm == 30){
            house.people.davide.is_in_room = 'bedroom_bathroom';
            house.people.elisa.is_in_room = 'entrance';
        }
        if(time.hh == 8 && time.mm == 0){
            house.people.davide.in_room = 'office';
            house.people.elisa.in_room = 'away';
        }
        if(time.hh == 12 && time.mm == 30){
            house.people.davide.in_room = 'kitchen';
        }
        if(time.hh == 12 && time.mm == 50){
            house.people.davide.in_room = 'dining_room';
        }
        if(time.hh == 13 && time.mm == 10){
            house.people.davide.in_room = 'guest_bathroom';
        }
        if(time.hh == 13 && time.mm == 30){
            house.people.davide.in_room = 'office';
        }
        if(time.hh == 18 && time.mm == 00){
            house.people.davide.in_room = 'basement_bathroom';
        }
        if(time.hh == 18 && time.mm == 15){
            house.people.davide.in_room = 'living_room';
        }
        if(time.hh == 20 && time.mm == 00){
            house.people.davide.in_room = 'kitchen';
            house.people.elisa.in_room = 'kitchen';
        }
        if(time.hh == 20 && time.mm == 30){
            house.people.davide.in_room = 'dining_room';
            house.people.elisa.in_room = 'dining_room';
        }
        if(time.hh == 21 && time.mm == 00){
            house.people.davide.in_room = 'living_room';
            house.people.elisa.in_room = 'living_room';
        }
        if(time.hh == 22 && time.mm == 00){
            house.people.elisa.in_room = 'bedroom_bathroom';
        }
        if(time.hh == 22 && time.mm == 10){
            house.people.davide.in_room = 'bedroom_bathroom';
            house.people.elisa.in_room = 'bedroom';
        }
        if(time.hh == 22 && time.mm == 20){
            house.people.elisa.in_room = 'bedroom';
        }        
    }
    else{
        if(time.hh == 9 && time.mm == 30){
            house.people.davide.in_room = 'bedroom_bathroom';
            house.people.elisa.in_room = 'bedroom';
        }
        if(time.hh == 10 && time.mm == 0){
            house.people.davide.in_room = 'kitchen';
            house.people.elisa.in_room = 'bedroom_bathroom';
        }
        if(time.hh == 10 && time.mm == 30){
            house.people.davide.in_room = 'dining_room';
            house.people.elisa.in_room = 'dining_room';
        }
        if(time.hh == 11 && time.mm == 0){
            house.people.davide.in_room = 'away';
            house.people.elisa.in_room = 'away';
        }
        if(time.hh = 19 && time.mm == 0){
            house.people.davide.in_room = 'kitchen';
            house.people.elisa.in_room = 'kitchen';
        }
        if(time.hh = 19 && time.mm == 30){
            house.people.davide.in_room = 'dining_room';
            house.people.elisa.in_room = 'dining_room';
        }
        if(time.hh = 20 && time.mm == 0){
            house.people.davide.in_room = 'living_room';
            house.people.elisa.in_room = 'living_room';
        }
        if(time.hh = 22 && time.mm == 0){
            house.people.davide.in_room = 'bedroom_bathroom';
        }
        if(time.hh = 22 && time.mm == 10){
            house.people.davide.in_room = 'bedroom';
            house.people.elisa.in_room = 'bedroom_bathroom';
        }
        if(time.hh = 22 && time.mm == 20){
            house.people.elisa.in_room = 'bedroom';
        }
    }
});


const ha = new HouseAgent("house");
{
    class Move extends pddlActionIntention{
        static parameters = ['robot','room1','room2','base_station'];
        static precondition = [ ['is_in_room','robot', 'room1'], ['is_adjacent','room1','room2']];
        static effect = [ ['not is_in_room', 'robot','room1'], ['is_in_room','robot' ,'room2'],['not is_in_bs', 'base_station', 'robot'] ];
        *exec ({room1,room2}=parameters) {
            yield ha.move({room1, room2, robot: this.agent.name})
        }
    }

    class Clean extends pddlActionIntention{
        static parameters = ['room', 'robot'];
        static precondition = [ ['is_in_room', 'robot','room'], ['is_dirty', 'room']];
        static effect = [ ['not is_dirty', 'room']];
        *exec ({room}=parameters) {
            yield ha.clean({room, robot: this.agent.name})
        }
    }

    class Charge extends pddlActionIntention{
        static parameters = ['robot','base_station','room'];
        static duration = 2;
        static precondition = [ ['is_in_room', 'robot','room'], ['bs_in_room', 'base_station','room'],['not is_in_bs', 'base_station', 'robot']];
        static effect = [ ['is_in_bs', 'base_station','robot'] ];
        *exec ({room,base_station}=parameters) {
            yield ha.charge({room, base_station, robot: this.agent.name})
        }
    }

    class RetryGoal extends Goal {}

    class RetryIntention extends Intention {
        static applicable (goal) {
            return goal instanceof RetryGoal
        }
        *exec ({goal}=parameters) {
            for(let i=0; i<1000; i++) {
                let goalAchieved = yield this.agent.postSubGoal( goal )
                if (goalAchieved)
                    return;
                this.log('wait for something to change on beliefset before retrying for the ' + (i+2) + 'th time goal', goal.toString())
                yield ha.beliefs.notifyAnyChange()
            }
        }
    }

    var vacuumSensorR1 = (agent) => (value,key,observable) => {
        let predicate = key.split(' ')[0]
        let arg1 = key.split(' ')[1]
        let arg2 = key.split(' ')[2]
        if (predicate == 'is_in_room')
            key = 'is_in_room '+ arg1 + ' ' + arg2
        else if (predicate == 'bs_in_room')
            key =  'bs_in_room ' + arg1 + ' ' + arg2
        else if (predicate == 'is_dirty')
            key = 'is_dirty ' + arg1
        else if (predicate == 'is_adjacent')
            key = 'is_adjacent ' + arg1 + ' ' + arg2
        else if (predicate == 'is_in_bs')
            key = 'is_in_bs ' + arg1 + ' ' + arg2
        else
            return;
    
        value?agent.beliefs.declare(key):agent.beliefs.undeclare(key)
    };

    var vacuumSensorR2 = (agent) => (value,key,observable) => {

        let predicate = key.split(' ')[0]
        let arg1 = key.split(' ')[1]
        let arg2 = key.split(' ')[2]
        if (predicate == 'is_in_room')
            key = 'is_in_room ' + arg1 + ' ' + arg2
        else if (predicate == 'bs_in_room')
            key =  'bs_in_room ' + arg1 + ' ' + arg2
        else if (predicate == 'is_dirty')
            key = 'is_dirty ' + arg1
        else if (predicate == 'is_adjacent')
            key = 'is_adjacent ' + arg1 + ' ' + arg2
        else if (predicate == 'is_in_bs')
            key = 'is_in_bs ' + arg1 + ' ' + arg2
        else
            return;
        value?agent.beliefs.declare(key):agent.beliefs.undeclare(key)
    };

    {
        let robot1 = new Agent('robot1');
        ha.beliefs.observeAny( vacuumSensorR1(robot1));
        let {OnlinePlanning} = require('../pddl/OnlinePlanner')([Move, Clean, Charge]);
        robot1.intentions.push(OnlinePlanning);
        robot1.intentions.push(RetryIntention);
        robot1.postSubGoal(new RetryGoal({goal: new PlanningGoal({goal: ['not (is_dirty tavern)', 'not (is_dirty basement_bathroom)', 
                                                                'not (is_dirty office)', 'is_in_bs base_station1 robot1']})}));
    }
    {
        let robot2 = new Agent('robot2');
        ha.beliefs.observeAny( vacuumSensorR2(robot2));
        let {OnlinePlanning} = require('../pddl/OnlinePlanner')([Move, Clean, Charge]);
        robot2.intentions.push(OnlinePlanning);
        robot2.intentions.push(RetryIntention);
        robot2.postSubGoal(new RetryGoal({goal: new PlanningGoal({goal: ['not (is_dirty entrance)', 'not (is_dirty living_room)', 
                                                            'not (is_dirty guest_bathroom)','not (is_dirty kitchen)',
                                                            'not (is_dirty dining_room)','not (is_dirty bedroom)',
                                                            'not (is_dirty bedroom_bathroom)','is_in_bs base_station2 robot2']})}));
    }
}

{
    var lightSensor = (agent) => (value,key,observable) => {
        let predicate = key.split(' ')[0]
        let arg1 = key.split(' ')[1]
        if (predicate == 'is_empty')
            key = 'is_empty ' + arg1
        else
            return;
        value?agent.beliefs.declare(key):agent.beliefs.undeclare(key)
    }
    
    var lightAgent = new Agent('lightAgent')
    ha.beliefs.observeAny( lightSensor(lightAgent) )
    lightAgent.intentions.push(LightsIntention)
    lightAgent.postSubGoal(new LightsGoal([house.lights.l_office,house.lights.l_tavern,house.lights.l_basement_bath,
                                        house.lights.l_entrance,house.lights.l_living_room,house.lights.l_guest_bathroom,
                                        house.lights.l_kitchen,house.lights.l_dining_room,house.lights.l_bedroom,house.lights.l_bedroom_bathroom], 
                                        house.fotopanel))
}

{
    var shutterSensor = (agent) => (value,key,observable) => {
        let predicate = key.split(' ')[0]
        let arg1 = key.split(' ')[1]
        if (predicate == 'is_empty')
            key = 'is_empty ' + arg1
        else
            return;
        value?agent.beliefs.declare(key):agent.beliefs.undeclare(key)
    }
    var shutterAgent = new Agent('shutterAgent')
    ha.beliefs.observeAny( shutterSensor(shutterAgent) )
    shutterAgent.intentions.push(ShuttersIntention)
    shutterAgent.postSubGoal(new ShuttersGoal([house.shutters.s_entrance, house.shutters.s_living_room, house.shutters.s_guest_bathroom,
                                        house.shutters.s_kitchen,house.shutters.s_dining_room,house.shutters.s_bedroom,
                                        house.shutters.s_bedroom_bathroom],house.fotopanel))
}

ha.beliefs.declare('is_adjacent office tavern');
ha.beliefs.declare('is_adjacent tavern office');
ha.beliefs.declare('is_adjacent tavern basement_bathroom');
ha.beliefs.declare('is_adjacent basement_bathroom tavern');

ha.beliefs.declare('is_adjacent entrance living_room');
ha.beliefs.declare('is_adjacent living_room entrance');
ha.beliefs.declare('is_adjacent entrance guest_bathroom');
ha.beliefs.declare('is_adjacent guest_bathroom entrance');
ha.beliefs.declare('is_adjacent entrance kitchen');
ha.beliefs.declare('is_adjacent kitchen entrance');
ha.beliefs.declare('is_adjacent kitchen dining_room');
ha.beliefs.declare('is_adjacent dining_room kitchen');
ha.beliefs.declare('is_adjacent entrance bedroom');
ha.beliefs.declare('is_adjacent bedroom entrance');
ha.beliefs.declare('is_adjacent bedroom bedroom_bathroom');
ha.beliefs.declare('is_adjacent bedroom_bathroom bedroom');

ha.beliefs.declare('bs_in_room base_station2 entrance')
ha.beliefs.declare('bs_in_room base_station1 tavern')
ha.beliefs.declare('is_in_room robot2 entrance')
ha.beliefs.declare('is_in_room robot1 tavern')

ha.beliefs.declare('is_in_bs base_station2 robot2')
ha.beliefs.declare('is_in_bs base_station1 robot1')

ha.beliefs.declare('is_dirty tavern') 
ha.beliefs.declare('is_dirty office') 
ha.beliefs.declare('is_dirty basement_bathroom') 
ha.beliefs.declare('is_dirty entrance') 
ha.beliefs.declare('is_dirty living_room') 
ha.beliefs.declare('is_dirty guest_bathroom') 
ha.beliefs.declare('is_dirty kitchen') 
ha.beliefs.declare('is_dirty dining_room')
ha.beliefs.declare('is_dirty bedroom')
ha.beliefs.declare('is_dirty bedroom_bathroom')   

ha.beliefs.declare('is_empty tavern') 
ha.beliefs.declare('is_empty office')  
ha.beliefs.declare('is_empty basement_bathroom') 
ha.beliefs.declare('is_empty entrance') 
ha.beliefs.declare('is_empty living_room') 
ha.beliefs.declare('is_empty guest_bathroom') 
ha.beliefs.declare('is_empty kitchen')
ha.beliefs.declare('is_empty dining_room')
ha.beliefs.declare('is_empty bedroom')
ha.beliefs.declare('is_empty bathroom_bedroom')   

ha.intentions.push(SensorMovementIntention)
ha.postSubGoal(new SensorMovementGoal([house.people.davide,house.people.elisa], [house.rooms.tavern, 
                    house.rooms.office, house.rooms.basement_bath,house.rooms.entrance,
                    house.rooms.living_room, house.rooms.guest_bath, house.rooms.kitchen,
                    house.rooms.dining_room,house.rooms.bedroom, house.rooms.bedroom_bath]))
ha.intentions.push(HouseIntention)
ha.postSubGoal(new HouseGoal(house))

Clock.startTimer() 