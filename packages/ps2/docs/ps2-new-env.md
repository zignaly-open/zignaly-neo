# New PS2 Environment

First, define an environment [here](https://github.com/zignaly-open/zignaly-neo/settings/environments). You can't rename an env - only re-create it, so choose names wisely and keep in mind you will not be able to view the secrets unless you run some sketchy shenanigans (please DON'T, you will never get a blessing from our SecOps for this).

Next we define the variables and secrets. Variables are public, secrets are - imagine my shock - not public. It makes no sense to have things like the google tag manager id or sentry dns id because one would be able to easily retrieve them anyways (unless they are not your 80-year-old granny who is not very tech-savvy) from the compiled code or the network request the app is sending.

*Optional*</opt2> means that the variable/secret is kinda option, but 99% you'll need it.


| Name                        | Type     |                           Description                            |     Optional |
|-----------------------------|----------|:----------------------------------------------------------------:|-------------:|
| `AWS_ACCESS_KEY`            | Secret   |     AWS S3 Access key used both for Codedeploy and S3 upload     | **Required** |
| `AWS_SECRET_KEY`            | Secret   |     AWS S3 Secret key used both for Codedeploy and S3 upload     | **Required** |
| `AWS_S3_BUCKET`             | Secret   | AWS S3 Bucket name to which the static content would be uploaded | **Required** |
| `CF_ZONE_CDN`               | Secret   |          CloudFlare Zone to invalidate the main domain           |  *Optional** |
| `CF_ZONE`                   | Secret   |              CloudFlare Zone to invalidate  the CDN              |  *Optional** |
| `CF_TOKEN`                  | Secret   |          CloudFlare Token to invalidate the main domain          |  *Optional** |
| `CF_TOKEN_CDN`              | Secret   |              CloudFlare Token to invalidate the CDN              |  *Optional** |
| `CODEDEPLOY_BUCKET`         | Secret   |             CodeDeploy bucket for the WL server code             | **Required** |
| `CODEDEPLOY_GROUP`          | Secret   |            CodeDeploy group for the WL server deploy             | **Required** |
| `CODEDEPLOY_APP`            | Secret   |                CodeDeploy app, default `zignaly`                 | *Optional* |
| `CODEPLOY_REGION`           | Secret   |            Believe it or not, it's CodeDeploy region             | **Required** |
| `SLACK_WEBHOOK`             | Secret   |          Slack webhook to report PS2 WL Server logs to           |   *Optional* |
| `CDN_URL`                   | Variable | "CDN" that we serve the static content from for all whitelabels  | **Required** |
| `PS2_BASE_API`              | Variable |          Base API path, e.g. `https://api.zignaly.com/`          | **Required** |
| `PS2_REFERRAL_API`          | Variable |     Referral API path, e.g. `https://referrals.zignaly.com/`     |   *Optional* |
| `DEV_ONLY_WHITELABEL`       | Variable |  [Dev only](../src/whitelabel) var to force a whitelabel config  |   *Dev only* |
| `ENABLE_TRACKING`           | Variable |              `true` to enable the trackign systems               |   *Optional* |
| `CUSTOMER_IO_SITE_ID`*      | Variable |                       Customer IO Site ID                        |   *Optional* |
| `GA_ID`*                    | Variable |                       Google Analytics ID                        |   *Optional* |
| `LIVE_SESSION_TRACK_ID`*    | Variable |                      Live Session track ID                       |   *Optional* |
| `ENABLE_TEST_LANGUAGE`      | Variable |     `true` to enable the [test language](./multilanguage.md)     |   *Optional* |
| `NO_INDEX`                  | Variable |              `true` to make the deployment noindex               |   *Optional* |
| `SENTRY_DNS`*               | Variable |                            Sentry DNS                            |   *Optional* |
| `IPGEOLOCATION_API_KEY`     | Variable |   API key for ipgeolocation.io to detect user default currency   |   *Optional* |
| `PS2_WL_CACHE_TTL_OVERRIDE` | Variable |       How long we keep WL config in cache. Default 10 min        |   *Optional* |
| `PS2_WL_SLACK_LOG_THROTTLE` | Variable |      How long till we send the same error log. Default 100s      |   *Optional* |


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
