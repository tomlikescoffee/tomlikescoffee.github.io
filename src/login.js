const MouseButtons = Object.freeze({
    LEFT : {value : 0},
    MIDDLE : {value : 1},
    RIGHT : {value : 2}
})

function show_active_border(event, button) {
    if (event.button != MouseButtons.LEFT.value) return;
    button.style.border = "black solid"
}

function revert_border(event, button) {
    if (event.button != MouseButtons.LEFT.value) return;
    
    button.style.borderTop = "white solid"
    button.style.borderLeft = "white solid"
    button.style.borderRight = "darkgray solid"
    button.style.borderBottom = "darkgray solid"
}