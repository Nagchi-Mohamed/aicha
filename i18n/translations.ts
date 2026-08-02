export type Language = 'fr' | 'ar';

export interface Translations {
  // Navigation
  nav: {
    brand: string;
    brandSub: string;
    search: string;
    admin: string;
    cart: string;
    feedback: string;
    home: string;
  };

  // Hero Section
  hero: {
    badge: string;
    title: string;
    titleHighlight: string;
    titleEnd: string;
    subtitle: string;
    cta: string;
    contactBtn: string;
  };

  // Products
  products: {
    featured: string;
    description: string;
    filter: string;
    sort: string;
    sortRecommended: string;
    loadMore: string;
    showing: string;
    of: string;
    items: string;
    addToCart: string;
    bestseller: string;
    mad: string;
    activeFilters: string;
    searchLabel: string;
    categoryLabel: string;
    noProducts: string;
    tryAdjusting: string;
    clearFilters: string;
    allProducts: string;
    sortPriceLow: string;
    sortPriceHigh: string;
    sortName: string;
    units: string;
    viewDetails: string;
    close: string;
  };

  // Feedback / Complaints Modal
  feedbackModal: {
    title: string;
    subtitle: string;
    nameLabel: string;
    namePlaceholder: string;
    phoneLabel: string;
    typeLabel: string;
    typeFeedback: string;
    typeComplaint: string;
    typeInquiry: string;
    messageLabel: string;
    messagePlaceholder: string;
    submit: string;
    successTitle: string;
    successDesc: string;
    close: string;
  };

  // How It Works
  howItWorks: {
    title: string;
    titleHighlight: string;
    description: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
  };

  // Checkout
  checkout: {
    title: string;
    subtitle: string;
    fullName: string;
    whatsappNumber: string;
    address: string;
    addressPlaceholder: string;
    confirmOrder: string;
    orderSummary: string;
    subtotal: string;
    shipping: string;
    free: string;
    total: string;
    taxIncluded: string;
    whatNext: string;
    whatNextDesc: string;
    orderSuccessTitle: string;
    orderSuccessDesc: string;
    emptyCart: string;
    emptyCartDesc: string;
    returnToStore: string;
    secureCheckout: string;
    fastDelivery: string;
    qty: string;
    checkout: string;
    sendingWhatsapp: string;
  };

  // Admin
  admin: {
    portal: string;
    orders: string;
    catalog: string;
    analytics: string;
    messages: string;
    addProduct: string;
    pendingOrders: string;
    totalRevenue: string;
    totalMessages: string;
    activeProducts: string;
    recentOrders: string;
    manageOrders: string;
    customerInfo: string;
    orderedItems: string;
    totalAmount: string;
    actions: string;
    status: string;
    activeCatalog: string;
    modifyCatalog: string;
    edit: string;
    delete: string;
    productName: string;
    productNameAr: string;
    price: string;
    category: string;
    description: string;
    descriptionAr: string;
    cancel: string;
    publish: string;
    addNewListing: string;
    uploadImages: string;
    contactCustomer: string;
    loginTitle: string;
    loginPlaceholder: string;
    loginBtn: string;
    demoLogin: string;
    markRead: string;
    type: string;
    messageText: string;
    noMessages: string;
    noOrders: string;
    orderStatusPending: string;
    orderStatusContacted: string;
    orderStatusCompleted: string;
    orderStatusCancelled: string;
  };

  // Footer
  footer: {
    shippingPolicy: string;
    privacy: string;
    authorizedPartner: string;
    copyright: string;
    contactAicha: string;
  };
}

