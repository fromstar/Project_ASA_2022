const Goal = require('../../bdi/Goal');
const Intention = require('../../bdi/Intention');
const Clock =  require('../../utils/Clock');

class LightsGoal extends Goal {
    constructor (lights, fotopanel) {
        super()
        this.lights = lights;
        this.fotopanel = fotopanel;
    }
}

class LightsIntention extends Intention{
    constructor(agent, goal){
        super(agent,goal);
        this.lights = goal.lights;
        this.Clock = Clock.global;
    }

    static applicable (goal) {
        return goal instanceof LightsGoal
    }

    *exec(){
        var l_Goal = [];
        for(let l of this.lights){
            let lightGoalPromise = new Promise( async res => {
                while(true){
                    let status = await this.agent.beliefs.notifyChange('is_empty ' + l.room);
                    if(this.goal.fotopanel.getEnergyProduction() == 0){
                        if(status == false){
                            l.turnOn();
                        }
                        else{
                            l.turnOff();
                        }
                    }                    
                }
            });
            l_Goal.push(lightGoalPromise);
        }
        yield Promise.all(l_Goal);
    }
}

module.exports = {LightsGoal, LightsIntention};