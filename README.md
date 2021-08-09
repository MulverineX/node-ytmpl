# node-ytmpl
[![NPM version](https://img.shields.io/npm/v/ytmpl.svg?maxAge=3600)](https://www.npmjs.com/package/ytmpl)
[![NPM downloads](https://img.shields.io/npm/dt/ytmpl.svg?maxAge=3600)](https://www.npmjs.com/package/ytmpl)

Simple js only package to resolve YouTube Playlists.
Does not require a Google-API-Key.

# Support
You can contact us for support on our [chat server](https://discord.gg/V3vSCs7)

# Usage

```js
const ytmpl = require('ytmpl');

const playlist = await ytmpl('UU_aEa8K-EOJ3D6gOs7HcyNg');
```


# API
### ytmpl(id, [options])

Attempts to resolve the given playlist id

* `id`
    * id of the yt-playlist
    * or a playlist url
    * or a user url (resolves to uploaded playlist)
    * or a channel url (resolves to uploaded playlist)
* `options`
    * object with options
    * possible settings:
    * gl[String] -> 2-Digit Code of a Country, defaults to `US` - Allows for localisation of the request
    * hl[String] -> 2-Digit Code for a Language, defaults to `en` - Allows for localisation of the request
    * limit[Number] -> limits the pulled items, defaults to 100, set to Infinity to get the whole playlist - numbers <1 result in the default being used
    * pages[Number] -> limits the pulled pages, pages contain 100 items, set to Infinity to get the whole playlist - numbers <1 result in the default limit being used - overwrites limit
    * requestOptions[Object] -> Additional parameters to passed to [miniget](https://github.com/fent/node-miniget), which is used to do the https requests

* returns a Promise
* [Example response](https://github.com/MulverineX/node-ytmpl/blob/master/example/example_output.txt)

### ytmpl.continueReq(continuationData)
Continues a previous request by pulling yet another page.  
The previous request had to be done using `pages` limitation.

#### Usage
```js
const ytmpl = require('ytmpl');

const firstResultBatch = await ytmpl('UU_aEa8K-EOJ3D6gOs7HcyNg', { pages: 1 });
const secondResultBatch = ytmpl.continueReq(firstResultBatch.continuation);
const thirdResultBatch = ytmpl.continueReq(secondResultBatch.continuation);

// You can now use the .items property of all result batches e.g.:
console.log(firstResultBatch.items);
console.log(secondResultBatch.items);
console.log(thirdResultBatch.items);
```

* returns a Promise resolving into `{ continuation, items }`

### ytmpl.validateID(string)

Returns true if able to parse out a (formally) valid playlist ID.

### ytmpl.getPlaylistID(string)

Returns a playlist ID from a YouTube URL. Can be called with the playlist ID directly, in which case it just resolves.

* returns a promise resolving into a string containing the id


# Related / Works well with

* [node-ytdl-core](https://github.com/fent/node-ytdl-core)
* [node-ytsr](https://github.com/TimeForANinja/node-ytsr)


# Install

    npm install --save ytmpl


# License
MIT
