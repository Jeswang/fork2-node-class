#!/usr/bin/env node

function Class(input, superClass){
  var constructor;  
  if(input.initialize){
    constructor = function(){
      input.initialize.apply(this, [].slice.call(arguments,0));
    }
  }
  else{
    constructor = function(){}
  }

  function ctor() {
    this.constructor = constructor;
  }

  constructor.prototype = new ctor();

  if(superClass){
    constructor.__super__ = superClass;
    ctor.prototype = superClass.prototype
  }
  else{
    constructor.__super__ = Object;
    ctor.prototype = Object.prototype;
  }

  if(superClass){
    for(var key in superClass.prototype){
      if(key!='constructor'){
        constructor.prototype[key] = superClass.prototype[key];
      }
    }
  }


  ctor.prototype.constructor = ctor;
 
  for(var key in input){
    if(key != "initialize"){
      constructor.prototype[key] = input[key]; 
    }
  }
  
  var current_class = constructor;
  var count = 0;

  constructor.prototype.super = function(name){
    parent = current_class.__super__;
    if(name){
      current_class = current_class.__super__;
      count = count + 1;
      result = parent.prototype[name].apply(this, [].slice.call(arguments,1));
      count = count - 1;
      if(count==0){
        current_class = constructor;
      }
      //console.log(result);
      return result;
    }
  };

  return constructor;
}

module.exports = Class;
