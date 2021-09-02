---
title: Retrieve
description: Learn how to retrieve data stored using Web3.Storage in this quick how-to guide.
---

# How to retrieve data from Web3.Storage

In this how-to guide, **you'll learn several methods for retrieving data from Web3.Storage.**

All data stored using Web3.Storage is made available for retrieval via [IPFS](https://ipfs.io), the InterPlanetary File System. IPFS is a distributed, peer-to-peer network for storing and sharing [content-addressed data][concepts-content-addressing]. This guide shows you several ways to retrieve your data from IPFS:
- In your browser using an [HTTP gateway](#using-an-ipfs-http-gateway).
- Programmatically using the [Web3.Storage JavaScript client](#using-the-web3-storage-js-client).
- In your terminal using the [IPFS command-line tools](#using-the-ipfs-command-line).
- In your terminal using [curl or Powershell](#using-curl-or-powershell).

## Using an IPFS HTTP gateway

You can easily fetch any data stored using Web3.Storage using an IPFS HTTP gateway. Because IPFS is a peer-to-peer, decentralized network, you can use any public HTTP gateway to fetch your data. In this guide, we'll use the gateway at `dweb.link`, but you can see more worldwide gateways on the [IPFS Public Gateway Checker](https://ipfs.github.io/public-gateway-checker/).

When you [store data using the Web3.Storage client][howto-store], the `put` method returns an [IPFS content identifier (CID)][ipfs-docs-cid] string. That CID points to an IPFS directory that contains all the files you passed in using the `put` method.

You can use an IPFS gateway to view a list of all the files in that directory from your browser. To do so, simply create a gateway URL. For example, if your CID is `bafybeidd2gyhagleh47qeg77xqndy2qy3yzn4vkxmk775bg2t5lpuy7pcu`, you can make a URL for the `dweb.link` gateway as follows: [bafybeidd2gyhagleh47qeg77xqndy2qy3yzn4vkxmk775bg2t5lpuy7pcu.ipfs.dweb.link](https://bafybeidd2gyhagleh47qeg77xqndy2qy3yzn4vkxmk775bg2t5lpuy7pcu.ipfs.dweb.link/). Follow that link, and you'll see a page similar to this:

![Screenshot of an IPFS gateway directory listing](./images/gateway-directory-listing.png)

If you want to link directly to a file within that directory, just add the file path after the CID portion of the link. For example: [bafybeidd2gyhagleh47qeg77xqndy2qy3yzn4vkxmk775bg2t5lpuy7pcu.ipfs.dweb.link/not-distributed.jpg](https://bafybeidd2gyhagleh47qeg77xqndy2qy3yzn4vkxmk775bg2t5lpuy7pcu.ipfs.dweb.link/not-distributed.jpg) could be used as a shareable link for your new favorite wallpaper.

::: tip
Your [Files page](https://web3.storage/files/) on Web3.Storage includes IPFS gateway links to all the content you've uploaded, so if you're looking to link to one of your own files, you don't even have to create a gateway URL.
:::

## Using the Web3.Storage JS client

The Web3.Storage JavaScript client provides a `get` method that allows you to retrieve any IPFS content using that content's [content identifier (CID)][ipfs-docs-cid].

First, you'll need to create a Web3.Storage client using your API token. Getting an API token is free, but you'll need a free Web3.Storage account. If you already have an account and a token, read on. If not, have a look at the [quickstart guide][quickstart-guide] to get up and running in just a few minutes.

First you'll need to add the `web3.storage` package to your project's dependencies:

```shell
npm install web3.storage
```

Use the following code to create a Web3.Storage client:

<<<@/code-snippets/how-to/index.js#makeStorageClient

Once you have a client, you can call `client.get`, passing in a CID string:

<<<@/code-snippets/how-to/index.js#retrieve-basics


### The `Web3Response` object

The `get` method returns a `Web3Response` object. This object extends the [`Response` object][mdn-response] from the Web [Fetch API][mdn-fetch] with two methods that provide access to the retrieved IPFS data: `files` and `unixFsIterator()`.

The [`files` method][reference-js-web3response] returns an array of `Web3File` objects, which represent all files contained in the content archive identified by the given CID. A `Web3File` is just like a regular Web [`File` object][mdn-file], with the addition of `path` and `cid` properties. These contain the relative path of the file within the archive and the CID of the file, respectively.

Here's the example from above, now with the code to unpack and inspect the files in the response:

<<<@/code-snippets/how-to/index.js#retrieve-unpack-files

:::tip
Another option is to use the array of `unixFs` objects provided by the `unixFsIterator()` method to iterate through your files. While in the vast majority of cases you'll want to use the `files()` method outlined above, existing IPFS users may prefer interacting with `unixFs` objects if they have existing code or tooling that supports it. For more details, see the [JavaScript client library reference][reference-js].
:::

## Using the IPFS command line

If you have the [IPFS command line interface][ipfs-docs-cli-quickstart] installed, you can use it directly to fetch data without going through a gateway. This also works if you've installed [IPFS Desktop][ipfs-docs-desktop-quickstart], which includes the IPFS CLI.

To get the whole bundle and save it to a directory, run the following command:

```shell
ipfs get bafybeidd2gyhagleh47qeg77xqndy2qy3yzn4vkxmk775bg2t5lpuy7pcu
```

If you want to get a specific file out of the bundle, add its name onto the end of the `ipfs get bafybie...` command:

```shell
ipfs get bafybeidd2gyhagleh47qeg77xqndy2qy3yzn4vkxmk775bg2t5lpuy7pcu/youareanonsense.jpg
```

## Using curl or Powershell

Sometimes you may need to just download a specific file to your computer using the command line. Unix-based operating systems, like Linux and macOS, can use curl. Windows users can use Powershell.

::::tabs

:::tab Linux

1. Open a terminal window.
1. Use `curl` to download your file:

    ```shell
    curl https://<YOUR CID>.ipfs.dweb.link/<FILE NAME> -o ~/<OUTPUT FILE>
    ```

    Replace `<YOUR CID>`, `<FILE NAME>`, and `<OUTPUT FILE>` with their respective values.

    | Variable | Replace with | Example |
    | --- | --- | --- |
    | `<YOUR CID>` | The CID of the file you want to download. | `bafybeie2bjap32zi2yqh5jmpve5njwulnkualcbiszvwfu36jzjyqskceq` |
    | `<FILE NAME>` | The _name_ of the file that you originally uploaded to Web3.Storage. | `example.txt` |
    | `<OUTPUT FILE>` | The path and filename that you want curl to save the file to. This can be different to `<FILE NAME>`. | `Desktop/output-file.txt` |

    Your complete command should look something like this:

    ```shell
    curl https://bafybeie2bjap32zi2yqh5jmpve5njwulnkualcbiszvwfu36jzjyqskceq.ipfs.dweb.link/example.txt -o ~/output-file.txt
    ```

:::

:::tab macOS

1. Open a terminal window.
1. Use `curl` to download your file:

    ```shell
    curl https://<YOUR CID>.ipfs.dweb.link/<FILE NAME> -o ~/<OUTPUT FILE>
    ```

    Replace `<YOUR CID>`, `<FILE NAME>`, and `<OUTPUT FILE>` with their respective values.

    | Variable | Replace with | Example |
    | --- | --- | --- |
    | `<YOUR CID>` | The CID of the file you want to download. | `bafybeie2bjap32zi2yqh5jmpve5njwulnkualcbiszvwfu36jzjyqskceq` |
    | `<FILE NAME>` | The _name_ of the file that you originally uploaded to Web3.Storage. | `example.txt` |
    | `<OUTPUT FILE>` | The path and filename that you want Powershell to save the file to. This can be different to `<FILE NAME>`. | `Desktop/output-file.txt` |

    Your complete command should look something like this:

    ```shell
    curl https://bafybeie2bjap32zi2yqh5jmpve5njwulnkualcbiszvwfu36jzjyqskceq.ipfs.dweb.link/example.txt -o ~/output-file.txt
    ```

:::

:::tab Windows

1. Open a Powershell window.
1. Use `Invoke-WebRequest` to download your file:

    ```powershell
     Invoke-WebRequest -Uri "https://<YOUR_CID>.ipfs.dweb.link/<FILE NAME>" -OutFile "C:\Users\<USERNAME>\<OUTPUT FILE>
    ```

    Replace `<YOUR CID>`, `<FILE NAME>`, `<USERNAME>`, and `<OUTPUT FILE>` with their respective values.

    | Variable | Replace with | Example |
    | --- | --- | --- |
    | `<YOUR CID>` | The CID of the file you want to download. | `bafybeie2bjap32zi2yqh5jmpve5njwulnkualcbiszvwfu36jzjyqskceq` |
    | `<FILE NAME>` | The _name_ of the file that you originally uploaded to Web3.Storage. | `example.txt` |
    | `<USERNAME>` | The username you use to log into Windows with. | `Laika` |
    | `<OUTPUT FILE>` | The path and filename that you want Powershell to save the file to. This can be different to `<FILE NAME>`. | `Desktop/output-file.txt` |

    Your complete command should look something like this:

    ```powershell
    Invoke-WebRequest -Uri "https://bafybeie2bjap32zi2yqh5jmpve5njwulnkualcbiszvwfu36jzjyqskceq.ipfs.dweb.link/example.txt" -OutFile "C:\Users\Laika\Desktop\output-file.txt"
    ```
:::
::::

## Next steps

If you haven't yet explored in depth how to store data using Web3.Storage, check out the [storage how-to guide][howto-store] for a deep dive on how to upload files using the [JavaScript client library][reference-js].

You can also use the client library to get more information about the status of your data. See the [query how-to guide][howto-query] to learn how to get more details about your data, including the status of any Filecoin storage deals.

<!-- internal links -->
[reference-js]: ../reference/client-library.md
[quickstart-guide]: ../intro.md#quickstart
[concepts-content-addressing]: ../concepts/content-addressing.md
[howto-store]: ./store.md
[howto-query]: ./query.md

[reference-js-web3response]: ../reference/client-library.md#return-value-2
[reference-js-constructor]: ../reference/client-library.md#constructor

<!-- external links -->
[ipfs-docs-cid]: https://docs.ipfs.io/concepts/content-addressing/
[ipfs-docs-cli-quickstart]: https://docs.ipfs.io/how-to/command-line-quick-start/
[ipfs-docs-desktop-quickstart]: https://docs.ipfs.io/install/ipfs-desktop/

[mdn-fetch]: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
[mdn-file]: https://developer.mozilla.org/en-US/docs/Web/API/File
[mdn-response]: https://developer.mozilla.org/en-US/docs/Web/API/Response
