// --- Elementos del DOM ---
const loginRegisterModal = document.getElementById('login-register-modal');
const loginButton = document.getElementById('login-button');
const registerButton = document.getElementById('register-button');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const switchToRegisterButton = document.getElementById('switch-to-register');
const switchToLoginButton = document.getElementById('switch-to-login');
const loginSection = document.getElementById('login-section');
const registerSection = document.getElementById('register-section');
const modalCloseButtons = document.querySelectorAll('.modal-close');
const loadingOverlay = document.getElementById('loading-overlay');
const notificationBar = document.getElementById('notification-bar');

const userDisplay = document.getElementById('user-display');
const loggedInUsername = document.getElementById('logged-in-username');
const logoutButton = document.getElementById('logout-button');
const authButtons = document.getElementById('auth-buttons');

const googleLoginButton = document.getElementById('google-login-button');
const facebookLoginButton = document.getElementById('facebook-login-button');
const appleLoginButton = document.getElementById('apple-login-button');

const userMenuIcon = document.getElementById('user-menu-icon');
const userMenuModal = document.getElementById('user-menu-modal');

const productListElement = document.getElementById('product-list');
const productsContainer = document.getElementById('products-container');

const myAccountLink = document.getElementById('my-account-link');
const myAccountSection = document.getElementById('my-account-section');
const backToMainMenuButton = document.getElementById('back-to-main-menu-button');
const accountUsername = document.getElementById('account-username');
const accountEmail = document.getElementById('account-email');
const lastLoginDate = document.getElementById('last-login-date');

// NUEVOS ELEMENTOS DEL DOM PARA FAVORITOS
const favoritesIcon = document.getElementById('favorites-icon');
const openFavoritesModalButton = document.getElementById('open-favorites-modal-button');
const favoritesModal = document.getElementById('favorites-modal');
const favoriteProductsContainer = document.getElementById('favorite-products-container');
const noFavoritesMessage = document.getElementById('no-favorites-message');

// NUEVO: Referencia al top-bar para la animación
const topBar = document.querySelector('.top-bar');

// --- Variables de Estado ---
let currentUser = null;
let products = [];
let favoriteProducts = [];

// --- Datos de Productos (simulados) ---
const localProducts = [
    {
        id: 1,
        name: 'Laptop Ultraligera',
        description: 'Potente y portátil, ideal para trabajo y estudio.',
        imageUrl: 'https://placehold.co/400x300/8DD8FF/000?text=imagen+pendiente',
        price: 999.99,
        category: 'Electrónica'
    },
    {
        id: 2,
        name: 'Auriculares Inalámbricos',
        description: 'Sonido de alta fidelidad y cancelación de ruido activa.',
        imageUrl: 'https://placehold.co/400x300/4E71FF/fff?text=imagen+pendiente',
        price: 149.50,
        category: 'Electrónica'
    },
    {
        id: 3,
        name: 'Reloj Inteligente',
        description: 'Monitoriza tu actividad física y recibe notificaciones.',
        imageUrl: 'https://placehold.co/400x300/5409DA/fff?text=imagen+pendiente',
        price: 79.00,
        category: 'Electrónica'
    },
    {
        id: 4,
        name: 'Teclado Mecánico',
        description: 'Experiencia de escritura táctil y duradera.',
        imageUrl: 'https://placehold.co/400x300/BBFBFF/000?text=imagen+pendiente',
        price: 85.75,
        category: 'Accesorios'
    },
    {
        id: 5,
        name: 'Monitor Curvo 27"',
        description: 'Inmersión total para juegos y productividad.',
        imageUrl: 'https://placehold.co/400x300/F2F2F2/333?text=imagen+pendiente',
        price: 299.00,
        category: 'Electrónica'
    },
    {
        id: 6,
        name: 'Ratón Gaming RGB',
        description: 'Precisión y estilo para tus sesiones de juego.',
        imageUrl: 'https://placehold.co/400x300/EAE4D5/555?text=imagen+pendiente',
        price: 45.00,
        category: 'Accesorios'
    },
    {
        id: 7,
        name: 'Smartphone Última Generación',
        description: 'Cámara increíble, rendimiento superior.',
        imageUrl: 'https://placehold.co/400x300/8DD8FF/000?text=imagen+pendiente',
        price: 799.00,
        category: 'Electrónica'
    },
    {
        id: 8,
        name: 'Tableta Gráfica Profesional',
        description: 'Ideal para artistas digitales y diseñadores.',
        imageUrl: 'https://placehold.co/400x300/4E71FF/fff?text=imagen+pendiente',
        price: 350.00,
        category: 'Accesorios'
    },
    {
        id: 9,
        name: 'Altavoz Bluetooth Portátil',
        description: 'Sonido potente en cualquier lugar, resistente al agua.',
        imageUrl: 'https://placehold.co/400x300/5409DA/fff?text=imagen+pendiente',
        price: 65.00,
        category: 'Electrónica'
    },
    {
        id: 10,
        name: 'Cámara Mirrorless 4K',
        description: 'Captura momentos con calidad profesional.',
        imageUrl: 'https://placehold.co/400x300/BBFBFF/000?text=imagen+pendiente',
        price: 1200.00,
        category: 'Electrónica'
    }
];

