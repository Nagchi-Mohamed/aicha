# 🌍 Multi-Language System - Quick Reference

## Overview

The Ferdaous Wellness Store now supports **3 languages** with **Arabic as the default**:
- 🇸🇦 **Arabic (العربية)** - Default, RTL support
- 🇫🇷 **French (Français)**
- 🇬🇧 **English**

## How to Use

### For Users
1. Click the **globe icon** (🌐) in the navigation bar
2. Select your preferred language from the dropdown
3. The entire site will instantly switch languages
4. Your choice is saved automatically

### For Developers

#### Adding New Translations

**File**: `i18n/translations.ts`

1. Find the section you want to translate
2. Add your text to all three language objects (ar, fr, en)

Example:
```typescript
export const translations: Record<Language, Translations> = {
  ar: {
    nav: {
      newItem: 'عنصر جديد',  // Arabic
    },
  },
  fr: {
    nav: {
      newItem: 'Nouvel Élément',  // French
    },
  },
  en: {
    nav: {
      newItem: 'New Item',  // English
    },
  },
};
```

#### Using Translations in Components

```typescript
import { useLanguage } from '../i18n/LanguageContext';

const MyComponent = () => {
  const { t, language, setLanguage } = useLanguage();
  
  return (
    <div>
      <h1>{t.nav.brand}</h1>
      <p>Current language: {language}</p>
    </div>
  );
};
```

#### Available Translation Sections

- `t.nav.*` - Navigation items
- `t.hero.*` - Hero section
- `t.products.*` - Product-related text
- `t.howItWorks.*` - How it works section
- `t.checkout.*` - Checkout page
- `t.admin.*` - Admin dashboard
- `t.footer.*` - Footer links
- `t.ai.*` - AI-related text

## RTL (Right-to-Left) Support

### Automatic Features
- ✅ Text direction automatically switches for Arabic
- ✅ Layout mirrors for RTL languages
- ✅ Proper font rendering for Arabic script

### CSS Classes
The following CSS automatically adjusts for RTL:
- Flex layouts reverse direction
- Text alignment flips
- Margins and paddings adjust

### Manual RTL Handling
If you need to handle RTL manually:

```typescript
const { dir } = useLanguage();

<div className={dir === 'rtl' ? 'text-right' : 'text-left'}>
  Content
</div>
```

## Language Persistence

- Language choice is saved in **localStorage**
- Persists across browser sessions
- Key: `'language'`
- Values: `'ar'`, `'fr'`, or `'en'`

## Changing Default Language

**File**: `i18n/LanguageContext.tsx`

Change line 18:
```typescript
return (saved as Language) || 'ar';  // Change 'ar' to 'fr' or 'en'
```

## Adding a New Language

### Step 1: Update Type Definition
**File**: `i18n/translations.ts`

```typescript
export type Language = 'ar' | 'fr' | 'en' | 'es';  // Add 'es' for Spanish
```

### Step 2: Add Language Name
```typescript
export const languageNames: Record<Language, string> = {
  ar: 'العربية',
  fr: 'Français',
  en: 'English',
  es: 'Español',  // Add Spanish
};
```

### Step 3: Add All Translations
```typescript
export const translations: Record<Language, Translations> = {
  ar: { /* existing */ },
  fr: { /* existing */ },
  en: { /* existing */ },
  es: {  // Add complete Spanish translations
    nav: {
      brand: 'Ferdaous',
      wellness: 'Bienestar',
      // ... all other translations
    },
    // ... complete all sections
  },
};
```

### Step 4: Update Language Selector
**File**: `components/LanguageSelector.tsx`

```typescript
const languages: Language[] = ['ar', 'fr', 'en', 'es'];  // Add 'es'
```

### Step 5: Add RTL Support (if needed)
**File**: `i18n/LanguageContext.tsx`

```typescript
const dir = (language === 'ar' || language === 'he') ? 'rtl' : 'ltr';
```

## Testing Languages

### Manual Testing
1. Open the app
2. Click language selector
3. Switch to each language
4. Verify all text changes
5. Check RTL layout for Arabic
6. Test on mobile devices

### Automated Testing
```typescript
// Example test
import { render } from '@testing-library/react';
import { LanguageProvider } from './i18n/LanguageContext';

test('switches language', () => {
  const { getByText } = render(
    <LanguageProvider>
      <App />
    </LanguageProvider>
  );
  
  // Test language switching logic
});
```

## Common Issues

### Text Not Translating
- ✅ Check if translation key exists in `translations.ts`
- ✅ Verify `useLanguage()` hook is called
- ✅ Ensure component is wrapped in `LanguageProvider`

### RTL Layout Issues
- ✅ Check `document.documentElement.dir` is set
- ✅ Verify CSS RTL rules in `index.css`
- ✅ Test with browser DevTools

### Language Not Persisting
- ✅ Check localStorage in browser DevTools
- ✅ Verify `setLanguage()` is called correctly
- ✅ Clear cache and test again

## File Structure

```
i18n/
├── translations.ts         # All translation strings
└── LanguageContext.tsx     # Language provider & hooks

components/
└── LanguageSelector.tsx    # Language switcher UI

index.css                   # RTL CSS rules
```

## Best Practices

1. **Always translate everything** - Don't leave hardcoded strings
2. **Test all languages** - Before deploying, verify each language
3. **Use semantic keys** - `t.nav.home` not `t.text1`
4. **Keep translations consistent** - Use same terminology across pages
5. **Consider text length** - Some languages are longer (German, Arabic)
6. **Test RTL thoroughly** - Arabic layout can reveal design issues

## Quick Commands

```bash
# Search for untranslated strings
grep -r "\"[A-Z]" src/pages/

# Find hardcoded text
grep -r ">.*[A-Za-z].*<" src/

# Test build with all languages
npm run build
```

## Resources

- [React i18n Best Practices](https://react.i18next.com/)
- [RTL Styling Guide](https://rtlstyling.com/)
- [Arabic Typography](https://arabictypography.com/)

---

**Need help?** Check the main documentation in `README.md` and `PROJECT_COMPLETE.md`
