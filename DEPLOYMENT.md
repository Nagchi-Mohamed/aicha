# Ferdaous Wellness Store - Deployment Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- A Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey)

### Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   - Open `.env.local` file
   - Replace `PLACEHOLDER_API_KEY` with your actual Gemini API key:
     ```
     GEMINI_API_KEY=your_actual_api_key_here
     ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:3000`

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview production build:**
   ```bash
   npm run preview
   ```

## 📦 Deployment Options

### Option 1: Vercel (Recommended)

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Add environment variable in Vercel dashboard:
   - Go to your project settings
   - Add `GEMINI_API_KEY` with your API key

### Option 2: Netlify

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Build the project:
   ```bash
   npm run build
   ```

3. Deploy:
   ```bash
   netlify deploy --prod --dir=dist
   ```

4. Add environment variable in Netlify dashboard:
   - Go to Site settings → Environment variables
   - Add `GEMINI_API_KEY`

### Option 3: GitHub Pages

1. Update `vite.config.ts` to set the base path:
   ```typescript
   export default defineConfig({
     base: '/your-repo-name/',
     // ... rest of config
   });
   ```

2. Build:
   ```bash
   npm run build
   ```

3. Deploy the `dist` folder to GitHub Pages

**Note:** For GitHub Pages, you'll need to handle the API key differently (consider using a backend proxy).

### Option 4: Traditional Web Hosting

1. Build the project:
   ```bash
   npm run build
   ```

2. Upload the contents of the `dist` folder to your web hosting service

3. Configure environment variables through your hosting provider's control panel

## 🔧 Configuration

### WhatsApp Number

Update the WhatsApp number in `pages/Checkout.tsx` (line 39):
```typescript
const whatsappUrl = `https://wa.me/212600000000?text=${message}`;
```
Replace `212600000000` with your actual WhatsApp number (include country code).

### Product Catalog

Edit `constants.tsx` to update products, prices, and categories.

### Branding

- Logo and colors are defined in `constants.tsx`
- Primary color: `#19e65e` (green)
- Update in `constants.tsx` to change the theme

## 🌐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GEMINI_API_KEY` | Google Gemini API key for AI features | Yes |

## 📱 Features

- ✅ Product catalog with categories
- ✅ Shopping cart functionality
- ✅ WhatsApp checkout integration
- ✅ Admin dashboard for order management
- ✅ AI-powered product descriptions
- ✅ AI health tips
- ✅ Responsive design
- ✅ Modern UI with Tailwind CSS

## 🛠️ Tech Stack

- **Frontend:** React 19 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **AI:** Google Gemini API
- **Routing:** React Router DOM

## 📝 Customization

### Adding New Products

Edit `constants.tsx`:
```typescript
{
  id: '10',
  name: 'Your Product Name',
  price: 299,
  description: 'Product description',
  category: 'Category Name',
  imageUrl: 'https://your-image-url.com/image.jpg',
  isBestseller: false,
}
```

### Changing Colors

Update `constants.tsx`:
```typescript
export const COLORS = {
  primary: '#19e65e',        // Main brand color
  backgroundLight: '#f6f8f6', // Light background
  backgroundDark: '#112116',  // Dark background
  textMuted: '#63886f',       // Muted text color
};
```

## 🐛 Troubleshooting

### Build Errors

- Ensure all dependencies are installed: `npm install`
- Clear cache: `rm -rf node_modules && npm install`

### API Key Issues

- Verify your Gemini API key is valid
- Check that the environment variable is set correctly
- Restart the dev server after changing `.env.local`

### WhatsApp Not Opening

- Ensure the phone number format is correct (include country code)
- Test on a device with WhatsApp installed

## 📞 Support

For issues or questions, please refer to the documentation or contact the development team.

## 📄 License

This project is proprietary software for Ferdaous Wellness Store.
