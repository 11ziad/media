import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// ترجمة الجمل
const resources = {
  en: {
    translation: {
      home: 'Home',
      category: 'Category',
      brands: 'Brands',
      products: 'Products',
      wishlist: 'Wishlist',
      cart: 'Cart',
      login: 'Login',
      register: 'Register',
      logout: 'Logout',
      profile: 'Profile',
      changeLanguage: 'Change Language',
    }
  },
  ar: {
    translation: {
      home: 'الرئيسية',
      category: 'الفئات',
      brands: 'الماركات',
      products: 'المنتجات',
      wishlist: 'المفضلة',
      cart: 'السلة',
      login: 'تسجيل الدخول',
      register: 'إنشاء حساب',
      logout: 'تسجيل الخروج',
      profile: 'الملف الشخصي',
      changeLanguage: 'تغيير اللغة',
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // اللغة الافتراضية
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