export const translations: Record<Language, Translations> = {
  fr: {
    nav: {
      brand: 'Aicha Wellness Store',
      brandSub: 'Produits Naturels Forever',
      search: 'Rechercher un produit...',
      admin: 'Espace Aicha',
      cart: 'Mon Panier',
      feedback: 'Avis & Réclamation',
      home: 'Accueil',
    },
    hero: {
      badge: 'Distributrice Agréée Forever Living Maroc',
      title: 'Votre Bien-être Au Naturel Avec',
      titleHighlight: 'Aicha',
      titleEnd: 'À Votre Écoute',
      subtitle: 'Découvrez la sélection exclusive de produits 100% naturels à l\'Aloe Vera et ruche Forever. Livraison rapide partout au Maroc avec suivi direct via WhatsApp.',
      cta: 'Découvrir les Produits',
      contactBtn: 'Contacter Aicha sur WhatsApp',
    },
    products: {
      featured: 'Catalogue des Produits Forever',
      description: 'Découvrez nos produits certifiés pour la santé, la beauté et l\'énergie au quotidien.',
      filter: 'Filtrer par Catégorie',
      sort: 'Trier par',
      sortRecommended: 'Recommandés',
      loadMore: 'Afficher plus',
      showing: 'Affichage de',
      of: 'sur',
      items: 'produits',
      addToCart: 'Ajouter au Panier',
      bestseller: 'Meilleure Vente',
      mad: 'MAD',
      activeFilters: 'Filtres actifs:',
      searchLabel: 'Recherche:',
      categoryLabel: 'Catégorie:',
      noProducts: 'Aucun produit ne correspond à votre recherche',
      tryAdjusting: 'Essayez de changer les filtres ou le terme de recherche.',
      clearFilters: 'Réinitialiser les filtres',
      allProducts: 'Toutes les Catégories',
      sortPriceLow: 'Prix: du - cher au + cher',
      sortPriceHigh: 'Prix: du + cher au - cher',
      sortName: 'Nom: A à Z',
      units: 'Unité(s)',
      viewDetails: 'Aperçu Rapide',
      close: 'Fermer',
    },
    feedbackModal: {
      title: 'Réclamation ou Avis',
      subtitle: 'Votre avis compte ! Laissez un message directement à Aicha.',
      nameLabel: 'Votre Nom Complet',
      namePlaceholder: 'Ex: Fatima Zahra',
      phoneLabel: 'Numéro WhatsApp',
      typeLabel: 'Type de Message',
      typeFeedback: 'Avis / Feedback',
      typeComplaint: 'Réclamation / Problème',
      typeInquiry: 'Question / Demande de Conseil',
      messageLabel: 'Votre Message',
      messagePlaceholder: 'Écrivez votre message ou votre question ici...',
      submit: 'Envoyer à Aicha',
      successTitle: 'Message Envoyé !',
      successDesc: 'Merci ! Aicha a bien reçu votre message et vous répondra très rapidement.',
      close: 'Fermer',
    },
    howItWorks: {
      title: 'Comment Commander Chez',
      titleHighlight: 'Aicha Wellness',
      description: 'Commander vos produits Forever est simple, rapide et sécurisé. Suivez ces 3 étapes faciles :',
      step1Title: '1. Choisissez vos produits',
      step1Desc: 'Sélectionnez les articles Forever souhaités et ajustez les quantités dans votre panier.',
      step2Title: '2. Saisissez vos coordonnées',
      step2Desc: 'Indiquez votre nom, ville et numéro WhatsApp pour préparer votre fiche de commande.',
      step3Title: '3. Validation direct WhatsApp',
      step3Desc: 'Le message récapitulatif s\'ouvre directement sur WhatsApp. Aicha vous répond immédiatement pour confirmer l\'expédition !',
    },
    checkout: {
      title: 'Validation de la Commande',
      subtitle: 'Complétez vos coordonnées pour générer votre commande officielle envoyée sur le WhatsApp d\'Aicha.',
      fullName: 'Nom et Prénom *',
      whatsappNumber: 'Numéro WhatsApp *',
      address: 'Adresse de Livraison & Ville *',
      addressPlaceholder: 'Ex: Rue 10 N°15, Quartier Palmier, Casablanca',
      confirmOrder: 'Envoyer la Commande via WhatsApp',
      orderSummary: 'Récapitulatif du Panier',
      subtotal: 'Sous-total',
      shipping: 'Livraison',
      free: 'Livraison Partout au Maroc',
      total: 'Total Général',
      taxIncluded: 'Paiement à la livraison',
      whatNext: 'Que se passe-t-il après la confirmation ?',
      whatNextDesc: 'En cliquant sur le bouton, l\'application ouvre WhatsApp avec votre commande récapitulée. Aicha la reçoit instantanément et vous recontactera.',
      orderSuccessTitle: 'Commande Envoyée avec Succès !',
      orderSuccessDesc: 'Votre message récapitulatif a été préparé pour Aicha. Si WhatsApp ne s\'est pas ouvert automatiquement, cliquez ci-dessous pour recontacter Aicha.',
      emptyCart: 'Votre Panier est Vide',
      emptyCartDesc: 'Parcourez notre catalogue et ajoutez vos produits Forever préférés.',
      returnToStore: 'Retour aux Produits',
      secureCheckout: 'Commande Directe',
      fastDelivery: 'Livraison Rapide Maroc',
      qty: 'Qté',
      checkout: 'Passer la Commande',
      sendingWhatsapp: 'Ouverture de WhatsApp...',
    },
    admin: {
      portal: 'Tableau de Bord - Aicha',
      orders: 'Commandes Clients',
      catalog: 'Gestion des Produits',
      analytics: 'Statistiques & Ventes',
      messages: 'Boîte de Réclamations',
      addProduct: 'Ajouter un Produit',
      pendingOrders: 'Commandes En Attente',
      totalRevenue: 'Revenu Total estimé',
      totalMessages: 'Messages & Avis',
      activeProducts: 'Produits Actifs',
      recentOrders: 'Liste des Commandes',
      manageOrders: 'Gérez et suivez le statut des commandes envoyées par les clients.',
      customerInfo: 'Client',
      orderedItems: 'Produits Commandés',
      totalAmount: 'Total (MAD)',
      actions: 'Actions',
      status: 'Statut',
      activeCatalog: 'Catalogue en Ligne',
      modifyCatalog: 'Ajoutez, modifiez le prix, l\'image ou la description de vos produits.',
      edit: 'Modifier',
      delete: 'Supprimer',
      productName: 'Nom du produit (Français)',
      productNameAr: 'Nom du produit (Arabe)',
      price: 'Prix (MAD)',
      category: 'Catégorie',
      description: 'Description (Français)',
      descriptionAr: 'Description (Arabe)',
      cancel: 'Annuler',
      publish: 'Enregistrer le Produit',
      addNewListing: 'Ajouter un nouveau produit',
      uploadImages: 'Cliquez ou déposez l\'image du produit ici',
      contactCustomer: 'Contacter sur WhatsApp',
      loginTitle: 'Accès Réservé à Aicha',
      loginPlaceholder: 'Mot de passe (ex: aicha2026)...',
      loginBtn: 'Se Connecter',
      demoLogin: 'Accès Démo Rapide',
      markRead: 'Marquer comme lu',
      type: 'Type',
      messageText: 'Message',
      noMessages: 'Aucun message ou réclamation pour le moment.',
      noOrders: 'Aucune commande enregistrée pour l\'instant.',
      orderStatusPending: 'En attente',
      orderStatusContacted: 'Client contacté',
      orderStatusCompleted: 'Livrée & Terminée',
      orderStatusCancelled: 'Annulée',
    },
    footer: {
      shippingPolicy: 'Livraison au Maroc',
      privacy: 'Confidentialité',
      authorizedPartner: 'Distributrice Agréée Forever',
      copyright: '© 2026 Aicha Wellness Store (متجر عائشة). Tous droits réservés.',
      contactAicha: 'Contacter Aicha sur WhatsApp',
    },
  },
  ar: {
    nav: {
      brand: 'متجر عائشة للرفاهية',
      brandSub: 'منتجات فوريفير الطبيعية',
      search: 'البحث عن منتج...',
      admin: 'لوحة عائشة',
      cart: 'سلة التسوق',
      feedback: 'الشكايات والآراء',
      home: 'الرئيسية',
    },
    hero: {
      badge: 'موزعة معتمدة لمنتجات فوريفير بالمغرب',
      title: 'صحتك وجمالك الطبيعي مع',
      titleHighlight: 'عائشة',
      titleEnd: 'في خدمتكم دائماً',
      subtitle: 'اكتشفوا تشكيلة حصريّة من منتجات الألوفيرا الطبيعية 100% ومنتجات الخلية من فوريفير. توصيل سريع لجميع مدن المغرب مع متابعة مباشرة عبر الواتساب.',
      cta: 'تصفح المنتجات',
      contactBtn: 'التواصل مع عائشة عبر الواتساب',
    },
    products: {
      featured: 'كتالوج منتجات فوريفير',
      description: 'اكتشفوا المنتجات المعتمدة للصحة، الجمال، والحيوية اليومية.',
      filter: 'تصفية حسب الفئة',
      sort: 'ترتيب حسب',
      sortRecommended: 'الموصى بها',
      loadMore: 'عرض المزيد',
      showing: 'عرض',
      of: 'من أصل',
      items: 'منتج',
      addToCart: 'إضافة إلى السلة',
      bestseller: 'الأكثر مبيعاً',
      mad: 'د.م.',
      activeFilters: 'الفلاتر النشطة:',
      searchLabel: 'البحث:',
      categoryLabel: 'الفئة:',
      noProducts: 'لم نجد أي منتج يطابق بحثك',
      tryAdjusting: 'جرب تغيير كلمة البحث أو الفلاتر المختارة.',
      clearFilters: 'إعادة ضبط الفلاتر',
      allProducts: 'جميع الفئات',
      sortPriceLow: 'الطلب حسب السعر: من الأقل للأعلى',
      sortPriceHigh: 'الطلب حسب السعر: من الأعلى للأقل',
      sortName: 'الاسم: من أ إلى ي',
      units: 'وحدة',
      viewDetails: 'نظرة سريعة',
      close: 'إغلاق',
    },
    feedbackModal: {
      title: 'إرسال شكاية أو رأي',
      subtitle: 'رأيكم يهمنا! اتركوا رسالة مباشرة لعائشة.',
      nameLabel: 'الاسم الكامل',
      namePlaceholder: 'مثال: فاطمة الزهراء',
      phoneLabel: 'رقم الواتساب',
      typeLabel: 'نوع الرسالة',
      typeFeedback: 'رأي / انطباع',
      typeComplaint: 'شكاية / مشكلة',
      typeInquiry: 'استفسار / طلب نصيحة',
      messageLabel: 'نص الرسالة',
      messagePlaceholder: 'اكتبوا رسالتكم أو استفساركم هنا...',
      submit: 'إرسال الرسالة لعائشة',
      successTitle: 'تم إرسال الرسالة بنجاح!',
      successDesc: 'شكراً لكم! توصلت عائشة برسالتكم وستجيبكم في أقرب وقت.',
      close: 'إغلاق',
    },
    howItWorks: {
      title: 'كيفية الطلب من',
      titleHighlight: 'متجر عائشة',
      description: 'الطلب سهل وسريع وآمن للغاية. اتبعوا هذه الخطوات البسيطة الثلاث:',
      step1Title: '1. اختيار المنتجات',
      step1Desc: 'حددوا منتجات فوريفير المفضلة لديكم واضبطوا الكميات في سلة التسوق.',
      step2Title: '2. إدخال معلومات التوصيل',
      step2Desc: 'أدخلوا اسمكم الكامل، مدينتكم ورقم الواتساب لتجهيز استمارة الطلب.',
      step3Title: '3. التأكيد المباشر عبر الواتساب',
      step3Desc: 'تفتح الرسالة المفصلة مباشرة في الواتساب إرسالها لعائشة التي تتواصل معكم فوراً لتأكيد التوصيل!',
    },
    checkout: {
      title: 'تأكيد إرسال الطلب',
      subtitle: 'يرجى إدخال معلوماتكم لتجهيز الرسالة المنظمة وتأكيد الطلب مع عائشة.',
      fullName: 'الاسم والنسب *',
      whatsappNumber: 'رقم الواتساب *',
      address: 'عنوان التوصيل والمدينة *',
      addressPlaceholder: 'مثال: زنقة 10 رقم 15، حي النخيل، الدار البيضاء',
      confirmOrder: 'إرسال الطلب عبر الواتساب لعائشة',
      orderSummary: 'ملخص السلة',
      subtotal: 'المجموع الفرعي',
      shipping: 'التوصيل',
      free: 'توصيل لجميع مدن المغرب',
      total: 'المجموع الإجمالي',
      taxIncluded: 'الدفع عند الاستلام',
      whatNext: 'ماذا يحدث بعد الضغط على التأكيد؟',
      whatNextDesc: 'سيتم فتح تطبيق الواتساب تلقائياً يحتوي على رسالة مرتبة بجميع المنتجات والكميات والعنوان لعائشة.',
      orderSuccessTitle: 'تمت العملية بنجاح!',
      orderSuccessDesc: 'تم تجهيز طلبكم وحفظه. إذا لم يفتح الواتساب تلقائياً، يرجى الضغط على الزر أدناه للتواصل مع عائشة.',
      emptyCart: 'سلة التسوق فارغة',
      emptyCartDesc: 'تصفحوا الكتالوج وأضيفوا منتجات فوريفير المفضلة.',
      returnToStore: 'العودة للمتجر',
      secureCheckout: 'طلب مباشر وآمن',
      fastDelivery: 'توصيل سريع بالمغرب',
      qty: 'الكمية',
      checkout: 'إتمام الطلب',
      sendingWhatsapp: 'جاري فتح الواتساب...',
    },
    admin: {
      portal: 'لوحة تحكم عائشة',
      orders: 'طلبات الزبناء',
      catalog: 'إدارة المنتجات',
      analytics: 'الإحصائيات والمبيعات',
      messages: 'صندوق الشكايات والآراء',
      addProduct: 'إضافة منتج جديد',
      pendingOrders: 'طلبات في الانتظار',
      totalRevenue: 'إجمالي المبيعات المتوقعة',
      totalMessages: 'الشكايات والآراء',
      activeProducts: 'المنتجات النشطة',
      recentOrders: 'قائمة الطلبات',
      manageOrders: 'متابعة وتحديث حالة طلبات الزبناء والتواصل معهم.',
      customerInfo: 'الزبون',
      orderedItems: 'المنتجات المطلوبة',
      totalAmount: 'المجموع (د.م.)',
      actions: 'الإجراءات',
      status: 'الحالة',
      activeCatalog: 'المنتجات المعروضة',
      modifyCatalog: 'إضافة، تعديل الأسعار، الصور أو وصف المنتجات.',
      edit: 'تعديل',
      delete: 'حذف',
      productName: 'اسم المنتج (بالفرنسية)',
      productNameAr: 'اسم المنتج (بالعربية)',
      price: 'السعر (د.م.)',
      category: 'الفئة',
      description: 'الوصف (بالفرنسية)',
      descriptionAr: 'الوصف (بالعربية)',
      cancel: 'إلغاء',
      publish: 'حفظ المنتج',
      addNewListing: 'إضافة منتج جديد',
      uploadImages: 'انقر أو اسحب صورة المنتج هنا',
      contactCustomer: 'التواصل عبر الواتساب',
      loginTitle: 'دخول لوحة التحكم (عائشة)',
      loginPlaceholder: 'كلمة السر (مثال: aicha2026)...',
      loginBtn: 'تسجيل الدخول',
      demoLogin: 'دخول تجريبي سريع',
      markRead: 'تعليم كمقروء',
      type: 'النوع',
      messageText: 'الرسالة',
      noMessages: 'لا توجد شكايات أو آراء حالياً.',
      noOrders: 'لا توجد أي طلبات حالياً.',
      orderStatusPending: 'في الانتظار',
      orderStatusContacted: 'تم التواصل مع الزبون',
      orderStatusCompleted: 'تم التوصيل والإنهاء',
      orderStatusCancelled: 'ملغاة',
    },
    footer: {
      shippingPolicy: 'سياسة التوصيل بالمغرب',
      privacy: 'الخصوصية',
      authorizedPartner: 'موزعة معتمدة لدى فوريفير',
      copyright: '© 2026 متجر عائشة للرفاهية (Aicha Wellness Store). جميع الحقوق محفوظة.',
      contactAicha: 'التواصل مع عائشة عبر الواتساب',
    },
  },
};

export const languageNames: Record<Language, string> = {
  fr: 'Français',
  ar: 'العربية',
};
