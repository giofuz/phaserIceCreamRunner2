var game;
var star;
var bgd;

window.onload = function() {
	game = new Phaser.Game(800, 800, Phaser.AUTO, "");
    game.state.add("Boot", boot);
    game.state.add("Preload", preload);
    game.state.add("TitleScreen", titleScreen);
    game.state.add("PlayGame", playGame);
    game.state.add("GameOverScreen", gameOverScreen);
    game.state.start("Boot");
}

var boot = function(game){};
boot.prototype = {
  	preload: function(){
		console.log("===Boot state preload function");
        //this.game.load.image("loading", "assets/sprites/loading.png");
	},

    create: function(){
		console.log("==boot state. create function");
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.state.start("Preload");
	}
}

var preload = function(game){};
preload.prototype = {
    preload: function() {
        game.load.image('background', 'assets/sprites/background.png');
        //game.load.image('plat', 'assets/platform.png');
        game.load.image('star', 'assets/sprites/star.png');
        game.load.image('logo', 'assets/sprites/phaser.png');
        //game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    },

    create: function() {
        this.game.state.start("TitleScreen");
        console.log("===preload state. create function");
    }
}

var titleScreen = function(game){};
titleScreen.prototype = {
    create: function() {
        console.log("==title Screen state. create function");
        //Draw images to screen
        var image = game.add.image(game.world.width/2-191, game.world.height/2-165, 'logo');

        // Call the 'jump' function when the spacekey is hit
        var spacekey = game.input.keyboard.addKey(
                    Phaser.Keyboard.SPACEBAR);
        spacekey.onDown.add(this.startGame, this);
    },

    startGame: function() {
        console.log("button pressed");
        this.game.state.start("PlayGame");
    },

    update: function() {
    },
}

var playGame = function(game){};
playGame.prototype = {
    create: function() {
        console.log("==playGame state. Create method");

        this.star = game.add.sprite(game.world.width/2, game.world.height/2, 'star');
        this.bgd = game.add.tileSprite(0, 0, 1920, 1080, 'background');

        //game.physics.enable(bgd, Phaser.Physics.ARCADE);
        game.physics.arcade.enable(this.bgd);

        //Set the physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);

        console.log(this.bgd.body.velocity.x);


    },

    update: function() {
        //  Scroll the background
        this.bgd.tilePosition.x -= 2;
    },

 };


var gameOverScreen = function(game) {}
    gameOverScreen.prototype = {
        create: function() {
            console.log("==gameOverScreen state. Create method");
        }
}

