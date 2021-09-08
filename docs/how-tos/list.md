---
title: How to list files uploaded to Web3.Storage
sidebar_label: List
description: Learn how to list the files you've uploaded to Web3.Storage in this quick how-to guide.
---

<!-- imports for code snippets -->
import CodeSnippet from '../../src/components/CodeSnippet'
import howtoSource from '!!raw-loader!../../code-snippets/how-to/index.js'
import exampleUpload from '!!raw-loader!../../code-snippets/how-to/example-listing-upload.json.txt'

In this how-to guide, you'll learn about the different ways that you can **list the files that you've uploaded to Web3.Storage.**
Once you've [stored some files][howto-store] using Web3.Storage, you'll want to see a list of what you've uplodaded. There are two ways you can do this:

## Using the Web3.Storage website

You can see a list of everything you've uploaded to Web3.Storage on the [Files page][site-files] on the Web3.Storage website. If you don't need to work with this list programmatically, using the website may be a simpler choice.

![A screenshot of the file listing available at https://web3.storage/files when logged in to your account](../images/files-listing.png)

This [Files page][site-files] provides a convenient overview of your stored data, including links to view your files in your browser via an [IPFS gateway][ipfs-docs-gateway] and information about how the data is being stored on the [decentralized storage networks][concepts-decentralized-storage] that Web3.Storage uses under the hood.
## Using the Web3.Storage client
To easily integrate Web3.Storage programmatically in your apps or services, you can also access a listing of your uploads from your code using the Web3.Storage client. In the example below, this guide walks through how to use the [JavaScript client library][reference-js-client] to fetch a complete listing of all the data you've uploaded using Web3.Storage.

### Installing the client

In your JavaScript project, add the `web3.storage` package to your dependencies:

```shell
npm install web3.storage
```

### Creating a client instance

To create a `Web3Storage` client object, we need to pass an access token into the [constructor][reference-js-constructor]:

<CodeSnippet lang="js" src={howtoSource} region="makeStorageClient" />

:::tip
You can use any API token associated with your account, not just the one you originally used to upload your files! See the [Generate API token page][howto-gen-token] for more about token management.
:::

### Listing your uploads

The `Web3Storage` client object's [`list` method][reference-js-list] returns an [async iterable][js-async-iterable-explainer] that can be used with the [`for await` syntax][mdn-for-await-of] to read information about each upload as soon as it's received over the network.

Here's an example that logs details about each upload to the console:

<CodeSnippet lang="js" src={howtoSource} region="listUploads" />

Each `Upload` object will look something like this:

<CodeSnippet lang="json" src={exampleUpload} />

What do all those fields mean? Here's a summary:

- `name` contains a descriptive name for the upload. If no name was provided at the time of upload, the `name` field will contain an automatically generated name that includes a creation timestamp.
- `cid` contains the [IPFS Content Identifier (CID)][ipfs-docs-cid] that identifies the uploaded data. This CID can be used to [retrieve][howto-retrieve] the uploaded files or get more detailed [status information][howto-query].
- `created` contains an [ISO-8601 datetime string][iso-8601] indicating when the content was first uploaded to Web3.Storage.
- `dagSize` contains the size in bytes of the [Directed Acyclic Graph (DAG)][ipfs-docs-merkle-dag] that contains all the uploaded content. This is the size of the data that is transferred over the network to Web3.Storage during upload, and is slightly larger than the total size of the files on disk.
- `pins` contains an array of objects describing the IPFS nodes that have [pinned][ipfs-docs-pinning] the data, making it available for fast retrieval using the IPFS network.
- `deals` contains an array of objects describing the Filecoin storage providers that have made [storage deals][fil-docs-deals]. These storage providers have committed to storing the data for an agreed period of time.

:::tip Want more details about storage?
The `Upload` objects returned by the `list` method include some basic status information about how the data is stored on IPFS and Filecoin. For more details, including the identity of the storage providers hosting your data, you can [query an upload's status][howto-query] using the `cid`.
:::

#### Listing a subset of uploads

By default, the [`list` method][reference-js-list] returns information about all uploads made using your Web3.Storage account. You can optionally restrict the listing in two ways:
- Only contain entries that were uploaded before a given timestamp.
- Limit the total number of returned entries.

Here's an example of fetching the first 10 uploads made on the previous day:

<CodeSnippet lang="js" src={howtoSource} region="listWithLimits" />

[howto-store]: ./store.md
[howto-retrieve]: ./retrieve.md
[howto-query]: ./query.md
[howto-gen-token]: ./generate-api-token.md
[concepts-decentralized-storage]: ../concepts/decentralized-storage.md
[reference-js-client]: ../reference/client-library.md
[reference-js-constructor]: ../reference/client-library.md#constructor
[reference-js-list]: ../reference/client-library.md#list-uploads
[site-files]: https://web3.storage/files

[ipfs-docs-gateway]: https://docs.ipfs.io/concepts/ipfs-gateway/
[ipfs-docs-cid]: https://docs.ipfs.io/concepts/content-addressing/
[ipfs-docs-merkle-dag]: https://docs.ipfs.io/concepts/merkle-dag/
[ipfs-docs-pinning]: https://docs.ipfs.io/concepts/persistence/
[fil-docs-deals]: https://docs.filecoin.io/about-filecoin/how-filecoin-works/#deals

[iso-8601]: https://en.wikipedia.org/wiki/ISO_8601
[js-async-iterable-explainer]: https://javascript.info/async-iterators-generators
[mdn-for-await-of]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of
