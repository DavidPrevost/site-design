/* Teraclay theme: product page components.
   - <media-gallery>: swipeable image viewer with thumbnails and dots
   - <variant-picker>: finds the chosen variant, updates the form, URL, price and
     images, and refreshes the reviews widget for that variant
   - <product-recommendations>: loads Shopify's recommendations when no products
     were picked by hand */

class MediaGallery extends HTMLElement {
  connectedCallback() {
    this.viewer = this.querySelector('[data-gallery-viewer]');
    this.slides = [...this.querySelectorAll('.gallery__slide')];
    this.thumbs = [...this.querySelectorAll('[data-thumb-for]')];
    this.dots = [...this.querySelectorAll('[data-dot-for]')];

    this.thumbs.forEach((thumb) =>
      thumb.addEventListener('click', () => this.showMedia(thumb.dataset.thumbFor))
    );

    if ('IntersectionObserver' in window && this.slides.length > 1) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) this.setActive(entry.target.dataset.mediaId);
          });
        },
        { root: this.viewer, threshold: 0.6 }
      );
      this.slides.forEach((slide) => observer.observe(slide));
    }
  }

  showMedia(mediaId, smooth = true) {
    const slide = this.slides.find((s) => s.dataset.mediaId === String(mediaId));
    if (!slide) return;
    this.viewer.scrollTo({ left: slide.offsetLeft, behavior: smooth ? 'smooth' : 'auto' });
    this.setActive(mediaId);
  }

  setActive(mediaId) {
    this.thumbs.forEach((thumb) => {
      if (thumb.dataset.thumbFor === String(mediaId)) thumb.setAttribute('aria-current', 'true');
      else thumb.removeAttribute('aria-current');
    });
    this.dots.forEach((dot) => dot.classList.toggle('is-active', dot.dataset.dotFor === String(mediaId)));
  }
}
customElements.define('media-gallery', MediaGallery);

/* The reviews widget never re-reads its attributes, so a new variant needs a
   fresh placeholder element (the widget watches for added nodes). */
function refreshReviewsWidget(variantId) {
  document.querySelectorAll('.tc-reviews--full [data-reviews-widget]').forEach((old) => {
    if (old.getAttribute('data-variant-id') === String(variantId)) return;
    const fresh = document.createElement('div');
    [...old.attributes].forEach((attr) => {
      if (attr.name !== 'data-rv-initialized') fresh.setAttribute(attr.name, attr.value);
    });
    fresh.setAttribute('data-variant-id', variantId);
    old.replaceWith(fresh);
  });
}

class VariantPicker extends HTMLElement {
  connectedCallback() {
    this.sectionId = this.dataset.sectionId;
    this.productInfo = this.closest('product-info');
    this.variants = JSON.parse(this.querySelector('[data-variant-options]').textContent);
    this.addEventListener('change', () => this.onChange());
  }

  selectedOptions() {
    return [...this.querySelectorAll('fieldset')].map(
      (fieldset) => fieldset.querySelector('input:checked')?.value
    );
  }

  onChange() {
    const selected = this.selectedOptions();
    this.querySelectorAll('fieldset').forEach((fieldset, index) => {
      const label = fieldset.querySelector('[data-selected-value]');
      if (label) label.textContent = selected[index];
    });

    const variant = this.variants.find((v) => v.options.every((value, i) => value === selected[i]));
    const button = document.getElementById(`AddButton-${this.sectionId}`);

    if (!variant) {
      if (button) {
        button.disabled = true;
        button.textContent = window.theme.strings.unavailable;
      }
      return;
    }

    document
      .querySelectorAll(`#ProductForm-${this.sectionId} [data-variant-id-input]`)
      .forEach((input) => (input.value = variant.id));
    if (button) {
      button.disabled = !variant.available;
      button.textContent = variant.available ? window.theme.strings.addToCart : window.theme.strings.soldOut;
    }

    const url = new URL(window.location.href);
    url.searchParams.set('variant', variant.id);
    window.history.replaceState({}, '', url.toString());

    if (variant.featured_media) {
      this.productInfo?.querySelector('media-gallery')?.showMedia(variant.featured_media);
    }

    refreshReviewsWidget(variant.id);
    this.renderSection(variant.id);
  }

  /* Re-render the section for the new variant so prices, availability and
     money formatting come from Shopify. */
  async renderSection(variantId) {
    const productUrl = this.productInfo?.dataset.productUrl || window.location.pathname;
    this.abort?.abort();
    this.abort = new AbortController();
    try {
      const response = await fetch(`${productUrl}?variant=${variantId}&section_id=${this.sectionId}`, {
        signal: this.abort.signal,
      });
      const doc = new DOMParser().parseFromString(await response.text(), 'text/html');
      const priceId = `Price-${this.sectionId}`;
      const freshPrice = doc.getElementById(priceId);
      const currentPrice = document.getElementById(priceId);
      if (freshPrice && currentPrice) currentPrice.innerHTML = freshPrice.innerHTML;

      const freshPills = doc.querySelectorAll('.variant-picker__pill');
      this.querySelectorAll('.variant-picker__pill').forEach((pill, i) => {
        if (freshPills[i]) pill.classList.toggle('is-unavailable', freshPills[i].classList.contains('is-unavailable'));
      });
      document.dispatchEvent(new CustomEvent('variant:changed', { detail: { variantId } }));
    } catch (error) {
      if (error.name !== 'AbortError') console.error(error);
    }
  }
}
customElements.define('variant-picker', VariantPicker);

class ProductRecommendations extends HTMLElement {
  connectedCallback() {
    if (!this.dataset.url) return;
    const load = () =>
      fetch(this.dataset.url)
        .then((response) => response.text())
        .then((text) => {
          const doc = new DOMParser().parseFromString(text, 'text/html');
          const fresh = doc.querySelector('product-recommendations');
          if (fresh && fresh.querySelector('.product-card')) {
            this.innerHTML = fresh.innerHTML;
            this.closest('.shopify-section')?.classList.remove('is-empty');
          }
        })
        .catch(() => {});

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            observer.disconnect();
            load();
          }
        },
        { rootMargin: '0px 0px 400px 0px' }
      );
      observer.observe(this);
    } else {
      load();
    }
  }
}
customElements.define('product-recommendations', ProductRecommendations);
