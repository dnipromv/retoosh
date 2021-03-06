var Bullet = function (game, key,damage) {

    Phaser.Sprite.call(this, game, 0, 0, key);

    this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
    this.enableBody = true;
    this.anchor.set(0.5);

    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
    this.exists = false;

    this.tracking = false;
    this.scaleSpeed = 0;
    this.damage = damage;
    return this;
};

Bullet.prototype = Object.create(Phaser.Sprite.prototype);
Bullet.prototype.constructor = Bullet;

Bullet.prototype.fire = function (x, y, angle, speed, gx, gy) {

    gx = gx || 0;
    gy = gy || 0;

    this.reset(x, y);
    this.scale.set(1);

    this.game.physics.arcade.velocityFromAngle(angle, speed, this.body.velocity);

    this.angle = angle;

    this.body.gravity.set(gx, gy);

};
Bullet.prototype.fireBoss = function (x, y, angle, speed, gx, gy) {

    this.reset(x, y);
    this.scale.set(1);
    this.rotation = this.game.physics.arcade.moveToObject(this, this.game.world.children[7], speed);

};

Bullet.prototype.update = function () {

    if (this.tracking)
    {
        this.rotation = Math.atan2(this.body.velocity.y, this.body.velocity.x);
    }

    if (this.scaleSpeed > 0)
    {
        this.scale.x += this.scaleSpeed;
        this.scale.y += this.scaleSpeed;
    }

};

var Weapon = {};


Weapon.SingleBullet = function (game) {

    Phaser.Group.call(this, game, game.world, 'Single Bullet', false, true, Phaser.Physics.ARCADE);

    this.nextFire = 0;
    this.bulletSpeed = 600;
    this.fireRate = 200;

    for (var i = 0; i < 64; i++)
    {
        this.add(new Bullet(game, 'bullet', 10), true);
    }

    return this;

};

Weapon.SingleBullet.prototype = Object.create(Phaser.Group.prototype);
Weapon.SingleBullet.prototype.constructor = Weapon.SingleBullet;

Weapon.SingleBullet.prototype.fire = function (source) {

    if (this.game.time.time < this.nextFire) { return; }

    var x = source.x + 10;
    var y = source.y;

    this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, 0);

    this.nextFire = this.game.time.time + this.fireRate;
    
    var laser_sound = this.game.add.audio('laser_1');
    laser_sound.volume = this.game.rnd.realInRange(0.4,1);
    laser_sound.play();
    laser_sound._sound.playbackRate.value = this.game.rnd.realInRange(0.85,1.15);
};
Weapon.SingleBullet.prototype.fireBoss = function (source) {

    if (this.game.time.time < this.nextFire) { return; }

    var x = source.x + 10;
    var y = source.y;

    this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed * -1, 0, 0);

    this.nextFire = this.game.time.time + this.fireRate;

    var laser_sound = this.game.add.audio('laser_1');
    laser_sound.volume = this.game.rnd.realInRange(0.4,1);
    laser_sound.play();
    laser_sound._sound.playbackRate.value = this.game.rnd.realInRange(0.85,1.15);
};
Weapon.FrontAndBack = function (game) {

    Phaser.Group.call(this, game, game.world, 'Front And Back', false, true, Phaser.Physics.ARCADE);

    this.nextFire = 0;
    this.bulletSpeed = 600;
    this.fireRate = 100;

    for (var i = 0; i < 64; i++)
    {
        this.add(new Bullet(game, 'bullet', 5), true);
    }

    return this;

};

Weapon.FrontAndBack.prototype = Object.create(Phaser.Group.prototype);
Weapon.FrontAndBack.prototype.constructor = Weapon.FrontAndBack;

Weapon.FrontAndBack.prototype.fire = function (source) {

    if (this.game.time.time < this.nextFire) { return; }

    var x = source.x + 10;
    var y = source.y;

    this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, 0);
    this.getFirstExists(false).fire(x, y, 180, this.bulletSpeed, 0, 0);

    this.nextFire = this.game.time.time + this.fireRate;
};


