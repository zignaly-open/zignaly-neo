# Zignaly Monorepo

Welcome to Zignaly. You will need node 16, I suggest you use nvm. Just run `nvm use`.

## How to run

```
lerna bootstrap
```

This will install all dependencies and link projects together. Next instructions vary by the repository.

Also, now to install dependencies you should use:

```
lerna add package-name --scope=zignaly-ui 
```

I.e. you should be specifying the target package.

#### Conventional commits

We use [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/#summary) and commit-lint. I suggest you
install the Conventional Commits plugin for Webstorm.

#### Zignaly UI

Our mighty and glorious component library.

* TODO: publish
* TODO: storybook
* TODO: lint

#### Raffles Client

A React-based app for Zignaly Raffles. Please adjust `packages/raffles-client/.env` file and run it
with `yarn raffles-client`. This will start all necessary watchers and you will be able to make changes to Zignaly Ui
that would be automatically reflected.

and open [http://localhost:3000](http://localhost:3000).

#### Raffles Server

An Apollo GraphQL-based app for Zignaly Raffles. Please adjust `packages/raffles-server/.env`, start the PostgreSQL
server (details in `packages/raffles-server/README.md`) and run it
with `yarn raffles-server`. Info about the fixtures is also present in that readme file.

#### Raffles Shared

Some common stuff for Raffles, nothing to write home about.

## Some guidelines

* Though shalt use **Typescript**
* Though shalt not use `// @ts-ignore` and, more importantly, `// @ts-nocheck`
* Though shalt not commit code that does not pass eslint check (we will figure it out anyway in GitHub's CI)
* Though shalt not commit untranslated literals and preferably use i18next
* Though shalt add more guidelines here after the team's approval
* Though shalt be very careful and use only one React version across all these repos
