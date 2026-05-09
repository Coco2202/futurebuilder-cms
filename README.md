# 🚀 Getting started with Strapi

Strapi comes with a full featured [Command Line Interface](https://docs.strapi.io/dev-docs/cli) (CLI) which lets you scaffold and manage your project in seconds.

### `develop`

Start your Strapi application with autoReload enabled. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-develop)

```
npm run develop
# or
yarn develop
```

### `start`

Start your Strapi application with autoReload disabled. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-start)

```
npm run start
# or
yarn start
```

### `build`

Build your admin panel. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-build)

```
npm run build
# or
yarn build
```

## ⚙️ Deployment

Strapi gives you many possible deployment options for your project including [Strapi Cloud](https://cloud.strapi.io). Browse the [deployment section of the documentation](https://docs.strapi.io/dev-docs/deployment) to find the best solution for your use case.

```
yarn strapi deploy
```

## 📚 Learn more

- [Resource center](https://strapi.io/resource-center) - Strapi resource center.
- [Strapi documentation](https://docs.strapi.io) - Official Strapi documentation.
- [Strapi tutorials](https://strapi.io/tutorials) - List of tutorials made by the core team and the community.
- [Strapi blog](https://strapi.io/blog) - Official Strapi blog containing articles made by the Strapi team and the community.
- [Changelog](https://strapi.io/changelog) - Find out about the Strapi product updates, new features and general improvements.

Feel free to check out the [Strapi GitHub repository](https://github.com/strapi/strapi). Your feedback and contributions are welcome!

## ✨ Community

- [Discord](https://discord.strapi.io) - Come chat with the Strapi community including the core team.
- [Forum](https://forum.strapi.io/) - Place to discuss, ask questions and find answers, show your Strapi project and get feedback or just talk with other Community members.
- [Awesome Strapi](https://github.com/strapi/awesome-strapi) - A curated list of awesome things related to Strapi.

---

## API surface (Future Builder Academy)

Strapi exposes **content API** routes as **`/api/<api-id>`** (plural name of the collection type), for example **`/api/topics`**. Strapi does **not** use an **`/api/v1/...`** prefix—that namespace belongs to the separate **NestJS backend** in `futurebuilder-backend`.

| Concern | Host | Example path |
| -------- | ---- | ------------ |
| Topics, tool pages, orgs, content items (CMS content) | Strapi base URL (e.g. CMS Container App) | **`GET /api/topics`** |
| User onboarding profile (save/load persona, playlist hooks) | Nest backend base URL (`NEXT_PUBLIC_API_BASE_URL` on the frontend) | **`GET/POST /api/v1/onboarding`** |

Calling **`https://<cms-host>/api/v1/onboarding`** will return **404** by design: that route is **not registered in Strapi**. Point API clients and **`NEXT_PUBLIC_API_BASE_URL`** at the **Nest backend** URL.

<sub>🤫 Psst! [Strapi is hiring](https://strapi.io/careers).</sub>
