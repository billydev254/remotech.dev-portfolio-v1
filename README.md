# remotech.dev — Portfolio Site

Personal portfolio site for Billy K, a software developer in Nairobi, Kenya building WordPress plugins, payment integrations, web platforms and browser extensions for clients worldwide.

Live at [remotech.dev](https://remotech.dev).

## Tech stack

Plain HTML/CSS/JS — no framework, no build step.

- `index.html` — page markup and content
- `css/style.css` — styling
- `js/script.js` — scroll reveal, contact form, toast notifications, clock
- `assets/icons/` — skill icons
- `my-photo.png` — profile photo

## Contact form

The contact form submits to [Web3Forms](https://web3forms.com) via `fetch`, with a success/error toast notification (no page reload, no backend needed).

## Running locally

No build tools required — just serve the directory:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Deployment

Deployed on [Vercel](https://vercel.com) as a static site — push to `main` to deploy.
