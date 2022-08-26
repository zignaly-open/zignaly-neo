# Zignaly Webapp Neo<sup>2</sup>

This is the implementation of Profit Sharing 2.0 done anew using
Typescript, [CRA](https://github.com/facebook/create-react-app)
, [Zignaly UI](https://www.npmjs.com/package/@zignaly-open/ui)
and [RTK Query](https://redux-toolkit.js.org/rtk-query/overview) for State management. I assume you are familiar with
[React](https://facebook.github.io/create-react-app/docs/getting-started) and CRA so the auto-generated CRA Readme is
too boring to not be removed.

### How to run

You will need node 16, I suggest you use nvm. Just run `nvm use` on the root level.

I assume you already have all dependencies installed from the `lerna bootstrap` step. What next? Next we configure
the `.env` file. Feel free to copy data from the `.env.sample`. I feel pretty comfortable putting it to the repo because
it has
already been published in the neo2 (do not confuse with neo<sup>2</sup>) but primarily because any person with a half
functioning brain and basic dev skills can reverse-engineer the code to get this value.

* `REACT_APP_SENTRY_DNS` - Sentry DNS
* `REACT_APP_ENABLE_TRACKING` - Enables tracking, but individual keys need to be configured anyways. Omit it from the
  .env to disable
* `REACT_APP_SEGMENT_KEY` - Segment write key
* `REACT_APP_SEGMENT_NAME` - Segment app name
* `REACT_APP_LIVE_SESSION_TRACK_ID` - Live session track ID
* `REACT_APP_BASE_API` - base API, as you may have guessed from the name lol
* `REACT_APP_GTM_ID` - Google Tag Manager id
* `REACT_APP_GOOGLE_CAPTCHA_TOKEN` - captcha key

⚠️ **WARNING!** Unless you want to spend time trying to figure out why the hell the backend responds with a captcha
error, you _**have**_ to run the app on a `*.zignaly.com` domain. To do that, modify `sudo vim /etc/hosts` (or whatever
in the System32 the path is on Windows) and add:

```
127.0.0.1 local.zignaly.com
```

Now open [http://local.zignaly.com:3000](http://local.zignaly.com:3000) and good luck using it.

### Scripts

Unless you want to deal with linking issues and zignaly-ui rebuilds, follow the instructions from the top-level
readme. `yarn run ps2`.

This being a CRA app, in `packages/ps2` you can run:

* `yarn test` - [runs tests](https://facebook.github.io/create-react-app/docs/running-tests)
* `yarn build` - builds the app for production to the `build` folder
* `yarn eject` - if you do not know what this is do not run it

### Folder Structure

```
src
├── components                      # Shared components used across the app
│   └── ComponentName 
│       ├── index.tsx               # actual component with export default
│       ├── validations.ts          # if it's a form, yup resolvers
│       ├── styles.tsx              # styled components
│       ├── types.tsx               # type definitions
│       └── atoms.tsx               # some tiny react components unworthy to be placed in src*=/components
├── fetures                         # store-management done like RTK wants you to (I guess)
│   ├── featureName
│   │   ├── components              # components used by this feature 
│   │   │   ├── InvestorDetails.tsx           # actual component with export default
│   │   │   ├── validations.ts      # if it's a form, yup resolvers
│   │   │   ├── styles.tsx          # styled components
│   │   │   ├── types.tsx           # type definitions
│   │   │   └── atoms.tsx           # some tiny react components unworthy to be placed in src*=/components
│   │   ├── store.ts                # store slice (RTKQ terminology without RTKQ folder structure)
│   │   ├── api.ts                  # api slice
│   │   ├── types.ts                # types
│   │   └── use.ts                  # hooks to use reducers and action-creators. 
│   │                               # I want to do it with a sufficient abstraction layer 
│   └── store.ts                    # redux store 
├── util                            # common-use helper functions
├── views                           # high-level components aka routes
└── App.tsx                         # entry point with 100500 providers around it

```

Please follow the existing codestyle. Good luck on your journey.
