# Customizing the theme

Everything below is done in **Online Store → Themes → Customize**. Theme-wide settings live under the gear icon
(**Theme settings**). Page sections are in the left sidebar: add, remove and drag sections to change a page's layout.

## Colors

**Theme settings → Colors** holds seven color schemes. Every section has a *Color scheme* setting that picks one.

| Scheme | Default look | Used for |
|---|---|---|
| Scheme 1 | Cream background, umber text, kiln buttons | Default for most pages |
| Scheme 2 | Sand | Alternating bands: trust row, story, key ingredients |
| Scheme 3 | Peach | Newsletter and promotions |
| Scheme 4 | Blush | Soft feature areas |
| Scheme 5 | Mist (cool blue-grey) | Contrast: the "Compare our creams" card |
| Scheme 6 | Umber (dark) | Announcement bar, footer, affiliate band |
| Scheme 7 | White | Plain white areas |

Each scheme has eight colors: background, cards/image backgrounds, text, secondary text, links/labels,
button, button label and borders.

**Brand colors** (from your logo file):
- Denim `#4A6470`
- Taupe `#877161`
- Terracotta `#CC8062`
- Peach `#FFD6B3`

**Working colors:**
- Kiln `#9E5439`: a deeper terracotta that stays readable for buttons and links
- Umber `#3B2E25`: text
- Taupe ink `#6A5E4D`: secondary text
- Clay `#B5694C`: review stars

The repository runs an automatic contrast check on the schemes, so if a color you pick in the editor makes text hard
to read, the check flags it on GitHub.

## Fonts

**Theme settings → Typography** has two font pickers:

| Pairing | Heading font | Body font |
|---|---|---|
| Jost + Karla (default) | Jost, weight **Medium (500)** | Karla, Regular |
| Josefin Sans + Work Sans | Josefin Sans, weight **Semi-bold (600)** | Work Sans, Regular |

To switch pairings, change both pickers and save. You can switch back and forth any time. **Heading size** and **Body
text size** scale all text up or down.

## Logo

**Theme settings → Logo and favicon**:
- **Without a logo image**, the theme shows the strata symbol with "Teraclay" typed in the heading font.
- **With a finished logo image** (PNG or SVG), upload it and turn off *Show shop name next to the logo* if the image
  already includes the name.
- **Logo height** controls the size.
- **Favicon:** upload a square image. Otherwise the strata symbol is used.

## Menus

Menus are edited in **Online Store → Navigation**, not in the theme.

- **Main menu** (`main-menu`) is the header menu. Suggested items: Shop all · Face Wash · Face Creams · Ingredients ·
  Our Story. Items with child links become dropdowns on desktop and expandable groups on mobile.
- **Footer menu** (`footer`) is the "Learn" column. Suggested items: Our Story · Ingredients · FAQ · Contact.
- The footer's "Shop" column also uses the main menu. In the footer section you can point it at another menu.
- The footer's "Affiliates" column fills itself from **Theme settings → Affiliate program**.

## Page templates

Each Shopify page (Online Store → Pages) can use a template. Pick it under **Theme template** on the page.

| Page | Template | Suggested URL handle |
|---|---|---|
| Our story | `about` | `story` (your existing page) |
| Contact | `contact` | `contact` |
| FAQ | `faq` | `faq` |
| Ingredients | `ingredients` | `ingredients` |
| Become an affiliate | `affiliates` | `affiliates` |
| Affiliate program terms | `affiliate-terms` | `affiliate-terms` |
| A review campaign | `reviews-campaign` | the campaign's slug |

The suggested handles matter: the theme links to `/pages/ingredients`, `/pages/affiliates` and `/pages/affiliate-terms`
by default.

## Sections you can add anywhere

- **Content:** Hero · Icon row · Featured products · Product comparison · Image with text · Ingredients · Columns ·
  Callout band · Newsletter · Rich text · Questions (FAQ) · Contact form · Apps · Custom section.
- **Product pages only:** Key ingredients · Product reviews · Also from Teraclay.

Every section has color scheme and top/bottom spacing settings.

## Product page

The product template (**Products → Default product** in the editor) has blocks you can reorder:
- label
- title
- review stars
- price
- description
- badges
- size picker
- buy buttons
- trust line
- collapsible tabs

The collapsible tabs read product fields (see [custom-data.md](custom-data.md)), so each product shows its own text. A
tab hides itself when that product's field is empty.

## Product cards

**Theme settings → Product cards**:
- image shape (square or 4:5)
- fit (show the whole product, or fill the frame)
- the "best for" badge
- quick add button
- review stars

## Where the default photos come from

The hero and "Our story" sections fall back to the climbing and fjord photos from the old site (they're stored in the
theme). Pick new images in each section to replace them.
