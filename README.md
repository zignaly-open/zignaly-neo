# Zignaly Monorepo

Welcome to Zignaly. You will need node 16, I suggest you use nvm. Just run `nvm use`.

## How to run

```
lerna bootstrap
```

This will install all dependencies and link projects together.

## What's inside?

#### Raffles Client

A React-based app for Zignaly Raffles. Please adjust `packages/raffles-client` and run it with `yarn raffles-client` or
by following the instructions in the Raffles Client readme.

#### Raffles Server

An Apollo Gr5aphQL-based app for Zignaly Raffles. Please adjust `packages/raffles-server` and run it
with `yarn raffles-server` or
by following the instructions in the Raffles Server readme. You really should because there's info about fixtures.

#### Raffles Shared

Some common stuff for Raffles, nothing to write home about.

## Some guidelines

* Though shalt use **Typescript**
* Though shalt not use `// @ts-ignore` and, more importantly, `// @ts-nocheck`
* Though shalt not commit code that does not pass eslint check (we will figure it out anyway in GitHub's CI)
* Though shalt not commit untranslated literals and preferably use i18next
* Though shalt add more guidelines here after the team's approval
* Though shalt have `test` and `lint-ci` jobs in **every single repo** (tip: if N/A, `"exit 0"`)
