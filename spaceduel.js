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

        this.x = x;
        this.y = y;
        this._update_draw_pos();
    }

    _update_draw_pos() {
        this.draw_x = this.x - this.sprite.naturalWidth / 2;
        this.draw_y = this.y - this.sprite.naturalHeight / 2;
    }

    draw() {
        this.ctx.drawImage(this.sprite, this.draw_x, this.draw_y);
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
        this.ctx.translate(this.x, this.y);
        this.ctx.rotate(this.rot * Math.PI / 180);
        this.ctx.translate(-this.x, -this.y);
        this.ctx.drawImage(this.sprite, this.draw_x, this.draw_y);
        this.ctx.restore();
    }
}

class Game {
    constructor() {
        this.canvas = document.getElementById('screen');
        this.ctx = this.canvas.getContext('2d');

        this.canvas.width = 800;
        this.canvas.height = 600;
    }

    init() {
        this.background = document.getElementById('background');

        this.sun = new Sprite('sprite_sun', this.ctx, this.canvas.width / 2, this.canvas.height / 2);

        const y = this.canvas.height / 2;
        const x1 = this.canvas.width / 4;
        const x2 = x1 * 3;
        this.ship1 = new Ship('sprite_ship1', this.ctx, x1, y, 0);
        this.ship2 = new Ship('sprite_ship2', this.ctx, x2, y, 180);

        this._drawAll();
    }

    _drawAll() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this._drawBackground();
        this.sun.draw();
        this.ship1.draw();
        this.ship2.draw();
    }

    _drawBackground() {
        let pattern = this.ctx.createPattern(this.background, 'repeat');
        this.ctx.fillStyle = pattern;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

const game = new Game();

$(window).on("load", function () {
    game.init();
});
