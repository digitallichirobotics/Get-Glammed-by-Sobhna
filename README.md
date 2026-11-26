# Get Glammed by Sobhna
Responsive Next.js frontend recreated from the supplied screenshot. Requires Node.js 20.9+.

```sh
npm install
npm run dev
```
Open http://localhost:3000. Production: `npm run build` then `npm start`.

Images are low-resolution crops from the user-provided reference, for layout prototyping only. Replace with approved salon photography before public launch. Prices are illustrative USD amounts inherited from the reference; replace with actual rates and currency. Contact details, testimonials, offers and salon data require verification. The shopping bag is a client-side demonstration. There is no backend or payment integration.

## WhatsApp

The site uses the salon phone number for WhatsApp by default. To override it, set `NEXT_PUBLIC_WHATSAPP_NUMBER` in `.env.local` or in the hosting environment before building. Use the salon?s full international WhatsApp number, including its country code. Restart the dev server or rebuild after changing it. The chat links and booking handoff appear once a valid number is configured. Customers review and send their booking request in WhatsApp.
