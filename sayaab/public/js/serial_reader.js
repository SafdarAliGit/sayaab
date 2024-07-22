    document.addEventListener('DOMContentLoaded', (event) => {
            if ('serial' in navigator) {
                let port;
                let reader;
                let textDecoder;

                async function connectSerial() {
                    try {
                        // Request the port and open a connection
                        port = await navigator.serial.requestPort();
                        await port.open({ baudRate: 9600 });

                        // Initialize text decoder
                        textDecoder = new TextDecoderStream();
                        const readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
                        reader = textDecoder.readable.getReader();

                        // Start reading data
                        readSerialData();
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
                            // Display the data in the input field
                            const inputField = document.querySelector('input[data-fieldname="qty"]');
                            if (inputField) {
                                inputField.value = value.trim();
                            }
                        } catch (error) {
                            console.error('Error reading data:', error);
                            break;
                        }
                    }
                }

        // Attach event listener to all elements with the class 'item-name'
        document.querySelectorAll('.item-name').forEach((element) => {
            element.addEventListener('click', () => {
                connectSerial();
            });
        });
    } else {
        console.error('Web Serial API is not supported in this browser.');
    }
});
