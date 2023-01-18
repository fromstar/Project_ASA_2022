const Goal = require('../../bdi/Goal');
const Intention = require('../../bdi/Intention');
const Clock =  require('../../utils/Clock');

class ShuttersGoal extends Goal {
    constructor (shutters, fotopanel) {
        super()
        this.shutters = shutters;
        this.fotopanel = fotopanel;
    }
}

class ShuttersIntention extends Intention{
    constructor(agent, goal){
        super(agent,goal);
        this.shutters = goal.shutters;
        this.Clock = Clock.global;
    }

    static applicable (goal) {
        return goal instanceof ShuttersGoal;
    }

    *exec(){
        var s_goal = [];
        for(let s of this.shutters){
            let shutterGoalPromise = new Promise( async res =>{
                while(true){
                    let status = await this.agent.beliefs.notifyChange('is_empty ' + s.room);
                    if(this.goal.fotopanel.getEnergyProduction() != 0){
                        if(status == false){
                            s.turnOn();
                        }
                    }
                    else
                    {
                        if(status == true)
                            s.turnOff();
                    }
                }
            });
            s_goal.push(shutterGoalPromise);
        }
        yield Promise.all(s_goal);
    }
}

module.exports = {ShuttersGoal, ShuttersIntention};