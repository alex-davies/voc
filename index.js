define(["require", "exports", 'engine/World', 'ui/WorldDisplay', 'pixi.js', "engine/commands/ShipBuildCommand", "./ui/Hud", 'react-dom', 'react', "./ui/react/GameView", "./engine/commands/editor/WorldPopulateCommand"], function (require, exports, World_1, WorldDisplay_1, PIXI, ShipBuildCommand_1, Hud_1, ReactDOM, React, GameView_1, WorldPopulateCommand_1) {
    var world = new World_1.default();
    world.IssueCommand(new ShipBuildCommand_1.default({ lat: 0, lng: 0 }));
    world.IssueCommand(new WorldPopulateCommand_1.default());
    //world.IssueCommand(new ShipBuildAction({lat:45,lng:0}))
    //React world
    var view = document.createElement("section");
    document.body.appendChild(view);
    ReactDOM.render(React.createElement(GameView_1.default, { world: world }), view);
    var hud = new Hud_1.default(new WorldDisplay_1.default(world));
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
    window.requestAnimationFrame(animate);
    function animate() {
        world.tick();
        //worldDisplay.tick();
        renderer.render(hud);
        window.requestAnimationFrame(animate);
    }
});
//# sourceMappingURL=index.js.map