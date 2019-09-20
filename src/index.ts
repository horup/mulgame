import * as Phaser from 'phaser';
import Vector2 = Phaser.Math.Vector2;
import {TILESIZE} from './constants';
import bresenham from 'bresenham';
import {MessageManager} from './MessageManager';
import { Msg } from './MessageManager/Msg';

declare var require;


export class AttScene extends Phaser.Scene
{
    messageManager:MessageManager;
    currentPlayer = 0;
    constructor(config:any)
    {
        super(config);
    }

    init()
    {
    }

    preload()
    {
        this.load.spritesheet('units', require('../assets/spritesheet.png'), { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('tiles', require('../assets/basictiles.png'), { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('overlay', require('../assets/overlay.png'), { frameWidth: 16, frameHeight: 16 });
    }

    tilemap:Phaser.Tilemaps.Tilemap;
    last = {x:0, y:0};
    overlay:Phaser.GameObjects.Graphics;
    grayness:Phaser.GameObjects.Rectangle;

    
    create()
    {
        this.messageManager = new MessageManager();
        this.game.canvas.oncontextmenu = (e)=>e.preventDefault();
        this.tilemap = this.make.tilemap({tileHeight:16, tileWidth:16, width:256, height:256});
        this.tilemap.addTilesetImage('tiles');
        this.tilemap.addTilesetImage('units');
        this.tilemap.addTilesetImage('overlay');

        this.tilemap.createBlankDynamicLayer("ground", 'tiles').setInteractive().on('pointerdown', (e:PointerEvent)=>
        {
            
        })

        this.tilemap.setLayer("ground");
        let size = 32;
      /*  for (let y = 0; y < size; y++)
            for (let x = 0; x < size; x++)
                this.tilemap.putTileAt(11, x, y);*/

        this.input.keyboard.on('keydown', (e:KeyboardEvent)=>
        {
            if (e.keyCode == 32)
            {
            }
            else if (e.key == "1")
                this.currentPlayer = 0;
            else if (e.key == "2")
                this.currentPlayer = 1;
        });

        this.messageManager.on('msg', (msg)=>this.onMsg(msg));

        this.messageManager.pushMsg({setSize:{size:32}});
    }

    onMsg(msg:Msg)
    {
        this.tilemap.setLayer("ground");
        if (msg.setSize)
        {
            let size = msg.setSize.size;
            for (let y = 0; y < size; y++)
                for (let x = 0; x < size; x++)
                    this.tilemap.putTileAt(11, x, y);
        }
    }


    update()
    {
        
    }
}

export class Client extends Phaser.Game
{
    constructor()
    {
        super({
            type: Phaser.AUTO,
            width: 640,
            height: 640,
            backgroundColor: 'black',
            parent: 'AttGame',
            scene: [AttScene]
        });

    }
}


new Client();