# Product fields and ingredients

The theme reads each product's details from **product fields** (Shopify calls them metafields) and a small
**Ingredient** list (a metaobject). Fill them in once and the product page, product cards, the comparison table and the
Ingredients page all use them. Nothing breaks while they're empty: sections and tabs with no content hide themselves, and
the home page and Ingredients page show their built-in example text instead.

All of this is set up in **Settings → Custom data**. The namespace and key must match exactly (`custom.best_for`, not
`custom.bestFor`).

## 1. Create the Ingredient metaobject

**Settings → Custom data → Metaobjects → Add definition**

- **Name:** Ingredient. The **type** must be `ingredient` (Shopify fills it in from the name).
- **Access:** turn on **Storefronts** so the theme can read the entries.

| Field name | Key | Type | Notes |
|---|---|---|---|
| Name | `name` | Single line text | Required. Set it as the **display name**. |
| Source | `source` | Single line text | Where it comes from, e.g. "Nut of the African shea tree" |
| Description | `description` | Multi-line text | One or two sentences on what it does |
| Icon | `icon` | Single line text, **Choice list**: `mineral`, `drop`, `leaf`, `sprout` | Picks the icon and its color: mineral = mist, drop = peach, leaf = sage, sprout = blush |
| Image | `image` | File (images only) | Optional. Shown instead of the icon. |

Then add entries under **Content → Metaobjects → Ingredient**. Set each entry's status to **Active**. The entry's
**handle** becomes its link on the Ingredients page: the shea butter entry with handle `shea-butter` is at
`/pages/ingredients#shea-butter`.

## 2. Create the product fields

**Settings → Custom data → Products → Add definition**, one per row:

| Name | Namespace and key | Type | Where it shows |
|---|---|---|---|
| Label | `custom.eyebrow` | Single line text | Small label above the product title; subtitle on product cards |
| Best for | `custom.best_for` | Single line text | Badge on product cards; heading in the comparison table |
| Badges | `custom.badges` | Single line text, **list** | Pills under the price (the first one is highlighted) |
| Key features | `custom.key_features` | Rich text | "Key features" tab |
| How to use | `custom.how_to_use` | Rich text | "How to use" tab |
| Full ingredients | `custom.ingredients_list` | Multi-line text | "Full ingredients" tab |
| Key ingredients | `custom.key_ingredients` | Metaobject, **list**, reference type Ingredient | "Key ingredients" section on the product page, comparison table, "Found in" links on the Ingredients page |
| Made without | `custom.made_without` | Single line text, **list** | "Made without" card on the product page; comparison table |
| Feel | `custom.feel` | Single line text | Comparison table |
| Scent | `custom.scent` | Single line text | Comparison table |
| Pairing note | `custom.pairing_note` | Single line text | The line under this product's card in "Also from Teraclay" |

The **Pairing note** shows on *every other* product's page, so write it to make sense anywhere. Say what the product is
and who it suits, not "use it with this cream".

To add another row to the comparison table, create a new field (say `custom.texture`), then in the editor add a **Row**
block to the *Product comparison* section with that key.

## 3. Suggested values

These come from the new design and your current product pages. The copy is lightly edited:
- Routine wording ("after cleansing and toning", links to discontinued products) is gone.
- Two claims that read like medical claims are softened: "antibacterial and antifungal" and "stimulates cell
  regeneration".

Check everything against your labels before publishing.

### Hypoallergenic Facial Cream

| Field | Value |
|---|---|
| Description (the product's main description) | A facial moisturizer for all sensitive skin types. It absorbs quickly without a greasy feel, and it's designed not to promote acne. |
| Label | Sensitive skin · Fragrance free |
| Best for | Sensitive skin |
| Badges | Hypoallergenic · Nut free · Fragrance free · Paraben free |
| Key features | • Hypoallergenic, nut free and fragrance free<br>• For all sensitive skin types<br>• Designed not to promote acne<br>• Absorbs quickly with no greasy feel<br>• 100% natural ingredients: no parabens, silicones or sulfates |
| How to use | Apply a small amount to your fingertips and massage onto clean skin in circular motions. Use morning or night, as often as your skin needs. |
| Full ingredients | Water, Rice Bran Oil, Natural Vegetable Emulsifying Wax, Vegetable Glycerin, Vegetable Stearic Acid, Silver Dihydrogen Citrate, Citric Acid (plant based preservative), Potassium Sorbate (plant based preservative). |
| Key ingredients | Rice bran oil |
| Made without | Nuts · Fragrance · Parabens · Silicones · Sulfates |
| Feel | Absorbs quickly, no greasy finish |
| Scent | None (fragrance free) |
| Pairing note | Nut and fragrance free, for sensitive skin. Absorbs quickly with no greasy finish. |

**Please check:** this ingredient list has no mineral in it. If the new formula still doesn't, remove "Mineral enriched"
wherever it describes this cream.

### Advanced Hydration Facial Cream

| Field | Value |
|---|---|
| Description | For dry-skinned, cold-weather warriors who want to hydrate their skin naturally. Mineral enriched to absorb moisture from the air and hold it on your skin. |
| Label | Dry to normal skin · Light coconut essence |
| Best for | Dry to normal skin |
| Badges | Mineral enriched · Silicone free · Paraben free · GMO free |
| Key features | • Enriched with magnesium mineral to help skin hold on to moisture<br>• Shea butter, coconut oil, olive squalene, sodium hyaluronate and allantoin<br>• Leaves skin feeling soft and smooth<br>• Light coconut essence<br>• 100% natural ingredients: no silicones, parabens or GMOs |
| How to use | Apply a small amount to your fingertips and massage onto clean skin in circular motions. Use day or night as needed. |
| Full ingredients | Water, Aloe Vera Whole Leaf Juice, Shea Butter, Fractionated Coconut Oil, Olive Squalene, Vegetable Glycerin, Vegetable Emulsifying Wax, Vegetable Stearic Acid, Sodium Hyaluronate (2%), Allantoin, Pea Extract, DL-Panthenol (Pro-Vitamin B5), Safflower Oil, MSM, Green Tea Extract, Magnesium Chloride, Natural Fragrance, Silver Dihydrogen Citrate, Citric Acid (plant derived preservative), Potassium Sorbate (plant derived preservative). |
| Key ingredients | Magnesium mineral · Shea butter · Coconut oil · Olive squalene · Allantoin · Sodium hyaluronate |
| Made without | Silicones · Parabens · GMOs |
| Feel | Rich moisture for dry, cold-weather skin |
| Scent | Light coconut essence |
| Pairing note | Richer moisture with shea butter and coconut oil, for skin that runs dry. |

**Please check:**
- The current page spells it "DL Panthenlol (Pro-Vitamin B)". The list above corrects it to "DL-Panthenol (Pro-Vitamin
  B5)". Match whatever your label says.
