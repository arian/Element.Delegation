
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
				if(el == target) fn(e);
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
			for(var selector in types[type]){
				this.addDelegate(type,selector,types[type][selector]);
			}
		}
		return this;
	},
	
	removeDelegate: function(type,selector,fn){
		var elmt = document.id(this);
		
		var stores = this.retrieve('delegates') || {};
		if(!stores[type] || !stores[type][selector]) return elmt;
		
		for(var i = 0; i < stores[type][selector].length; i++){
			if(stores[type][selector][i][1] === fn){
				elmt.removeEvent(type,stores[type][selector][i][0]);
				stores[type][selector][i] = null;
				return elmt;
			}
		}
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

