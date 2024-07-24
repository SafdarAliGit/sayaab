frappe.ui.form.on('Invoice', {
    refresh: function (frm) {
        if ('serial' in navigator) {
            let port;
            let reader;
            let textDecoder;
            let closeTimeout;
            let focusTimeout;

            function reverseString(str) {
                return str.split('').reverse().join('');
            }

            async function connectSerial() {
                try {
                    // Check if port is already open
                    if (port && port.readable) {
                        console.log('Port is already open. Closing it.');
                        await disconnectSerial(); // Close the port if it's already open
                    }

                    // Request the port and open a connection
                    console.log('Requesting port...');
                    port = await navigator.serial.requestPort();
                    await port.open({ baudRate: 9600 });

                    // Initialize text decoder
                    textDecoder = new TextDecoderStream();
                    const readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
                    reader = textDecoder.readable.getReader();

                    // Start reading data
                    readSerialData();

                    // Set a timeout to close the port after 5 seconds
                    closeTimeout = setTimeout(disconnectSerial, 5000);

                    // Set a timeout to focus on the qty field after 5 seconds
                    focusTimeout = setTimeout(focusOnQtyField, 5000);
                } catch (error) {
                    console.error('Error:', error);
                }
            }

            async function readSerialData() {
                while (true) {
                    try {
                        const { value, done } = await reader.read();
                        if (done) {
                            reader.releaseLock();
                            break;
                        }
                        // Process the data from the serial port
                        let reversedValue = reverseString(value.trim());
                        let floatValue = parseFloat(reversedValue);

                        // Update the qty field
                        if (frm.fields_dict['qty']) {
                            frm.set_value('qty', floatValue);
                        }
                    } catch (error) {
                        console.error('Error reading data:', error);
                        break;
                    }
                }
            }

            function focusOnQtyField() {
                // Focus on the input field with fieldname="qty"
                const qtyField = frm.fields_dict['qty'].input;
                if (qtyField) {
                    qtyField.focus();
                }
            }

            async function disconnectSerial() {
                try {
                    // Ensure reader is properly released
                    if (reader) {
                        await reader.cancel();
                        await reader.releaseLock();
                    }
                    // Ensure port is properly closed
                    if (port) {
                        await port.close();
                        port = null;
                    }
                    clearTimeout(closeTimeout); // Clear the timeout
                    clearTimeout(focusTimeout); // Clear the timeout
                    console.log('Serial port closed');
                } catch (error) {
                    console.error('Error closing serial port:', error);
                }
            }

            // Connect to the serial port when the form is refreshed
            connectSerial();

            // Ensure the serial port is disconnected when the page is unloaded
            $(window).on('beforeunload', function () {
                disconnectSerial();
            });
        } else {
            console.log('Web Serial API is not supported in this browser.');
        }
    }
});
