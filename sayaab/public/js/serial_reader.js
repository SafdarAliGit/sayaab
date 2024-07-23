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

$(document).ready(function () {
    if ('serial' in navigator) {
        let port;
        let reader;
        let textDecoder;

        function reverseString(str) {
            return str.split('').reverse().join('');
        }

        function debounce(func, timeout = 300) {
            let timer;
            return (...args) => {
                clearTimeout(timer);
                timer = setTimeout(() => { func.apply(this, args); }, timeout);
            };
        }

        let readings = [];
        const MAX_READINGS = 10;

        function smoothData(newReading) {
            readings.push(newReading);
            if (readings.length > MAX_READINGS) {
                readings.shift(); // Remove the oldest reading
            }
            return readings.reduce((a, b) => a + b, 0) / readings.length; // Average of readings
        }

        function updateInputField(value) {
            const inputField = $('input[data-fieldname="qty"]');
            if (inputField.length) {
                inputField.val(value);
            }
        }

        const debouncedUpdate = debounce(updateInputField);

        function parseWeightData(data) {
            let reversedData = reverseString(data.trim());
            let floatValue = parseFloat(reversedData);
            return isNaN(floatValue) ? null : floatValue;
        }

        async function connectSerial() {
            try {
                // Request the port and open a connection
                port = await navigator.serial.requestPort();
                await port.open({baudRate: 9600});

                // Initialize text decoder
                textDecoder = new TextDecoderStream();
                const readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
                reader = textReader.readable.getReader();

                // Start reading data
                readSerialData();
            } catch (error) {
                console.log('Error:', error);
            }
        }

        async function readSerialData() {
            while (true) {
                try {
                    const {value, done} = await reader.read();
                    if (done) {
                        reader.releaseLock();
                        break;
                    }
                    // Parse and smooth the data before displaying it
                    const parsedValue = parseWeightData(value);
                    if (parsedValue !== null) {
                        let smoothedValue = smoothData(parsedValue);
                        debouncedUpdate(smoothedValue);
                    }
                } catch (error) {
                    console.log('Error reading data:', error);
                    break;
                }
            }
        }

        $(document).on('click', '.item-name', function () {
            connectSerial();
        });
    } else {
        console.log('Web Serial API is not supported in this browser.');
    }
});
