# Zignaly Monorepo

Welcome to Zignaly. You will need node 16, I suggest you use nvm. Just run `nvm use`. This app also
uses [Lerna](https://lerna.js.org) and Yarn, so `package-lock.json`'s were gitignored.

You will need node 16. Feel free to use [nvm](https://github.com/nvm-sh/nvm) to manage node versions, Run `nvm use` to
switch to 16.

## How to run

In order to use Lerna easily, run `npm i -g lerna`.

Now, in order to install top-level dependencies, run `yarn`. And here's where the fun begins. Run:

```
lerna bootstrap
```

This will install all dependencies and link projects together. Next, run instructions vary by the package:

* `yarn bootstrap` is a shorthand for `lerna bootstrap`. Send regards and boxes of whiskey to @strrife who saved you
  from typing 1 extra character. Jokes aside, plays well with IDEs.
* `yarn test` - you guessed it - runs `yarn test` for all packages.
* `yarn storybook` runs zignaly-ui (`@zignaly-open/ui`) storybook. More on that later.
* `yarn ps2` runs Webapp Neo <sup>2</sup>. Needs `.env` config.
* `yarn raffles-client` runs Raffles Client. Needs `.env` config.
* `yarn raffles-server` runs Raffles Server. Needs `.env` config and a PostgreSQL instance
* `yarn build` builds all repos (needed for UI repos)

### More FYIs

* you do not need to re-run `lerna bootstrap` unless some package relations changed or you need to do `yarn install`
* run `lerna clean --yes && lerna bootstrap` if you're desparate for `node_modules` removal
* to pin 3rd-party dependency versions, do it in the root-level `package.json` (`"resolutions"`).

Also, now to install dependencies you should use:

```
lerna add package-name --scope=@zignaly-open/ui 
```

I.e. you should be specifying the target package.

_"But wait"_, one could say. _"There is a pandemic, an ongoing war and an overall geopolitical instability that can
result in WW3. I have outdoor activities top participate in, shows to watch, people to sleep with and games to play. The
mathematical expectation of the length of my life is TOO SHORT to type out `@zignaly-open` when defining scope"_. Well,
this makes two of us:

```
lerna add package-name --scope=*/ui 
```


### Conventional commits

We use [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/#summary) and commit-lint. I suggest you
install the Conventional Commits plugin for Webstorm.

### Code Style

Please make sure you have Husky installed and configured properly. If you're not sure, run

```
npx husky install
```

![](https://media4.giphy.com/media/UWERvU4Nzn1ExkPKTx/giphy.gif?cid=ecf05e47nv430l0meeqp3d5mh4xwp0ztrizgrno4s8yc8x6w&rid=giphy.gif)

### Storybook

**TODO 1**: We still need to move Storybook to the top level.

So far we should be using the zignaly-ui storybook. Run it by running the following code in the root folder:

```
yarn storybook
```

We also will have this very storybook deployed to GH pages once the repo issues are fixed.

**TODO 2**: Fix repo issues.

### Publishing

Run this and follow the instructions:

```
lerna publish
```

## Packages

### Zignaly UI aka `@zignaly-open/ui`

Our mighty and glorious component library. Run `yarn storybook` on the root level to see how cool it is.

### PS2 aka the Zignaly Webapp Neo<sup>2</sup> aka `@zignaly-open/ps2`

More aliases than your average SoundCloud rapper.

A replacement for the zignaly-webapp-neo, created with [CRA](https://github.com/facebook/create-react-app)
, [Zignaly UI](https://www.npmjs.com/package/@zignaly-open/ui)
and [RTK Query](https://redux-toolkit.js.org/rtk-query/overview) for State management

### Raffles Client aka `@zignaly-open/raffles-client`

A React-based app for Zignaly Raffles. Please adjust `packages/raffles-client/.env` file and run it
with `yarn raffles-client`. This will start all necessary watchers and you will be able to make changes to Zignaly Ui
that would be automatically reflected.

and open [http://localhost:3000](http://localhost:3000).

### Raffles Server aka `@zignaly-open/raffles-server`

An Apollo GraphQL-based app for Zignaly Raffles. Please adjust `packages/raffles-server/.env`, start the PostgreSQL
server (details in `packages/raffles-server/README.md`) and run it
with `yarn raffles-server`. Info about the fixtures is also present in that readme file.

### Raffles Shared aka `@zignaly-open/raffles-shared`

Some common stuff for Raffles, nothing to write home about.

## Some guidelines

* Though shalt use **Typescript**
* Though shalt not use `// @ts-ignore` and, more importantly, `// @ts-nocheck`
* Though shalt not commit code that does not pass eslint check (we will figure it out anyway in GitHub's CI)
* Though shalt not commit untranslated literals and preferably use i18next
* Though shalt add more guidelines here after the team's approval
* Though shalt be very careful and use only one React version across all these repos
