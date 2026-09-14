document.getElementById("power_button_inner").addEventListener("mousedown", function (e){
    let button = document.getElementById("power_button")
    button.style.border = "1px solid black"
})

document.getElementById("power_button_inner").addEventListener("mouseup", function (e){
    let button = document.getElementById("power_button")
    button.style.border = "1px solid beige"
})

document.getElementById("power_button_inner").addEventListener("mouseleave", function (e){
    let button = document.getElementById("power_button")
    button.style.border = "1px solid beige"
})