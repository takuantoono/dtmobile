//-----------------------------------------------------------------------------
// Ponydeluxe Autosave/Quicksave
// free for commercial and non-commercial use
// credits to Ponydeluxe
//-----------------------------------------------------------------------------
/*:
 * @plugindesc This is a plugin that gives you a simple autosave and quicksave function.
 * 
 * 
 * 
 * @author Ponydeluxe
 * 
 * 
 * @param ChooseSlot
 * @desc Determines the save file ('1' for file1 etc) for autosave
 * Choose '0' for saving under last existing file.
 * @default 1
 *
 *
 *
 * @help 
 *
 * The autosave function will save the player's game with no need to open 
 * the menu screen. The save file will be created under the number of the
 * file you choose or under the last existing file, so the player doesn't  
 * overwrite his files with the autosave funktion.
 * 
 * If you like to autosave your game, create an event with a plugin command.
 * If you like to quicksave your game, instructions will follow soon. 
 *
 *
 * Plugin Command for autosave: SaveNow
 *
 *
 * 
 *
 */

var parameters = PluginManager.parameters('Autosave');

 //var saveID = Number(parameters['ChooseSlot'] || 1);
 var autoSaveCommand = Game_Interpreter.prototype.pluginCommand;

Game_Interpreter.prototype.pluginCommand = function(command, args)
{
    autoSaveCommand.call(this, command, args);
    var x = Number(parameters['ChooseSlot'] || 1);
    var lastID = DataManager.lastAccessedSavefileId();

    if(command == 'SaveNow')
    {
       if(x == 0)
       {
       	$gameSystem.onBeforeSave()
       	DataManager.saveGame(lastID)
       }
       else
       {
       		$gameSystem.onBeforeSave()
       		DataManager.saveGame(x)
       };      	

       
   
	};
};

