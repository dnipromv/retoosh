var Scenario = function () {
    this.stages = [];
    this.currentStage = 0;
};

Scenario.prototype.constructor = Scenario.constructor;

Scenario.prototype.addStage = function (stage) {
    stage.visible = false;
    this.stages.push(stage);
};

Scenario.prototype.getEnemies = function () {
    return this.stages[this.currentStage];
};

Scenario.prototype.startScenario = function () {
    this.startCurrentStage();
};

Scenario.prototype.startCurrentStage = function () {
    this.stages[this.currentStage].setAll('exists', true);
    this.stages[this.currentStage].visible = true;
};

Scenario.prototype.closeCurrentStage = function () {
    this.stages[this.currentStage].visible = false;
    this.stages[this.currentStage].setAll('exists', false);
};

Scenario.prototype.updateScenario = function () {
    var isEnemyLeft = false;
    this.stages[this.currentStage].forEach(
        function(enemy) {
            if(enemy.visible == true){
                isEnemyLeft = true;
            }});

    if(!isEnemyLeft){
        this.closeCurrentStage();

        this.currentStage++;
        this.currentStage = this.currentStage % this.stages.length;

        this.startCurrentStage();
    }
};
