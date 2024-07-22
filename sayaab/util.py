import serial
import frappe

SERIAL_PORT = 'COM3'  # Change this to your specific port
BAUD_RATE = 9600

def read_serial_data():
    try:
        with serial.Serial(SERIAL_PORT, BAUD_RATE, timeout=1) as ser:
            if ser.in_waiting > 0:
                line = ser.readline().decode('utf-8').strip()
                return line
    except serial.SerialException as e:
        return f"Serial error: {e}"
    except Exception as e:
        return f"General error: {e}"
    return None

@frappe.whitelist()
def get_serial_data():
    data = read_serial_data()
    if data:
        return {"status": "success", "data": data}
    else:
        return {"status": "error", "message": "No data available or error reading serial port"}

