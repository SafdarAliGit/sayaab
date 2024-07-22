import serial
import frappe

SERIAL_PORT = 'COM4'  # Change this to your specific port
BAUD_RATE = 9600


def read_serial_data():
    try:
        # Open the serial port
        ser = serial.Serial(SERIAL_PORT, BAUD_RATE, timeout=1)

        # Check if there is data available
        if ser.in_waiting > 0:
            line = ser.readline().decode('utf-8').strip()
            ser.close()  # Close the port after reading
            return line

        # If no data available
        ser.close()  # Ensure port is closed even if no data
        return "No data available"

    except serial.SerialException as e:
        return f"Serial error: {e}"
    except Exception as e:
        return f"General error: {e}"


@frappe.whitelist()
def get_serial_data():
    data = read_serial_data()
    if data and "error" not in data.lower():
        return {"status": "success", "data": data}
    else:
        return {"status": "error", "message": data}