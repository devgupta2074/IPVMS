
// press enter to submit

document.addEventListener("DOMContentLoaded", function () {
    document.querySelector('input').addEventListener('keypress', function (e) {
        if (e.keyCode == '13') {
            e.preventDefault();
            document.querySelector('button[type="submit"]').click();
        }
    });
})