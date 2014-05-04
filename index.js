#!/usr/bin/env node

function Class(input, superClass){
  var obj;  
  if(input.initialize){
    obj = function(){
      input.initialize.apply(this, [].slice.call(arguments,0));
    }
  }
  else{
    obj = function(){}
  }

  function ctor() {
    this.constructor = obj;
  }

  obj.prototype = new ctor();
  //obj.prototype.constructor = obj;


  if(superClass){
    for(var key in superClass.prototype){
      //console.log(key);
      if(key!='constructor'){
        obj.prototype[key] = superClass.prototype[key];
      }
    }
  }

  if(superClass){
    obj.__super__ = superClass;
    ctor.prototype = new superClass();
  }
  else{
    obj.__super__ = Object;
    ctor.prototype = new Object();
  }

  ctor.prototype.constructor = ctor;
 
  for(var key in input){
    if(key != "initialize"){
      obj.prototype[key] = input[key]; 
    }
  }
  
  var current_class = obj;
  var count = 0;

  obj.prototype.super = function(name){
    parent = current_class.__super__;
    if(name){
      current_class = current_class.__super__;
      count = count + 1;
      result = parent.prototype[name].apply(this, [].slice.call(arguments,1));
      count = count - 1;
      if(count==0){
        current_class = obj;
      }
      //console.log(result);
      return result;
    }
  };

  return obj;
}

module.exports = Class;
