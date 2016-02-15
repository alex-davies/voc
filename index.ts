import World from 'engine/World'
import WorldDisplay from 'ui/WorldDisplay'
import * as PIXI from 'pixi.js'
import ShipBuildAction from "engine/commands/ShipBuildCommand";
import ShipMoveCommand from "engine/commands/ShipTravelCommand";
import MarkerCreateCommand from "./engine/commands/editor/MarkerCreateCommand";
import Camera2 from "./ui/Camera";
import Hud from "./ui/Hud";
import * as ReactDOM from 'react-dom';
import * as React from 'react';

import PortView from "./ui/react/PortView";
import GameView from "./ui/react/GameView";
import WorldPopulateCommand from "./engine/commands/editor/WorldPopulateCommand";

var world = new World();
world.IssueCommand(new ShipBuildAction({lat:0,lng:0}));
world.IssueCommand(new WorldPopulateCommand());
//world.IssueCommand(new ShipBuildAction({lat:45,lng:0}))


//React world
var view = document.createElement("section");
document.body.appendChild(view);
ReactDOM.render(React.createElement(GameView, {world:world}), view);




var hud = new Hud(new WorldDisplay(world));

// create a renderer instance.
var renderer = PIXI.autoDetectRenderer(1136, 640);
renderer.backgroundColor = 0x1C6BA0;

// add the renderer view element to the DOM
document.body.appendChild(renderer.view);


//world.IssueCommand(new MarkerCreateCommand({lat:0,lng:0}, "m1", ["m2"]))
//world.IssueCommand(new MarkerCreateCommand({lat:0,lng:20}, "m2",["m3"]))
//world.IssueCommand(new MarkerCreateCommand({lat:0,lng:40}, "m3",["m4"]))
//world.IssueCommand(new MarkerCreateCommand({lat:0,lng:60}, "m4",["m5"]))
//world.IssueCommand(new MarkerCreateCommand({lat:0,lng:80}, "m5",["m6"]))
//
//world.IssueCommand(new MarkerCreateCommand({lat:40,lng:40}, "m6",["m1","m7"]))
//
//world.IssueCommand(new MarkerCreateCommand({lat:40,lng:-60}, "m7",[]))


//world.IssueCommand(new ShipMoveCommand("ship-001", ["marker-001", "marker-002", "marker-003"]))

window.requestAnimationFrame( animate );

function animate() {

    world.tick();
    //worldDisplay.tick();
    renderer.render(hud);

    window.requestAnimationFrame( animate );
}