// --- Funciones de Utilidad ---
const showLoading = () => {
    loadingOverlay.classList.add('visible');
};

const hideLoading = () => {
    loadingOverlay.classList.remove('visible');
};

const showModal = (modalElement) => {
    modalElement.classList.add('visible');
};

const hideModal = (modalElement) => {
    modalElement.classList.remove('visible');
};

const showNotification = (message, duration = 3000) => {
    let currentNotificationBar = document.getElementById('notification-bar');
    if (!currentNotificationBar) {
        currentNotificationBar = document.createElement('div');
        currentNotificationBar.id = 'notification-bar';
        document.body.appendChild(currentNotificationBar);
    }
    
    currentNotificationBar.textContent = message;
    currentNotificationBar.classList.add('show');
    setTimeout(() => {
        currentNotificationBar.classList.remove('show');
    }, duration);
};

// --- Funciones de Autenticación y UI ---
const updateTopBar = () => {
    if (currentUser) {
        loggedInUsername.textContent = currentUser.username || currentUser.email;
        userDisplay.style.display = 'flex';
        authButtons.style.display = 'none';
        favoritesIcon.style.display = 'inline-block';
        if (favoriteProducts.length > 0) {
            favoritesIcon.classList.add('active');
        } else {
            favoritesIcon.classList.remove('active');
        }
    } else {
        userDisplay.style.display = 'none';
        authButtons.style.display = 'flex';
        favoritesIcon.style.display = 'none';
    }
};

const saveCurrentUser = (user) => {
    currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    updateTopBar();
};

const clearCurrentUser = () => {
    currentUser = null;
    localStorage.removeItem('currentUser');
    favoriteProducts = [];
    saveFavorites();
    updateTopBar();
    showModal(loginRegisterModal);
};

// --- Manejo de la Lógica de Favoritos ---
const saveFavorites = () => {
    localStorage.setItem('favoriteProducts', JSON.stringify(favoriteProducts));
};

const loadFavorites = () => {
    const storedFavorites = localStorage.getItem('favoriteProducts');
    if (storedFavorites) {
        try {
            favoriteProducts = JSON.parse(storedFavorites);
        } catch (e) {
            console.error("Error parsing favorite products from localStorage", e);
            favoriteProducts = [];
        }
    } else {
        favoriteProducts = [];
    }
};

const createProductCard = (product, isFavoriteView = false) => {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');

    const isFav = favoriteProducts.includes(product.id);

    productCard.innerHTML = `
        <img src="${product.imageUrl}" alt="${product.name}">
        <div class="product-info">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <span class="product-price">$${product.price.toFixed(2)}</span>
        </div>
        <div class="product-actions">
            <button class="add-to-cart-button">Añadir al Carrito</button>
            <button class="favorite-button ${isFav ? 'active' : ''}" data-product-id="${product.id}">
                <i class="fas fa-heart"></i>
            </button>
        </div>
    `;

    const favoriteButton = productCard.querySelector('.favorite-button');
    favoriteButton.addEventListener('click', (event) => {
        event.stopPropagation();
        toggleFavorite(product.id);

        if (isFavoriteView) {
            renderFavoriteProducts();
        } else {
            favoriteButton.classList.toggle('active');
        }
        updateTopBar();
    });

    return productCard;
};


