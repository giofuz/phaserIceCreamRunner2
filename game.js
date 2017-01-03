var game;
var goon, goonArrives, e;
var icecream;
var goons;
var counter= 0; var rip = 0; var collision= false;
var frame, bgd, bg01, bg02, mg01, mg02;
var road01, shadow;
var speed01;
var sky01;
var fg01, fg02;
var van, road, lines;
var drive, roadAnim, linesAnim;
var time_til_spawn, last_spawn_time;
var scale = 25 + "%";
var icecream, flavours;
var box;
var key1,key2,key3,keyEnter;
var locs = [];
var icecreamComplete= false;
var ex = '';
var asset = '';
var score = 0;
var s = '';
var time_til_spawn, last_spawn_time;
var count = 0;
var plob;
var scale = .5;
var Goon;
var orderQue = [];
var order;
var picOfOrder,groupOfPics;

window.onload = function() {
	game = new Phaser.Game(990, 1098, Phaser.AUTO, "");
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
        game.load.image("loading", "assets/sprites/loading.png");
	},

    create: function(){

        if (game.device.desktop) {
            console.log("==boot state. create function");
            this.game.scale.pageAlignHorizontally = true;
            this.game.scale.pageAlignVertically = true;
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.state.start("Preload");
        } else {
            //code for mobile
        }
	}
}

