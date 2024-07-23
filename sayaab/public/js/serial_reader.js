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

        function reverseString(str) {
            return str.split('').reverse().join('');
        }

        async function connectSerial() {
            try {
                // Check if port is already open and close it
                if (port && port.readable) {
                    await disconnectSerial();
                }

                // Request the port and open a connection
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
            } catch (error) {
                console.log('Error:', error);
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
                    // Display the data in the input field
                    let reversedValue = reverseString(value.trim());
                    let floatValue = parseFloat(reversedValue);
                    const inputField = $('input[data-fieldname="qty"]');
                    if (inputField.length) {
                        inputField.val(floatValue);
                    }
                } catch (error) {
                    console.log('Error reading data:', error);
                    break;
                }
            }
        }

        async function disconnectSerial() {
            try {
                if (reader) {
                    await reader.cancel();
                    await reader.releaseLock();
                }
                if (port) {
                    await port.close();
                    port = null;
                }
                clearTimeout(closeTimeout); // Clear the timeout
                console.log('Serial port closed');
            } catch (error) {
                console.log('Error closing serial port:', error);
            }
        }

        $(document).on('click', '.item-name', function () {
            connectSerial();
        });

        $(window).on('beforeunload', function () {
            disconnectSerial();
        });
    } else {
        console.log('Web Serial API is not supported in this browser.');
    }
});
