import {Msg, Thing} from './Msg';
import {EventEmitter} from 'events';
import * as mqtt from 'mqtt';
import { MqttClient } from 'mqtt';


export class GameState
{
    size:number = 0;
    things:{[id:string]:Thing} = {};
}

export class NetworkManager
{
    client:MqttClient;
    state = new GameState();
    emitter = new EventEmitter();
    updateFrequency = 2;

    rootTopic = "mulgame/somewhere/abc";

    constructor()
    {
        this.client = mqtt.connect("http://broker.mqttdashboard.com:8000/mqtt");
        this.client.subscribe(this.rootTopic);
        this.client.on('connect', (e)=>
        {
            
        });

        this.client.on('message', (topic, msg)=>
        {
            let s = msg.toString();
            let o = JSON.parse(s) as Msg;
            this.emitter.emit('msg', o);
        });
    }

    on(event:'msg', f:(msg:Msg)=>any)
    {
        this.emitter.addListener(event, f);
    }
    
    pushMsg(msg:Msg)
    {
        this.onMsg(msg);
        this.client.publish(this.rootTopic, JSON.stringify(msg));
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