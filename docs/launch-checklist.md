# Launch checklist

Work through this with the theme connected but **unpublished** (see [install.md](install.md)). Everything up to
"Publish" can be done without shoppers seeing anything. Try it on the development store first if you like.

## 1. Pages

Create or update these in **Online Store → Pages** and pick each one's **Theme template**:

- [ ] Our story: your existing `story` page, template **about**
- [ ] Contact: handle `contact`, template **contact**
- [ ] FAQ: handle `faq`, template **faq**. Edit the questions in the theme editor.
- [ ] Ingredients: handle `ingredients`, template **ingredients**
- [ ] Become an affiliate: handle `affiliates`, template **affiliates** (see [affiliates.md](affiliates.md))
- [ ] Affiliate program terms: handle `affiliate-terms`, template **affiliate-terms**, with your terms as the page
  content
- [ ] Policies: check that **Settings → Policies** has refund, privacy, terms and shipping. They show in the footer.

## 2. Navigation

In **Online Store → Navigation**:

- [ ] **Main menu** (`main-menu`): Shop all · Face Wash · Face Creams · Ingredients · Our Story
  - Face Wash can link straight to the cleanser.
  - For Face Creams, create a collection with the two creams, or link to Shop all.
- [ ] **Footer menu** (`footer`): Our Story · Ingredients · FAQ · Contact
- [ ] Remove menu links to retired products and collections.

## 3. Products and collections

- [ ] Fill in the product fields and ingredient entries ([custom-data.md](custom-data.md)). Then delete the **Product
  details** tab and the `__tab1:` tags.
- [ ] Replace each product's description with the short version in custom-data.md.
- [ ] Sizes and prices for the new pumps: rename the variant option values (currently "4.5 oz jar" / "2.2 oz jar") and
  update prices, SKUs and weights.
- [ ] Images: until real photos exist, you can upload the illustrations from `design/placeholders/` as each product's
  first image (`bottle-cream-hypo.png`, `bottle-cream-hydra.png`, `bottle-wash.png`). They show the new packaging;
  the current photos show the old jars.
- [ ] Make sure the **skincare** collection contains exactly the three products. The home page's product grid uses it.
- [ ] Retire the **Charcoal** and **Multi-piece sets** collections, and any discontinued products: set them to draft or
  archive them.
- [ ] Add redirects for the retired pages (**Online Store → Navigation → URL redirects**):
  - `/collections/charcoal` → `/collections/skincare`
  - `/collections/multi-piece-sets` → `/collections/skincare`
  - each retired product's URL → the closest current product
- [ ] **Check the claims** against the final formulas and labels:
  - The home page says the products are "built on clays and minerals". None of the current ingredient lists includes
    clay.
  - The current Hypoallergenic Facial Cream list has no mineral in it, but the announcement bar, footer and home hero
    describe the whole range as "mineral enriched".
  - Adjust the copy to match (Theme editor → the Hero and *The collection* sections on the home page, the announcement
    bar, the footer's brand block).

## 4. Theme settings

In **Online Store → Themes → Customize → Theme settings**:

- [ ] **Logo and favicon:** the strata mark and name show by default. Upload a favicon if you want something other than
  the mark.
- [ ] **Typography:** pick your final font pairing ([customizing.md](customizing.md#fonts)).
- [ ] **Social media:** add your profile links.
- [ ] **Reviews:** leave on ([reviews.md](reviews.md)).
- [ ] **Affiliate program:** check the page and URLs. Turn the links off if the program isn't launching with the site.
- [ ] Replace the `[X]` placeholders on the home and affiliate pages.
- [ ] Review the announcement bar, footer contact details and newsletter text.

## 5. Store settings

- [ ] **New customer accounts:** in **Settings → Customer accounts**, choose **Customer accounts** (the new version, not
  "Legacy"). The theme's account icon uses them, and the theme doesn't include the old account page templates.
- [ ] **Checkout branding:** go to **Settings → Checkout → Customize** and use:
  - Logo: the strata mark with the name
  - Main background: `#FBF6F0` (cream)
  - Order summary background: `#F4EBE1` (linen)
  - Buttons and accents: `#9E5439` (kiln)
  - Text: `#3B2E25` (umber)
  - Fonts: Jost for headings and Karla for body, if the editor offers them. Otherwise pick the closest plain sans-serif.
- [ ] **Search and social sharing:** in **Online Store → Preferences**, set:
  - the home page title and meta description
  - a social sharing image, 1200 × 628
- [ ] **Old reviews app:** the current theme still has the Yotpo reviews app embed switched on. Nothing in the new theme
  uses Yotpo. If you no longer use it, uninstall the app under **Settings → Apps**.

## 6. Domain

Today `www.teraclay.com` is parked at Squarespace and forwards to `teraclay.myshopify.com`. Shoppers see the myshopify
address, and search engines index it. To serve the store on your own domain:

1. [ ] **First,** add `https://www.teraclay.com` and `https://teraclay.com` to `STOREFRONT_ORIGIN` on the reviews
   server and restart it. Otherwise reviews stop loading after the switch ([reviews.md](reviews.md#when-you-change-domains)).
2. [ ] In Shopify, **Settings → Domains → Connect existing domain**, and enter `www.teraclay.com`.
3. [ ] At Squarespace (the DNS host), remove the forwarding and set the records Shopify shows. Usually:
   - `A` record for `@` → `23.227.38.65`
   - `CNAME` for `www` → `shops.myshopify.com`
4. [ ] Once Shopify shows the domain as connected, set `www.teraclay.com` as the **primary domain**.
5. [ ] Test an affiliate link, `promo.teraclay.com/SOMECODE`. It should land on `www.teraclay.com` with the discount
   banner.

This can happen before or after the theme launch. They don't depend on each other.

## 7. Test the preview

Open the theme preview (install.md, step 2) on a computer and a phone, and check:

- [ ] Home, a product, the collection, search, cart, and each page from step 1 look right.
- [ ] Choosing a size updates the price and the reviews.
- [ ] Add to cart opens the cart drawer. Change the quantity, remove an item, and go through to checkout.
- [ ] Reviews show on product pages; stars show on cards for reviewed products.
- [ ] Open `/discount/TEST` (with a real test code) and confirm the banner appears.
- [ ] Send yourself the contact form, a newsletter signup and a test affiliate application.
- [ ] The menus open and close on mobile.

Or send me a preview link and I'll run these checks on desktop and mobile.

## 8. Publish

- [ ] **Online Store → Themes → Teraclay → Publish.**
- [ ] Keep the old theme in the library for a few weeks. To roll back, publish it again.
- [ ] After launch, place a real order with a discount code, and check the store in Google Search Console.
