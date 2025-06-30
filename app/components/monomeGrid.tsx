/// <reference types="w3c-web-serial" />

let port: SerialPort | null;
let reader: ReadableStreamDefaultReader<Uint8Array> | null;
let writer: WritableStreamDefaultWriter<Uint8Array> | null;
let keyFunc: ((x: number, y: number, z: number) => void) | null;
let connectedFunc: (() => void) | null;
let removedFunc: (() => void) | null;
let gridX: number;
let gridY: number;
const gridWidth = 16;
const gridHeight = 8;

// Monome Serial Protocol constants
    // System commands
let sys_query = 0x00;
let sys_id = 0x01;
let sys_size = 0x05;
let sys_size_response = 0x03; // Response has a different value
    // LED Grid commands
let led_off = 0x10;
let led_on = 0x11;
let led_all_off = 0x12;
let led_all_on = 0x13;
let led_intensity = 0x17;
let led_level_set = 0x18;
    // Key Grid responses
let key_up = 0x20; // Key up message according to serial.txt
let key_down = 0x21; // Key down message according to serial.txt

let serialActive = false;

if (typeof window !== 'undefined') {
  if ("serial" in navigator) {  
    console.log("Web Serial API is supported by this browser.")
  } else {
    console.log("Web Serial API is not supported by this browser.")
  }
}

const Connect = async () => {
  try {
    port = await navigator.serial.requestPort();
    // Connect to port or add it to the list of available ports
    // Wait for the serial port to open.
    await port.open({ baudRate: 115200 }); //monome grid baudRate
    
    // Check if port is valid and has readable/writable streams
    if (!port || !port.readable || !port.writable) {
      throw new Error("Port is not properly initialized");
    }
    
    // callback function for successful device connection
    if (connectedFunc) connectedFunc();
    
    // Listen to data coming from the serial device.
    reader = port.readable.getReader();
    writer = port.writable.getWriter();
    
    try {
      while (true) {
        if (!reader) break;
        const { value, done } = await reader.read();
        if (done) {
          // Allow the serial port to be closed later.
          break
        }
        // value is a Uint8Array.
        if (value && value.length > 0) {
          // Log basic info about the received data
          // const hexPreview = Array.from(value.slice(0, Math.min(value.length, 10))).map(b => 
          //   `0x${b.toString(16).padStart(2, '0')}`).join(' ') + (value.length > 10 ? '...' : '');
          // console.log(`Received ${value.length} bytes: ${hexPreview}`);
          processIncomingData(value);
        }
        serialActive = true;
      }
    } catch (e) {
      // The user didn't select a device
      console.error("Error reading from serial port:", e);
    }
  } catch(err) {
    console.log(err)
  }
};

// Process data received from the grid
function processIncomingData(data: Uint8Array) {
  if (!data || data.length < 1) return;
  
  // First byte is the message type
  const messageType = data[0];
  
  // Log incoming data for debugging
  // console.log('RECEIVED:', Array.from(data).map(b => `0x${b.toString(16).padStart(2, '0')}`).join(' '));
  
  // Key event detection
  // Check for both protocol versions (0x20/0x21 and 0x00/0x01)
  
  if (data.length >= 3) {
    const x = data[1];
    const y = data[2];
    let z = 0;
    
    // Handle key events if they match known patterns
    // Your device is using 0x20/0x21 format (alternative protocol)
    if (messageType === key_up) { // 0x20
        //console.log(`KEY UP detected at (${x},${y}) [0x20]`);
        z = 0;
        if (keyFunc) keyFunc(x,y,z);
        return;
    }
    
    if (messageType === key_down) { // 0x21
        //console.log(`KEY DOWN detected at (${x},${y}) [0x21]`);
        z = 1;
        if (keyFunc) keyFunc(x,y,z);
        return;
    }
    
    // Also handle standard protocol format (0x00/0x01) just in case
    if (messageType === 0x00) {
        //console.log(`KEY UP detected at (${x},${y}) [0x00]`);
        z = 0;
        if (keyFunc) keyFunc(x,y,z);
        return;
    }
    
    if (messageType === 0x01) {
        //console.log(`KEY DOWN detected at (${x},${y}) [0x01]`);
        z = 1;
        if (keyFunc) keyFunc(x,y,z);
        return;
    }
  }
  
  // Handle system messages - these should maintain the LED functionality
  switch (messageType) {
    case sys_query:
        // System query response [0x00, section, number]
        if (data.length >= 3) {
            const section = data[1];
            const number = data[2];
            console.log(`Device section ${section} has ${number} components`);
            if (section === 1) { // 1 is led-grid
              console.log(`Status: Connected - Grid with ${number} components`);
            }
        }
        break;
        
    case sys_id:
        // Device ID response [0x01, ...ID string]
        if (data.length > 1) {
            // Convert the ID bytes to a string, ignoring initial command byte
            const idBytes = data.slice(1);
            const decoder = new TextDecoder();
            const deviceId = decoder.decode(idBytes).trim();
            console.log(`Device ID: ${deviceId}`);
        }
        break;
        
    case sys_size_response:
        // Grid size response [0x03, x, y]
        if (data.length >= 3) {
            gridX = data[1];
            gridY = data[2];
            console.log(`Grid size: ${gridX}x${gridY}`);
        }
        break;
        
    default:
        // If it's a 3-byte message that we didn't recognize, log it as a potential key event
        if (data.length === 3) {
            console.log(`Potential key event: type=0x${messageType.toString(16)}, x=${data[1]}, y=${data[2]}`);
        }
        break;
  }
}

