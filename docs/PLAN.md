# Teraclay custom Shopify theme: plan

## Context
teraclay.com sells natural mineral skincare. It runs the paid "Trademark" theme (v1.7.3, jQuery-era, with leftover broken Yotpo
blocks). The owner wants a custom Online Store 2.0 theme that they own, in their warm clay/pastel palette, and editable in the
Shopify theme editor (colors, fonts, images, layouts). It must also integrate two tools the owner built:
- **Reviews (live):** served from `reviews.teraclay.com`. The embed contract was confirmed on the live PDP:
  `<script src="https://reviews.teraclay.com/widget.js" defer>` plus
  `<div data-reviews-widget="full|aggregate" data-product-id data-variant-id data-customer-id data-brand-primary-bg/-fg
  data-brand-secondary-bg/-fg data-brand-logo>`. There are also campaign forms (`data-campaign-form`, `data-campaign-feedback-form`).
  Theming is done through the CSS vars `--reviews-text/-bg/-star-color/-cta-bg/-cta-fg/-border-radius`.
- **Affiliates (not live):** a standalone portal at `affiliates.teraclay.com` plus `promo.teraclay.com/CODE` referral links.
  Both repos are now on GitHub (`DavidPrevost/shopify-reviews` is public, `DavidPrevost/affiliates`). **Read only; never modify them.**
- A dev store `teraclay-dev.myshopify.com` exists (used by the affiliates dev stack). Test the theme there first.

