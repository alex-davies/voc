import WorldDisplay from "../WorldDisplay";
import MarkerSet from "../../engine/entities/MarkerSet";
import Hashset from "../../util/Hashset";
import {Change} from "../../util/Change";
import {Entity} from "../../engine/entities/Entity";
import DisplayObject = PIXI.DisplayObject;
import Marker from "../../engine/entities/Marker";

export default class EntityDisplayContainer<TEntity extends Entity, TDisplay extends DisplayObject> extends PIXI.Container{
    public worldDisplay:WorldDisplay;
    public entitySet:Hashset<TEntity>;
    public createFunction:(TEntity)=>TDisplay;

    public childLookup = new Hashset<TDisplay>(x=>x.entity.id)

    constructor(worldDisplay: WorldDisplay, entitySet: Hashset<TEntity>, create:(TEntity)=>TDisplay) {
        super();
        this.worldDisplay = worldDisplay;
        this.entitySet = entitySet;
        this.createFunction = create;

        this.entitySet.observe(change=>{
            //we are adding a ship
            if(change.newValue && !this.childLookup.containsHash(change.newValue.id)){
                var entityDisplayToAdd = create(change.newValue);
                this.addChild(entityDisplayToAdd);
                this.childLookup.put(entityDisplayToAdd)
            }

            //we are removing a ship
            else if(!change.newValue && this.childLookup.containsHash(change.oldValue.id)){
                var entityDisplayToRemove = this.childLookup.get(change.oldValue.id);
                this.removeChild(entityDisplayToRemove);
            }
        });
    }
}

