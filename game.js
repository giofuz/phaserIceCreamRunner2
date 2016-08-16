var game;
var star;
var bgd, bg01, bg02, mg01, mg02;
var road01, shadow;
var speed01;
var sky01;
var fg01, fg02;
var van, road, lines;
var drive, roadAnim, linesAnim;

window.onload = function() {
	game = new Phaser.Game(2014, 1098, Phaser.AUTO, "");
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
        this.game.load.image("loading", "assets/sprites/loading.png");
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
        game.load.image('sky', 'assets/sprites/SKY0001.png');
        game.load.image('plainground', 'assets/sprites/GROUND_PLAIN0001.png');
        game.load.image('background02', 'assets/sprites/BG0002.png');
        game.load.image('background01', 'assets/sprites/BG0001.png');
        game.load.image('middleground02', 'assets/sprites/MG0002.png');
        game.load.image('middleground01', 'assets/sprites/MG0001.png');
        game.load.image('road01', 'assets/sprites/ROAD0001.png');
        game.load.spritesheet('road', 'assets/sprites/road.png', 2229, 86, 4);
        game.load.image('shadow', 'assets/sprites/ICE_VAN_SHADOW0001.png');
        game.load.image('speed01', 'assets/sprites/SPEEDLINES0001.png');
        game.load.spritesheet('lines', 'assets/sprites/lines.png', 3053, 337, 4);
        game.load.image('foreground01', 'assets/sprites/FG0001.png');
        game.load.image('foreground02', 'assets/sprites/FG0002.png');

        game.load.image('logo', 'assets/sprites/phaser.png');
        game.load.spritesheet('van', 'assets/sprites/van2.png', 699, 706, 12);

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

        this.sky01 = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'sky');
        this.bgd02 = game.add.tileSprite(0, 100, 3126, 804, 'background02');
        this.bgd01 = game.add.tileSprite(0, game.world.height/2-313, 3692, 626, 'background01');
        this.gnd = game.add.tileSprite(-100, game.world.height/2, 2309, 595, 'plainground');
        this.mg02 = game.add.tileSprite(0, game.world.height/2-135, game.world.width, 250, 'middleground02');
        this.mg01 = game.add.tileSprite(0, game.world.height/2-390, 5367, 665, 'middleground01');
        this.road01 = game.add.tileSprite(0, game.world.height/2+200, 2232, 89, 'road01');
        road = game.add.sprite(0, game.world.height/2+200, 'road', 5);
        this.shadow = game.add.tileSprite(game.world.width/2-840, game.world.height/2+250, 1134, 214, 'shadow');
        this.speed01 = game.add.tileSprite(0, game.world.height/2+337, 3570, 337, 'speed01');
        lines = game.add.sprite(0, game.world.height/2+320, 'lines', 5);
        van = game.add.sprite(game.world.width/2-350, game.world.height/2-450, 'van', 5);
        //this.fg01 = game.add.tileSprite(0, game.world.height/2+200, 909, 577, 'foreground01');
        //this.fg02 = game.add.tileSprite(game.world.width-300, game.world.height/2, 770, 577, 'foreground02');

        //van animation
        drive = van.animations.add('walk');
        van.animations.play('walk', 8, true);

        //road animation
        roadAnim = road.animations.add('walk');
        road.animations.play('walk', 8, true);

        //lines animation
        linesAnim = lines.animations.add('walk');
        lines.animations.play('walk', 8, true);

        //game.physics.enable(bgd, Phaser.Physics.ARCADE);
        game.physics.arcade.enable(this.bgd01);

        //Set the physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);

    },

    update: function() {
        //Scroll the background
        this.mg01.tilePosition.x -= 6;
        this.mg02.tilePosition.x -= 0.9;
        this.bgd01.tilePosition.x -= 0.4;
        this.bgd02.tilePosition.x -= 0.3;
        //this.fg01.tilePosition.x -= 15;
        //this.fg02.tilePosition.x -= 15;
    },

 };


var gameOverScreen = function(game) {}
    gameOverScreen.prototype = {
        create: function() {
            console.log("==gameOverScreen state. Create method");
        }
}