const toggleFavorite = (productId) => {
    const index = favoriteProducts.indexOf(productId);
    if (index > -1) {
        favoriteProducts.splice(index, 1);
        showNotification('Producto eliminado de favoritos.', 2000);
    } else {
        favoriteProducts.push(productId);
        showNotification('Producto añadido a favoritos.', 2000);
    }
    saveFavorites();
    renderProducts(products);
};


const renderFavoriteProducts = () => {
    favoriteProductsContainer.innerHTML = '';
    const currentFavorites = products.filter(product => favoriteProducts.includes(product.id));

    if (currentFavorites.length === 0) {
        noFavoritesMessage.style.display = 'block';
    } else {
        noFavoritesMessage.style.display = 'none';
        currentFavorites.forEach(product => {
            const productCard = createProductCard(product, true);
            favoriteProductsContainer.appendChild(productCard);
        });
    }
    updateTopBar();
};

// --- Funciones principales ---
const fetchProducts = async () => {
    showLoading();
    try {
        await new Promise(resolve => setTimeout(resolve, 500));
        products = localProducts;
        renderProducts(products);
    }
    catch (error) {
        console.error('Error fetching products:', error);
        showNotification('Error al cargar los productos.', 3000);
    } finally {
        hideLoading();
    }
};

const renderProducts = (productsToRender) => {
    productsContainer.innerHTML = '';
    if (productsToRender && productsToRender.length > 0) {
        productsToRender.forEach(product => {
            const productCard = createProductCard(product);
            productsContainer.appendChild(productCard);
        });
    } else {
        productsContainer.innerHTML = '<p style="text-align: center; width: 100%;">No se encontraron productos.</p>';
    }
};


const showSection = (sectionElement) => {
    productListElement.classList.remove('visible');
    myAccountSection.classList.remove('visible');
    hideModal(favoritesModal); 
    hideModal(userMenuModal);
    hideModal(loginRegisterModal);

    productListElement.style.display = 'none';
    myAccountSection.style.display = 'none';

    sectionElement.classList.add('visible');
    if (sectionElement === productListElement) {
        sectionElement.style.display = 'grid';
    } else {
        sectionElement.style.display = 'flex';
    }
};

const hideSection = (sectionElement) => {
    sectionElement.classList.remove('visible');
    sectionElement.style.display = 'none';
};

// --- Event Listeners ---
loginButton.addEventListener('click', () => showModal(loginRegisterModal));
registerButton.addEventListener('click', () => showModal(loginRegisterModal));

modalCloseButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        const modalId = event.target.dataset.modal;
        hideModal(document.getElementById(modalId));
    });
});

switchToRegisterButton.addEventListener('click', () => {
    loginSection.classList.remove('active');
    registerSection.classList.add('active');
});

switchToLoginButton.addEventListener('click', () => {
    registerSection.classList.remove('active');
    loginSection.classList.add('active');
});

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    showLoading();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    await new Promise(resolve => setTimeout(resolve, 1000));
    currentUser = {
        username: 'Usuario Simulado',
        email: email,
        lastLogin: new Date().toLocaleString()
    };
    saveCurrentUser(currentUser);
    showNotification('Inicio de sesión exitoso!', 3000);
    hideModal(loginRegisterModal);
    hideLoading();
});

registerForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    showLoading();
    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;

    if (password !== confirmPassword) {
        showNotification('Las contraseñas no coinciden.', 3000);
        hideLoading();
        return;
    }

    await new Promise(resolve => setTimeout(resolve, 1000));
    currentUser = {
        username: username,
        email: email,
        lastLogin: new Date().toLocaleString()
    };
    saveCurrentUser(currentUser);
    showNotification('Registro exitoso! Ha iniciado sesión.', 3000);
    hideModal(loginRegisterModal);
    hideLoading();
});


