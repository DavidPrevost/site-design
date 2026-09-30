/* Teraclay theme: shared interactive components (vanilla JS, no dependencies).
   Components: menu drawer, header dropdowns, search dialog + predictive search,
   cart drawer, cart line updates, product form (add to cart), quantity input. */

const theme = window.theme || {};

function debounce(fn, wait = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), wait);
  };
}

function fetchJSON(url, body) {
  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(body),
  }).then(async (response) => {
    const data = await response.json();
    if (!response.ok) throw data;
    return data;
  });
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select, textarea, [tabindex]:not([tabindex="-1"])';

function trapFocus(container, event) {
  if (event.key !== 'Tab') return;
  const items = [...container.querySelectorAll(FOCUSABLE)].filter((el) => el.offsetParent !== null);
  if (!items.length) return;
  const first = items[0];
  const last = items[items.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

/* Sections that show the cart. The cart drawer is always refreshed; the cart
   page adds its own section id via [data-sections]. */
function cartSectionIds() {
  const ids = new Set(['cart-drawer']);
  document.querySelectorAll('cart-items[data-sections]').forEach((el) => {
    el.dataset.sections.split(',').forEach((id) => id && ids.add(id.trim()));
  });
  return [...ids];
}

function renderCartSections(sections) {
  if (!sections) return;
  const parser = new DOMParser();
  Object.entries(sections).forEach(([id, html]) => {
    if (!html) return;
    const doc = parser.parseFromString(html, 'text/html');
    if (id === 'cart-drawer') {
      const drawer = document.getElementById('CartDrawer');
      const fresh = doc.getElementById('CartDrawer');
      if (drawer && fresh) {
        drawer.querySelector('.drawer__panel').innerHTML = fresh.querySelector('.drawer__panel').innerHTML;
        drawer.dataset.cartCount = fresh.dataset.cartCount;
        updateCartCount(Number(fresh.dataset.cartCount));
      }
      return;
    }
    const target = document.getElementById(`shopify-section-${id}`);
    const source = doc.getElementById(`shopify-section-${id}`);
    if (target && source) target.innerHTML = source.innerHTML;
  });
}

function updateCartCount(count) {
  document.querySelectorAll('[data-cart-count-bubble]').forEach((bubble) => {
    bubble.textContent = count;
    bubble.hidden = count === 0;
  });
  document.querySelectorAll('[data-cart-toggle]').forEach((link) => {
    if (theme.strings?.cartLink) link.setAttribute('aria-label', theme.strings.cartLink.replace('__COUNT__', count));
  });
}

/* ---------- Menu drawer (mobile) ---------- */
class MenuDrawer extends HTMLElement {
  connectedCallback() {
    this.details = this.querySelector('details');
    this.summary = this.querySelector('summary');
    this.panel = this.querySelector('.menu-drawer');
    this.details.addEventListener('toggle', () => {
      if (this.details.open) {
        this.panel.focus();
        document.addEventListener('keydown', this.onKeydown);
      } else {
        document.removeEventListener('keydown', this.onKeydown);
      }
    });
    this.querySelector('[data-close-drawer]')?.addEventListener('click', () => this.close());
    this.addEventListener('click', (event) => {
      // Clicking the overlay (the summary's ::before) closes the drawer.
      if (event.target === this.summary && this.details.open) {
        event.preventDefault();
        this.close();
      }
    });
  }

  onKeydown = (event) => {
    if (event.key === 'Escape') this.close();
    else trapFocus(this.panel, event);
  };

  close() {
    this.details.open = false;
    this.summary.focus();
  }
}
customElements.define('menu-drawer', MenuDrawer);

/* ---------- Desktop dropdowns: close on outside click / Escape ---------- */
document.addEventListener('click', (event) => {
  document.querySelectorAll('[data-header-dropdown][open]').forEach((details) => {
    if (!details.contains(event.target)) details.open = false;
  });
});
document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  document.querySelectorAll('[data-header-dropdown][open]').forEach((details) => {
    details.open = false;
    details.querySelector('summary').focus();
  });
});

/* ---------- Search dialog ---------- */
(function initSearchDialog() {
  const dialog = document.getElementById('SearchDialog');
  if (!dialog) return;
  let opener = null;
  document.addEventListener('click', (event) => {
    const openButton = event.target.closest('[data-open-search]');
    if (openButton) {
      opener = openButton;
      dialog.showModal();
      dialog.querySelector('input[type="search"]').focus();
    }
    if (event.target.closest('[data-close-search]') || event.target === dialog) {
      dialog.close();
    }
  });
  dialog.addEventListener('close', () => opener?.focus());
})();

class PredictiveSearch extends HTMLElement {
  connectedCallback() {
    if (this.hasAttribute('data-disabled')) return;
    this.input = this.querySelector('input[type="search"]');
    this.results = this.querySelector('[data-results]');
    this.controller = null;
    this.input.addEventListener(
      'input',
      debounce(() => this.search(this.input.value.trim()), 300)
    );
  }

  async search(terms) {
    if (terms.length < 2) {
      this.results.innerHTML = '';
      return;
    }
    this.controller?.abort();
    this.controller = new AbortController();
    const params = new URLSearchParams({
      q: terms,
      section_id: 'predictive-search',
      'resources[type]': 'product,collection,page,article',
      'resources[limit]': '6',
      'resources[options][unavailable_products]': 'last',
    });
    try {
      const response = await fetch(`${this.dataset.url}?${params}`, { signal: this.controller.signal });
      if (!response.ok) return;
      const doc = new DOMParser().parseFromString(await response.text(), 'text/html');
      const section = doc.getElementById('shopify-section-predictive-search');
      this.results.innerHTML = section ? section.innerHTML : '';
    } catch (error) {
      if (error.name !== 'AbortError') this.results.innerHTML = '';
    }
  }
}
customElements.define('predictive-search', PredictiveSearch);

