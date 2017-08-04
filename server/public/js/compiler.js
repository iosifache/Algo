// Show and run
function showCode(){
  Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
  var code = Blockly.JavaScript.workspaceToCode(workspace);
  code = code.replace(/^.*highlightBlock.*$/mg, "");
  code = code.replace(/\n{2,}/g,"\n");
  code = code.slice(1, code.length)
  editor.setValue(code, 1);
}
function runCode(){
  window.LoopTrap = 1000;
  Blockly.JavaScript.INFINITE_LOOP_TRAP = 'if (--window.LoopTrap == 0) throw "Infinite loop.";\n';
  var code = Blockly.JavaScript.workspaceToCode(workspace);
  Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
  try{
    eval(code);
  }
  catch (e){
    editor.setValue(e, 1);
  }
}
document.getElementById("show").addEventListener("click", showCode);
document.getElementById("play").addEventListener("click", runCode);

// Init Blocky
var workspace = Blockly.inject('blocklyDiv',  {toolbox: document.getElementById('toolbox')});
var code = Blockly.JavaScript.workspaceToCode(workspace);
var editor = ace.edit("editor");
editor.setTheme('ace/theme/monokai');
editor.getSession().setMode('ace/mode/javascript');
editor.getSession().setUseWorker(false);
editor.setShowPrintMargin(false);
editor.container.style.pointerEvents="none";
editor.renderer.setStyle("disabled", true);
editor.blur();
editor.renderer.$cursorLayer.element.style.display = "none"

// Step
document.getElementById("step").addEventListener("click", stepCode);
var stepButton = document.getElementById('step');
var myInterpreter = null;
function initApi(interpreter, scope){
  editor.setValue('', 1);
  interpreter.setProperty(scope, 'alert', interpreter.createNativeFunction(function(text){
    text = text ? text.toString() : '';
    var actualCode = editor.getValue();
    editor.setValue(actualCode  + text + '\n', 1);
  }));
  var wrapper = function(text){
    text = text ? text.toString() : '';
    return interpreter.createPrimitive(prompt(text));
  };
  interpreter.setProperty(scope, 'prompt', interpreter.createNativeFunction(wrapper));
  var wrapper = function(id){
    id = id ? id.toString() : '';
    return interpreter.createPrimitive(highlightBlock(id));
  };
  interpreter.setProperty(scope, 'highlightBlock', interpreter.createNativeFunction(wrapper));
}
var highlightPause = false;
var latestCode = '';
function highlightBlock(id){
  workspace.highlightBlock(id);
  highlightPause = true;
}
function resetStepUi(clearOutput){
  workspace.highlightBlock(null);
  highlightPause = false;
  var actualCode = editor.getValue();
  if (clearOutput) editor.setValue('\n' + 'Rezultate de iesire:\n=================', 1);
}
function generateCodeAndLoadIntoInterpreter(){
  Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
  Blockly.JavaScript.addReservedWords('highlightBlock');
  Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
  latestCode = Blockly.JavaScript.workspaceToCode(workspace);
  resetStepUi(false);
}
function stepCode(){
  if (!myInterpreter){
    resetStepUi(false);
    myInterpreter = new Interpreter(latestCode, initApi);
    setTimeout(function(){
      highlightPause = true;
      stepCode();
    }, 1);
    return;
  }
  highlightPause = false;
  do{
    try{
      var hasMoreCode = myInterpreter.step();
    } finally{
      if (!hasMoreCode){
        var actualCode = editor.getValue();
        editor.setValue(actualCode + '\n\n<< Program terminat >>', 1);
        myInterpreter = null;
        resetStepUi(false);
        stepButton.disabled = 'disabled';
        setTimeout(function(){
          stepButton.disabled = '';
        }, 2000);
        return;
      }
    }
  } while (hasMoreCode && !highlightPause);
}
generateCodeAndLoadIntoInterpreter();
workspace.addChangeListener(function(event){
  if (!(event instanceof Blockly.Events.Ui)){
    generateCodeAndLoadIntoInterpreter();
  }
});
