const archiver = require('archiver');
const fs = require('fs');

const { version } = require('../package.json');

const demosName = 'gestalt-input-plugin-demos';

const archive = archiver('zip', {
  zlib: { level: 9 } // Sets the compression level.
});

fs.mkdirSync('dist', { recursive: true });
archive.pipe(fs.createWriteStream(`dist/${demosName}-${version}.pgmmv.zip`));
archive.directory('demos', false);
archive.finalize();
