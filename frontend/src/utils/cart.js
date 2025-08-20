export const CART_STORAGE_KEY = 'cart';

export function getCart() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    console.error('Failed to parse cart from storage:', error);
    return [];
  }
}

export function saveCart(cartItems) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    window.dispatchEvent(new Event('cartChange'));
  } catch (error) {
    console.error('Failed to save cart to storage:', error);
  }
}

export function addItemToCart({ id, name, image, price, stock }) {
  if (id === undefined || id === null) {
    console.error('addItemToCart: missing id');
    return { ok: false, reason: 'missing_id' };
  }

  const cart = getCart();
  const existing = cart.find(item => item.id === id);

  if (existing) {
    const nextQuantity = (existing.quantity || 1) + 1;
    if (typeof stock === 'number' && stock >= 0 && nextQuantity > stock) {
      return { ok: false, reason: 'out_of_stock' };
    }
    existing.quantity = nextQuantity;
  } else {
    if (typeof stock === 'number' && stock === 0) {
      return { ok: false, reason: 'out_of_stock' };
    }
    cart.push({ id, name, image, price, quantity: 1, stock });
  }

  saveCart(cart);
  return { ok: true };
} 