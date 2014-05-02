#!/usr/bin/env node

function Class(input){
  
  if(input.initialize){
    obj = input.initialize;
  }
  else{
    obj = function(){}
  }
  
  for(key in input){
    if(key != "initialize"){
      obj.prototype[key] = input[key]; 
    }
  }
  
  return obj;
}

module.exports = Class;
