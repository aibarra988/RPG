/**
 * Fixme: 
 *      - Implement character select
 *      - Implement what happens when each character dies
 *      
 */

var mainCharacterEl = $("#main-character");
var enemyCharacterEl = $("#enemy-character");
var attackEl = $("#attack");
var activityBoardEl = $("#activity-board");
var eventsEl = $("#events");
var mcHealthEl = $("#mc-health");
var enemyHealthEl = $("#enemy-health");


// Game class to store game state
class Game {
    constructor(player, enemyList) {
        this.player = this.setPlayer();
        this.enemy = this.setEnemy();
        this.enemyList = enemyList;
        this.gameOver = false;
        this.events = [];
    }

    setPlayer(player) {
        this.player = player;
    }

    setEnemy(enemy) {
        this.enemy = enemy;
    }

}

class Character {
    constructor(name, hp){
        this.name = name;
        this.hp = hp;
        this.isDead = false;
    }
}

class Enemy extends Character {
    constructor(name, hp, counterAttack) {
        super(name, hp);
        this.counterAttack = counterAttack;
    }

    counterAttackPlayer(player) {
        player.hp -= this.counterAttack;
        console.info("this: ", this);
        console.info("player: ", player);

        eventsEl.html("<span>" + this.name + " attacked you back for " 
                        + this.counterAttack + " damage.<span>");
    }
}

class Player extends Character {
    constructor(name, hp, attack) {
        super(name, hp);
        this.baseAttack = attack;
        this.attack = attack;
    }
    
    attackEnemy(enemy) {
        // Damage the enemy
        enemy.hp -= this.attack;
        // Let the enemy counter attack you
        enemy.counterAttackPlayer(this);
        
        // Publish event to screen
        eventsEl.html("<span>You attacked " + enemy.name + " for " 
                        + this.attack + " damage.</span><br>");
        // Increment your attack points by your base attack
        // for the next attack
        this.attack += this.baseAttack;

        // if enemy hp is <= 0, enemy has been defeated
        // move to select next enemy
        if (enemy.hp <= 0) {
            eventsEl.html("<span>Game Over!");
        }
    }
}

function render() {
    mainCharacterEl.html(mainCharacter.name);
    mcHealthEl.html(mainCharacter.hp);
    
    enemyCharacterEl.html(enemyCharacter.name);
    enemyHealthEl.html(enemyCharacter.hp);
}



var mainCharacter = new Player("Abe", 100, 15);
var enemyCharacter = new Enemy("Trump", 80, 15); 

var game = new Game(mainCharacter, enemyCharacter);


render();

attackEl.click(function() {

    if ((mainCharacter.hp > 0) && (enemyCharacter.hp > 0)) {
        mainCharacter.attackEnemy(enemyCharacter);
    } else {
        eventsEl.html("<p>GAME OVER!</p>");
    }


    render();
}); 



