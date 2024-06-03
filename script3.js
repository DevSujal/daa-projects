
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

async function reduce_image_file_size(
  base64Str,
  MAX_WIDTH = 450,
  MAX_HEIGHT = 450
) {
  let resized_base64 = await new Promise((resolve) => {
    let img = new Image();
    img.src = base64Str;
    img.onload = () => {
      let canvas = document.createElement("canvas");
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }
      }
      canvas.width = width;
      canvas.height = height;
      let ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL()); // this will return base64 image results after resize
    };
  });
  return resized_base64;
}

let image;
async function loadImage(imagePath) {
  try {
    image = await imageToString(imagePath);
  } catch (error) {
    console.error("Error reading image file:", error);
  }
}

let image1, image2;
loadImage("image1original.png").then(() => {
  image1 = image;
  reduce_image_file_size(image1, 10, 10).then((reduceimg) => {
    console.log(reduceimg.length);
  })
});