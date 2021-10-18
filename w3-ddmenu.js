/**
* w3-ddmenu by L.A. Muzzachiodi
* v 1.0 - 14/10/2021
* Drilldown menu for use with w3.css framework (required)
* 
* Based on code by
/***********************************************
* Drill Down Menu script- (c) Dynamic Drive DHTML code library (www.dynamicdrive.com)
* This notice MUST stay intact for legal use
* Visit Dynamic Drive at http://www.dynamicdrive.com/ for this script and 100s more
***********************************************/

function w3_drilldownmenu(setting){
	//First check if id's' are defined and exist	

	if ( setting.menu['id']== undefined  ||
		 setting.crumb['id'] == undefined  || 
		 setting.body['id'] == undefined ) 
	{
		this.messageError ("You must define each id (body, menu and breadcrumb). Please check it.")
		return
	}
	if (document.getElementById(setting.menu['id'])==null) {
		this.messageError ("div for menu doesn't exist")
		return
	}
	if (document.getElementById(setting.crumb['id'])==null) {
		this.messageError ("div for crumb doesn't exist")
		return
	}
	if (document.getElementById(setting.body['id'])==null) {
		this.messageError ("div for body doesn't exist")
		return
	}		
	
	this.menudiv=null
	this.mainul=null
	this.uls=null
	this.navdivs={}
	// Top level Texts
	this.homecrumbtext= setting.crumb['title'] || 'Home'
	this.menutitle=setting.menu['title'] || 'Home'
	//Text of the back li
	this.backtext=setting.menu['backtxt'] || 'Back a level'
	// ID's
	this.menuid=setting.menu['id']
	this.crumbid=setting.crumb['id']
	this.bodyid=setting.body['id']
		
	// Menu dimensions
	mh = setting.menu['height'] 
	mw = setting.menu['width']
	this.menuheight = mh || 'auto'
	this.menuwidth = mw || 'auto'
	$('#' + this.menuid).css('height',mh)
	$('#' + this.menuid).css('width',mw)
	this.speed=setting.speed || 70
	this.persist=setting.persist || {enable: false, selectedulid: null}
	if (this.persist && this.persist.selectedulid!=null && $('#'+this.menuid).find('ul #'+this.persist.selectedulid).length==0)  //check if "selectedul id" defined, plus if actual element exists				
	{	
		this.messageError(this.menuid+" :Invalid id of selected ul option. Please check it.")
		return
	}
	
	this.currentul=0
	this.zIndexvalue=100
	//Colors 
	menucolor = ' w3-'+ setting.menu['bg'] 
	menucolor += ' w3-text-'+ setting.menu['txt'] 
	menucolor += ' w3-border w3-border-'+ setting.menu['border'] 
	crumbcolor = ' w3-'+ setting.crumb['bg'] 
	crumbcolor += ' w3-text-'+ setting.crumb['txt'] 
	crumbcolor += ' w3-border w3-border-'+ setting.crumb['border'] 
	bodycolor = 'w3-'+ setting.body['bg'] + ' w3-border w3-border-' + setting.body['border'] + ' w3-text-'+setting.body['txt']
	this.crumbhover = ' w3-hover-'+setting.crumb['txt']+' w3-hover-text-'+setting.crumb['bg']
	$('#' + this.menuid).addClass(menucolor)
	$('#' + this.crumbid).addClass(crumbcolor)
	$('#' + this.bodyid).addClass(bodycolor)
	$('#' + this.bodyid + ' .w3-drillmenu li a').addClass('w3-button w3-hover-'+setting.menu['txt']+' w3-hover-text-'+setting.menu['bg'])
	this.loadclasses()
	this.init($, setting)
}

w3_drilldownmenu.prototype.init=function($, setting){
		var thisdrill=this
		var maindiv=$('#'+setting.menu['id'])//relative position main DIV
		var uls=maindiv.find('ul')
		uls.addClass('ul-absolute')//absolutely position ULs
		this.maindiv=maindiv
		this.uls=uls
		this.navdivs.crumb=$('#'+setting.crumb['id'])
		this.buildmenu($)
		window.addEventListener('beforeunload', function () {
			thisdrill.uninit()
		})
		$('#'+setting.menu['id'] + ' li.menutitle').addClass(' w3-'+setting.menu['titlebg']+' w3-text-'+setting.menu['titletxt'])
		$('#'+setting.menu['id'] + ' li.backcontrol').addClass(' w3-'+setting.menu['titlebg']+' w3-text-'+setting.menu['titletxt']).addClass('w3-hover-'+setting.menu['titletxt']+' w3-hover-text-'+setting.menu['titlebg'])
		setting=null	
}

