# Design mockup (v2)

Source for the Teraclay theme mockup. It's a private design canvas on claude.ai:
https://claude.ai/artifact/4DsvqU1NP9VTZPr2xjiZ5U

| Board | File |
|---|---|
| Style guide: logo, palette, packaging, color schemes, type, components | `Main.dc.html` |
| Font comparison: Jost + Karla vs Josefin Sans + Work Sans | `Type.dc.html` |
| Home, desktop | `Home.dc.html` |
| Product page, desktop (interactive) | `Product.dc.html` |
| Become an affiliate, desktop | `Affiliates.dc.html` |
| Home, mobile | `HomeMobile.dc.html` |
| Product page, mobile (interactive) | `ProductMobile.dc.html` |

These files use the canvas's own component format. Image paths (`/_blob/...`) only resolve inside the canvas.
Once the mockup is approved, its colors, fonts and spacing become the defaults in
`config/settings_data.json` for the Shopify theme.

## What changed from v1
- **Logo:** the new strata logo mark (`../brand/teraclay-mark.svg`). The brand colors now use the exact values from the logo
  file:
  - Denim `#4A6470`
  - Taupe `#877161`
  - Terracotta `#CC8062`
  - Peach `#FFD6B3`
- **Buttons, links and stars:** they use darker shades made from terracotta, Kiln `#9E5439` and Clay `#B5694C`, so they meet
  accessibility contrast.
- **Product images:** these are placeholder illustrations of the new packaging (`../placeholders/`) until the photoshoot.
- **Wording:** no multi-step routines or sets. Cross-recommendations are now plain "Also from Teraclay" suggestions, and a
  "Which cream is right for you?" comparison helps shoppers choose.
- **Fonts:** the Quicksand pairing and the clay texture are removed. Jost + Karla and Josefin Sans + Work Sans are both still
  options.
