/*
---
description: Simpler event delegation for MooTools.
 
license: MIT-style
 
authors:
- Arian Stolwijk
 
requires:
  core/1.2.4:
  - Element.Event
  - Selectors
 
provides: [Element.addDelegate, Element.addDelegates, Element.removeDelegate, Element.removeDelegates,Element.Properties.delegates.set]
 
...
*/


Element.Properties.delegates = {
	set: function(delegates){
		this.addDelegates(delegates);
	}
};

Element.implement({
	
	addDelegate: function(type,selector,fn){
		var elmt = document.id(this);
				
		var delegatefn = function(e){
			var target = document.id(e.target);
			elmt.getElements(selector).each(function(el){
				if(el === target) fn.apply(el,[e]);
			});
		};
		
		var stores = elmt.retrieve('delegates') || {};
		if(!stores[type]) stores[type] = {};
		if(!stores[type][selector]) stores[type][selector] = [];
		stores[type][selector].push([delegatefn,fn]);

		return elmt.addEvent(type,delegatefn).store('delegates',stores);
	},
	
	addDelegates: function(types){
		for(var type in types){
			for(var selector in types[type])
				this.addDelegate(type,selector,types[type][selector]);
		}
		return this;
	},
	
	removeDelegate: function(type,selector,fn){
		var elmt = document.id(this);
		
		var stores = this.retrieve('delegates');
		if(!stores[type] || !stores[type][selector]) return elmt;
		
		$each(stores[type][selector],function(fns,i){
			if(fns[1] === fn){
				elmt.removeEvent(type,fns[0]);
				delete stores[type][selector][i];
			}
		});
		return elmt;
	},
	
	removeDelegates: function(types){
		for(var type in types){
			for(var selector in types[type])
				this.removeDelegate(type,selector,types[type][selector]);
		}
		return this;		
	}
	
});

