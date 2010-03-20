Simpler Element.Delegation
=======================

This extension is a another fresh look at event delegation. No addEvent('relay(a)',fn) kind of things, but a more simple API

![Screenshot](http://github.com/arian/Element.Delegation/raw/master/screenshot.png)

How to use
----------

This is the most simple example how you can use this Element.Delegation

	#JS
    document.body.addDelegate('click','a',function(){
    	// do it!
    });
    
### More advanced Selector example

	#JS
	document.id('myElement').addDelegate('click','a[href^=mailto:]',function(){
		// so you want to mail someone ?
	});

### More delegates

	#JS
	document.id('myElement').addDelegates({
		'click': {
			'a[href^=mailto:]': function(){
				// so you want to mail someone ?
			},
			'a[a.email]': function(){
				// Do something else
			}
			
		},
		'mouseover': {
			'p': function(){
				// You hovered a paragraph
			}
		}
	});
	

### Remove delegates

	#JS
	var fn = function(){};
	document.id.addDelegate('click','a',fn);	
	document.id.removeDelegate('click','a',fn);


### Remove more than one at the time

	#JS
	var fn = function(){};
	document.id.addDelegate('click','a',fn);	
	document.id.removeDelegate({
		'click': {
			'a': fn
		}
	});

