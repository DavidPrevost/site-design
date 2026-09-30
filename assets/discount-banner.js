/* Shows "10% off applied. Code X is saved for checkout." after a shopper
   arrives through a /discount/CODE link (affiliate links redirect there).
   Shopify stores the code in the `discount_code` cookie; the cart API tells
   us whether it already applies and for how much. */
class DiscountBanner extends HTMLElement {
  async connectedCallback() {
    const code = await this.findCode();
    if (!code) return;
    const storageKey = `tc-discount-banner-dismissed:${code}`;
    try {
      if (sessionStorage.getItem(storageKey)) return;
    } catch (error) {
      /* storage unavailable: show the banner anyway */
    }

    const amount = (await this.findAmount(code)) || this.dataset.amount;
    const template = amount ? this.dataset.textAmount : this.dataset.textPlain;
    const escapeHtml = (value) =>
      value.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
    this.querySelector('[data-text]').innerHTML = template
      .replace('__AMOUNT__', escapeHtml(amount || ''))
      .replace('__CODE__', escapeHtml(code));
    this.hidden = false;

    this.querySelector('[data-dismiss]').addEventListener('click', () => {
      this.hidden = true;
      try {
        sessionStorage.setItem(storageKey, '1');
      } catch (error) {
        /* ignore */
      }
    });
  }

  async findCode() {
    const cookie = document.cookie.split('; ').find((row) => row.startsWith('discount_code='));
    if (cookie) return decodeURIComponent(cookie.split('=')[1]);
    const cart = await this.getCart();
    const applied = cart?.discount_codes?.find((entry) => entry.applicable !== false);
    return applied?.code || null;
  }

  async findAmount(code) {
    const cart = await this.getCart();
    const application = cart?.cart_level_discount_applications?.find(
      (entry) => entry.title?.toLowerCase() === code.toLowerCase()
    );
    if (application?.value_type === 'percentage') return `${parseFloat(application.value)}%`;
    return null;
  }

  getCart() {
    if (!this.cartPromise) {
      this.cartPromise = fetch(`${window.theme?.routes?.cart || '/cart'}.js`, { headers: { Accept: 'application/json' } })
        .then((response) => (response.ok ? response.json() : null))
        .catch(() => null);
    }
    return this.cartPromise;
  }
}
customElements.define('discount-banner', DiscountBanner);
