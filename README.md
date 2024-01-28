# Zignaly Monorepo

### [View Storybook](https://zignaly-open.github.io/zignaly-neo)


Welcome to Zignaly. You will need node 16, I suggest you use nvm. Just run `nvm use`. This app also
uses [Lerna](https://lerna.js.org) and Yarn, so `package-lock.json`'s were gitignored.

You will need node 16. Feel free to use [nvm](https://github.com/nvm-sh/nvm) to manage node versions, Run `nvm use` to
switch to 16.

## How to run

Now, in order to install top-level dependencies, run `yarn`. And here's where the fun begins. Run:

```
yarn lerna bootstrap
```

This will install all dependencies and link projects together. Next, run instructions vary by the package:

* `yarn bootstrap` is a shorthand for `yarn lerna bootstrap`. Send regards and boxes of whiskey to @strrife who saved you
  from typing 1 extra character. Jokes aside, plays well with IDEs.
* `yarn test` - you guessed it - runs `yarn test` for all packages.
* `yarn storybook` runs zignaly-ui (`@zignaly-open/ui`) storybook. More on that later.
* `yarn ps2` runs Webapp Neo <sup>2</sup>. Needs `.env` config.
* `yarn backoffice` runs the Backoffice app. Needs `.env` config.
* `yarn build` builds all repos (needed for UI repos)

### More FYIs

* you do not need to re-run `yarn lerna bootstrap` unless some package relations changed or you need to do `yarn install`
* run `yarn lerna clean --yes && yarn lerna bootstrap` if you're desparate for `node_modules` removal
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
yarn lerna add package-name --scope=*/ps2 
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

So far we should be using the zignaly-ui storybook. Run it by running the following code in the root folder:

```
yarn storybook
```

### Themes

If you'd like to re change the color palette, please modify corresponding values in `packages/zignaly-ui/src/theme/example.ts`. Feel free to use `packages/zignaly-ui/src/theme/dark.ts` (the theme we use for the Zignaly Profit Sharing app) as reference. 

So, to play with the colors:

```
yarn && yarn lerna bootstrap
yarn ps2 
```

A tab with [localhost:3000](http://localhost:3000) will open. Now feel free to modify the color scheme to your heart's desire. The changes will be picked up automatically and the app will auto-refresh.

Customizable fonts will be implemented over the next 2 days.

## How to deploy

Please go [here](./packages/ps2/docs/deploy.md) for a guide on how to manually trigger a deploy and [here](./packages/ps2/docs/ps2-new-env) to set up a new environment.

### Deploy to master

An auto-deploy would trigger when you merge to `master`. 

### Deploy to prod

Create a release on Github with a `release-ps2-{date}-{description}` tag to deploy ps2. Like, `release-ps2-20121222-prevent-apocalypse`. 


## Packages

### Zignaly UI aka `@zignaly-open/ui`

Our mighty and glorious component library. Run `yarn storybook` on the root level to see how cool it is.

### PS2 aka the Zignaly Webapp Neo<sup>2</sup> aka `@zignaly-open/ps2`

More aliases than your average SoundCloud rapper.

A replacement for the zignaly-webapp-neo, created with [CRA](https://github.com/facebook/create-react-app)
, [Zignaly UI](https://www.npmjs.com/package/@zignaly-open/ui)
and [RTK Query](https://redux-toolkit.js.org/rtk-query/overview) for State management

### Backoffice aka `@zignaly-open/backoffice`

A backoffice app largely replicating the PS2 architecture.

## Some guidelines

* Though shalt use **Typescript**
* Though shalt not use `// @ts-ignore` and, more importantly, `// @ts-nocheck`
* Though shalt not commit code that does not pass eslint check (we will figure it out anyway in GitHub's CI)
* Though shalt not commit untranslated literals and preferably use i18next
* Though shalt add more guidelines here after the team's approval
* Though shalt be very careful and use only one React version across all these repos
* Though shalt add ids to lionks and buttons for easier automation and conversion tracking


## TODO items

* Upgrade Lerna
* As of July 10th 2023, we've not yet completed the support of multiple themes but this is about to be done shortly. We should add thje multi-theme support.
* Figure out what to do with the tables, either add i18n to zignaly-ui, create a sub-project with tables or move into ps2 
