# Poker4Fun

<figure align="center">
  <img width="256" alt="Poker4Fun Logo" src="https://user-images.githubusercontent.com/4647136/39746191-2c4e4964-52dc-11e8-8b68-435cd12e4315.png">
  <figcaption>♠︎ Vivid, registration-free, easy-to-use Scrum poker.</figcaption>
</figure>

## What

Poker4Fun is an online [planning poker](https://en.wikipedia.org/wiki/Planning_poker) app for lightweight Scrum estimation. Create a room, share the room link with teammates, vote, and reveal estimates together.

## Why

Most online planning poker tools are useful, but often require registration, feel dull, or have unreliable connectivity. Poker4Fun keeps the workflow fast and open: no accounts, quick sharing, and a focused voting experience.

## Maintainers

[![hyjk2000](https://avatars0.githubusercontent.com/u/4647136?s=100&v=4)](https://github.com/hyjk2000) [![hiveer](https://avatars0.githubusercontent.com/u/3827780?s=100&v=4)](https://github.com/hiveer) [![just4fun](https://avatars0.githubusercontent.com/u/7512625?s=100&v=4)](https://github.com/just4fun)

## Modernized Architecture

This repository is now a Bun-based monorepo:

- `apps/web` contains the React 19 frontend.
- `apps/server` contains the Bun server + Socket.IO backend.
- `mise.toml` pins the local Bun toolchain.

The legacy [Create React App](https://github.com/IFS49F/poker/tree/legacy) and [Express](https://github.com/IFS49F/poker-server) setup has been archived.

## Prerequisites

- [mise-en-place](https://mise.jdx.dev/getting-started.html) for development environment setup
- Docker (optional)

## Getting Started

Install dependencies from the repository root:

```bash
bun install
```

Set up the pre-commit hook after installing dependencies:

```bash
bunx lefthook install
```

The hook runs `bunx oxlint --fix` and `bunx oxfmt` before commits.

Start a local Redis instance:

```bash
docker run -p 127.0.0.1:6379:6379 --name redis -d redis
```

Start both apps in development:

```bash
bun dev
```

Run one app at a time:

```bash
bun run --filter './apps/web' dev
bun run --filter './apps/server' dev
```

By default, the web app serves on `http://localhost:3000` and the server listens on `http://localhost:4000`.

## Build and Type Check

```bash
bun run --filter './apps/web' build
bun run --filter './apps/server' build
bun run --filter './apps/web' typecheck
```

Build output is written to each app's `dist/` directory.

## Configuration

The server reads:

- `PORT` - HTTP server port, defaulting to `4000`
- `REDIS_URL` - Redis connection string
- `WEB_BASE_URL` - allowed browser origin for Socket.IO CORS

The web app reads:

- `BUN_PUBLIC_SERVER_BASE_URL` - Socket.IO server URL

`mise.toml` provides local defaults for development. Use [local overrides](https://mise.jdx.dev/configuration.html) for machine-specific values and secrets.

## Cost

Poker4Fun remains a side project with recurring hosting and domain costs.

| Item   | Cost         | Date                | Until                |
| ------ | ------------ | ------------------- | -------------------- |
| Domain | CNY ￥18.14  | Jul 23, 2017        | Jul 23, 2018         |
| Domain | CNY ￥192.16 | May 23, 2018        | Jul 22, 2019         |
| Domain | CNY ￥208.14 | Jul 12, 2019        | Jul 23, 2020         |
| Domain | CNY ￥230.42 | Oct 17, 2020        | Oct 18, 2022         |
| Domain | CNY ￥207.97 | Oct 02, 2022        | Oct 18, 2023         |
| Domain | CNY ￥153.47 | Jul 10, 2025        | Jul 11, 2027         |
| Server | USD $5       | 1st day every month | Last day every month |

## Donate

Poker4Fun is a side project we built in our spare time. This app has become popular thanks to the hard working of our [contributors](https://github.com/IFS49F/poker/graphs/contributors) and valuable feedbacks from our users. As an open source software, Poker4Fun is and will always be free for everyone, but it [costs money](#cost) to run the server and renew the domain. We need your help to keep Poker4Fun free and sustainable, and would be much appreciated if you could buy us a cup of coffee ☕️ to fuel our coding frenzy 🔥.

| WeChat                                                                                     |
| ------------------------------------------------------------------------------------------ |
| <img width="320" alt="WeChat Donate Code" src="./apps/web/src/assets/donate_wechat.jpg" /> |

## Sponsors

Thank you to everyone who has supported Poker4Fun.

| Name                                              | Amount      | Date         |
| ------------------------------------------------- | ----------- | ------------ |
| [hiveer](https://github.com/hiveer)               | CNY ￥60    | Apr 25, 2018 |
| [虚无飘渺](http://www.dianping.com/shop/93573479) | CNY ￥6.66  | Apr 26, 2018 |
| [yoyodream2017](https://github.com/yoyodream2017) | CNY ￥10    | Apr 27, 2018 |
| [hum4dna](https://www.instagram.com/hum4dna/)     | CNY ￥16.66 | Apr 27, 2018 |
| [xhuang68](https://github.com/xhuang68)           | CNY ￥16.66 | May 7, 2018  |
| [WindhorseTour.com](https://windhorsetour.com)    | CNY ￥80    | May 15, 2018 |
| [hum4dna](https://www.instagram.com/hum4dna/)     | CNY ￥50    | Jul 5, 2019  |
| [姗姗吃得含](https://github.com/MrCuriosity)      | CNY ￥50    | Jul 6, 2019  |
| [干吃不胖妞](https://github.com/LeoLeoLei)        | CNY ￥66    | Jul 8, 2019  |
| [坏笑胖狗](https://github.com/BerdyPango)         | CNY ￥60    | Jul 8, 2019  |
| [Vincent](https://github.com/yaowuping)           | CNY ￥100   | Jul 26, 2019 |
| [xhuang68](https://github.com/xhuang68)           | CNY ￥66    | Aug 1, 2019  |
| 厦门市民叶先生                                    | CNY ￥6     | Apr 20, 2020 |

## License

Copyright 2017-present IFS49F.

Poker4Fun is licensed under [GPL-3.0](./LICENSE).

[Poker4Fun Logo](https://user-images.githubusercontent.com/4647136/39746191-2c4e4964-52dc-11e8-8b68-435cd12e4315.png) is licensed under [CC-BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).
