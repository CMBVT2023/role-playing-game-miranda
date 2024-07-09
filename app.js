const userXPDisplay = document.getElementById('user-xp');
const userHealthDisplay = document.getElementById('user-health');
const userGoldDisplay = document.getElementById('user-gold');

const button1 = document.getElementById('button-1');
const button2 = document.getElementById('button-2');
const button3 = document.getElementById('button-3');
const inventoryButton = document.getElementById('inventory-button');

const gameTitleDisplay = document.getElementById('game-info-title');
const gameTextDisplay = document.getElementById('game-info-text');
const gameImagesDisplay = document.getElementById('game-assets');
const inventoryDisplay = document.getElementById('user-inventory');
const inventoryTitle = document.getElementById('inventory-title');

let userXp = 0;
let userHealth = 100;
let userGold = 50;

let weapons = [
    {
        name: "Stick",
        attackPower: 2,
        holdingPower: 1,
    },
    {
        name: "Sword",
        attackPower: 6,
        holdingPower: 4,
    },
    {
        name: "Hammer of a Thousand Suns",
        attackPower: 12,
        holdingPower: 8,
    },
    {
        name: "Laser Tag Super Weapon",
        attackPower: 18,
        holdingPower: 10,
    },
    {
        name: "Console Commands",
        attackPower: 20,
        holdingPower: 16,
    },
];
let currentWeapon = 0;
let userInventory = [];
let inventoryActive = false;

let enemyHealth = 0;
let enemyAttack = 0;
let enemyXpDrop = 0;

let potentialItems = ["Keys", "Cat Shirt", "Arcade Token", "Shoes"];

