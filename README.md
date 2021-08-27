# Image Extractor - Client

Browser Client for [Image Extractor - API](https://github.com/lauti7/image-extractor-api)

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

- [ ] Add tests.
- [x] Allow users to download an image.
- [ ] Allow users to download images (in bulk, zip file).
- [ ] Add settings button to set up web behaviour.
