function summarizeForm() {
    const form = document.querySelector("form");
    const formData = new FormData(form);
    
    let summary = "Résumé du formulaire:\n";
    
    for (let [key, value] of formData.entries()) {
        if (value) {
            summary += `${key}: ${value}\n`;
        }
    }
    
    alert(summary);
    console.log(summary);
}

window.addEventListener("DOMContentLoaded", function() {
    const submitButton = document.querySelector("button[type='submit']");
    if (submitButton) {
        submitButton.addEventListener("click", function(event) {
            event.preventDefault();
            summarizeForm();
        });
    }
});