w3_drilldownmenu.prototype.buildmenu=function($){
	var thisdrill=this
	this.uls.each(function(i){ //loop through each UL
		var thisul=$(this)
		var menuwidth = thisdrill.menuwidth
		//var ulwidth = '100%'
		if (i==0){ //if topmost UL
			$('<li class="menutitle">'+thisdrill.menutitle+'</li>').prependTo(thisul).click(function(e){e.preventDefault()})
			thisdrill.maindiv.css({height:(thisdrill.menuheight=='auto')? thisul.outerHeight() : parseInt(thisdrill.menuheight), overflow:'hidden'}) //set main menu DIV's height to top level UL's height
				.data('h', parseInt(thisdrill.maindiv.css('height')))
			if (menuwidth=='auto'){
		 		var alist = $(thisul).find('a')
		 		menuwidth = Math.max.apply(Math, alist.map(function(){ $(this).css('width','max-content');return $(this).outerWidth()}).get())
		 		menuwidth += 15 //if scroll bar
			}
			thisdrill.maindiv.css({width: parseInt(menuwidth), overflow:'hidden'}) //set main menu DIV's height to top level UL's width
				.data('w', parseInt(thisdrill.maindiv.css('width')))
		}
		else{ //if this isn't the topmost UL
			var parentul=thisul.parents('ul:eq(0)')
			var parentli=thisul.parents('li:eq(0)')
			$('<li class="backcontrol w3-button"><i class="arrow-right"/></i> '+ thisdrill.backtext +' </li>') //add back LI item
				.click(function(e){thisdrill.back(); e.preventDefault()})
				.prependTo(thisul)
			var anchorlink=parentli.children('a:eq(0)').data('control', {order:i}) //remove outline from anchor links
			var arrowimg=$('<span class="w3-right"><i class="arrow-left"></i></span>').appendTo(anchorlink)
			anchorlink.click(function(e){ //assign click behavior to anchor link
				thisdrill.slidemenu($(this).data('control').order)
				e.preventDefault()
			})
		}
		var ulheight=(thisul.outerHeight() < thisdrill.maindiv.data('h'))? thisdrill.maindiv.data('h') : 'auto'
		$(thisul).find('a').css('width','100%')
		thisul.css({visibility:'visible', width:'100%', height:ulheight, left:(i==0)? 'auto' : parentli.outerWidth(), top:0})
		//console.log(maxaw+' '+thisul.parents('li:eq(0)').outerWidth())
		thisul.data('specs', {w:thisul.outerWidth(), h:thisul.outerHeight(), order:i, parentorder:(i==0)? -1 : anchorlink.parents('ul:eq(0)').data('specs').order, x:(i==0)? thisul.position().left : parentul.data('specs').x+parentul.data('specs').w, title:(i==0)? thisdrill.homecrumbtext : parentli.find('a:eq(0)').text()})
	}) //end UL loop
	
	if (this.persist.enable) {
		if (this.persist.selectedulid == null) { // or undefined, because undefined == null
			cookieid=this.routines.getCookie(this.menuid) //go to last persisted UL?
			var ulorder=parseInt(cookieid)
			this.slidemenu(ulorder, true) 
		}		
		else {			
			var ulorder=$('#'+this.persist.selectedulid).data('specs').order
			this.slidemenu(ulorder, true)
		}	
	}
	else {
		this.slidemenu(0, true)
	}
	this.navdivs.crumb.click(function(e){ //assign click behavior to breadcrumb div
		if (e.target.tagName=="A"){
			var order=parseInt(e.target.getAttribute('rel'))
			if (!isNaN(order)){ //check link contains a valid rel attribute int value (is anchor link)
				thisdrill.slidemenu(order)
				e.preventDefault()
			}
		}
	})
}

w3_drilldownmenu.prototype.slidemenu=function(order, disableanimate){
	var order=isNaN(order)? 0 : order
	this.uls.css({display: 'none'})
	var targetul=this.uls.eq(order).css({zIndex: this.zIndexvalue++})
	targetul.parents('ul').addBack().css({display: 'block'})
	this.currentul=order
	if (targetul.data('specs').h > this.maindiv.data('h')){
		this.maindiv.css({overflowY:'auto'}).scrollTop(0)
	}
	else{
		this.maindiv.css({overflowY: 'hidden'}).scrollTop(0)
	}
	this.updatenav($, order)	
	this.uls.eq(0).animate({left:-targetul.data('specs').x}, typeof disableanimate!="undefined"? 0 : this.speed)
}

w3_drilldownmenu.prototype.back=function(){
	if (this.currentul>0){
		var order=this.uls.eq(this.currentul).parents('ul:eq(0)').data('specs').order
		this.slidemenu(order)
	}
}

