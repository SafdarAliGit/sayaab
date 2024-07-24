$(document).ready(function () {
    async function pasteFromClipboard() {
        try {
            // Read text from clipboard
            const text = await navigator.clipboard.readText();
            // Convert text to float
            const floatValue = parseFloat(text);

            // Find the input field with data-fieldname="qty"
            const $field = $('[data-fieldname="qty"]');

            // Focus the field
            $field.focus();

            // Set the field value to the float value
            if (!isNaN(floatValue)) {
                // Use a timeout to ensure the field is focused before setting the value
                setTimeout(() => $field.val(floatValue), 0);
            } else {
                // Optionally, handle invalid float conversion
                $field.val('');
            }
        } catch (err) {
            console.error('Failed to read clipboard contents: ', err);
        }
    }

    $(document).on('click', '.item-name', function () {
        pasteFromClipboard();
    });

});