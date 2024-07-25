// Copyright (c) 2024, Tech Ventures and contributors
// For license information, please see license.txt

frappe.ui.form.on('Invoice', {
	// refresh: function(frm) {

	// }
});


async function readFromSerialPort() {
    try {
        // Replace with your actual serial port reading function
        let serialPortData = await getSerialPortData();

        // Use dummy data if no data is received
        if (!serialPortData || serialPortData.trim() === '') {
            serialPortData = '00.00';
        } else {
            // Reverse the data horizontally
            let reversedData = serialPortData.split('').reverse().join('');

            // Convert to float
            let floatValue = parseFloat(reversedData);

            // Ensure the value is a valid number and format it
            floatValue = isNaN(floatValue) ? 0.00 : floatValue.toFixed(2);

            serialPortData = floatValue;
        }

        // Assign to data-fieldname="qty"
        $('[data-fieldname="qty"]').val(serialPortData);
    } catch (err) {
        console.error('Error reading from serial port:', err);
        // Set dummy data in case of error
        $('[data-fieldname="qty"]').val('00.00');
    }
}

$(document).ready(function () {
    readFromSerialPort();
});

// Placeholder function to simulate serial port data fetching
async function getSerialPortData() {
    // Simulate no data received
    return new Promise(resolve => setTimeout(() => resolve('00.00'), 1000));
}