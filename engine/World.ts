import Hashset from "util/Hashset";
import Event from "util/Event";
import Ship from "entities/Ship";
import {Command} from 'engine/commands/Command';
import IdGenerator from "../util/IdGenerator";
import MarkerSet from "./entities/MarkerSet";
import Port from "./entities/Port";
import Resource from "./entities/Resource";


export default class World {

    public tickNumber:number = 0;
    public clock = new Event<number>();

    public idGenerator = new IdGenerator();


    public ships = new Hashset<Ship>(s=>s.id);
    public ports = new Hashset<Port>(s=>s.id);
    public resources = new Hashset<Resource>(s=>s.id);
    public markers = new MarkerSet(this);

    public commandIssuingDepth = 0;

    public IssueCommand(...commands: Command[]){
        for(var i=0;i<commands.length;i++){
            var command = commands[i];

            console.debug(Array(this.commandIssuingDepth).join(">") + 'executing command', command);
            this.commandIssuingDepth++;
            var result = command.execute(this);
            this.commandIssuingDepth--;
            if(!result.isSuccessful)
                console.debug(Array(this.commandIssuingDepth).join(">") +'unable to execute command', command, result);
        }

    }

    public tick(){
        this.clock.trigger(this.tickNumber++);
    }
}