Decisions: build on **Shopify's Skeleton starter theme**; the owner **mirrors the repos to GitHub**; **mockup first**. The extras
are the **FAQ page, Ingredients page and Sets/bundles product layout**, with no blog. Assumptions: a non-Plus plan (checkout is
branded in Shopify's checkout editor, not the theme), and install through Shopify's GitHub integration.
Work happens on branch `claude/exciting-fermat-q82ml7` in `DavidPrevost/site-design`, which is currently empty.

## Phase 0: owner actions (in parallel, none blocking)
- ~~Mirror the repos~~ (done).
- Optionally send the brand hex values. Otherwise use the naive CMYK→RGB conversions:
  #FFD1B5 peach · #CD6E5A terracotta · #786B58 taupe · #366677 dusty denim.

## Phase 1: design mockup (for approval, no theme code yet)
- A private HTML artifact showing:
  - the palette, expanded into tints and shades plus neutrals: cream, clay, dusty rose, sage and denim for contrast
  - 2–3 sans-serif pairings from Shopify's font library (e.g. a warm humanist sans for body, a characterful sans for headings)
  - buttons and cards
  - the homepage
  - a product page, including a styled reviews block and stars
  - a mobile view
- Iterate until approved. Save the approved design as tokens: the source for `settings_data.json` defaults.
  Keep the mockup source in `design/mockup.html`.

## Phase 2: scaffold
- Copy Shopify/skeleton-theme into the repo root. Keep its license notice.
- Add `package.json` with `@shopify/cli` for `shopify theme check`.
- Add `.github/workflows/theme-check.yml` to lint on push.
- Add `.shopifyignore`, `.gitignore` and `README.md`.

## Phase 3: design system
- `config/settings_schema.json`:
  - **color schemes** (Shopify's `color_scheme_group`: bg, text, accent, button, button text, border) with 4–5 presets
    built from the palette
  - `font_picker` settings for headings and body, plus type scale
  - button style and radius, page width, spacing
  - logo, favicon and social links
  - a Reviews group: widget URL, star color, show stars on cards
- `snippets/css-variables.liquid` emits the settings as CSS custom properties.
- `assets/base.css` uses only those tokens. That is the single place for changing colors and fonts.
- A subtle optional "clay texture" background setting (image or CSS noise) per color scheme.

## Phase 4: core theme
- **`layout/`:** `theme.liquid` and `password.liquid`.
- **Header and footer:** section groups (`sections/header-group.json`, `sections/footer-group.json`) containing:
  - announcement bar
  - header with mega-menu and mobile drawer, plus predictive search
  - footer with menus, newsletter, contact and social links
- **Templates** (`templates/*.json`):
  - `index`, `product`, `collection`, `list-collections`
  - `page`, `page.about` (Our Story), `page.contact`
  - `cart`, `search`, `404`, `password`
  - `gift_card.liquid`
  - Customer accounts use Shopify's hosted new accounts, so no `customers/*` templates are needed; the header links to them.
- **Reusable sections** (every one with schema settings, a color-scheme picker and blocks so layouts can be rearranged):
  - hero / slideshow
  - featured collection
  - featured product
  - image with text
  - rich text
  - multicolumn / benefits
  - testimonials
  - collapsible content
  - newsletter
  - logo / press strip
  - video
  - `apps` (hosts app blocks)
- **Main sections:**
  - `main-product`: gallery; blocks for title, price, variant picker, quantity, buy buttons, description, collapsible
    metafield tabs and reviews summary
  - `main-collection`: filters and sort
  - `main-cart` and `cart-drawer`, with vanilla JS using the Cart AJAX API
  - `main-search`, `main-page`, `main-404`
- **Product content:** product details move from the old tag-based tabs (`__tab1:...`) to product metafields
  (`custom.details`, `custom.how_to_use`, `custom.ingredients`). The migration steps go in the docs.
- **JS:** small vanilla modules in `assets/`: cart, variant picker, drawer and predictive search. No jQuery.

## Phase 5: reviews integration (contract read from `DavidPrevost/shopify-reviews`, read-only, not modified)
**Facts:**
- Plain-DOM widget: global `widget.js` plus placeholder divs.
- The theme outputs no signature. Auth comes from the App Proxy `/apps/reviews/*` (JSON only).
- The widget writes `--reviews-*` vars inline on `<html>` from admin config. It injects its CSS at the end of `<head>`.
- It never re-reads attributes after init (`data-rv-initialized`).
- Campaign forms are `<div data-campaign-form="slug">` / `<div data-campaign-feedback-form="key">` inside Page content.
- No JSON-LD is emitted, so Google stars were lost at cutover. No rating metafields are written.

**What the theme does:**
- **`layout/theme.liquid`:** loads `widget.js` once, `defer`, when the theme setting "Reviews → enabled" is on. The widget URL is also a setting.
- **`snippets/reviews-widget.liquid`** (params: `mode` full|aggregate, `product`, `variant`):
  - wraps the div in `.tc-reviews` so theme overrides out-rank the injected CSS
  - outputs `data-product-id`, `data-variant-id` and `data-customer-id`
  - outputs `data-brand-*` from the theme's own color-scheme hex values, so the backend's brand defaults match the theme.
    A setting can switch back to `shop.brand`, keeping the logo guard.
- **Styling:** CSS maps theme tokens onto `--reviews-*` **on `.tc-reviews`** (not `:root`, where the widget's inline vars
  would win). It restyles the hardcoded `.rv-dialog` (#fff/#222), buttons, stars and typography to match.
- **Placement:**
  - `reviews` block in `main-product` (full widget; movable in the editor)
  - `reviews-summary` block near the title (aggregate)
  - optional stars on `product-card`, with space reserved to avoid layout shift
  - optional "featured reviews" placement on the homepage (aggregate + link)
- **Variant switching (`assets/product.js`):** on change, replace the widget div with a fresh node carrying the new
  `data-variant-id`. The MutationObserver only picks up added nodes.
- **Campaign pages:** `templates/page.reviews-campaign.json` with a `reviews-campaign-form` section (settings: form type + slug/key).
  The owner no longer pastes HTML; `page.content` still renders, so the old pasted snippets keep working.
- **SEO hook:** Product JSON-LD in `snippets/structured-data.liquid` includes `aggregateRating` when the standard
  `product.metafields.reviews.rating` / `rating_count` exist. It is inert until the reviews service writes them (a suggested
  follow-up in that repo; not done here).

## Phase 6: affiliates integration (contract read from `DavidPrevost/affiliates`, read-only, not modified)
**Facts:**
- A standalone app on `affiliates.teraclay.com`: login, dashboard, link, earnings, payouts, profile and admin.
  It blocks iframing, and has no app proxy or storefront JS.
- Referral links are `promo.teraclay.com/CODE`, which 302s to `https://<shop>/discount/CODE` (homepage, discount cookie only).
- The discount is 10%, combines with nothing, and is attributed only via the order's `discount_codes`.
- No public apply, terms or FAQ pages exist yet.
- Portal branding is 7 hex colors entered by hand at `/admin/branding`; no fonts.
- `GET /login` misroutes logged-in affiliates, so link to the portal root.

**What the theme does** (makes the storefront side feel native):
- **Theme settings, "Affiliate program" group:**
  - enable
  - portal URL (default `https://affiliates.teraclay.com/`)
  - discount % label
  - show footer/nav link
- **`templates/page.affiliates.json`:** program landing page (hero; how it works: get your link → share → earn; benefits and
  commission copy; FAQ accordion; CTA) plus an **application form**. Shopify's `{% form 'contact' %}` with affiliate fields
  (name, email, social handles, audience, why) is tagged `affiliate-application`, so applications email the owner, who then
  creates the affiliate in the portal. No repo change needed.
- **Program pages:** `templates/page.affiliate-terms.json` (program agreement) and reuse of `page.faq` for an affiliate FAQ.
- **Referral landing experience (`snippets/discount-banner.liquid` + `assets/discount-banner.js`):** when a code arrives via
  `/discount/CODE`, show a dismissible "10% off applied — code CODE" banner. It reads `cart.discount_codes` and falls back to
  Shopify's discount cookie (verify the exact behavior on the dev store). The cart and drawer clearly show discount applications.
- **Links:** footer "Affiliate login" goes to the portal root, and "Become an affiliate" goes to the landing page.
- **Docs:**
  - `docs/affiliate-branding.md` lists the exact 7 hex values from the final theme palette to enter at the portal's
    `/admin/branding`, so the portal matches the store.
  - Suggested follow-ups for that repo (not done here): public apply endpoint, fonts, `?redirect=` deep links, `/login` fix.

## Phase 7: extras
- **FAQ:** `templates/page.faq.json`, using the collapsible-content section. Optional FAQ schema.org JSON-LD.
- **Ingredients:** an `ingredient` metaobject (name, image, source, benefits).
  - `templates/page.ingredients.json` renders all ingredients.
  - A product metafield `custom.key_ingredients` (list of ingredient references) drives a PDP block that links to anchors on
    the ingredients page.
- **Sets/bundles:** `templates/product.set.json`. A `custom.set_contents` (list of product references) metafield drives a
  "What's inside" section with a per-item card and a "value vs. buying separately" line.
- Metafield and metaobject definitions are created by the owner in Admin → Settings → Custom data. Exact steps go in the docs.

## Phase 8: docs and hand-off (`docs/`)
- `install.md`: connect GitHub → preview → publish, plus a rollback path.
- `customizing.md`: colors, fonts, sections, templates, metafields.
- `launch-checklist.md`, covering:
  - URL parity (handles are unchanged, so no redirects are needed unless pages are renamed)
  - removing the old Yotpo references
  - moving tab content into metafields
  - checkout-editor branding values
  - fixing the primary domain (www.teraclay.com currently 302s to teraclay.myshopify.com).
    When fixed, **add `https://www.teraclay.com` to the reviews service's `STOREFRONT_ORIGIN`**, or the widget shows
    "Reviews Unavailable". Then re-test a `promo.teraclay.com/CODE` link end to end.
- `repo-mirroring.md`: the GitHub mirroring steps given in chat.

## Verification
- `npx shopify theme check` passes with zero errors, locally and in the GitHub Action.
- The owner connects this repo/branch through Shopify's GitHub integration as an unpublished theme, first on
  `teraclay-dev.myshopify.com` and then on the live store, and shares the preview link.
- Playwright (preinstalled Chromium) checks against the preview URL:
  - screenshots of each template at mobile and desktop widths
  - axe accessibility checks
  - a check that the reviews widget renders (the `.rv-widget` element appears) on a PDP and on cards
  - a variant switch re-renders the reviews widget
  - an add-to-cart → cart drawer → checkout-button flow
  - `/discount/TESTCODE` shows the discount banner and the cart discount line
- A campaign page with the `reviews-campaign-form` section renders the form.
- The affiliate application form submits through the Shopify contact form.
- The owner does a theme-editor smoke test: change a color scheme, font and section order, and confirm the storefront updates.
