const Observable = require('../../utils/Observable');
const Clock =  require('../../utils/Clock');

class FotoPanel extends Observable{
    constructor(house){
        super(FotoPanel)
        this.house = house;
    }

    getEnergyProduction(){
        var time_hh = Clock.global.hh;
        var time_mm = Clock.global.mm;

        var time = (time_mm / 60) + time_hh;
        
        return (Math.max(Math.sin((time - 6)* Math.PI/12), 0)) * 2500;
    }
}

module.exports = FotoPanel;