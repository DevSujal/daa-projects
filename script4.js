const zlib = require('zlib');
const fs = require("fs");

function imageToString(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject(err);
      } else {
        const base64String = Buffer.from(data).toString("base64");
        resolve(base64String);
      }
    });
  });
}
// Function to compress a base64 string
function compressBase64(base64String) {
    const buffer = Buffer.from(base64String, 'base64');
    const compressedBuffer = zlib.deflateSync(buffer);
    return compressedBuffer.toString('base64');
}

// Function to decompress a compressed base64 string
function decompressBase64(compressedBase64String) {
    const compressedBuffer = Buffer.from(compressedBase64String, 'base64');
    const decompressedBuffer = zlib.inflateSync(compressedBuffer);
    return decompressedBuffer.toString('base64');
}

// Example usage
let image;
async function loadImage(imagePath) {
  try {
    image = await imageToString(imagePath);
  } catch (error) {
    console.error("Error reading image file:", error);
  }
}

loadImage("download 1.png").then(() => {
    base64String = image
    console.log(base64String.length);
    const compressedBase64String = compressBase64(base64String);
    console.log('Compressed:', compressedBase64String.length);
    
    const decompressedBase64String = decompressBase64(compressedBase64String);
    console.log('Decompressed:', decompressedBase64String.length);
  });