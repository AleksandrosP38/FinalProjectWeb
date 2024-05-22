document.addEventListener("DOMContentLoaded", function() {

    // Function to toggle visibility of content for each box
    function toggleBoxContent(buttonId, contentId) {
        var button = document.getElementById(buttonId);
        var content = document.getElementById(contentId);
        var originalText = button.getAttribute("data-original-text"); // Store the original text of the button

        button.addEventListener("click", function() {
            if (content.style.display === "none") {
                content.style.display = "block";
                button.textContent = "X"; // Change button text to "X"
                button.classList.add("absolute"); // Add absolute positioning class
            } else {
                content.style.display = "none";
                button.textContent = originalText; // Revert button text to original
                button.classList.remove("absolute"); // Remove absolute positioning class
            }
        });
    }

    // Toggle visibility for each box
    toggleBoxContent("about-me-btn", "about-me-text");
    toggleBoxContent("personal-details-btn", "personal-details-text");
    toggleBoxContent("interests-btn", "interests-text");
    toggleBoxContent("final-note-btn", "final-note-text");
    toggleBoxContent("box5-btn", "box5-text");
    toggleBoxContent("box6-btn", "box6-text");
    toggleBoxContent("box7-btn", "box7-text");
    toggleBoxContent("box8-btn", "box8-text");

    // Lamp toggling function
    function toggleLamp() {
        var lampImage = document.getElementById("lamp-image");
        var body = document.body;
        var h1 = document.querySelector("h1");
        var h2 = document.querySelector("h2");
        var boxButtons = document.querySelectorAll(".box-button");
        var boxContents = document.querySelectorAll(".box p"); // Select all paragraphs inside boxes

        if (lampImage.src.endsWith("bulb-off.png")) {
            lampImage.src = "https://i.postimg.cc/6QyTynzr/bulb-on.png";
            body.style.backgroundImage = "url('ImageDark.png')"; // Change background image to ImageDark.png
            // Change box-button color to red
            boxButtons.forEach(function(button) {
                button.style.color = "red";
            });
            // Change text color to red
            boxContents.forEach(function(content) {
                content.style.color = "red";
            });
            // Change "Duality of Insanity" text color to red
            h1.style.color = "red";
        } else {
            lampImage.src = "https://i.postimg.cc/KjK1wL3c/bulb-off.png";
            body.style.backgroundImage = "url('ImageLight.png')"; // Change background image to ImageLight.png
            // Revert box-button color to white
            boxButtons.forEach(function(button) {
                button.style.color = "#fff";
            });
            // Revert text color to white
            boxContents.forEach(function(content) {
                content.style.color = "#fff";
            });
            // Revert "Duality of Insanity" text color to white
            h1.style.color = "#fff";
        }
    }

    document.getElementById("lamp-image").addEventListener("click", toggleLamp);
});
