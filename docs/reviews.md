# Reviews

The theme uses your own reviews service (`reviews.teraclay.com`). Nothing new needs installing. The theme loads the same
`widget.js` your current site uses and places the widget where the design calls for it, restyled to match.

## Where reviews appear

| Place | What shows | Where to change it |
|---|---|---|
| Product page, under the title | Stars and review count, linking down to the reviews | *Review stars* block in the product template |
| Product page, below the ingredients | The full review list, summary and "Write a review" | *Product reviews* section in the product template (it can have its own heading) |
| Product cards (home, collections, search, "Also from Teraclay") | Stars and count | **Theme settings → Product cards → Show review stars** |
| Review campaign pages | A campaign application or feedback form | Pages using the *reviews-campaign* template (below) |

A product with no reviews shows no stars: the star row stays hidden until the widget fills it.

When a shopper picks a different size on a product page, the theme reloads the review widget for that size. The widget
only reads its settings once, so the theme swaps in a fresh copy for the new size.

## Theme settings → Reviews

- **Show reviews:** switches every review placement on or off, for example if the service is down for maintenance.
- **Widget script URL:** leave as `https://reviews.teraclay.com/widget.js`.
- **Star color:** clay `#B5694C` by default.
- **Share theme colors with the reviews service:** sends your button colors, star color and logo to the reviews
  service. It uses them for its emails and hosted pages. The widget itself is styled by the theme either way.
  - The service's brand import only accepts plain hex colors and a logo hosted on Shopify's CDN, which is what the theme
    sends.
  - It sends them once per browser session.
  - If colors don't come through, set them in Shopify **Settings → Brand** or enter them by hand in the reviews
    dashboard's Branding page.

## Review campaign pages

Campaigns built in the reviews dashboard can show an application form or a feedback form on a page of your store.

**Campaign application form:**
1. In the reviews dashboard, create the campaign and note its **slug** (e.g. `spring-testers`).
2. In Shopify, go to **Online Store → Pages → Add page**. Give it a title and set the URL handle to the slug
   (`/pages/spring-testers`).
3. Under **Theme template**, choose **reviews-campaign**. Save.

To use a different URL, fill in the slug in the page's `custom.review_campaign` field (see
[custom-data.md](custom-data.md)), or type it into the section's *Campaign slug or feedback key* setting in the theme
editor.

**Feedback form:** create a page the same way, then in the theme editor set the section's *Form* to **Campaign
feedback** and paste the form's **access key** from the dashboard into *Campaign slug or feedback key*. Access keys are
random, so the URL handle can't stand in for them.

You can add text or images above the form with the other sections in the editor.

## When you change domains

The widget loads reviews from `reviews.teraclay.com`. The reviews server only answers pages served from domains in its
`STOREFRONT_ORIGIN` list. Today that's `https://teraclay.myshopify.com`, because `www.teraclay.com` forwards there.

When you point `www.teraclay.com` straight at Shopify (see [launch-checklist.md](launch-checklist.md)), add
`https://www.teraclay.com` (and `https://teraclay.com`) to `STOREFRONT_ORIGIN` on the reviews server and restart it. Do
this **before** switching the domain, or reviews show "Reviews Unavailable" until you do.

## Google review stars (optional follow-up)

Google shows star ratings in search results when a page includes review data. The theme is ready for this: if a product
has Shopify's standard `reviews.rating` and `reviews.rating_count` fields, the theme adds the ratings to the product
page's structured data automatically.

The reviews service doesn't write those fields yet. Its own roadmap lists this as a regression from the old reviews app.
Adding it is a change in the reviews service, not the theme: after each new or approved review, write the product's
average rating and review count to those two fields. Nothing in the theme needs to change when it does.
