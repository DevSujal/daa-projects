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

function lcs(string1, string2) {
  let m = string1.length + 1;
  let n = string2.length + 1;

  let c = [];
  for (let i = 0; i < m; i++) {
    c[i] = [];
    for (let j = 0; j < n; j++) {
      c[i][j] = { val: 0, dir: "H" };
    }
  }

  let stringArr1 = [" ", ...string1];
  let stringArr2 = [" ", ...string2];
  console.log(stringArr1, stringArr2);
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
        if (stringArr1[i] !== stringArr2[j]) {
          c[i][j].val = Math.max(c[i - 1][j].val, c[i][j - 1].val);
          if (c[i - 1][j].val >= c[i][j - 1].val) {
            c[i][j].dir = "U";
          } else {
            c[i][j].dir = "S";
          }
        } else {
          c[i][j].val = c[i - 1][j - 1].val + 1;
          c[i][j].dir = "D";
        }
      
    }
  }
  // console.log(c);
  return {lcs : c,  lcsval : getLcsValue(c, m - 1, n - 1)};
}

function getLcsValue(c, m, n) {
  if (m == 0 || n == 0) {
    return 0;
  }
  if (c[m][n].dir == "D") {
    return c[m][n].val;
  } else {
    if (c[m][n].dir == "U") {
      return getLcsValue(c, m - 1, n);
    } else {
      return getLcsValue(c, m, n - 1);
    }
  }
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
loadImage("image1.jpg").then(() => {
  image1 = image;

  loadImage(
    "image2.jpg"
  ).then(() => {
    image2 = image;
    console.log(image1, "\n\n", image2);
    // image1 = "GDVEGTA"
    // image2 = "GVCEKST"
    let lcsvalue = lcs(image1, image2);
    // lcsvalue.lcs.map((value) => {
    //   console.log(value);
    // })
    let maxlength = Math.max(image1.length, image2.length)
    console.log("the length of lcs =", lcsvalue.lcsval);
    console.log(`the two images are maching ${((lcsvalue.lcsval / maxlength)* 100).toFixed(2)} %`);
  });
});

