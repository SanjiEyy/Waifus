const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors'); // Added for handling CORS
const app = express();

// Use CORS to handle cross-origin requests
app.use(cors());

const folders = [
  'ai hoshino',
  'alice zuckerberg',
  'marin kitagawa',
  'nino nakano',
  'zero'
];

function getRandomImage(folder) {
  const folderPath = path.join(__dirname, folder);

  try {
    // Read all files in the directory
    const files = fs.readdirSync(folderPath);

    // Filter out non-image files
    const images = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));

    if (images.length === 0) {
      return null;
    }

    // Select a random image
    const randomIndex = Math.floor(Math.random() * images.length);
    return path.join(folderPath, images[randomIndex]);
  } catch (err) {
    console.error(`Error reading files from ${folderPath}:`, err);
    return null;
  }
}

app.get('/waifu', (req, res) => {
  const folder = folders[Math.floor(Math.random() * folders.length)];
  const imagePath = getRandomImage(folder);

  if (!imagePath) {
    res.status(404).send('No images found.');
    return;
  }

  // Send the image file
  res.sendFile(imagePath, (err) => {
    if (err) {
      console.error('Error sending image:', err);
      res.status(500).send('An error occurred while sending the image.');
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
