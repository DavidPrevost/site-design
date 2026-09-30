# Affiliate program

The affiliate program runs on its own site, `affiliates.teraclay.com`: the affiliate dashboard and your admin. The store
theme handles the public side:
- the "Become an affiliate" page with an application form
- the program terms page
- links in the footer and on the home page
- a banner that confirms the discount when a shopper arrives through an affiliate's link

## How it fits together

1. A creator reads **/pages/affiliates** and applies with the form there.
2. Their application arrives as an email to your store's contact address.
3. You approve them in the affiliate admin. The affiliate system creates their discount code in Shopify.
4. They share their link, `promo.teraclay.com/THEIRCODE`. It sends shoppers to your store with the code already applied.
5. The theme shows a banner, "10% off applied. Code THEIRCODE is saved for checkout."
6. They log in at `affiliates.teraclay.com` to see clicks, orders and earnings.

The affiliate admin's **Invite affiliates** screen still says "coming soon". Until it's built, the theme's form collects
applications and you handle them by email.

## Set it up

### 1. Create the pages

**Online Store → Pages → Add page**, twice:

| Title | URL handle | Theme template | Page content |
|---|---|---|---|
| Become an affiliate | `affiliates` | `affiliates` | Leave empty: the template supplies everything |
| Affiliate program terms | `affiliate-terms` | `affiliate-terms` | Your program terms (commission, payouts, rules, how either side can end it) |

Have the terms reviewed before launch. The terms page shows whatever you type into the page.

### 2. Fill in the placeholders

These are marked with square brackets in the theme editor. Replace them with real numbers:

| Where | Placeholder |
|---|---|
| Home page → *Affiliate band* → the commission stat | `[X]%` commission |
| Affiliates page → *How it works* → Earn | "get paid [on your payout schedule]" |
| Affiliates page → *Apply to join* → text | "We'll reply by email within [X] business days" |
| Affiliates page → *FAQ* → "When and how do I get paid?" | Your payout method and schedule |

### 3. Theme settings → Affiliate program

| Setting | Value |
|---|---|
| Show affiliate program links | On. Turn it off to hide the program everywhere until you launch it. |
| Affiliate dashboard URL | `https://affiliates.teraclay.com/` (the site's front page, which sends people to log in) |
| "Become an affiliate" page | The page from step 1 |
| Shopper discount | `10%`: the amount shown in the banner and on the affiliate pages |
| Show a banner when a discount link is used | On |

If you change the affiliate discount rate in the affiliate admin, change **Shopper discount** to match.

The footer's **Affiliates** column (Become an affiliate · Affiliate login · Program terms) and the home page band use
these settings automatically. The *Program terms page* is picked in the footer's Affiliates block.

### 4. Where applications go

The application form is a Shopify contact form, so each submission is emailed to the same address as your contact page
messages. The email includes "Form: Affiliate application" and:
- name and email
- main platform
- handle or URL
- audience size
- why they want to join
- that they agreed to the terms

## The discount banner

When someone opens `promo.teraclay.com/CODE`, the affiliate system forwards them to `/discount/CODE` on your store.
Shopify saves the code for checkout. The theme then shows a slim banner at the top of every page: **"10% off applied.
Code CODE is saved for checkout."** The amount comes from the cart once the discount applies. Before that, it comes from
the *Shopper discount* setting.

The shopper can close the banner. It stays closed for the rest of their visit.

Affiliate codes can't be combined with other discounts. The affiliate FAQ says so, so shoppers aren't surprised at
checkout.

## Match the dashboard to the store

In the affiliate admin, go to **Branding**, choose custom colors, and enter:

| Portal field | Color | Hex |
|---|---|---|
| Primary | Kiln | `#9E5439` |
| Primary text | White | `#FFFFFF` |
| Accent / links | Denim | `#4A6470` |
| Background | Cream | `#FBF6F0` |
| Cards | White | `#FFFFFF` |
| Body text | Umber | `#3B2E25` |
| Borders | Linen | `#E8DCCF` |

Upload the strata mark (`design/brand/teraclay-mark.png` in this repository) as the logo.

## Suggestions for the affiliate system (not part of this theme)

These would make the program smoother. They're changes to the affiliate system itself, which this project doesn't
touch:
- **Applications:** a public "apply" endpoint, so the theme's form can create a pending affiliate directly instead of
  sending an email.
- **Fonts:** Jost and Karla in the dashboard, to match the store.
- **Deep links:** support for `?redirect=` on promo links, so an affiliate can link to a specific product with their
  code applied.
- **Login link:** `/login` sends an affiliate who is already logged in to the admin area instead of their dashboard.
  The front page routes each role correctly, which is why the theme links there.