// Send LED command to the grid (for monobright grids)
async function setLED(x: number, y: number, state: number) {
  if (!writer) return;
  try {
    // Monome protocol uses LED_ON (0x11) for on and LED_OFF (0x10) for off
    // Format: [message type, x, y]
    const messageType = state ? led_on : led_off;
    const message = new Uint8Array([messageType, x, y]);
    await writer.write(message);
  } catch (error) {
    console.error('Error sending LED command:', error);
  }
}

async function Key(x: (x: number, y: number, z: number) => void) {
  keyFunc = x
}

async function Connected(x: () => void) {
  connectedFunc = x
}

async function Removed(x: () => void) {
  removedFunc = x
}

// Set LED intensity level (for varibright grids)
async function LED(x: number, y: number, level: number) {
  if (!writer) return;
  try {
    // Level should be between 0-15
    level = Math.max(0, Math.min(15, level));
    const message = new Uint8Array([led_level_set, x, y, level]);
    await writer.write(message);
  } catch (error) {
    console.error('Error setting LED level:', error);
  }
}

// Clear the entire grid
async function clearGrid() {
    if (!writer) return;
    try {
        // Send the all LEDs off command
        const message = new Uint8Array([led_all_off]);
        await writer.write(message);
    } catch (error) {
        console.error('Error clearing grid:', error);
    }
}

// Turn on all LEDs
async function fillGrid() {
    if (!writer) return;
    try {
        // Send the all LEDs on command
        const message = new Uint8Array([led_all_on]);
        await writer.write(message);
    } catch (error) {
        console.error('Error filling grid:', error);
    }
}

async function setGridIntensity(level: number) {
  if (!writer) return;
  try {
      // Level should be between 0-15
      level = Math.max(0, Math.min(15, level));
      const message = new Uint8Array([led_intensity, level]);
      await writer.write(message);
  } catch (error) {
      console.error('Error setting grid intensity:', error);
  }
}

// Disconnect from the grid
async function Disconnect() {
  // Set flag to stop background reading
  serialActive = false;
  
  // Release the writer
  if (writer) {
    try {
      // Clear the grid before disconnecting
      await clearGrid();
      writer.releaseLock();
    } catch (error) {
      console.error('Error releasing writer:', error);
    }
    writer = null;
  }
  
  // Release the reader
  if (reader) {
      try {
        reader.cancel();
        reader.releaseLock();
      } catch (error) {
        console.error('Error canceling reader:', error);
      }
      reader = null;
  }
  
  // Close the port
  if (port) {
      try {
        await port.close();
      } catch (error) {
        console.error('Error closing port:', error);
      }
      port = null;
  }
  
  // Call removed callback after cleanup
  if (removedFunc) removedFunc();
}

// Query device ID
async function queryDeviceID() {
  if (!writer) return;
  try {
    // Send device ID query command [0x01]
    const message = new Uint8Array([sys_id]);
    await writer.write(message);
  } catch (error) {
    console.error('Error querying device ID:', error);
  }
}

// Query grid size
async function queryGridSize() {
  if (!writer) return;
  try {
    // Send grid size query command [0x05]
    const message = new Uint8Array([sys_size]);
    await writer.write(message);
  } catch (error) {
    console.error('Error querying grid size:', error);
  }
}

const Grid = {
    connect: Connect,
    remove: Disconnect,
    led: LED,
    setLed: setLED,
    key: Key,
    connected: Connected,
    removed: Removed,
    clear: clearGrid,
    all: fillGrid,
    intensity: setGridIntensity,
    id: queryDeviceID,
    size: queryGridSize,
    cols: gridWidth,
    rows: gridHeight
};

export default Grid;