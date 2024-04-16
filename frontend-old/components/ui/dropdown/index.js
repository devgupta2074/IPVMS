

// open dropdown

function dropdown() {
    const list = document.getElementById("myDropdown");

    list.style.display = "block";
    console.log('yatekudasai')
}


// closes dropdown when clicked  anywhere outside 

window.onclick = function (event) {
    if (!event.target.matches('.dropdown-button')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.style.display === 'block') {
                openDropdown.style.display = "none";
            }
        }
    }
}