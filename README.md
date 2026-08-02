<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# 🌿 Ferdaous Wellness Store

A modern, premium e-commerce platform for Forever Living wellness products in Morocco. Built with React, TypeScript, and powered by AI for an enhanced shopping experience.

[![Built with Vite](https://img.shields.io/badge/Built%20with-Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

## ✨ Features

### Customer Features
- 🛍️ **Modern Product Catalog** - Browse premium Forever Living products with beautiful card layouts
- 🛒 **Smart Shopping Cart** - Add products, adjust quantities, and manage your order
- 💬 **WhatsApp Checkout** - Seamless ordering through WhatsApp with pre-filled messages
- 🤖 **AI Health Tips** - Daily wellness tips powered by Google Gemini AI
- 📱 **Fully Responsive** - Perfect experience on desktop, tablet, and mobile
- 🎨 **Premium Design** - Modern, clean interface with smooth animations
- 🔍 **Product Search** - Quick search functionality (coming soon)
- 🏷️ **Category Filtering** - Browse by Aloe Vera, Bee Products, Skincare, etc.

### Admin Features
- 📊 **Dashboard Analytics** - Track orders, revenue, and customer metrics
- 📦 **Order Management** - View, update, and manage customer orders
- ✏️ **Product Management** - Add, edit, and remove products from catalog
- 🤖 **AI Product Descriptions** - Auto-generate compelling product descriptions
- 💬 **Direct WhatsApp Integration** - Contact customers directly from dashboard
- 📈 **Real-time Stats** - Monitor pending orders, revenue, and inventory

## 🚀 Quick Start

### Prerequisites
- **Node.js 18+** - [Download here](https://nodejs.org/)
- **Gemini API Key** - [Get one free](https://aistudio.google.com/app/apikey)

### Installation

1. **Clone or download this repository**

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure your API key:**
   
   Open `.env.local` and replace the placeholder:
   ```env
   GEMINI_API_KEY=your_actual_gemini_api_key_here
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:3000](http://localhost:3000) in your browser 🎉

5. **Build for production:**
   ```bash
   npm run build
   ```

## 📦 Project Structure

```
ferdaous-wellness-store/
├── components/          # Reusable React components
│   ├── Navbar.tsx      # Navigation bar
│   └── ProductCard.tsx # Product display card
├── pages/              # Main application pages
│   ├── Storefront.tsx  # Customer-facing store
│   ├── Checkout.tsx    # Cart and checkout page
│   └── AdminDashboard.tsx # Admin panel
├── services/           # External service integrations
│   └── geminiService.ts # AI integration
├── public/             # Static assets
│   ├── robots.txt      # SEO crawler instructions
│   └── sitemap.xml     # Site structure for SEO
├── App.tsx             # Main app component with routing
├── constants.tsx       # Product data and theme colors
├── types.ts            # TypeScript type definitions
├── index.css           # Global styles
└── vite.config.ts      # Vite configuration
```

## 🎨 Customization

### Update WhatsApp Number

Edit `pages/Checkout.tsx` (line 39):
```typescript
const whatsappUrl = `https://wa.me/212XXXXXXXXX?text=${message}`;
```
Replace with your WhatsApp number (include country code, no + or spaces).

### Modify Products

Edit `constants.tsx`:
```typescript
export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Your Product',
    price: 299,
    description: 'Product description',
    category: 'Category',
    imageUrl: 'https://your-image-url.com/image.jpg',
    isBestseller: true,
  },
  // Add more products...
];
```

### Change Theme Colors

Edit `constants.tsx`:
```typescript
export const COLORS = {
  primary: '#19e65e',        // Brand green
  backgroundLight: '#f6f8f6', // Light background
  backgroundDark: '#112116',  // Dark background
  textMuted: '#63886f',       // Muted text
};
```

## 🌐 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions for:
- ✅ Vercel (Recommended)
- ✅ Netlify
- ✅ GitHub Pages
- ✅ Traditional Web Hosting

### Quick Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Don't forget to add your `GEMINI_API_KEY` in the Vercel dashboard!

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 19** | UI framework with latest features |
| **TypeScript** | Type-safe development |
| **Vite** | Lightning-fast build tool |
| **Tailwind CSS** | Utility-first styling |
| **React Router** | Client-side routing |
| **Lucide React** | Beautiful icon library |
| **Google Gemini AI** | AI-powered features |

## 📱 Pages & Routes

| Route | Description | Access |
|-------|-------------|--------|
| `/` | Main storefront | Public |
| `/checkout` | Shopping cart & checkout | Public |
| `/admin` | Admin dashboard | Public (add auth in production) |

## 🔐 Security Notes

⚠️ **Important for Production:**

1. **Protect Admin Route** - Add authentication to `/admin`
2. **Secure API Keys** - Never commit real API keys to Git
3. **Environment Variables** - Use platform-specific env var management
4. **HTTPS Only** - Always deploy with SSL/TLS enabled

## 🐛 Troubleshooting

### Build fails
```bash
rm -rf node_modules dist
npm install
npm run build
```

### API key not working
- Verify the key is valid at [Google AI Studio](https://aistudio.google.com/)
- Check `.env.local` has no extra spaces
- Restart dev server after changing env vars

### WhatsApp link doesn't work
- Ensure phone number format: `212XXXXXXXXX` (country code + number)
- Test on a device with WhatsApp installed
- Check URL encoding in browser console

## 📄 License

This project is proprietary software for Ferdaous Wellness Store.

## 🤝 Support

For questions or issues:
- Check the [DEPLOYMENT.md](./DEPLOYMENT.md) guide
- Review the code comments
- Contact the development team

---

<div align="center">
Made with ❤️ for Ferdaous Wellness | Powered by Google Gemini AI
</div>
