


Element.implement({
	
	addDelegate: function(type,selector,fn){
		var elmt = document.id(this);
		
		var stores = elmt.retrieve('delegates') || {};
		if(stores[type] && stores[type][selector]) return elmt;
		if(!stores[type]) stores[type] = {};
		
		stores[type][selector] = function(e){
			var target = document.id(e.target);
			elmt.getElements(selector).each(function(el){
				if(el == target) fn(e);
			});
		};

		return elmt.addEvent(type,stores[type][selector]).store('delegates',stores);
	},
	
	addDelegates: function(types){
		for(var type in types){
			for(var selector in types[type]){
				this.addDelegate(type,selector,types[type][selector]);
			}
		}
		return this;
	},
	
	removeDelegate: function(type,selector){
		var elmt = document.id(this);
		
		var stores = this.retrieve('delegates') || {};
		if(!stores[type] || !stores[type][selector]) return elmt;
		
		elmt.removeEvent(type,stores[type][selector]);
		stores[type][selector] = null;
		
		return elmt;
	},
	
	removeDelegates: function(types){
		for(var type in types){
			$splat(types[type]).each(function(selector){
				this.removeDelegate(type,selector);
			}.bind(this));
		}
		return this;		
	}
	
});

