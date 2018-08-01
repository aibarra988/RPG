/**
 * Fixme: 
 *      - Implement character select
 *      - Implement what happens when each character dies
 *      
 */

var heroSelectionEl = $("#hero-selection");
var selectableHeroEls = $(".hero.selectable");

var enemyListEl = $("enemy-list");
var selectableEnemyEls = $(".enemy.selectable");

var attackEl = $("#attack");
var resetEl = $("#reset");
var eventsEl = $("#events");

var mainCharacterEl = $("#main-character");
var mcHealthEl = $("#mc-health");
var mcNameEl = $("#mc-name");

var enemyCharacterEl = $("#enemy-character");
var enemyHealthEl = $("#enemy-health");
var enemyNameEl = $("enemy-name");



// Game class to store game state
class Game {
    constructor(heroesList, enemyList) {
        this.player = this.setPlayer();
        this.enemy = this.setEnemy();
        this.heroesList = heroesList;
        this.enemyList = enemyList;
        this.state = "intro";
        this.events = [];
    }

    setPlayer(player) {
        this.player = player;
    }

    setEnemy(enemy) {
        this.enemy = enemy;
    }

    _populateHeroEls(hero) {
        $("<div class='character'>").loadTemplate("../assets/templates/character.html", {
            name: hero.name,
            hp: hero.hp
        });
    }

    renderIntro() {
        // show player list as selectable
        var self = this;
        this.heroesList.forEach(function(hero) {
            self._populateHeroEls(hero);
        });
        // show challengers row as empty
        
        // hide attack and reset buttons
        
        // display select a character in events

        // show enemy list as selectable

        mcNameEl.text(game.player.name);
        mcHealthEl.text(game.player.hp);

        enemyNameEl.text(game.enemy.name);
        enemyHealthEl.text(game.enemy.hp);
    }

    renderFightSequence() {
        // show the player list as inactive

        // hide reset button

        // show attack button
        
        // display fight stats in events

        // show enemy list as inactive

    }

    renderIntermission() {
        // show the player list as inactive

        // hide the reset and attack buttons

        // fight outcome in events and select the next opponent

        // show enemy list as active

    }
    
    renderGameOver() {
        // show the player list as inactive

        // show the reset button

        // hide the attack button

        // show the outcome of the game in events and hit reset for a new game

        // show enemy list as inactive
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


// Create our characters
var heroesList = [
    new Player("Necromancer", 100, 10), 
    new Player("Monk", 80, 15),
    new Player("Druid", 120, 8)
];

var enemyList = [
    new Enemy("Azmodan", 100, 5), 
    new Enemy("Belial", 150, 10),
    new Enemy("Diablo", 180, 20)
];

// Create our game
var game = new Game(heroesList, enemyList);

$(document).ready(function() {
    // Show the initial state of the game
    game.renderIntro();
});

selectableHeroEls.click(function(evt) {
    // if game.state === intro && game.player doesn't exist
        // set game.player to selected character
        // if game.enemy and game.player exist
});         // set game.state to 'fighting'

selectableEnemyEls.click(function(){
    // if game.state === intro && game.enemy doesn't exist
        // set game.enemy to selected character
        // if game.enemy && game.player exist
            // set game.state to 'fighting'
});

attackEl.click(function() {

    if (game.state === "fighting" /*and !(game.player.isDead && game.enemy.isDead)*/) {
        game.player.attackEnemy(game.enemy);
    } /*else if game.enemy.isDead() */
        // set game.state to intermission
    /* else if game.player.isDead() */
        // set game.state to game over

    renderFightSequence();
}); 

resetEl.click(function(){
    // Take the game back to its initial state
    game.renderIntro();
});

