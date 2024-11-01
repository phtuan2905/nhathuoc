// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Get all the filter titles that have a "data-target" attribute
    var filterTitles = document.querySelectorAll('.filter-title');

    // Loop through each title
    filterTitles.forEach(function (title) {
        // Add a click event listener to each title
        title.addEventListener('click', function () {
            // Get the value of "data-target" to find the related section
            var targetId = title.getAttribute('data-target');
            var section = document.getElementById(targetId);

            // Toggle visibility of the section
            if (section.style.display === 'none' || section.style.display === '') {
                section.style.display = 'block';  // Show the section
            } else {
                section.style.display = 'none';   // Hide the section
            }
        });
    });
});
