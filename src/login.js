// Enums for mouse buttons
const MouseButtons = Object.freeze({
    LEFT : {value : 0},
    MIDDLE : {value : 1},
    RIGHT : {value : 2}
})

// Array containing references to option button options 
const OPTION_BUTTONS = Array.from(document.getElementById("options_container").children) 
var active_button_index = 0 

// Plaintext password -> if this not a website for fun this would be very very bad 
var plaintext_password = ""

// Remove highlighting effect from previously active button
function reset_previous_active_button(outer_button_div){
    let inner_button_div = outer_button_div.children[0]
    let button_text = inner_button_div.children[0]

    outer_div_classes = outer_button_div.classList 
    inner_div_classes = inner_button_div.classList
    button_text_classes = button_text.classList 
    
    if (outer_div_classes.contains("button_active_highlight")){
        outer_div_classes.remove("button_active_highlight") 
    }
    
    outer_div_classes.add("outer_button_border")

    if (inner_div_classes.contains("outer_button_border")){
        inner_div_classes.remove("outer_button_border")
    } 

    inner_div_classes.add("inner_button_border")

    if(button_text_classes.contains("inner_button_border")){
        button_text_classes.remove("inner_button_border")
    }
}

// Changes stylings to indicate when a button has been pressed    
function mark_active_button(event, outer_button_div) {
    if (event.button != MouseButtons.LEFT.value) return;

    let inner_button_div = outer_button_div.children[0]
    let button_text = inner_button_div.children[0]
    
    outer_div_classes = outer_button_div.classList 
    inner_div_classes = inner_button_div.classList
    button_text_classes = button_text.classList 

    // Don't do anything if button is disabled
    if (button_text_classes.contains("disabled_button_text")) return;

    if (! outer_div_classes.contains("button_active_highlight")){
        outer_div_classes.remove("outer_button_border")
        outer_div_classes.add("button_active_highlight")
    }
    
    if (inner_div_classes.contains("outer_button_border")){
        inner_div_classes.remove("outer_button_border")
    }
    
    inner_div_classes.add("button_held_border") 
    
    if(button_text_classes.contains("inner_button_border")){
        button_text_classes.remove("inner_button_border")
    } 
    
    // Reset previously highlighted button 
    // If this is called earlier everything breaks :/
    if (active_button_index != OPTION_BUTTONS.indexOf(outer_button_div)){
        reset_previous_active_button(OPTION_BUTTONS[active_button_index])
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
    inner_div_classes = inner_button_div.classList
    button_text_classes = button_text.classList 
    
    if (! outer_div_classes.contains("button_active_highlight")){
        outer_div_classes.add("button_active_highlight")
    }

    if (inner_div_classes.contains("button_held_border")){
        inner_div_classes.remove("button_held_border")
    }
    
    inner_div_classes.add("outer_button_border")

    if(! button_text_classes.contains("inner_button_border")){
        button_text_classes.add("inner_button_border")
    }
}

// Redirect to google 
function shutdown(event, outer_button_div){ 
    revert_active_button(event, outer_button_div)
    window.location.href = "https://www.google.com/";
}

// Show/hide dial up connection option
function toggle_dial_up_option(event, outer_button_div){ 
    revert_active_button(event, outer_button_div)

    let options_button_text = document.getElementById("options_button");
    
    let dial_up_option = document.getElementById("dial_up_container"); 
    if (dial_up_option.style.display === "none" || dial_up_option.style.display === ""){
        dial_up_option.style.display = "flex";  
        options_button_text.textContent = "Options <<";
    }  
    else {
        dial_up_option.style.display = "none";
        options_button_text.textContent = "Options >>";       
    }
}

// Moves cursor to specified position inside the passed input element
function adjustCursor(input_element, mouse_position){
    // Reset mouse cursor instead of jumping to end
    requestAnimationFrame(() => {
        input_element.setSelectionRange(mouse_position, mouse_position);
    });
}

// If user is entering 
function override_cursor_movement(){
    let username_field = document.getElementById("username")
    adjustCursor(username_field, username_field.selectionStart)
}

// Simple override to obscure password with asterisks (*)
function obscure_plaintext(){
    let password_field = document.getElementById("password")
    let password = password_field.value 

    // Store mouse position -> used to determine where string was added/deleted 
    let mouse_position = password_field.selectionStart;

    if (password.length > plaintext_password.length) {
        let new_password_char = password[mouse_position - 1];        
        plaintext_password = plaintext_password.slice(0, mouse_position - 1) + new_password_char + plaintext_password.slice(mouse_position - 1) 
    }
    else if(password.length < plaintext_password.length) {
        plaintext_password = plaintext_password.slice(0, mouse_position) + plaintext_password.slice(mouse_position + 1) 
    }

    let obscured_password = "*".repeat(password.length)
    password_field.value = obscured_password

    if(password.length === 0){ 
        document.getElementById("cancel_login").classList.add("disabled_button_text")
    }
    else {
        document.getElementById("cancel_login").classList.remove("disabled_button_text")
    }

    // Keep cursor in same position
    adjustCursor(password_field, mouse_position)
}

// Clear input fields
function cancel_login(event, outer_button_div) {
    if(document.getElementById("cancel_login").classList.contains("disabled_button_text")) return;
    revert_active_button(event, outer_button_div)
    
    // Clear input fields and stored password
    plaintext_password = ""
    document.getElementById("username").value = ""
    document.getElementById("password").value = ""
    
    // 'Disable' button
    document.getElementById("cancel_login").classList.add("disabled_button_text")
}
