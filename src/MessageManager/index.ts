import {Msg} from './Msg';
import {EventEmitter} from 'events';

export class MessageManager
{
    emitter = new EventEmitter();
    on(event:'msg', f:(msg:Msg)=>any)
    {
        this.emitter.addListener(event, f);
    }
    pushMsg(msg:Msg)
    {
        this.emitter.emit('msg', msg);
    }
}