w3_drilldownmenu.prototype.updatenav=function($, endorder){
	var currentul=this.uls.eq(endorder)
	var w3classbtn1 = 'w3-button ' + this.crumbhover
	var w3classbtn2 = w3classbtn1 +' w3-padding-small'
	if (this.navdivs.crumb.length==1){ //if breadcrumb div defined
		var crumb=this.navdivs.crumb.empty()
		if (endorder>0){ //if this isn't the topmost UL (no point in showing crumbs if it is)
			var crumbhtml=''
			while (currentul && currentul.data('specs').order>=0){
				//crumbhtml='<a href="#nav" rel="'+$currentul.data('specs').order+'">'+$currentul.data('specs').title+'</a>'+'<i class="left"/></i>'+crumbhtml				
				crumbhtml='<li><a class="'+w3classbtn2+'" href="#nav" rel="'+currentul.data('specs').order+'">'+currentul.data('specs').title+'</a></li>'+crumbhtml
				currentul=(currentul.data('specs').order>0)? this.uls.eq(currentul.data('specs').parentorder) : null
			}
			crumb.append(crumbhtml)
		}
		else{
			crumb.append('<a style="display:inline-block" class="'+w3classbtn2+'">'+this.homecrumbtext+'</a>')
		}
		crumb.find('a:last').removeClass(w3classbtn1)
	}
}

w3_drilldownmenu.prototype.uninit=function(){
	if (this.persist.enable) {
		// the last parameter set the days of expiration
		this.routines.setCookie(this.menuid, this.currentul,30)
	}	
}

w3_drilldownmenu.prototype.routines={

	getCookie:function(Name){ 
		var re=new RegExp(Name+"=[^;]*", "i"); //construct RE to search for target name/value pair
		if (document.cookie.match(re)) {
			//if cookie found
			return document.cookie.match(re)[0].split("=")[1] //return its value
			
		}	
		return null
	},

	setCookie:function(name, value,exdays){
		const d = new Date();
		d.setTime(d.getTime() + (exdays*24*60*60*1000));
		expires = "expires="+ d.toUTCString();
		document.cookie = name+"="+value+ ";" + expires + ";path=/; SameSite=Strict;Secure "
	}

}

w3_drilldownmenu.prototype.loadclasses=function () {
var classes =`	
i {
  border: solid;
  border-width: 3px 0px 0px 3px;
  display: inline-block;
  padding: 4px;
}
.arrow-right {
  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
    margin-left:5px; 
}

.arrow-left {
  transform: rotate(135deg);
  -webkit-transform: rotate(135deg);
  margin-right:5px; 
}

.up {
  transform: rotate(-135deg);
  -webkit-transform: rotate(-135deg);
}

.down {
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
}
.w3-drillmenu{ /* main DIV container of menu */
	position: relative;
	overflow: hidden; /*Scrollable DIV for those with JavaScript disabled*/
}

.w3-drillmenu ul{ /*menu ULs*/
	margin: 0;
	padding: 0;
	list-style-type: none;
}

.ul-absolute {
	position:absolute;
	left:0;
	top:0;
	visibility:hidden;
}


.w3-drillmenu li a{ /*menu links*/
	padding: 5px;
	text-align:left;
}


.w3-drillmenu li a:hover{
}

li.menutitle{ /*style of top level menu title*/
	background: gray;
	color: white;
	padding: 5px;
	position: sticky;
	top:0;
	font-weight: bold;
}

li.backcontrol{ /*style of back button control that gets added to the top of each sub UL*/
	background: gray;
	color: white;
	padding: 5px;
	cursor: pointer;
	position: sticky;
	z-index:100;
	top:0;
	width:100%;
	text-align:left;
}
.w3-drillcrumb {
  padding: 5px;
  list-style: none;
  font-size: 15px;
  font-weight: bold;
}
.w3-drillcrumb li {
  display: inline-block;
}
.w3-drillcrumb li+li:before {
  content: "/\xa0";
}
.w3-drillcrumb li a {
  text-decoration: none;
}
.w3-drillcrumb li a:hover {
}

.w3-drillcrumb li:last-child a:hover {
  text-decoration: none;
  cursor: default ;
}
`
$("<style>"+ classes+"</style>").appendTo("head")
}


w3_drilldownmenu.prototype.slidetoul=function(id) {
	if (document.getElementById(id)==null) {
		this.messageError ("ul with id "+id+" doesn't exist")
		return
	}	
	var ulorder=$('#'+id).data('specs').order
	this.slidemenu(ulorder)
}


w3_drilldownmenu.prototype.messageError=function(message) {
	console.log(message)
	alert(message)
}
