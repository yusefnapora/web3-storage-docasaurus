---
title: JavaScript utility libraries
description: Learn about some helpful utility libraries that make working with Web3.Storage easier.
---

# JavaScript utility libraries

The Web3.Storage [JavaScript client library](./client-library.md) provides a simple interface for interacting with Web3.Storage. This page highlights some additional libraries that may be helpful when working with the client library, or when using the [HTTP API][reference-http-api] directly.

## files-from-path

The [files-from-path package][files-from-path] provides a simple way for Node.js users to load files from the filesystem into the `File` objects that the Web3.Storage client library likes to use.

Here's a quick example:

```js
import { getFilesFromPath } from 'web3.storage'

async function storeFiles(path = 'path/to/somewhere') {
  const files = await getFilesFromPath(path)
  for (const f of files) {
    console.log(f)
    // { name: '/path/to/me', stream: [Function: stream] }
  }

  const web3Storage = getStorageClient()
  const cid = await web3storage.put(files)
  console.log(`stored ${files.length} files. cid: ${cid}`)
}
```

Note that if you're using the client library you don't need to install the `files-from-path` package seperately. Instead, just import the `getFilesFromPath` or `filesFromPath` functions from the `web3.storage` package.

## ipfs-car

The Web3.Storage API works with Content Archive (CAR) files, which package up [content addressed data][concepts-content-addressing] into a simple format for storage and transport. Internally, the client library uses the [ipfs-car package][ipfs-car] to create CARs from regular files before sending data to the API.

If you prefer to work with CARs directly, see the how-to guide on [working with Content Archives][howto-car] for usage information for ipfs-car and information about other options.

[concepts-content-addressing]: ../concepts/content-addressing.md
[reference-http-api]: https://docs.web3.storage/http-api.html
[howto-car]: ../how-tos/work-with-car-files.md

[files-from-path]: https://github.com/web3-storage/files-from-path
[ipfs-car]: https://github.com/web3-storage/ipfs-car