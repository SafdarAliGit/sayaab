// $(document).ready(function () {
//     async function pasteFromClipboard() {
//         try {
//             // Read text from clipboard
//             const text = await navigator.clipboard.readText();
//             // Convert text to float
//             const floatValue = parseFloat(text);
//
//             // Find the input field with data-fieldname="qty"
//             const $field = $('[data-fieldname="qty"]');
//
//             // Focus the field
//             $field.focus();
//
//             // Set the field value to the float value
//             if (!isNaN(floatValue)) {
//                 // Use a timeout to ensure the field is focused before setting the value
//                 setTimeout(() => $field.val(floatValue), 0);
//             } else {
//                 // Optionally, handle invalid float conversion
//                 $field.val('');
//             }
//         } catch (err) {
//             console.error('Failed to read clipboard contents: ', err);
//         }
//     }
//
//     $(document).on('click', '.item-name', function () {
//         pasteFromClipboard();
//     });
//
// });

// $(document).ready(function () {
//     if ('serial' in navigator) {
//         let port;
//         let reader;
//         let textDecoder;
//         function reverseString(str) {
//             return str.split('').reverse().join('');
//         }
//         async function connectSerial() {
//             try {
//                 // Request the port and open a connection
//                 port = await navigator.serial.requestPort();
//                 await port.open({baudRate: 9600});
//
//                 // Initialize text decoder
//                 textDecoder = new TextDecoderStream();
//                 const readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
//                 reader = textDecoder.readable.getReader();
//
//                 // Start reading data
//                 readSerialData();
//             } catch (error) {
//                 console.log('Error:', error);
//             }
//         }
//
//         async function readSerialData() {
//             while (true) {
//                 try {
//                     const {value, done} = await reader.read();
//                     if (done) {
//                         reader.releaseLock();
//                         break;
//                     }
//                     // Display the data in the input field
//                     let reversedValue = reverseString(value.trim());
//                     let floatValue = parseFloat(reversedValue);
//                     const inputField = $('input[data-fieldname="qty"]');
//                     if (inputField.length) {
//                         inputField.val(floatValue);
//                     }
//                 } catch (error) {
//                     console.log('Error reading data:', error);
//                     break;
//                 }
//             }
//         }
//
//         $(document).on('click', '.item-name', function () {
//             connectSerial();
//         });
//     } else {
//         console.log('Web Serial API is not supported in this browser.');
//     }
// });
//

$(document).ready(function () {
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
                    const qtyField = $('input[data-fieldname="qty"]');
                    if (qtyField.length) {
                        qtyField.val(floatValue);
                    }
                } catch (error) {
                    console.error('Error reading data:', error);
                    break;
                }
            }
        }

        function focusOnQtyField() {
            // Focus on the input field with data-fieldname="qty"
            const qtyField = $('input[data-fieldname="qty"]');
            if (qtyField.length) {
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


            if (port && port.readable) {
                disconnectSerial(); // Close the port if it's open
            } else {
                connectSerial(); // Open the port if it's closed
            }


        $(window).on('beforeunload', function () {
            disconnectSerial();
        });
    } else {
        console.log('Web Serial API is not supported in this browser.');
    }
});

