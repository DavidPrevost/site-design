# Teraclay Shopify theme

A custom Online Store 2.0 theme for [teraclay.com](https://www.teraclay.com), built on Shopify's
[Skeleton theme](https://github.com/Shopify/skeleton-theme).

- **Theme files** live at the repository root (`layout/`, `templates/`, `sections/`, `blocks/`,
  `snippets/`, `assets/`, `config/`, `locales/`), which is what Shopify's GitHub integration expects.
- **`docs/`** holds the owner's guides, and **`design/`** holds the mockup source, brand mark and
  placeholder product images. Shopify ignores both folders.

## Working on the theme

```sh
npm install        # installs the Shopify CLI locally
npm run check      # Theme Check (runs offline, no store login needed)
npm run contrast   # checks text/background contrast of the default color schemes
npm run dev        # live preview against a store (needs a store login)
```

Shopify commits theme editor changes back to the connected branch, so run `git pull` before you push.

## Guides

| Guide | What it covers |
|---|---|
| [Install and preview](docs/install.md) | Connect this repository to Shopify as an unpublished theme, preview, publish, roll back |
| [Customizing](docs/customizing.md) | Color schemes, the two font pairings, logo, menus, page templates, sections |
| [Product fields and ingredients](docs/custom-data.md) | The metafields and Ingredient metaobject the theme reads, with suggested values |
| [Reviews](docs/reviews.md) | How the reviews widget is placed and styled, campaign pages, domain change |
| [Affiliate program](docs/affiliates.md) | Affiliate pages, application emails, the discount banner, portal branding |
| [Product photography](docs/product-photography.md) | Image specs and a shot list for the new packaging |
| [Launch checklist](docs/launch-checklist.md) | Everything to set up and test before publishing |
| [Plan](docs/PLAN.md) | Design decisions and build plan |
