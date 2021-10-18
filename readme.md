# What is w3-ddmenu ? #
It is a drilldown menu to be used with ***[w3.css](https://www.w3schools.com/w3css/ "w3.css")*** based on ***[Drill Down Menu v1.6- (c) Dynamic Drive DHTML](http://www.dynamicdrive.com/dynamicindex1/drilldownmenu.htm "Drill Down Menu v1.6")***.

Thought to be as simple as possible, everything is contained in a single file.


----------

# How does it work ? #

This script convert a nested UL list contained inside a DIV element into a drilldown menu.

The menu is constituted by three parts.

A top panel with a breadcrumb trail (***"crumb"***).

The menu itself (***"menu"***).

The body containing both (***"body"***).
 
You call the constructor function w3_drilldownmenu() to initialize a the menu.  The format is:


    var uniquevariable=new w3_drilldownmenu(options)
		
Where "uniquevariable" should be an unique variable for each instance of menu.

So, for example, as seen in the first example :

	var menu = new w3_drilldownmenu({
    	menu:{id:'drillmenu'},
    	crumb:{id:'drillcrumb'},
    	body:{id:'drillbody'},
    });
	
The only mandatory options are the "id" of each of them.

In the second example you can see the rest of the options.

### Options for each section : ###

* **menu**:  title , titlebg, titletxt, bg, border, txt, backtxt, height, width
* **crumb**: title, bg , txt, border
* **body**: bg, txt, border

Where:

- **title** : text (for default, *"Home"*)
- **titlebg** : color of background of title
- **titletxt**: color of text of title
- **bg**: color of background
- **txt** : color of text
- **border**: color of border
- **backtxt**: text of the option to back a level (for default, *"Back"*)
- **heigth**: heigth of the menu (for default, *"auto"*)
- **width**: width of the menu (for default, *"auto"*)


> The colors to use are those defined in the  w3.css  color classes without the prefix "w3-".You can also use the predefined themes.
 
For example, *"red"*, *"pale-green"*, *"theme-dark"*, etc.

The hover colors are defined, for simplicity, by inverting the colors of the text and the element's background.

### And other general options: ###

- **speed**: speed of animation (for default,*70*)
- **persist**: set if one UL is already chosen when the menu is loaded instead of the top level UL. 
It have two suboptions:
	- **enable**: true or false, depending if you want activate it or not (for default, *false*)
	- **selectedulid**:	the "id" of the UL chosen when the menu is loaded (for default, null). If null then is loaded the last UL viewed. If not null, the value must be an valid "id". In both cases, *enable* must be defined as true.

	Examples:

	Let be the menu *"drilldownmenu1"*, 

		persist: {enable:true, selectedulid:'firstme'}
		
	load the UL with the id *"firstme"* of the menu *"drilldownmenu1"*.

	But,

		persist: {enable:true}
		
	load the last UL selected before close the page containig the menu *"drilldownmenu1"*.
 
	   

### How to select an item programatically ?###

You can to select an item through code rather than user interface using 


    menu.slidetoul('id')

This way you load the UL *"id"* of *"menu"*.  
 

For example,

	<button class="w3-button w3-yellow w3-margin" 
	onclick="menu1.slidetoul('bc')">British Columbia</button>


----------

# That's all.#

Your comments or suggestions are always welcome.


***Luis Alejandro Muzzachiodi (2021)***




