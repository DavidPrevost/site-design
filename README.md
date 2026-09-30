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

See [`docs/install.md`](docs/install.md) to connect the theme to a store.
