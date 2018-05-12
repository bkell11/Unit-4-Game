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
var Characters = [new Character("thor", "Thor", "assets/images/Thor.jpg", 500, 15, 25), new Character("iron-man", "Iron Man", "assets/images/Iron_Man.jpg", 600, 10, 30), new Character("thanos", "Thanos", "assets/images/Thanos.jpg", 800, 15, 200), new Character("loki", "Loki", "assets/images/Loki.png", 600, 15, 25),];
var heroCharacter;
var villainCharacter;
var gameOver = false;

$(document).ready(function () {
    getHeros();
    $("#reset").hide();
    // create new function to call on ready and reset..
    $("#attack").on("click", function () {
        if (heroCharacter != null && villainCharacter != null) {
            attack();

        }
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
        $("#" + villainCharacter.id).remove();
        $("#fight").text("");
        $("#counter-death").text(heroCharacter.name + " has defeated " + villainCharacter.name + "! Choose another enemy!");
        villainCharacter = null;
    }

    else {
        heroCharacter.procureDamage(villainDamage);
        heroDied = heroCharacter.isDead();
        $("#" + heroCharacter.id + "HP").html("HP: " + heroCharacter.hp);
        $("#fight").text(heroCharacter.name + " attacked " + villainCharacter.name + " with " + heroCharacter.currentAttackPower + " power.")
        $("#counter-death").text(villainCharacter.name + " countered attacked " + heroCharacter.name + " with " + villainCharacter.counterAttackPower + " power.")
        if (heroDied) {
            $("#" + heroCharacter.id).remove();
            $("#fight").text("");
            $("#counter-death").text(villainCharacter.name + " has defeated " + heroCharacter.name + "! Game Over! Try again.");
            heroCharacter = null;
            gameOver = true;
            $("#reset").show();
        }
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