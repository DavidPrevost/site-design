# Installing and previewing the theme

The theme connects to Shopify straight from this GitHub repository. Nothing is uploaded by hand, and
your live site doesn't change until you press **Publish**.

## 1. Connect the theme (it installs as an unpublished theme)

1. In Shopify admin, go to **Online Store → Themes**.
2. Scroll to **Theme library**, click **Add theme → Connect from GitHub**.
3. Log in to GitHub if asked, then choose:
   - **Account:** `DavidPrevost`
   - **Repository:** `site-design`
   - **Branch:** the branch holding the theme. While we're building, that's `claude/exciting-fermat-q82ml7`. Once the
     work is merged, use `main`.
4. Click **Connect**. The theme shows up in the theme library as "Teraclay". It is **not** published.

Start with the development store (`teraclay-dev.myshopify.com`) if you like. Connecting it to the live store is also safe,
because an unpublished theme is invisible to shoppers.

## 2. Preview it

- In the theme library, click **… → Preview** on the Teraclay theme. You browse your real products with the new design.
- To share a preview, open the preview, click **Share preview** at the bottom, and copy the link. Anyone with the link can
  look for a limited time. That includes me: send it over and I'll check every page on desktop and mobile.

## 3. Customize it

Click **Customize** on the theme. See [customizing.md](customizing.md) for what each setting does.

**Important: the editor saves back to GitHub.** Every change you make in the theme editor (or code editor) is committed
to the connected branch automatically, as "Update from Shopify for theme …". That keeps GitHub and Shopify in
sync. It also means anyone editing the code should `git pull` before pushing, so your editor changes aren't
overwritten.

## 4. Publish

When you're happy with the preview:

1. Work through [launch-checklist.md](launch-checklist.md).
2. On the Teraclay theme, click **Publish**.

Your old theme stays in the theme library. To roll back, click **Publish** on the old theme.

## If something goes wrong with the sync

If Shopify shows a sync error on the theme card, click **… → Reset to last commit** to reload it from GitHub. Ask me if
a commit from GitHub was rejected.
