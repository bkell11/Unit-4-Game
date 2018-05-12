// create characters... Thor, Iron man, Loki, and Thanos.
// objects will need name, image, hp, baseattackpower, current attack power, counter attack power..
// method for attack is going to calculate current attack power += base attack power and applying it to defender
// then verify if opponent is dead or not.. if dead, opponent doesnt counter attack.. if not dead apply cnt to user player
// then verify if user is dead or not

//
// hero character
// villain character
// Your character array [0,1,2,3]
// villain to select array []
// villainn is dead []

// character inflict damage(usercurrentdamage)

// if not dead hero inflictdamage(villaincounterdamage)

// check for deaths..
var Characters;
var heroCharacter;
var villainCharacter;
var villainsDied = 0;
var gameOver = false;

$(document).ready(function () {
    restartGame();
    getHeros();
    $("#reset").hide();
    // create new function to call on ready and reset..
    $("#attack").on("click", function () {
        if (heroCharacter != null && villainCharacter != null) {
            attack();
        }
    });
    $("#reset").on("click", function () {
        restartGame();
    });
});


function getHeros() {
    var heroSelections = $("#hero-selection");

    for (var i = 0; i < Characters.length; i++) {

        var characterDiv = $("<div id=\"" + Characters[i].id + "\"><h3>" + Characters[i].name + "</h3><img src=\"" + Characters[i].image + "\" alt=\"" + Characters[i].name + "\" style=\"max-width: 80%; height: 100px;\"><p id=\"" + Characters[i].id + "HP" + "\">HP: " + Characters[i].hp + "</p></div>");
        characterDiv.on("click", i, onCharacterClick);
        heroSelections.append(characterDiv);

    }
};

function onCharacterClick(event) {
    if (gameOver)
        return;

    var characterClicked = Characters[event.data];

    if (heroCharacter == null) {
        heroCharacter = characterClicked;
        var characterDiv = $("#" + heroCharacter.id);
        var heroSelected = $("#hero-selected");
        heroSelected.append(characterDiv);

        for (var i = 0; i < Characters.length; i++) {
            if (i != event.data) {
                var vCharacterDiv = $("#" + Characters[i].id);
                var villainToChoose = $("#villain-selection");
                villainToChoose.append(vCharacterDiv);
            }
        }
    }

    else if (villainCharacter == null && heroCharacter.id != characterClicked.id) {
        villainCharacter = characterClicked;
        var characterDiv = $("#" + villainCharacter.id);
        var enemy = $("#enemy");
        enemy.append(characterDiv);

    }
};
function attack() {
    if (heroCharacter == null || villainCharacter == null || gameOver) {
        return;
    }

    var enemy = $("#enemy");
    var vSelection = $("#villain-selection");
    var heroDamage = heroCharacter.calculateCurrentDamage();
    var villainDamage = villainCharacter.counterAttackPower;
    villainCharacter.procureDamage(heroDamage);
    var villainDied = villainCharacter.isDead();
    var heroDied = false;
    $("#" + villainCharacter.id + "HP").html("HP: " + villainCharacter.hp);
    if (villainDied) {
        $("#" + villainCharacter.id).hide();
        $("#fight").text("");
        $("#counter-death").text(heroCharacter.name + " Has Defeated " + villainCharacter.name + "! Choose Another Enemy!");
        villainCharacter = null;
        villainsDied++;
        if (villainsDied == 3) {
            $("#counter-death").text(heroCharacter.name + " Has Won! Play Again.");
            $("#reset").show();
        }
    }

    else {
        heroCharacter.procureDamage(villainDamage);
        heroDied = heroCharacter.isDead();
        $("#" + heroCharacter.id + "HP").html("HP: " + heroCharacter.hp);
        $("#fight").text(heroCharacter.name + " Attacked " + villainCharacter.name + " With " + heroCharacter.currentAttackPower + " Power.")
        $("#counter-death").text(villainCharacter.name + " Countered Attacked " + heroCharacter.name + " With " + villainCharacter.counterAttackPower + " Power.")
        if (heroDied) {
            $("#" + heroCharacter.id).hide();
            $("#fight").text("");
            $("#counter-death").text(villainCharacter.name + " Has Defeated " + heroCharacter.name + "! Game Over! Try Again.");
            heroCharacter = null;
            gameOver = true;
            $("#reset").show();
        }
    }
}

function restartGame() {
    gameOver = false;
    heroCharacter = null;
    villainCharacter = null;
    villainsDied = 0;
    Characters = [new Character("thor", "Thor", "assets/images/Thor.jpg", 785, 20, 40), new Character("iron-man", "Iron Man", "assets/images/Iron_Man.jpg", 810, 15, 60), new Character("thanos", "Thanos", "assets/images/Thanos.jpg", 950, 10, 70), new Character("loki", "Loki", "assets/images/Loki.png", 725, 20, 30),];
    $("#reset").hide();

    for (var i = 0; i < Characters.length; i++) {

        var characterDiv = $("#" + Characters[i].id);
        characterDiv.show();
        var heroSelections = $("#hero-selection");
        heroSelections.append(characterDiv);

        $("#" + Characters[i].id + "HP").html("HP: " + Characters[i].hp);
    }
}


function Character(id, name, image, hp, baseAttackPower, counterAttackPower) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.hp = hp;
    this.baseAttackPower = baseAttackPower;
    this.currentAttackPower = 0;
    this.counterAttackPower = counterAttackPower;
    this.procureDamage = function (damage) {

        this.hp -= damage;

    };

    this.calculateCurrentDamage = function () {

        return this.currentAttackPower += this.baseAttackPower;

    };

    this.isDead = function () {

        if (this.hp <= 0) {
            return true;
        }

        else {
            return false;
        }
    };

}

// $("#fight").text(heroCharacter.name + " attacked " + villainCharacter.name + " with " + heroCharacter.currentAttackPower + " power.")
// $("#counter-death").text(villainCharacter.name + " countered attacked " + heroCharacter.name + " with " + villainCharacter.counterAttackPower + " power.")
// $("#counter-death").text(villainCharacter.name + " has died.")

// Write out who is inflicting what damage..
// Game over writing & a reset button..
// Update UI..
// Change attributes..