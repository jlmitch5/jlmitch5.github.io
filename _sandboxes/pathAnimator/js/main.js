/*----------------------------------------------------------
	Page Configuration
-----------------------------------------------------------*/
(function(){
	var path = "m288.371155,40.093597c32.536194,28.892853 27.625427,50.734894 27.979095,85.707458l1.116913,110.444031l-158.477753,214.705353c-38.351501,57.828552 -12.406738,114.407227 50.496857,111.066162l363.756348,0.332397c67.993042,-0.258667 92.818542,-57.240936 40.126648,-117.28363l-150.328125,-208.286469l-2.829315,-110.62088c-0.353668,-34.972549 -5.705414,-56.729691 26.241058,-86.155914l-198.081726,0.091492z"
		firstWalkerObj = $('.maze > .walker')[0],
		walkers = [];
	
	// handles whatever moves along the path
	function AnimateWalker(walker){
		this.pathAnimator = new PathAnimator( path );
		this.walker = walker;
		this.reverse = false;
		this.speed = 30;
		this.easing = '';
		this.startOffset = null;
		this.color = 'deeppink'; // visually separate different walkers easily
	}

	AnimateWalker.prototype = {
		start : function(){
			//this.walker.style.cssText = "";
			this.startOffset = (this.reverse || this.speed < 0) ? 100 : 0; // if in reversed mode, then animation should start from the end, I.E 100%
			this.pathAnimator.context = this; // just a hack to pass the context of every Walker inside it's pathAnimator
			this.pathAnimator.start( this.speed, this.step, this.reverse, this.startOffset, this.finish, this.easing);
		},

		// Execute every "frame"
		step : function(point, angle){
			this.walker.style.cssText = "top:" + point.y + "px;" + 
										"left:" + point.x + "px;" + 
										"transform:rotate(" + angle + "deg);" +
										"-webkit-transform:rotate(" +  angle + "deg);" +
										"color:" + this.color;
		},

		// Restart animation once it was finished
		finish : function(){
			this.start();
		},

		// Resume animation from the last completed percentage (also updates the animation with new settings' values)
		resume : function(){
			this.pathAnimator.start( this.speed, this.step, this.reverse, this.pathAnimator.percent, this.finish, this.easing);
		}
	}

	function generateWalker(walkerObj){
		var newAnimatedWalker = new AnimateWalker( walkerObj );
		walkers.push(newAnimatedWalker);
		return newAnimatedWalker;
	}

	// start "animating" the first Walker on the page
	generateWalker(firstWalkerObj).start();
	// bind the first Controller to the first Walker
	var firstController = $('menu > div:first');
	resetController( firstController );
	firstController.data( 'walker', walkers[0] );

/*-----------------------------------------------------------
	User Controls
------------------------------------------------------------*/
	$('#showPath').on('change', togglePath);
	$('#addWalker').on('click', addWalker);
	$('menu')
		.on('click', '.delete', removeInstance)
		.on('click', '.stopPlay', stopPlay)
		.on('click', '.reverse', switchDirection)
		.on('change', '.speed', changeSpeed)
		.on('change', 'select', changeEasing);
		
	$('.speed').trigger('change');
	
	// show / hide the path of the animated object
	function togglePath(){
		$('#svgPath').toggleClass('show');
	}
	
	// add a new instance Walker and his controller box
	function addWalker(){
		var newWalker = firstWalkerObj.cloneNode(true),
			controllerTemplate = $('menu > div:last'),
			controllerClone = controllerTemplate.clone(),
			newAnimatedWalker = generateWalker(newWalker),
			color = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
		
		resetController( controllerClone );
		controllerTemplate.after( controllerClone.css('borderColor', color) );
		
		$(firstWalkerObj).after(newWalker);

		controllerClone.data('walker', newAnimatedWalker);  // keep track which controller controls which walker
		newAnimatedWalker.color = color;
		newAnimatedWalker.start();
	}
	// reset the controller box for new "walker" instances
	function resetController(obj){
		var speed = 30;
		obj.find('.speed').val(speed).next().text(speed + 's');
		obj.find(':checkbox').removeAttr('checked');
	}
	
	// pause or place the animated object along the path 
	function stopPlay(){
		var thisAnimatedWalker = $(this.parentNode.parentNode).data('walker');
		
		thisAnimatedWalker.pathAnimator.running ? thisAnimatedWalker.pathAnimator.stop() : thisAnimatedWalker.resume.apply(thisAnimatedWalker);
	}
	
	// switch direction of the animated object 
	function switchDirection(){
		var thisAnimatedWalker = $(this.parentNode.parentNode).data('walker');
		thisAnimatedWalker.reverse = (thisAnimatedWalker.reverse == true) ? false : true;
		if( thisAnimatedWalker.pathAnimator.running )
			thisAnimatedWalker.resume.apply(thisAnimatedWalker);
	}

	function changeSpeed(){
		var thisAnimatedWalker = $(this.parentNode).data('walker');
		thisAnimatedWalker.speed = this.value;
		this.nextElementSibling.innerHTML = this.value + 's';
		thisAnimatedWalker.resume.apply(thisAnimatedWalker);
	}

	function removeInstance(){
		var parent = $(this.parentNode),
			thisAnimatedWalker = parent.data('walker');
		
		// make sure at least one Walker stays
		if( walkers.length > 1 ){
			parent.remove();
			thisAnimatedWalker.pathAnimator.stop();
			$(thisAnimatedWalker.walker).remove();
			walkers.splice(walkers.indexOf(thisAnimatedWalker), 1);
		}
	}
	
	function changeEasing(){
		var thisAnimatedWalker = $(this.parentNode).data('walker'),
			easingFunc = ''; 
			
		if( this.value ){
			var formula = this.value;
			easingFunc = function(t){ return eval(formula) }; 
		}
		
		thisAnimatedWalker.easing = easingFunc;
		thisAnimatedWalker.resume.apply(thisAnimatedWalker);
	}
	
	// reset checkboxes
	$(':checkbox').removeAttr('checked');
	$('select').prop('selectedIndex', 0);
})();