logoutButton.addEventListener('click', () => {
    showNotification('Cerrando sesión...', 1500);
    showLoading();
    setTimeout(() => {
        clearCurrentUser();
        showNotification('Sesión cerrada.', 2000);
        hideLoading();
    }, 1000);
});

googleLoginButton.addEventListener('click', async () => {
    showNotification('Iniciando sesión con Google (simulado)...', 2000);
    showLoading();
    await new Promise(resolve => setTimeout(resolve, 1500));
    currentUser = { username: 'Usuario Google', email: 'google_user@example.com', lastLogin: new Date().toLocaleString() };
    saveCurrentUser(currentUser);
    showNotification(`Bienvenido, ${currentUser.username}! (Google)`, 3000);
    hideModal(loginRegisterModal);
    hideLoading();
});

facebookLoginButton.addEventListener('click', async () => {
    showNotification('Iniciando sesión con Facebook (simulado)...', 2000);
    showLoading();
    await new Promise(resolve => setTimeout(resolve, 1500));
    currentUser = { username: 'Usuario Facebook', email: 'facebook_user@example.com', lastLogin: new Date().toLocaleString() };
    saveCurrentUser(currentUser);
    showNotification(`Bienvenido, ${currentUser.username}! (Facebook)`, 3000);
    hideModal(loginRegisterModal);
    hideLoading();
});

appleLoginButton.addEventListener('click', async () => {
    showNotification('Iniciando sesión con Apple (simulado)...', 2000);
    showLoading();
    await new Promise(resolve => setTimeout(resolve, 1500));
    currentUser = { username: 'Usuario Apple', email: 'apple_user@example.com', lastLogin: new Date().toLocaleString() };
    saveCurrentUser(currentUser);
    showNotification(`Bienvenido, ${currentUser.username}! (Apple)`, 3000);
    hideModal(loginRegisterModal);
    hideLoading();
});

userMenuIcon.addEventListener('click', () => {
    showModal(userMenuModal);
});

userMenuModal.addEventListener('click', (event) => {
    if (event.target === userMenuModal) {
        hideModal(userMenuModal);
    }
});

myAccountLink.addEventListener('click', (event) => {
    event.preventDefault();
    hideModal(userMenuModal);
    showSection(myAccountSection);
    if (currentUser) {
        accountUsername.textContent = currentUser.username || 'N/A';
        accountEmail.textContent = currentUser.email || 'N/A';
        lastLoginDate.textContent = currentUser.lastLogin || 'N/A';
    }
});

backToMainMenuButton.addEventListener('click', () => {
    hideSection(myAccountSection);
    showSection(productListElement);
});

favoritesIcon.addEventListener('click', () => {
    if (currentUser) {
        showModal(favoritesModal);
        renderFavoriteProducts();
    } else {
        showNotification('Debes iniciar sesión para ver tus favoritos.', 3000);
        showModal(loginRegisterModal);
    }
});

openFavoritesModalButton.addEventListener('click', (event) => {
    event.preventDefault();
    hideModal(userMenuModal);
    if (currentUser) {
        showModal(favoritesModal);
        renderFavoriteProducts();
    } else {
        showNotification('Debes iniciar sesión para ver tus favoritos.', 3000);
        showModal(loginRegisterModal);
    }
});

favoritesModal.addEventListener('click', (event) => {
    if (event.target === favoritesModal) {
        hideModal(favoritesModal);
    }
});

// NUEVO: Evento para el scroll del top-bar
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) { // Si el usuario ha bajado más de 50px
        topBar.classList.add('scrolled');
    } else {
        topBar.classList.remove('scrolled');
    }
});


// --- Inicialización al cargar el DOM ---
document.addEventListener('DOMContentLoaded', () => {
    if (!document.getElementById('notification-bar')) {
        const notificationBarElement = document.createElement('div');
        notificationBarElement.id = 'notification-bar';
        document.body.appendChild(notificationBarElement);
    }

    loadFavorites();
    fetchProducts();
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
        currentUser = JSON.parse(storedUser);
    }
    updateTopBar();
    hideLoading();
});