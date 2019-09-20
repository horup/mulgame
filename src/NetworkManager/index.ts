import {Msg, Thing} from './Msg';
import {EventEmitter} from 'events';

export class GameState
{
    size:number = 0;
    things:{[id:string]:Thing} = {};
}

export class NetworkManager
{
    state = new GameState();
    emitter = new EventEmitter();
    on(event:'msg', f:(msg:Msg)=>any)
    {
        this.emitter.addListener(event, f);
    }
    
    pushMsg(msg:Msg)
    {
        this.onMsg(msg);
        this.emitter.emit('msg', msg);
    }

    onMsg(msg:Msg)
    {
        let s = this.state;
        if (msg.setSize)
            s.size = msg.setSize.size;
        else if (msg.setThing)
        {
            let t = msg.setThing;
            s.things[t.id] = t;
        }
    }
}