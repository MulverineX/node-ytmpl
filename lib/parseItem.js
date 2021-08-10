const PATH = require('path');
const FS = require('fs');

const parseItem = o => {
  try {
    let obj = o.musicResponsiveListItemRenderer;
    let end = {};

    end.duration = obj.fixedColumns[0].musicResponsiveListItemFixedColumnRenderer.text.runs[0].text;

    let title = obj.flexColumns[0].musicResponsiveListItemFlexColumnRenderer.text.runs[0];
    end.title = title.text;
    if (title.navigationEndpoint) end.id = title.navigationEndpoint.watchEndpoint.videoId;

    end.isSong = true;
    let channel = obj.flexColumns[1].musicResponsiveListItemFlexColumnRenderer.text.runs[0];
    end.channel = { name: channel.text };
    if (channel.navigationEndpoint) end.channel.id = channel.navigationEndpoint.browseEndpoint.browseId;
    else end.isSong = false;

    let thumb = obj.thumbnail.musicThumbnailRenderer;
    end.thumbnail = {
      images: thumb.thumbnail,
      crop: thumb.thumbnailCrop,
      scale: thumb.thumbnailScale,
    };

    if (!end.id) end.id = end.thumbnail.images.thumbnails[0].url.split('/')[4];

    end.orig = o;

    return end;
  // eslint-disable-next-line no-empty
  } catch (e) {
    return o;
  }
};

const catchAndLogFunc = (func, params = []) => {
  if (!Array.isArray(params)) throw new Error('params has to be an (optionally empty) array');
  try {
    return func(...params);
  } catch (e) {
    const dir = PATH.resolve(__dirname, '../dumps/');
    const file = PATH.resolve(dir, `${Math.random().toString(36).substr(3)}-${Date.now()}.txt`);
    const cfg = PATH.resolve(__dirname, '../package.json');
    const bugsRef = require(cfg).bugs.url;

    if (!FS.existsSync(dir)) FS.mkdirSync(dir);
    FS.writeFileSync(file, JSON.stringify(params, null, 2));
    /* eslint-disable no-console */
    console.error(e.stack);
    console.error(`\n/${'*'.repeat(200)}`);
    console.error(`failed at func ${func.name}: ${e.message}`);
    console.error(`pls post the the files in ${dir} to ${bugsRef}`);
    let info = `os: ${process.platform}-${process.arch}, `;
    info += `node.js: ${process.version}, `;
    info += `ytmpl: ${require('../package.json').version}`;
    console.error(info);
    console.error(`${'*'.repeat(200)}\\`);
    /* eslint-enable no-console */
    return null;
  }
};
const main = module.exports = (...params) => catchAndLogFunc(parseItem, params);
main._hidden = { catchAndLogFunc };
