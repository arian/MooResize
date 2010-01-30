MooResize
===============

	MooResize adds three handles to any image or other DOM Element. With these handles, you can resize 
your element on a easy way. It has three events, onStart, onResize and onComplete so it is very flexible too. 
Also it is very easy to set a ratio by the setRatio method.

![Screenshot](http://github.com/arian/MooResize/raw/master/screenshot.png)

How to use
----------

First you have to include the javascript file in the head of your document

	#HTML
	<script src="../Source/MooResize.js" type="text/javascript"></script>

In the body

	#HTML
	<img id="resizeMe" src="image.jpg" alt="Look, you can resize me" />
	
Then add the following javascript

	#JS
	new resize = new MooResize('resizeMe');
	
And you're done!	

### Other Example ###

	#JS
	var resize = new MooResize('img1',{
		handleSize: 15,
		handleStyle: {
			background: 'blue'
		},
		onStart: function(){
			document.id(this).setStyle('opacity',0.5);
		},
		onComplete: function(size){
			setSizeText(size);
			alert(size.x+' '+size.y);
		},
		minSize: {
			width: 100,
			height: 50
		}
	});
	

## Class: MooResize ##

### MooResize method: constructor ###

	#JS
	new MooResize(element[,options]);

#### Arguments ####
1. element - (*string*,*element*) The element to be resized
1. options - (*object*,optional) The MooResize Options. See below

#### Options ####
1. handleSize - (*number*: defaults to 10) The size of the handles  
2. minSize - (*number*,*object*: defaults to 10) The minimum size. You can set a number or an object e.g. *{width: 20, height: 50}*
3. ratio - (*boolean*,*float*: defaults to false) Should it keep a ratio: true or false. If you set a float, e.g. 1.5 you can set the width/height ratio
4. dragOptions: (*object*) The options of MooTools More's Drag
5. handleStyle: (*object*) Style the handles

#### Events ####
1. start - (*function*) Fires when you start resizing
2. resize - (*function*) When you are resizing
3. complete - (*function*) When you're ready with resizing


### MooResize Method: setSize ###

Set the size of the element (including the new position
of the handles)

#### Syntax ####
	
	#JS
	resize.setSize(width,height);
	
#### Arguments ####

1. width - (*number*) - The new width
2. height - (*number*) - The new height

#### Returns ####

- (*MooResize*) - MooResize instance

### MooResize Method: getSize ###

Get the size of the element

#### Syntax ####
	
	#JS
	resize.getSize(); // {x: 256, y: 643}
	
#### Returns ####

- (*object*) - An object with x and y

### MooResize Method: setRatio ###

Set a ratio

#### Syntax ####
	
	#JS
	resize.ratio(ratio);
	
#### Arguments ####

1. ratio - (*boolean*,*float*) - Just true or false, or a width/height number 

#### Returns ####

- (*MooResize*) - MooResize instance

### MooCss Method: getRatio ###

Get the current ratio as width/height

#### Syntax ####
	
	#JS
	resize.getRatio(); // 1.25
	
#### Returns ####

- (*float*) - The ratio

### MooResize Method: dispose ###

Remove the handles

#### Syntax ####
	
	#JS
	resize.dispose();

### MooResize Method toElement ###

Get your element back

#### Syntax ####
	
	#JS
	document.id(resize);