Weapon.ThreeWay = function (game) {
    Phaser.Group.call(this, game, game.world, 'Three Way', false, true, Phaser.Physics.ARCADE);

    this.nextFire = 0;
    this.bulletSpeed = 600;
    this.fireRate = 100;

    for (var i = 0; i < 96; i++) {
        this.add(new Bullet(game, 'bullet', 5), true);
    }

    return this;
};
Weapon.ThreeWay.prototype = Object.create(Phaser.Group.prototype);
Weapon.ThreeWay.prototype.constructor = Weapon.ThreeWay;
Weapon.ThreeWay.prototype.fire = function (source) {
    if (this.game.time.time < this.nextFire) { return; }
    var x = source.x + 10;
    var y = source.y;

    this.getFirstExists(false).fire(x, y, 270, this.bulletSpeed, 0, 0);
    this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, 0);
    this.getFirstExists(false).fire(x, y, 90, this.bulletSpeed, 0, 0);

    this.nextFire = this.game.time.time + this.fireRate;
};


Weapon.EightWay = function (game) {
    Phaser.Group.call(this, game, game.world, 'Eight Way', false, true, Phaser.Physics.ARCADE);

    this.nextFire = 0;
    this.bulletSpeed = 600;
    this.fireRate = 100;

    for (var i = 0; i < 96; i++) {
        this.add(new Bullet(game, 'bullet', 5), true);
    }

    return this;
};
Weapon.EightWay.prototype = Object.create(Phaser.Group.prototype);
Weapon.EightWay.prototype.constructor = Weapon.EightWay;
Weapon.EightWay.prototype.fire = function (source) {

    if (this.game.time.time < this.nextFire) { return; }

    var x = source.x + 16;
    var y = source.y;

    this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, 0);
    this.getFirstExists(false).fire(x, y, 45, this.bulletSpeed, 0, 0);
    this.getFirstExists(false).fire(x, y, 90, this.bulletSpeed, 0, 0);
    this.getFirstExists(false).fire(x, y, 135, this.bulletSpeed, 0, 0);
    this.getFirstExists(false).fire(x, y, 180, this.bulletSpeed, 0, 0);
    this.getFirstExists(false).fire(x, y, 225, this.bulletSpeed, 0, 0);
    this.getFirstExists(false).fire(x, y, 270, this.bulletSpeed, 0, 0);
    this.getFirstExists(false).fire(x, y, 315, this.bulletSpeed, 0, 0);

    this.nextFire = this.game.time.time + this.fireRate;
};

Weapon.ScatterShot = function (game) {
    Phaser.Group.call(this, game, game.world, 'Scatter Shot', false, true, Phaser.Physics.ARCADE);

    this.nextFire = 0;
    this.bulletSpeed = 600;
    this.fireRate = 40;

    for (var i = 0; i < 32; i++) {
        this.add(new Bullet(game, 'bullet', 10), true);
    }

    return this;
};
Weapon.ScatterShot.prototype = Object.create(Phaser.Group.prototype);
Weapon.ScatterShot.prototype.constructor = Weapon.ScatterShot;
Weapon.ScatterShot.prototype.fire = function (source) {
    if (this.game.time.time < this.nextFire) { return; }

    var x = source.x + 16;
    var y = source.y + this.game.rnd.between(-10, 10);

    this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, 0);
    this.nextFire = this.game.time.time + this.fireRate;
};

Weapon.ScaleBullet = function (game) {
    Phaser.Group.call(this, game, game.world, 'Scale Bullet', false, true, Phaser.Physics.ARCADE);

    this.nextFire = 0;
    this.bulletSpeed = 800;
    this.fireRate = 100;

    for (var i = 0; i < 32; i++) {
        this.add(new Bullet(game, 'bullet', 20), true);
    }
    this.setAll('scaleSpeed', 0.05);

    return this;
};
Weapon.ScaleBullet.prototype = Object.create(Phaser.Group.prototype);
Weapon.ScaleBullet.prototype.constructor = Weapon.ScaleBullet;
Weapon.ScaleBullet.prototype.fire = function (source) {

    if (this.game.time.time < this.nextFire) { return; }

    var x = source.x + 10;
    var y = source.y;

    this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, 0);

    this.nextFire = this.game.time.time + this.fireRate;
};