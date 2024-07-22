$(document).ready(function() {
    // Attach a click event to elements with the class 'item-name'
    $(document).on('click', '.item-name', function() {
        // Call the server-side method to fetch the serial data
        $.ajax({
            url: 'https://sayaab.thesmarterp.com/api/method/sayaab.util.get_serial_data',
            type: 'GET',
            success: function(response) {
                if (response.message.status === 'success') {
                    // Find the input field you want to update
                    // You can adjust the selector to match your specific input field
                    var inputField = $('input[data-fieldname="qty"]');
                    inputField.val(response.message.data);

                    // alert('Weight data updated successfully.');
                } else {
                    alert('Failed to get weight data: ' + response.message.message);
                }
            },
            error: function(xhr, status, error) {
                alert('An error occurred: ' + error);
            }
        });
    });
});
