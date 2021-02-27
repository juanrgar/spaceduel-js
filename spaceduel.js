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

class Game {
    constructor() {
        this.canvas = document.getElementById('screen');
        this.ctx = this.canvas.getContext('2d');

        this.canvas.width = 800;
        this.canvas.height = 600;

        this.background = document.getElementById('background');
        this.sun = document.getElementById('sprite_sun');
    }

    init() {
        this._init_view();
    }

    _init_view() {
        this.background.onload = function() {
            let pattern = this.ctx.createPattern(this.background, 'repeat');
            this.ctx.fillStyle = pattern;
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }.bind(this);

        this.sun.onload = function () {
            this.ctx.drawImage(this.sun,
                this.canvas.width / 2 - this.sun.naturalWidth / 2,
                this.canvas.height / 2 - this.sun.naturalHeight / 2);
        }.bind(this);
    }
}

const game = new Game();

$(function() {
    game.init();
});