/* ---------- Cart drawer ---------- */
class CartDrawer extends HTMLElement {
  connectedCallback() {
    this.addEventListener('click', (event) => {
      if (event.target.closest('[data-close-cart]')) this.close();
    });
    document.addEventListener('click', (event) => {
      const toggle = event.target.closest('[data-cart-toggle]');
      if (toggle && theme.cartType === 'drawer' && !document.body.classList.contains('template-cart')) {
        event.preventDefault();
        this.open(toggle);
      }
    });
  }

  open(opener) {
    this.opener = opener || document.activeElement;
    this.setAttribute('open', '');
    requestAnimationFrame(() => this.classList.add('is-open'));
    document.documentElement.style.overflow = 'hidden';
    this.querySelector('.drawer__panel').focus();
    document.addEventListener('keydown', this.onKeydown);
  }

  close() {
    this.classList.remove('is-open');
    document.documentElement.style.overflow = '';
    document.removeEventListener('keydown', this.onKeydown);
    setTimeout(() => this.removeAttribute('open'), 300);
    this.opener?.focus();
  }

  onKeydown = (event) => {
    if (event.key === 'Escape') this.close();
    else trapFocus(this.querySelector('.drawer__panel'), event);
  };
}
customElements.define('cart-drawer', CartDrawer);

/* ---------- Cart lines: quantity changes and removals ---------- */
class CartItems extends HTMLElement {
  connectedCallback() {
    this.addEventListener(
      'change',
      debounce((event) => {
        const input = event.target.closest('input[data-line]');
        if (input) this.updateLine(input.dataset.line, Math.max(0, parseInt(input.value, 10) || 0));
      }, 350)
    );
    this.addEventListener('click', (event) => {
      const remove = event.target.closest('[data-remove-line]');
      if (remove) {
        event.preventDefault();
        this.updateLine(remove.dataset.removeLine, 0);
      }
    });
  }

  async updateLine(line, quantity) {
    this.setAttribute('aria-busy', 'true');
    const error = this.querySelector('[data-cart-error]');
    try {
      const data = await fetchJSON(`${theme.routes.cartChange}`, {
        line: Number(line),
        quantity,
        sections: cartSectionIds(),
        sections_url: window.location.pathname,
      });
      renderCartSections(data.sections);
      document.dispatchEvent(new CustomEvent('cart:updated', { detail: data }));
    } catch (err) {
      if (error) {
        error.textContent = err?.description || err?.message || theme.strings.cartError;
        error.hidden = false;
      }
    } finally {
      this.removeAttribute('aria-busy');
    }
  }
}
customElements.define('cart-items', CartItems);

/* ---------- Quantity input (+/- buttons) ---------- */
class QuantityInput extends HTMLElement {
  connectedCallback() {
    this.input = this.querySelector('input');
    this.addEventListener('click', (event) => {
      const button = event.target.closest('button[name]');
      if (!button) return;
      const min = Number(this.input.min || 0);
      const current = parseInt(this.input.value, 10) || min;
      const next = button.name === 'plus' ? current + 1 : Math.max(min, current - 1);
      if (next === current) return;
      this.input.value = next;
      this.input.dispatchEvent(new Event('change', { bubbles: true }));
    });
  }
}
customElements.define('quantity-input', QuantityInput);

/* ---------- Product form: add to cart without leaving the page ---------- */
class ProductForm extends HTMLElement {
  connectedCallback() {
    this.form = this.querySelector('form');
    this.error = this.querySelector('[data-product-error]');
    this.form?.addEventListener('submit', (event) => this.onSubmit(event));
  }

  async onSubmit(event) {
    if (theme.cartType !== 'drawer' || !document.getElementById('CartDrawer')) return;
    event.preventDefault();
    const button = this.form.querySelector('[type="submit"]');
    if (button.getAttribute('aria-disabled') === 'true') return;
    button.classList.add('is-loading');
    button.setAttribute('aria-disabled', 'true');
    if (this.error) this.error.hidden = true;

    const formData = new FormData(this.form);
    formData.append('sections', cartSectionIds().join(','));
    formData.append('sections_url', window.location.pathname);

    try {
      const response = await fetch(theme.routes.cartAdd, {
        method: 'POST',
        headers: { Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
        body: formData,
      });
      const data = await response.json();
      if (!response.ok || data.status) throw data;
      renderCartSections(data.sections);
      document.dispatchEvent(new CustomEvent('cart:updated', { detail: data }));
      document.getElementById('CartDrawer').open(button);
    } catch (err) {
      if (this.error) {
        this.error.textContent = err?.description || err?.message || theme.strings.cartError;
        this.error.hidden = false;
      }
    } finally {
      button.classList.remove('is-loading');
      button.removeAttribute('aria-disabled');
    }
  }
}
customElements.define('product-form', ProductForm);

/* ---------- Filter/sort forms: submit on change, drop empty fields ---------- */
document.addEventListener('change', (event) => {
  const form = event.target.closest('form[data-auto-submit]');
  if (!form) return;
  if (event.target.matches('select, input[type="checkbox"]')) form.requestSubmit();
});
document.addEventListener('submit', (event) => {
  const form = event.target.closest('form[data-auto-submit]');
  if (!form) return;
  form.querySelectorAll('input').forEach((input) => {
    if (input.value === '') input.disabled = true;
  });
});
