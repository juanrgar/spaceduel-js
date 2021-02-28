/**
 * This file is part of spaceduel-js.
 *
 * Copyright (C) 2021 Juan R. García Blanco <juanrgar@gmail.com>
 *
 * spaceduel-js is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * spaceduel-js is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with spaceduel-js.  If not, see <https://www.gnu.org/licenses/>.
 */


class Sprite {
    constructor(name, ctx, x, y) {
        this.sprite = document.getElementById(name);
        this.ctx = ctx;

        this.x = x - this.sprite.naturalWidth;
        this.y = y - this.sprite.naturalHeight;

        this.loaded = false;
        this.sprite.onload = function () {
            console.log('loaded');
            this.loaded = true;
        }.bind(this);
    }

    draw() {
        this.ctx.drawImage(this.sprite, this.x, this.y);
    }
}

class Ship extends Sprite {
    constructor(name, ctx, x, y, rot) {
        super(name, ctx, x, y);
        this.rot = rot;

        this.avail_bullets = 0;
        this.fired_bullets = 0;
    }

    draw() {
        this.ctx.save();
        this.ctx.translate(this.ctx.canvas.width / 2, this.ctx.canvas.height / 2);
        this.ctx.rotate(this.rot * Math.PI / 180);
        this.ctx.drawImage(this.sprite, this.x, this.y);
        this.ctx.restore();
    }
}

class Game {
    constructor() {
        this.canvas = document.getElementById('screen');
        this.ctx = this.canvas.getContext('2d');

        this.canvas.width = 800;
        this.canvas.height = 600;

        this.background = document.getElementById('background');
        this.background_loaded = false;
        this.background.onload = function() {
            console.log('loaded');
            this.background_loaded = true;
        }.bind(this);

        this.sun = new Sprite('sprite_sun', this.ctx, this.canvas.width / 2, this.canvas.height / 2);

        const y = this.canvas.height / 2;
        const x1 = this.canvas.width / 4;
        const x2 = x1 * 3;
        this.ship1 = new Ship('sprite_ship1', this.ctx, x1, y, 0);
        this.ship2 = new Ship('sprite_ship2', this.ctx, x2, y, 90);
    }

    init() {
        console.log(this.sun.loaded);
        console.log(this.ship1.loaded);
        console.log(this.ship2.loaded);
        // while (!this.background_loaded) ;
        // while (!this.sun.loaded) ;
        // while (!this.ship1.loaded) ;
        // while (!this.ship2.loaded) ;
    }

    _drawAll() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this._drawBackground();
        this.sun.draw();
    }

    _drawBackground() {
        let pattern = this.ctx.createPattern(this.background, 'repeat');
        this.ctx.fillStyle = pattern;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

const game = new Game();

$(function() {
    game.init();
});
