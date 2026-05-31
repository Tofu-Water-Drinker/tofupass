const { app, BrowserWindow } = require('electron');
const fs = require('fs/promises');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const sourcePath = path.join(rootDir, 'assets', 'docs', 'tofupass-api-guide.html');
const outputPath = path.join(rootDir, 'assets', 'docs', 'tofupass-api-guide.pdf');

async function renderPdf() {
  const window = new BrowserWindow({
    width: 816,
    height: 1056,
    show: false,
    webPreferences: {
      offscreen: true,
    },
  });

  await window.loadFile(sourcePath);
  await window.webContents.executeJavaScript(
    'document.fonts ? document.fonts.ready.then(function(){ return true; }) : true'
  );

  const pdf = await window.webContents.printToPDF({
    printBackground: true,
    preferCSSPageSize: true,
    landscape: false,
    pageSize: 'Letter',
    margins: {
      marginType: 'none',
    },
  });

  await fs.writeFile(outputPath, pdf);
  console.log(`Wrote ${outputPath}`);
}

app.whenReady()
  .then(renderPdf)
  .then(() => app.quit())
  .catch((error) => {
    console.error(error);
    app.exit(1);
  });
