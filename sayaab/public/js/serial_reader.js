let port;
let reader;
let textDecoder;

async function connectSerial() {
    try {
        // Request the port and open a connection.
        port = await navigator.serial.requestPort();
        await port.open({baudRate: 9600});

        // Initialize text decoder
        textDecoder = new TextDecoderStream();
        const readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
        reader = textDecoder.readable.getReader();
        readSerialData();
    } catch (error) {
        console.error('Error:', error);
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
            // Display the data in the input field
            var inputField = $('input[data-fieldname="qty"]');
            inputField.val(value);
        } catch (error) {
            console.error('Error reading data:', error);
            break;
        }
    }
}

$('.item-name').on('click', function () {
    connectSerial();
});