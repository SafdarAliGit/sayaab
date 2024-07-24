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

            // Set its value to the float value
            $field.val(isNaN(floatValue) ? '' : floatValue);
        } catch (err) {
            console.error('Failed to read clipboard contents: ', err);
        }
    }

    $(document).on('click', '.item-name', function () {
        pasteFromClipboard();
    });

});