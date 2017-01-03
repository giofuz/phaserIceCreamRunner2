//function Goon(xPos, yPos, key, order){
//    this.xPos = xPos;
//    this.yPos = yPos;
//    this.key = 'goon';
//    this.order = order;
//}

Goon = function (game,x,y,key,frame)  {
    Phaser.Sprite.call(this, game, x, y,key,frame);
    //game.physics.enable(game, Phaser.Physics.ARCADE); //// this is the LINE
    this.body = true;
};

Goon.prototype = Object.create(Phaser.Sprite.prototype);
Goon.prototype.constructor = Goon;