- The list includes Natural Fragrance, so make sure "Light coconut essence" describes the scent accurately.

### Ultra Mineral Facial Cleanser

| Field | Value |
|---|---|
| Description | Cleans away the dirt, sweat and city grime of an active day without stripping your skin. Enriched with our magnesium mineral to help skin keep its natural oils and moisture. |
| Label | Face wash |
| Best for | All skin types |
| Badges | Mineral enriched · Sulfate free · Paraben free · Silicone free |
| Key features | • Cleans dirt, sweat and excess oil without stripping skin's natural oils<br>• Enriched with magnesium mineral<br>• Leaves skin feeling hydrated and smooth<br>• 100% natural ingredients: no sulfates, parabens, silicones or GMOs |
| How to use | Squeeze a generous amount into your hands and massage onto damp skin in circular motions, avoiding the eye area. Rinse well, or wipe away with a damp washcloth. |
| Full ingredients | Water (Aqua), Organic Sunflower Oil, Organic Coconut Oil, Organic Olive Oil, Organic Vegetable Glycerin, Potassium Hydroxide, Magnesium Chloride, Potassium Citrate (vegetable derived), Citric Acid (fruit derived), Natural Fragrance. |
| Key ingredients | Magnesium mineral · Coconut oil · Sunflower oil · Olive oil |
| Made without | Sulfates · Parabens · Silicones · GMOs |
| Feel | Rinses clean without a tight, dry feel |
| Scent | *(describe the natural fragrance)* |
| Pairing note | Cleans away dirt and oil without stripping your skin's natural oils. |

**Please check:** the old page said the cleanser "keeps pH of skin in balance". That's left out above: soap made with
potassium hydroxide is usually alkaline, so only use a pH claim if you've tested it.

### Ingredient entries

| Name (handle) | Icon | Source | Description |
|---|---|---|---|
| Magnesium mineral (`magnesium`) | mineral | Zechstein seabed, the Netherlands | The heart of our mineral signature. It draws moisture from the air and helps skin hold on to it. |
| Shea butter (`shea-butter`) | leaf | Nut of the African shea tree | Rich in stearic and oleic acids, which deeply moisturize and help protect dry skin. |
| Coconut oil (`coconut-oil`) | drop | Extra virgin, organic | One of the best moisturizing oils for skin. |
| Olive squalene (`olive-squalene`) | drop | Olives | A light, hydrating oil that's naturally rich in antioxidants. |
| Olive oil (`olive-oil`) | drop | Extra virgin, organic | Packed with antioxidants and hydrating squalene. |
| Sunflower oil (`sunflower-oil`) | leaf | Organic sunflower seeds | High in linoleic acid and vitamin E to protect and moisturize. |
| Allantoin (`allantoin`) | sprout | Root of the comfrey plant | Softens, protects and soothes skin. |
| Sodium hyaluronate (`sodium-hyaluronate`) | drop | Plant derived | A humectant that helps skin retain moisture. |
| Rice bran oil (`rice-bran-oil`) | leaf | Outer layer of brown rice | A nut-free moisturizing oil, gentle enough for sensitive skin. |

The Ingredients page lists every entry and adds "Found in" links to the products whose **Key ingredients** include it.
The home page shows the first four entries, so put the ones you want featured first (drag to reorder).

## 4. Move the old product detail pages across

Your current products carry tags like `__tab1:product-details-hp018`. The old theme used those tags to show a page as the
product's detail tabs. The new product page has a **Product details** tab that still shows those pages, so nothing
disappears on launch day.

Those pages contain routine wording and links to products you no longer sell. Replace them:

1. Fill in the fields above for each product.
2. In the theme editor, open **Products → Default product** and delete the **Product details** tab block.
3. Remove the `__tab1:…` tag from each product. You can also delete the three `product-details-…` pages, or hide them
   under **Online Store → Pages**.

## Optional: review campaign pages

A page using the **reviews-campaign** template shows the review form for the campaign whose slug matches the page's
handle. To use a different slug, create a page field `custom.review_campaign` (single line text) and enter the slug
there. See [reviews.md](reviews.md).
