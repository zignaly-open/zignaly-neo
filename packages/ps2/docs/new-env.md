# New Environment

First, define an environment [here](https://github.com/zignaly-open/zignaly-neo/settings/environments). if we ever get more repos, please use prefixes like `ps2-staging`, etc. You can't rename an env - only re-create it, so choose names wisely and keep in mind you will not be able to view the secrets unless you run some sketchy shenanigans (please DON'T, you will never get a blessing from our SecOps for this).

Next we define the variables and secrets. Variables are public, secrets are - surprisingly - not public. Note that it makes no sense to have things like the google tag manager id or sentry dns id because one would be able to easily retrieve them anyways (unless they are not your 80-year-old granny who is not very tech-savvy) from the compiled code or the network request the app is sending.

<opt2>Optional*</opt2> means that the variable/secret is kinda option, but 99% you'll need it.


| Name     | Type     |                                                     Description                                                     |                                         Optional |
|----------|----------|:-------------------------------------------------------------------------------------------------------------------:|-------------------------------------------------:|
| `AWS_S3_BUCKET` | Secret   |                                                 AWS S3 Bucket name                                                  |                              **Required** |
| `AWS_ACCESS_KEY` | Secret   |                                                  AWS S3 Access key                                                  |                              **Required** |
| `AWS_SECRET_KEY` | Secret   |                                                  AWS S3 Secret key                                                  |                              **Required** |
| `CF_ZONE` | Secret   |                                                   CloudFlare Zone                                                   | **Optional*** |
| `CF_TOKEN` | Secret   |                                                   CloudFlare Zone                                                   |                            **Optional*** |
| `PS2_BASE_API` | Variable |                              Base API path, e.g. `https://staging.zignaly.com/new_api`                              |                              **Required** |
| `PS2_REFERRAL_API` | Variable |    Wallet API path, e.g. `https://test-referrals.zignaly.com/`. Yes, the api path names are pretty inconsistent.    |                              **Optional*** |
| `WHITELABEL` | Variable | The name of the whitelabnel config for the deployment. Whitelabel configs can be defined [here](../src/whitelabel). |                              <opt>Optional</opt> |
| `ENABLE_TRACKING` | Variable |                            Whether or not to enable tracking systems. `true` to enable.                             |                              <opt>Optional</opt> |
| `GTM_ID` | Variable |                                                Google Tag Manager ID                                                |                              <opt>Optional</opt> |
| `GA_ID` | Variable |                                                 Google Analytics ID                                                 |                              <opt>Optional</opt> |
| `ENABLE_TEST_LANGUAGE` | Variable |                            Set to `1` to enable the [test language](./multilanguage.md)                             |                              <opt>Optional</opt> |
| `NO_INDEX` | Variable |                                        `true` to make the deployment noindex                                        |                              <opt>Optional</opt> |
| `SENTRY_DNS` | Variable |                                                     Sentry DNS                                                      |                              <opt>Optional</opt> |
| `CUSTOMER_IO_SITE_ID` | Variable |                                                 Customer IO Site ID                                                 |                              <opt>Optional</opt> |
| `INTERCOM_APP_ID` | Variable |                                                   Intercom App ID                                                   |                              <opt>Optional</opt> |
| `LIVE_SESSION_TRACK_ID` | Variable |                                                Live Session track ID                                                |                              <opt>Optional</opt> |
| `IPGEOLOCATION_API_KEY` | Variable |                               API key for ipgeolocation.io, used to detect user currency when buying crypto                                |                              **Optional*** |


Now what?

In the [`.github/workflows/`](../../.github/workflows) folder create a file called something like `deploy-ps2-something.yml`.

```yml
name: PS2 Something deploy  # TODO: change the name
on:
  # TODO: maybe you'll need to define different auto-deploy rules
  push:
    branches: 
      - master 

jobs:
  deploy:
    name: PS2 Something deploy # TODO: change the name
    uses: ./.github/workflows/ps2-deploy.yml
    secrets: inherit
    with:
      deploy-env: something # TODO: change it to the name of the environment you've just created

```

Now [push](https://youtu.be/X-wub0Q0AGc?si=2S65LQWcY0hrb7Kj&t=1) your changes to trigger a deploy.

Congrats, you're done.