var preload = function(game){};
preload.prototype = {
    preload: function() {
        game.load.image("loading", "assets/sprites/loading.png");
        game.load.image("frame", "assets/sprites/frame.png");
        game.load.image("icecream", "assets/sprites/icecream.png");
        game.load.image('sky', 'assets/sprites/SKY0001.png');
        game.load.image('plainground', 'assets/sprites/GROUND_PLAIN0001.png');
        game.load.image('background02', 'assets/sprites/BG0002.png');
        game.load.image('background01', 'assets/sprites/BG0001.png');
        game.load.image('middleground02', 'assets/sprites/MG0002.png');
        game.load.image('middleground01', 'assets/sprites/MG0001.png');
        game.load.image('road01', 'assets/sprites/ROAD0001.png');
        game.load.spritesheet('road', 'assets/sprites/road.png', 1115, 42.5, 4);
        game.load.image('shadow', 'assets/sprites/ICE_VAN_SHADOW0001.png');
        game.load.image('speed01', 'assets/sprites/SPEEDLINES0001.png');
        game.load.spritesheet('lines', 'assets/sprites/lines.png', 764, 83.5, 4);
        game.load.image('foreground01', 'assets/sprites/FG0001.png');
        game.load.image('foreground02', 'assets/sprites/FG0002.png');
        game.load.image('goon', 'assets/sprites/ICE_KID.png');
        game.load.image('logo', 'assets/sprites/phaser.png');
        game.load.spritesheet('van', 'assets/sprites/van_anim.png', 350, 353, 12);
        game.load.image("loading", "assets/sprites/loading.png");
        game.load.image("strawberry", "assets/sprites/strawberry.png");
        game.load.image("vanilla", "assets/sprites/vanilla.png");
        game.load.image("chocolate", "assets/sprites/choc.png");
        game.load.image("box", "assets/sprites/box.png");
        game.load.image("strawberry vanilla chocolate", "assets/sprites/order1.png");
        game.load.audio('plob', 'assets/sounds/plob.mp3');


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
        var frame = game.add.image(0, 0, 'frame');

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
        game.time.advancedTiming = true;

        this.sky01 = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'sky');
        this.bgd02 = game.add.tileSprite(0, 100, 1608, 402, 'background02');
        this.bgd01 = game.add.tileSprite(0, game.world.height/2-313, 1864, 313, 'background01');
        this.gnd = game.add.tileSprite(-100, game.world.height/2-100, 1115, 298, 'plainground');
        this.mg02 = game.add.tileSprite(0, game.world.height/2-165, 990, 125, 'middleground02');
        this.mg01 = game.add.tileSprite(0, game.world.height/2-280, 2684, 333, 'middleground01');
        this.road01 = game.add.tileSprite(0, game.world.height/2+20, 1115, 42.5, 'road01');
        road = game.add.sprite(0, game.world.height/2+20, 'road', 5);
        this.shadow = game.add.tileSprite(game.world.width/2-400, game.world.height/2+50, 567, 107, 'shadow');
        lines = game.add.sprite(game.world.width/2-382, game.world.height/2+100, 'lines', 5);
        van = game.add.sprite(game.world.width/2-150, game.world.height/2-300, 'van');

        //ice cream goon
        goons = game.add.group();
        time_til_spawn = Math.random()*4000 + 1000;  //Random time between 2 and 5 seconds.
        last_spawn_time = game.time.time;

        groupOfPics = game.add.group();

        //van animation
        drive = van.animations.add('walk');
        van.animations.play('walk', 8, true);

        //road animation
        roadAnim = road.animations.add('walk');
        road.animations.play('walk', 8, true);

        //lines animation
        linesAnim = lines.animations.add('walk');
        lines.animations.play('walk', 8, true);

        //  Enable input and allow for dragging
//        icecream.inputEnabled = true;
//        icecream.input.enableDrag();
//        icecream.events.onDragStart.add(this.onDragStart, this);
//        icecream.events.onDragStop.add(this.onDragStop, this);

        //game.physics.enable(bgd, Phaser.Physics.ARCADE);
        game.physics.arcade.enable(this.bgd01);

        //Set the physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);

        //Controls code
        this.box = game.add.sprite(800, 750, 'box');

        flavours = game.add.group();
        flavours.create(200, 950, 'vanilla');
        flavours.create(400, 950, 'chocolate');
        flavours.create(600, 950, 'strawberry');

        icecream = game.add.group();

        key1 = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
        key1.onDown.add(this.addVanillaFlavour, this);

        key2 = game.input.keyboard.addKey(Phaser.Keyboard.TWO);
        key2.onDown.add(this.addChocFlavour, this);

        key3 = game.input.keyboard.addKey(Phaser.Keyboard.THREE);
        key3.onDown.add(this.addStrawberryFlavour, this);

        keyEnter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        keyEnter.onDown.add(this.giveToCustomer, this);

        key1.onDown.add(this.playFx, this);
        key2.onDown.add(this.playFx, this);
        key3.onDown.add(this.playFx, this);


    },

    update: function() {
        //Scroll the background
        this.mg01.tilePosition.x -= 6;
        this.mg02.tilePosition.x -= 0.9;
        this.bgd01.tilePosition.x -= 0.4;
        this.bgd02.tilePosition.x -= 0.3;
        //this.fg01.tilePosition.x -= 15;
        //this.fg02.tilePosition.x -= 15;


        //goon spawning&animating
        goons.setAll('x', +2, true, true, 1);
        goons.forEach(this.checkGoon, this, true);

        game.debug.text("Group size: " + goons.total, 32, 192, "#ddd");
        game.debug.text("Destroyed: " + rip, 32, 224, "#ddd");
        game.debug.text("Result of collision: " + collision, 32, 256, "#ddd");
        game.debug.text("Game fps: " + game.time.fps, 32, 288, "#ddd");
        game.debug.text("Vanilla",  32, 96, "#ddd");
        game.debug.text("Press 1",  32, 116, "#ddd");
        game.debug.text("Chocolate",  128, 96, "#ddd");
        game.debug.text("Press 2",  128, 116, "#ddd");
        game.debug.text("Strawberry",  224, 96, "#ddd");
        game.debug.text("Press 3",  224, 116, "#ddd");
        game.debug.text("Press Enter to send ice-cream",  32, 160, "#ddd");

        var current_time = game.time.time;
        if(current_time - last_spawn_time > time_til_spawn){
            time_til_spawn = Math.random()*4000 + 1000;
            last_spawn_time = current_time;
            this.createGoon();
        }

        game.debug.text("Make me a: " + ex + " icecream", 32, 32, "#ddd");
        game.debug.text("Score: " + score,  32, 64, "#ddd");

//        if(ex == ''){
//            this.customersIcecream();
//        }

    },

    checkGoon: function(goon) {

        try {
            if (goon.order == s)
            {
                rip++;
                goons.remove(goon, true);
            }
        }
        catch (e)
        {
            //console.log(goon);
        }

    },

    createGoon: function() {

        ex = '';
        for(var i = Math.floor(Math.random() * 3); i <= 2; i++){
            ex = ex + " " + flavours.children[Math.floor(Math.random() * 3) + 0].key;
            picOfOrder = groupOfPics.create(game.world.width/2, game.world.height+100, ex);
            //console.log(flavours.children[Math.floor(Math.random() * 3) + 0].key)
        }

        goon = goons.create(0, game.world.height/2, 'goon');
        goon.order = ex;
        console.log()

    },

    SecondTween: function() {

        e = game.add.tween(goon);
        e.to({ x:game.world.width/2-100, y: van.y+150 }, 1000, Phaser.Easing.Bounce.Out);
        e.start();

    },

    collisionHandler: function(obj1, obj2, goons) {

        //  The two sprites are colliding
        collision = true;
        icecream.inputEnabled = false;
    },

    addVanillaFlavour: function(){

        if(icecream.children.length+1 == 1){
            icecream.create(800, 950, 'vanilla');
            console.log(icecream.children[0].key)
            count++;
        }
        else if(icecream.children.length+1 == 2){
            icecream.create(800, 850, 'vanilla');
            console.log(icecream.children[0].key)
            count++;
        }

        else if(icecream.children.length+1 == 3){
            icecream.create(800, 750, 'vanilla');
            console.log(icecream.children[count].key)
            count++;
        }


    },

    addChocFlavour: function(){

        if(icecream.children.length+1 == 1){
            icecream.create(800, 950, 'chocolate');
            console.log(icecream.children[count].key)
            count++;
        }
        else if(icecream.children.length+1 == 2){
            icecream.create(800, 850, 'chocolate');
            console.log(icecream.children[count].key)
            count++;
        }

        else if(icecream.children.length+1 == 3){
            icecream.create(800, 750, 'chocolate');
            console.log(icecream.children[count].key)
            count++;
        }


    },
    addStrawberryFlavour: function(){

        if(icecream.children.length+1 == 1){
            icecream.create(800, 950, 'strawberry');
            console.log(icecream.children[0].key)
            count++;
        }
        else if(icecream.children.length+1 == 2){
            icecream.create(800, 850, 'strawberry');
            console.log(icecream.children[1].key)
            count++;
        }

        else if(icecream.children.length+1 == 3){
            icecream.create(800, 750, 'strawberry');
            console.log(icecream.children[2].key)
            count++;
        }


    },

//    customersIcecream: function(){
//
//        for(var i = Math.floor(Math.random() * 3); i <= 2; i++){
//            ex = ex + " " + flavours.children[Math.floor(Math.random() * 3) + 0].key
//            console.log(flavours.children[Math.floor(Math.random() * 3) + 0].key)
//        }
//
//
//    },


    giveToCustomer: function(){

        for(var i = 0; i < count; i++){
            s = s + " " + icecream.children[i].key
        }

        if(ex == s){
            game.time.events.add(Phaser.Timer.SECOND * 1, this.plusScore, this);
            return s;
        }
        else{
            game.time.events.add(Phaser.Timer.SECOND * 1, this.minusScore, this);
        }
    },

    plusScore: function(){
        score++;
        count = 0;
        icecream.removeAll(true);
        ex = '';
        s ='';
    },

    minusScore: function(){
        score--;
        count = 0;
        icecream.removeAll(true);
        ex = '';
        s ='';
        if(score == -1){
            game.state.start("gameOverScreen");
        }
    },

    playFx: function(){
        plob = game.sound.play('plob');
    },

 };


var gameOverScreen = function(game) {}
    gameOverScreen.prototype = {
        create: function() {
            console.log("==gameOverScreen state. Create method");
        }
}

