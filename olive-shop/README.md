# OliveGrove — Olive Shop UI

A simple static storefront for introducing and selling olives and olive products
(olive oil, whole & sliced olives, tapenade, soap, tea, gift boxes).

Plain HTML, CSS and JavaScript — no build step, no dependencies.

## Pages

| Page | What it does |
|------|--------------|
| `index.html` | Home: hero, why our olives, about the olive & how oil is made, best sellers |
| `shop.html` | Full catalog with category filters (`?category=oil` etc.) |
| `cart.html` | Cart with quantity +/−, remove, clear, subtotal / shipping / tax |
| `checkout.html` | Shipping form + payment (card, PayPal, bank transfer, cash on delivery) with validation |
| `settings.html` | Payment settings: default method, display currency, saved shipping details |

## Run it

Open `index.html` in a browser, or serve the folder:

```bash
cd olive-shop
python3 -m http.server 8000   # then open http://localhost:8000
```

## Notes

- Cart and settings are stored in the browser's `localStorage`.
- **Demo only — no real payments are processed.** Card numbers are validated
  (Luhn check, expiry, CVC) in the browser and are never stored. Test card: `4242 4242 4242 4242`.
- Products live in `js/products.js`; shared cart/settings/layout logic is in `js/app.js`.
- Shipping is free over 50, otherwise a flat 4.90; tax is 9%. Change the constants at the top of `js/app.js`.
