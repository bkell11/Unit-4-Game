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
var Characters = [new Character("Thor", "", 500, 15, 25), new Character("Iron Man", "", 600, 10, 30)];
var heroCharacter;
var villainCharacter;

function attack() {
    var heroDamage = heroCharacter.calculateCurrentDamage();
    var villainDamage = villainCharacter.counterAttackPower;
    villainCharacter.procureDamage(damage);
    var villainDied = villainCharacter.isDead();
    var heroDied = false;
    if (villainDied) {
        // put into dead array
        villainCharacter = null;
    }

    else {
        heroCharacter.procureDamage(villainDamage);
        heroDied = heroCharacter.isDead();
        if (heroDied) {
            // end game.. and give option to restart.
        }
    }
}
function Character(name, image, hp, baseAttackPower, counterAttackPower) {
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

