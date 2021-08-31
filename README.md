# Image Extractor - Client [![Build Status](https://app.travis-ci.com/lauti7/image-extractor-client.svg?branch=main)](https://app.travis-ci.com/lauti7/image-extractor-client)

Browser Client for [Image Extractor - API](https://github.com/lauti7/image-extractor-api)

Client is online [here](https://lauti7.github.io/image-extractor-client/) and its API is online [here](https://image-extractor-api.herokuapp.com/api/status)

Enter a URL of any public website, and you will get all the images that are beign used and you can download them.
Only works with server side render for now.

## Built with:

React JS, TypeScript, and TailwindCSS

## Instalation

You should have Node JS and NPM installed on your PC.

```bash
git clone https://github.com/lauti7/image-extractor-client.git
```

```bash
cd image-extractor-client
```

```bash
npm install
```

```bash
touch .env

vim .env

API_URL={IMAGE_EXTRACTOR_API}
ENV=development

```

## TODOs:

- [x] Add tests.
- [x] Allow users to download an image.
- [ ] Allow users to download images (in bulk, zip file).
- [ ] Add settings button to set up web behaviour.
