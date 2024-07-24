$(document).ready(function () {
    // Function to handle paste from clipboard and update the field
    async function pasteFromClipboard() {
        try {
            // Read text from clipboard
            const text = await navigator.clipboard.readText();
            // Find the input field with data-fieldname="qty" and set its value
            $('[data-fieldname="qty"]').val(text);
        } catch (err) {
            console.error('Failed to read clipboard contents: ', err);
        }
    }

    $(document).on('click', '.item-name', function () {
        pasteFromClipboard();
    });

});