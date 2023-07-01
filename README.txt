Website can be found here:
https://mishta-bean.github.io/

The github repository for this site can
be found here:
https://github.com/mishta-bean/mishta-bean.github.io

Known issues:
	* Dragging tiles across multiple spaces will cause 
	  the program to no longer recognize the tiles as
	  valid input, effectively soft-locking the board.
	  This is due to the drag and drop events being
	  activated by a tile being dragged across them, 
	  rather than only triggering once a tile has 
	  been let go of by the player.

	* There is currently no spell checking. 
	  Any and all combinations of letters will result
	  in valid input for the board to accept.

	* Pressing the submit button may not entirely clear
	  old pieces for an unknown reason, and will result 
	  in "ghost tiles", causing points to still be added
	  where there shouldn't be any.
	  Placing tiles on top of these ghost tiles results 
	  in a score of NaN.
      This is caused by class flags not being properly 
	  removed from the spaces, resulting in them being
	  counted as still being occupied by a tile.

	* Pressing submit with a full hand causes more than 7
	  tiles to be given to the player.

	* The website currently supports 1920x1080 resolution
	  at 100% zoom. Any other resolution or zoom will cause
	  the board spaces to be disjoint.

	* There is currently no JSON functionality. Partially 
	  due to time constraints and a lack of experience
	  interacting with them.