// Enums for mouse buttons
const MouseButtons = Object.freeze({
    LEFT : {value : 0},
    MIDDLE : {value : 1},
    RIGHT : {value : 2}
})

// Array containing references to option button options 
const OPTION_BUTTONS = Array.from(document.getElementById("options_container").children) 
var active_button_index = 0 

// Remove highlighting effect from previously active button
function reset_previous_active_button(outer_button_div){
    var inner_button_div = outer_button_div.children[0]
    var button_text = inner_button_div.children[0]

    outer_div_classes = outer_button_div.classList 
    if (outer_div_classes.contains("button_active_highlight")){
        outer_div_classes.remove("button_active_highlight") 
    }
    
    outer_div_classes.add("outer_button_border")

    inner_div_classes = inner_button_div.classList
    if (inner_div_classes.contains("outer_button_border")){
        inner_div_classes.remove("outer_button_border")
    } 

    inner_div_classes.add("inner_button_border")

    button_text_classes = button_text.classList 
    if(button_text_classes.contains("inner_button_border")){
        button_text_classes.remove("inner_button_border")
    }

}

// Changes stylings to indicate when a button has been pressed    
function mark_active_button(event, outer_button_div) {
    if (event.button != MouseButtons.LEFT.value) return;
    
    // Reset previously highlighted button 
    reset_previous_active_button(OPTION_BUTTONS[active_button_index])

    var inner_button_div = outer_button_div.children[0]
    var button_text = inner_button_div.children[0]

    outer_div_classes = outer_button_div.classList 
    if (! outer_div_classes.contains("button_active_highlight")){
        outer_div_classes.remove("outer_button_border")
        outer_div_classes.add("button_active_highlight")
    }

    inner_div_classes = inner_button_div.classList
    if (inner_div_classes.contains("outer_button_border")){
        inner_div_classes.remove("outer_button_border")
    }

    inner_div_classes.add("button_held_border") 

    button_text_classes = button_text.classList 
    if(button_text_classes.contains("inner_button_border")){
        button_text_classes.remove("inner_button_border")
    } 

    // Update index to point to button just pressed
    active_button_index = OPTION_BUTTONS.indexOf(outer_button_div)

}

// Revert button stylings when mouse is released or mouse has moved off button
function revert_active_button(event, outer_button_div) {
    if (event.button != MouseButtons.LEFT.value) return;
    if(OPTION_BUTTONS.indexOf(outer_button_div) != active_button_index) return;

    var inner_button_div = outer_button_div.children[0]
    var button_text = inner_button_div.children[0]

    outer_div_classes = outer_button_div.classList 
    if (! outer_div_classes.contains("button_active_highlight")){
        outer_div_classes.add("button_active_highlight")
    }

    inner_div_classes = inner_button_div.classList
    if (inner_div_classes.contains("button_held_border")){
        inner_div_classes.remove("button_held_border")
    }
    
    inner_div_classes.add("outer_button_border")

    button_text_classes = button_text.classList 
    if(! button_text_classes.contains("inner_button_border")){
        button_text_classes.add("inner_button_border")
    }
}