# Classic - Front-end Starter

The repository includes tools and config to kick-start new projects build upon:
* [TWIG](https://github.com/twigjs/twig.js) templates
* [Sass](http://sass-lang.com/) with [autoprefixer](https://github.com/postcss/autoprefixer),
  [source maps](http://thesassway.com/intermediate/using-source-maps-with-sass) and
  [minification](https://github.com/jakubpawlowicz/clean-css)
* JavaScript with [Babel.js](https://babeljs.io/),
  [ES6](https://github.com/lukehoban/es6features) and
  [minification](https://github.com/mishoo/UglifyJS2)
* [BrowserSync](https://www.browsersync.io/)

and can be extremely easy extended with [Symfony](https://symfony.com/) PHP framework.

---
### Notes:
* TWIG templates are being compiled with [twig.js](https://github.com/twigjs/twig.js),
  not with original PHP based [TWIG](https://twig.symfony.com/) so all functions and filters 
  must be written in JavaScript and stored in `./twig.babel.js` file. 
* Static assets are stored in `./src/assets` and are being copied directly to `./web` directory.

&nbsp;

## Configuration

Make sure you have [Node](https://nodejs.org/en/download/package-manager/) 
and [Yarn](https://yarnpkg.com/lang/en/docs/install/) properly installed. and then:

```
yarn install
```

&nbsp;

## Development

`yarn start` serves the project and refreshes browser on each source files (`./src`) change

`yarn build` builds the project (to `./web` directory)

`yarn clean` clears build directory

---
### Notes:
* `clean` task is being run before each `start` and `build` tasks
