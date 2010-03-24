/*
---
description: Simpler event delegation for MooTools.
 
license: MIT-style
 
authors:
- Arian Stolwijk
 
requires:
- core/1.2.4: Element.Event
- core/1.2.4: Selectors
 
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
		
		for(var i = 0; i < stores[type][selector].length; i++){
			if(stores[type][selector][i][1] === fn){
				elmt.removeEvent(type,stores[type][selector][i][0]);
				delete stores[type][selector][i];
				return elmt;
			}
		}
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