const locations = [
    {
        name: "Parking Lot",
        buttons: ["Go to the mall", "Find something to hit", "Challenge the elder"],
        buttonFunctions: [mall, playArea, finalBoss],
        text: "You are back in the parking lot, and like usual you are met with three options to choose from.",
        image: "https://images.pexels.com/photos/1500459/pexels-photo-1500459.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
        name: "Mall",
        buttons: ["Go to the shopping center", "Go to the food court", "Go back to the parking lot"],
        buttonFunctions: [shoppingCenter, foodCourt, parkingLot],
        text: "You end up at the mall and here you can choose to go to the shopping center to buy and sell items or go to the food court to replenish health.",
        image: "https://images.pexels.com/photos/2954405/pexels-photo-2954405.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
        name: "Shopping Center",
        buttons: ["Buy a new weapon (40 Gold)", "Sell Items", "Leave"],
        buttonFunctions: [buyWeapon, sellItem, mall],
        text: "You go to the shopping center and here you can buy a variety of weapons or sell the items you have obtained.",
        image: "https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
        name: "Food Court",
        buttons: ["Buy food (30 Gold)", "Buy a drink (10 Gold)", "Leave"],
        buttonFunctions: [buyFood, buyDrink, mall],
        text: "You end up at the food court and here you can buy some food or a drink to regain some health.",
        image: "https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
        name: "Play Area",
        buttons: ["Go to laser tag", "Go to the arcade", "Go back to the parking lot"],
        buttonFunctions: [laserTag, arcade, parkingLot],
        text: "You end up at the play area. From here you can either go to play laser tag or go to the arcade.",
        image: "https://images.pexels.com/photos/5027381/pexels-photo-5027381.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
        name: "Laser Tag",
        buttons: ["Play with the older kids", "Play with the younger kids", "Run"],
        buttonFunctions: [olderKids, youngerKids, playArea],
        text: "You find yourself at the laser tag arena, this is a great place to strike some people down with your lasers. You have the choice of either joining a game with some of the older kids or some of the younger kids. You could also just run away as fast as you can if that is your thing.",
        image: "https://images.pexels.com/photos/3869072/pexels-photo-3869072.jpeg?auto=compress&cs=tinysrgb&w=300"
    },
    {
        name: "Arcade",
        buttons: ["Play", "Watch someone else play", "Leave"],
        buttonFunctions: [arcadePlay, arcadeView, playArea],
        text: "You find yourself at the arcade, this is a great place to dominate the competition by getting the high score.",
        image: "https://images.pexels.com/photos/1293261/pexels-photo-1293261.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
        name: "Final Boss Arena",
        buttons: ["Attack", "Dodge and strike", "Ask the boss to leave"],
        buttonFunctions: [finalAttack, finalDodge, finalLeave],
        text: "Are you sure you can do this because it might be too late to back out now.",
        image: "https://images.pexels.com/photos/8744796/pexels-photo-8744796.jpeg?auto=compress&cs=tinysrgb&w=300"
    },
    {
        name: "Older Kids",
        buttons: ["Attack", "Dodge and strike", "Leave"],
        buttonFunctions: [laserAttack, laserDodge, parkingLot],
        text: "This game is intense, it is far more than you were expecting but you ready your weapon for whats to come.",
        image: "https://images.pexels.com/photos/2710282/pexels-photo-2710282.jpeg?auto=compress&cs=tinysrgb&w=300"
    },
    {
        name: "Younger Kids",
        buttons: ["Attack", "Dodge and strike", "Leave"],
        buttonFunctions: [laserAttack, laserDodge, parkingLot],
        text: "Ok, this game isn't too bad but don't underestimate these kids, they have some serious stamina.",
        image: "https://images.pexels.com/photos/3869083/pexels-photo-3869083.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
        name: "You Lose",
        buttons: ["Replay", "Replay", "Replay"],
        buttonFunctions: [resetGame, resetGame, resetGame],
        text: "Your health depleted and now you can no longer go on, restart the game to try again.",
        image: "https://images.pexels.com/photos/7407375/pexels-photo-7407375.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
        name: "You Win",
        buttons: ["Replay", "Replay", "Replay"],
        buttonFunctions: [resetGame, resetGame, resetGame],
        text: "You finally won the game by defeating the final boss and have now saved everyone in the area from their evil ways.",
        image: "https://images.pexels.com/photos/949592/pexels-photo-949592.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
        name: "High Score Battle Royal",
        buttons: ["Go for glory", "Bide your time", "Quit"],
        buttonFunctions: [arcadeAttack, arcadeWait, parkingLot],
        text: "You join in on a battle royal style arcade game, be the last person standing and you will win.",
        image: "https://images.pexels.com/photos/20131184/pexels-photo-20131184/free-photo-of-yu-gi-oh-application-on-smartphone-in-hand.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
        name: "Tutorial/Demonstration",
        buttons: ["Advance", "ReWatch", "Quit"],
        buttonFunctions: [arcadeAdvance, arcadeReWatch, parkingLot],
        text: "You admit to yourself that you need some lessons and instead of playing a game, you decide to watch the tutorial for it.",
        image: "https://images.pexels.com/photos/34407/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    }
];

inventoryButton.onclick = toggleInventory;

function toggleInventory() {
    updateInventory();

    if (inventoryActive) {
        inventoryDisplay.classList.toggle('toggle');
        inventoryTitle.classList.toggle('toggle');
    } else {
        inventoryDisplay.classList.toggle('toggle');
        inventoryTitle.classList.toggle('toggle');
    }
}

function updateInventory() {
    inventoryDisplay.innerHTML = ``;

    for (const item in userInventory) {
        inventoryDisplay.innerHTML += `${userInventory[item]}${item < userInventory.length - 1 ? ', ' : ' '}`;
    }
}

function updateInterface(area) {
    gameTitleDisplay.innerHTML = area.name;
    gameTextDisplay.innerHTML = area.text;

    button1.innerHTML = area.buttons[0];
    button2.innerHTML = area.buttons[1];
    button3.innerHTML = area.buttons[2];

    button1.onclick = area.buttonFunctions[0];
    button2.onclick = area.buttonFunctions[1];
    button3.onclick = area.buttonFunctions[2];

    gameImagesDisplay.innerHTML = `<img src="${area.image}" class="image"></img>`
}

function parkingLot() {
    updateInterface(locations[0]);
};

function mall() {
    updateInterface(locations[1]);
};

function shoppingCenter() {
    updateInterface(locations[2]);
};

function foodCourt() {
    updateInterface(locations[3]);
};

function playArea() { 
    updateInterface(locations[4]);
};

function laserTag() {
    updateInterface(locations[5]);
};

function arcade() {
    updateInterface(locations[6]);
};

function finalBoss() {
    updateInterface(locations[7]);

    loadEnemy(500, 25, 250);
};

function buyWeapon() {
    if (userGold >= 40) {

        if (currentWeapon < weapons.length - 1) {
            currentWeapon++;

            gameTitleDisplay.innerHTML = "New Weapon Acquired!";
            gameTextDisplay.innerHTML = `You have acquired a new weapon. You now have a ${weapons[currentWeapon].name}.`;

            userGold -= 40;
            userGoldDisplay.innerHTML = userGold;
        } else {
            gameTitleDisplay.innerHTML = "Stick With What You Got!";
            gameTextDisplay.innerHTML = `You already have the strongest weapon around.`;
        }
    } else {
        gameTitleDisplay.innerHTML = "You are Broke!";
        gameTextDisplay.innerHTML = "You do not have enough gold to buy a new weapon.";
    };
}

function sellItem() {
    if (userInventory.length > 0) {
        let sold = userInventory.pop();
        updateInventory();

        switch (sold) {
            case "Keys": {
                userGold += 35;
                userGoldDisplay.innerHTML = userGold;

                gameTitleDisplay.innerHTML = "You Sold Some Keys You Found";
                gameTextDisplay.innerHTML = `You gained 35 gold!`;

                break;
            };
            case "Cat Shirt": {
                userGold += 25;
                userGoldDisplay.innerHTML = userGold;

                gameTitleDisplay.innerHTML = "You Sold a Cat Shirt You Found";
                gameTextDisplay.innerHTML = `You gained 25 gold!`;

                break;
            };
            case "Arcade Token": {
                userGold += 5;
                userGoldDisplay.innerHTML = userGold;

                gameTitleDisplay.innerHTML = "You Sold an Arcade Token You Found";
                gameTextDisplay.innerHTML = `You gained 5 gold!`;

                break;
            };
            case "Shoes": {
                userGold += 40;
                userGoldDisplay.innerHTML = userGold;

                gameTitleDisplay.innerHTML = "You Sold a Pair of Shoes You Found";
                gameTextDisplay.innerHTML = `You gained 40 gold!`;

                break;
            };
        }
    } else {
        gameTitleDisplay.innerHTML = "You have Nothing to Sell";
        gameTextDisplay.innerHTML = "You have not acquired anything on your journey so far.";
    }
}

function buyFood() {
    if (userGold >= 30) {
        let randomNum = Math.ceil(Math.random() * 25) + 5;

        gameTitleDisplay.innerHTML = "Health Recovered!";
        gameTextDisplay.innerHTML = `You have acquired a some food and gained back ${randomNum} Health.`;

        userHealth += randomNum;
        userHealthDisplay.innerHTML = userHealth;

        userGold -= 30;
        userGoldDisplay.innerHTML = userGold;
    } else {
        gameTitleDisplay.innerHTML = "You are Broke!";
        gameTextDisplay.innerHTML = "You do not have enough gold to buy food.";
    }
}

function buyDrink() {
    if (userGold >= 10) {
        let randomNum = Math.ceil(Math.random() * 20) + 5;

        gameTitleDisplay.innerHTML = "Health Recovered!";
        gameTextDisplay.innerHTML = `You have acquired a drink and gained back ${randomNum} Health.`;

        userHealth += randomNum;
        userHealthDisplay.innerHTML = userHealth;

        userGold -= 10;
        userGoldDisplay.innerHTML = userGold;
    } else {
        gameTitleDisplay.innerHTML = "You are Broke!";
        gameTextDisplay.innerHTML = "You do not have enough gold to buy food.";
    }
}

function randomDrop() {
    let randomNum = Math.ceil(Math.random() * 100);

    if (randomNum >= 75) {
        let num = Math.floor(Math.random() * 4);

        userInventory.push(potentialItems[num]);
        updateInventory();
        return true;
    } else {
        return false;
    }
}

function olderKids() {
    updateInterface(locations[8]);

    loadEnemy(50, 15, 25);
}

function youngerKids() {
    updateInterface(locations[9]);

    loadEnemy(30, 8, 10);
}

function loadEnemy(hitPoints, attack, xpDrop) {
    enemyHealth = hitPoints;

    enemyAttack = Math.ceil(Math.random() * (userXp / 4)) + attack; 
    
    enemyXpDrop = Math.ceil(Math.random() * attack) + xpDrop;

}

function defeatedEnemy(event) {
    userXp += enemyXpDrop;
    userXPDisplay.innerHTML = userXp;

    let goldReturn = Math.ceil(Math.random() * enemyXpDrop) + 8;
    let itemDrop = randomDrop();

    userGold += goldReturn;
    userGoldDisplay.innerHTML = userGold;
    

    updateInterface(locations[0]);

    if (event === "laser") {
        gameTitleDisplay.innerHTML = "You Won the Fight!";
        gameTextDisplay.innerHTML = `You won and received ${enemyXpDrop} xp and ${goldReturn} gold in return. You return to the parking lot after winning.`;
    } else if(event === "arcadePlay") {
        gameTitleDisplay.innerHTML = "You Won the Battle Royal Game!";
        gameTextDisplay.innerHTML = `You won and received ${enemyXpDrop} xp and ${goldReturn} gold in return. You return to the parking lot after winning.`;
    } else if (event === "arcadeWatch") {
        gameTitleDisplay.innerHTML = "You Finished the Video!";
        gameTextDisplay.innerHTML = `You received ${enemyXpDrop} xp and ${goldReturn} gold in return. You return to the parking lot after winning.`;
    }
    
    if (itemDrop) {
        gameTextDisplay.innerHTML += ` In addition, you manage to find an item and put it in your inventory. Item Found: ${userInventory[userInventory.length - 1]}.`
    }
}

function laserAttack() {
        enemyHealth -= weapons[currentWeapon].attackPower + Math.ceil(Math.random() * (userXp / 2));

        if (enemyHealth <= 0) {
            defeatedEnemy('laser');
        } else {
            userHealth -= enemyAttack;
            if (userHealth <= 0) {
                userHealthDisplay.innerHTML = 0;
                updateInterface(locations[10]);
            } else {
                userHealthDisplay.innerHTML = userHealth;

                gameTitleDisplay.innerHTML = "Keep Fighting!";
                gameTextDisplay.innerHTML = `The enemy is taking damage, they have ${enemyHealth} health left.`;
            }
        }
}

function laserDodge() {
    let randomNum = Math.ceil(Math.random() * 100) + (userXp / 8);

    if (randomNum >= 75) {
        enemyHealth -= weapons[currentWeapon].attackPower;

        if (enemyHealth <= 0) {
            defeatedEnemy('laser');
        } else {
            gameTitleDisplay.innerHTML = "Counter Attack Successful!";
            gameTextDisplay.innerHTML = `You manage to dodge the laser successfully and it instead damaged the enemy who now has ${enemyHealth} health left.`;
        }
    } else if (randomNum >= 25) {
        gameTitleDisplay.innerHTML = "Dodge Successful!";
        gameTextDisplay.innerHTML = `You manage to dodge the laser successfully without taking any damage.`;
    } else {
        userHealth -= enemyAttack;

        if (userHealth <= 0) {
            userHealthDisplay.innerHTML = 0;
            updateInterface(locations[10]);
        } else {
            userHealthDisplay.innerHTML = userHealth;

            gameTitleDisplay.innerHTML = "Dodging Failed!";
            gameTextDisplay.innerHTML = `You failed to dodge the laser successfully.`;
        }
    }
}

function arcadePlay() {
    updateInterface(locations[12]);

    loadEnemy(100, 2, 10);
}

function arcadeView() {
     updateInterface(locations[13]);

     loadEnemy(50, 1, 6);
}

function arcadeAttack() {
    enemyHealth -= Math.ceil(Math.random() * (userXp) + 5);

    if (enemyHealth <= 0) {
        defeatedEnemy('arcadePlay');
    } else {
        userHealth -= enemyAttack;

        if (userHealth <= 0) {
            userHealthDisplay.innerHTML = 0;
            updateInterface(locations[10]);
        } else {
            userHealthDisplay.innerHTML = userHealth;

            gameTitleDisplay.innerHTML = "Keep Playing!";
            gameTextDisplay.innerHTML = `Keep going, there are only ${enemyHealth} players left to defeat.`;
        }
    }
}

function arcadeWait() {
    let randomNum = Math.ceil(Math.random() * 100) + (userXp / 8);

    if (randomNum >= 75) {
        enemyHealth -= Math.ceil(Math.random() * (userXp / 2) + 2);

        if (enemyHealth <= 0) {
            defeatedEnemy('arcadePlay');
        } else {
            gameTitleDisplay.innerHTML = "Surprise Attack!";
            gameTextDisplay.innerHTML = `You manage to get the jump on some players, there are now only ${enemyHealth} players left to defeat.`;
        }
    } else if (randomNum >= 25) {
        gameTitleDisplay.innerHTML = "Now You Wait!";
        gameTextDisplay.innerHTML = `You find an area to hide from the other players.`;
    } else {
        userHealth -= enemyAttack;

        if (userHealth <= 0) {
            userHealthDisplay.innerHTML = 0;
            updateInterface(locations[10]);
        } else {
            userHealthDisplay.innerHTML = userHealth;

            gameTitleDisplay.innerHTML = "Ambush!";
            gameTextDisplay.innerHTML = `You failed to find a place to hide and other players attacked you.`;
        }
    }
}

function arcadeAdvance() {
    enemyHealth -= Math.ceil(Math.random() * (userXp) + 5);

    if (enemyHealth <= 0) {
        defeatedEnemy('arcadeWatch');
    } else {
        userHealth -= enemyAttack;

        if (userHealth <= 0) {
            userHealthDisplay.innerHTML = 0;
            updateInterface(locations[10]);
        } else {
            userHealthDisplay.innerHTML = userHealth;

            gameTitleDisplay.innerHTML = "This is a Good Video";
            gameTextDisplay.innerHTML = `Keep watching, there are only ${enemyHealth} minutes left to on the video.`;
        }
    }
}

function arcadeReWatch() {
    let randomNum = Math.ceil(Math.random() * 100) + (userXp / 8);

    if (randomNum >= 75) {
        enemyHealth -= Math.ceil(Math.random() * (userXp / 2) + 2);

        if (enemyHealth <= 0) {
            defeatedEnemy('arcadeWatch');
        } else {
            gameTitleDisplay.innerHTML = "Pleasant Surprise!";
            gameTextDisplay.innerHTML = `You come across an ad in the video that you can easily skip, there are now only ${enemyHealth} minutes left in the video.`;
        }
    } else if (randomNum >= 25) {
        gameTitleDisplay.innerHTML = "I Get It Now!";
        gameTextDisplay.innerHTML = `After the quick rewatch, you now understand the section of the video.`;
    } else {
        userHealth -= enemyAttack;

        if (userHealth <= 0) {
            userHealthDisplay.innerHTML = 0;
            updateInterface(locations[10]);
        } else {
            userHealthDisplay.innerHTML = userHealth;

            gameTitleDisplay.innerHTML = "Still Confused!";
            gameTextDisplay.innerHTML = `You failed to understand the video even after a quick rewatch and it some how caused your health to deplete.`;
        }
    }
}

function finalAttack() {
    enemyHealth -= weapons[currentWeapon].attackPower + Math.ceil(Math.random() * (userXp / 2));

    if (enemyHealth <= 0) {
        updateInterface(locations[11]);
    } else {
        userHealth -= enemyAttack;
        if (userHealth <= 0) {
            userHealthDisplay.innerHTML = 0;
            updateInterface(locations[10]);
        } else {
            userHealthDisplay.innerHTML = userHealth;

            gameTitleDisplay.innerHTML = "Keep Fighting!";
            gameTextDisplay.innerHTML = `The final boss is weakening, it has ${enemyHealth} health left.`;
        }
    }
}

function finalDodge() {
    let randomNum = Math.ceil(Math.random() * 100) + (userXp / 8);

    if (randomNum >= 75) {
        enemyHealth -= weapons[currentWeapon].attackPower;

        if (enemyHealth <= 0) {
            updateInterface(locations[11]);
        } else {
            gameTitleDisplay.innerHTML = "It Hurt Itself in its Confusion!";
            gameTextDisplay.innerHTML = `You manage to dodge the final boss' attack and it damaged itself. The final boss now has ${enemyHealth} health left.`;
        }
    } else if (randomNum >= 25) {
        gameTitleDisplay.innerHTML = "Weaved!";
        gameTextDisplay.innerHTML = `You manage to dodge the attack successfully without taking any damage from the boss.`;
    } else {
        userHealth -= enemyAttack;

        if (userHealth <= 0) {
            userHealthDisplay.innerHTML = 0;
            updateInterface(locations[10]);
        } else {
            userHealthDisplay.innerHTML = userHealth;

            gameTitleDisplay.innerHTML = "That was a Mistake!";
            gameTextDisplay.innerHTML = `You failed to dodge the boss' attack and it hurt really badly.`;
        }
    }
}

function finalLeave() {
    gameTitleDisplay.innerHTML = "Hope You Are Prepared!";
    gameTextDisplay.innerHTML = `Yeah, leaving isn't really a thing once you get here.`;
}

function resetGame() {
    userXp = 0;
    userHealth = 100;
    userGold = 50;

    currentWeapon = 0;
    userInventory = [];
    inventoryActive = false;

    userXPDisplay.innerHTML = userXp;
    userGoldDisplay.innerHTML = userGold;
    userHealthDisplay.innerHTML = userHealth;

    enemyHealth = 0;
    enemyAttack = 0;
    enemyXpDrop = 0;

    updateInventory();
    parkingLot();
}

resetGame();