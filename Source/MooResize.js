/*
---
description: You can resize elements easilly with MooResize

authors:
  - Arian Stolwijk

license:
  - MIT-style license

requires:
  core/1.2.4: [Class.Extras,Element.Style]
  more/1.2.4: [Drag]

provides:
  - [MooResize]
...
*/


var MooResize = new Class({

	Implements: [Options,Events],
	
	options: {
		handleSize: 10,
		minSize: 10, // number or object with x and y
		ratio: false/*, false, true or any number (ratio = width/height)
		dragOptions: {},
		handleStyle: {},
		
		onStart: $empty,
		onResize: $empty,
		onComplete: $empty*/
	},
	
	initialize: function(el,options){
		this.setOptions(options);
		this.el = document.id(el);
		this.elCoords = this.el.getCoordinates();
		
		this.origRatio = this.elCoords.width / this.elCoords.height;
		this.setRatio(this.options.ratio);
		
		this.handles = {
			horz: {
				el: new Element('div').setStyle('cursor','w-resize'),
			 	dragOptions: {
					onDrag: function(el,e){
						this.setSize(e.page.x - this.elCoords.left,null);
					}.bind(this),
					modifiers: {x: 'left', y: false}
				},
				setPosition: function(width,height){
					this.handles.horz.el.setStyles({
						'left': width + this.elCoords.left - this.options.handleSize/2,
						'top': height / 2 + this.elCoords.top - this.options.handleSize/2
					})
				}.bind(this) 
			},
			vert: {
				el: new Element('div').setStyle('cursor','n-resize'),
				dragOptions: {
					bla: (function(){
						return this;
					})(),
					onDrag: function(el,e){
						this.setSize(null,e.page.y - this.elCoords.top);
					}.bind(this),
					modifiers: {x: false, y: 'top'}
				},
				setPosition: function(width,height){
					this.handles.vert.el.setStyles({
						'left': width / 2 + this.elCoords.left - this.options.handleSize/2,
						'top': height + this.elCoords.top - this.options.handleSize/2
					});				
				}.bind(this)
			},
			corner: {
				el: new Element('div').setStyle('cursor','se-resize'),
				dragOptions: {
					onDrag: function(el,e){
						var width = e.page.x - this.elCoords.left,
							height = e.page.y - this.elCoords.top;
						this.setSize(width,height);
					}.bind(this)					
				},
				setPosition: function(width,height){
					this.handles.corner.el.setStyles({
						'left': width + this.elCoords.left - this.options.handleSize/2,
						'top': height + this.elCoords.top - this.options.handleSize/2
					});
				}.bind(this) 
			}
		};
	
		$each(this.handles,function(handle,key){
			// Style each handle
			handle.el.setStyles($merge({
				border: '1px solid black',
				background: 'white'
			},this.options.handleStyle,{
				position: 'absolute',
				width: this.options.handleSize,
				height: this.options.handleSize
			})).inject(this.el,'after');
			handle.setPosition(this.elCoords.width,this.elCoords.height);
			
			// Apply the Drag class 
			handle.drag = new Drag(
				handle.el,
				$merge(this.options.dragOptions,handle.dragOptions)
			);	
			// Fire the onDrag event
			handle.drag.addEvents({
				'start': function(){
					this.fireEvent('start',[this.getSize()]);
				}.bind(this),
				'complete': function(){
					this.fireEvent('complete',[this.getSize()]);
				}.bind(this)
			});
		}.bind(this));
	},
	
	setSize: function(width,height){
		var minSizeWidth = (this.options.minSize.width ? this.options.minSize.width : this.options.minSize),
			minSizeHeight = (this.options.minSize.height ? this.options.minSize.height : this.options.minSize)
		width = width && width < minSizeWidth ? minSizeWidth : width;
		height = height && height < minSizeHeight ? minSizeHeight : height;

		if (!width && height){
			width = this.ratio ? height * this.ratio : this.elCoords.width;  
		} else if (!height && width){
			height = this.ratio ? width / this.ratio : this.elCoords.height; 
		} else if (width && height && this.ratio){
			height = width / this.ratio;
		}
		
		width = width.round();
		height = height.round();

		this.el.setStyles({
			width: width,
			height: height
		});

		$each(this.handles,function(handle){
			handle.setPosition(width,height);
		});
		
		this.elCoords = this.el.getCoordinates();
		this.fireEvent('resize',[{x: width, y: height},this.el]);
		return this;
	},
	
	getSize: function(){
		return {
			x: this.elCoords.width,
			y: this.elCoords.height
		};
	},
	
	setRatio: function(ratio){
		this.ratio = $type(ratio) == 'boolean' ?
			(ratio ? this.origRatio : false) : ratio;
		return this;
	},
	
	getRatio: function(){
		return this.ratio;
	},
	
	dispose: function(){
		$each(this.handles,function(handle){
			handle.el.dispose();
		});
		this.handles = null;
	},
	
	toElement: function(){
		return this.el;
	}

});
