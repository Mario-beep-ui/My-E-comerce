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
        name: 'Mouse Ergonómico',
        description: 'Diseño cómodo para largas sesiones de trabajo.',
        imageUrl: 'https://placehold.co/400x300/EAE4D5/000?text=imagen+pendiente',
        price: 35.00,
        category: 'Accesorios'
    },
    {
        id: 6,
        name: 'Monitor 4K',
        description: 'Imágenes nítidas y colores vibrantes para profesionales.',
        imageUrl: 'https://placehold.co/400x300/B6B09F/fff?text=imagen+pendiente',
        price: 349.99,
        category: 'Electrónica'
    },
    {
        id: 7,
        name: 'Webcam Full HD',
        description: 'Videollamadas claras y fluidas.',
        imageUrl: 'https://placehold.co/400x300/F2F2F2/000?text=imagen+pendiente',
        price: 55.00,
        category: 'Accesorios'
    },
    {
        id: 8,
        name: 'Disco Duro Externo 1TB',
        description: 'Almacenamiento adicional seguro y rápido.',
        imageUrl: 'https://placehold.co/400x300/8DD8FF/000?text=imagen+pendiente',
        price: 65.00,
        category: 'Almacenamiento'
    },
    {
        id: 9,
        name: 'Router Wi-Fi 6',
        description: 'Conexión a internet ultrarrápida y estable.',
        imageUrl: 'https://placehold.co/400x300/4E71FF/fff?text=imagen+pendiente',
        price: 120.00,
        category: 'Redes'
    },
    {
        id: 10,
        name: 'Impresora Multifuncional',
        description: 'Imprime, escanea y copia con facilidad.',
        imageUrl: 'https://placehold.co/400x300/5409DA/fff?text=imagen+pendiente',
        price: 199.00,
        category: 'Oficina'
    }
];

const productListElement = document.getElementById('product-list');
const loadingOverlay = document.getElementById('loading-overlay');
const notificationElement = document.getElementById('notification');
const favoritesButton = document.getElementById('favorites-button');
const loginButton = document.getElementById('login-button');
const registerButton = document.getElementById('register-button');
const userMenuIcon = document.getElementById('user-menu-icon');
const searchInput = document.getElementById('search-input');

const loginModal = document.getElementById('login-modal');
const registerModal = document.getElementById('register-modal');
const userMenuModal = document.getElementById('user-menu-modal');
const modalCloseButtons = document.querySelectorAll('.modal-close');
const switchToRegisterButton = document.getElementById('switch-to-register');
const switchToLoginButton = document.getElementById('switch-to-login');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');

const registerUsernameInput = document.getElementById('register-username');
const registerEmailInput = document.getElementById('register-email');
const registerPasswordInput = document.getElementById('register-password');
const registerConfirmPasswordInput = document.getElementById('register-confirm-password');

const authButtonsDiv = document.getElementById('auth-buttons');
const userDisplayDiv = document.getElementById('user-display');
const loggedInUsernameSpan = document.getElementById('logged-in-username');
const logoutButton = document.getElementById('logout-button');

const googleLoginButton = document.getElementById('google-login-button');
const appleLoginButton = document.getElementById('apple-login-button');
const facebookLoginButton = document.getElementById('facebook-login-button');

const myAccountLink = document.getElementById('my-account-link');
const myAccountSection = document.getElementById('my-account-section');
const backToMainMenuButton = document.getElementById('back-to-main-menu');

let products = [];
let favorites = JSON.parse(localStorage.getItem('ecommerceFavorites')) || [];
let users = JSON.parse(localStorage.getItem('ecommerceUsers')) || [];
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

const showLoading = () => {
    loadingOverlay.style.display = 'flex';
};

const hideLoading = () => {
    loadingOverlay.style.display = 'none';
};

const showNotification = (message, duration = 3000) => {
    notificationElement.textContent = message;
    notificationElement.classList.add('show');
    setTimeout(() => {
        notificationElement.classList.remove('show');
    }, duration);
};

const showModal = (modalElement) => {
    modalElement.classList.add('visible');
};

const hideModal = (modalElement) => {
    modalElement.classList.remove('visible');
};

const updateTopBar = () => {
    if (currentUser) {
        userDisplayDiv.style.display = 'flex';
        loggedInUsernameSpan.textContent = currentUser.username;
        authButtonsDiv.style.display = 'none';
    } else {
        userDisplayDiv.style.display = 'none';
        loggedInUsernameSpan.textContent = '';
        authButtonsDiv.style.display = 'flex';
    }
};

const fetchProducts = async () => {
    showLoading();
    await new Promise(resolve => setTimeout(resolve, 500));
    products = localProducts;
    renderProducts(products);
    hideLoading();
};

const renderProducts = (productsToRender) => {
    productListElement.innerHTML = '';
    if (productsToRender.length === 0) {
        productListElement.innerHTML = '<p class="no-results">No se encontraron productos que coincidan con su búsqueda.</p>';
        return;
    }
    productsToRender.forEach(product => {
        const isFavorited = favorites.some(fav => fav.id === product.id);
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.imageUrl}" alt="${product.name}" onerror="this.onerror=null; this.src='https://placehold.co/400x300/cccccc/000?text=Imagen+no+disponible';">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="category">${product.category}</div>
            <div class="price">$${product.price.toFixed(2)}</div>
            <div class="product-actions">
                <button data-id="${product.id}">Ver Detalles</button> <button class="favorite-button ${isFavorited ? 'favorited' : ''}" data-id="${product.id}">
                    <i class="fas fa-heart"></i>
                </button>
            </div>
        `;
        productCard.querySelector('.product-actions button:first-child').addEventListener('click', () => showNotification('Funcionalidad de Ver Detalles no implementada.', 3000));
        productCard.querySelector('.favorite-button').addEventListener('click', (event) => toggleFavorite(product.id, event.currentTarget));
        productListElement.appendChild(productCard);
    });
};

const toggleFavorite = (productId, buttonElement) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingFavoriteIndex = favorites.findIndex(fav => fav.id === product.id);

    if (existingFavoriteIndex > -1) {
        favorites.splice(existingFavoriteIndex, 1);
        buttonElement.classList.remove('favorited');
        showNotification(`${product.name} eliminado de favoritos.`);
    } else {
        favorites.push({ id: product.id, name: product.name, price: product.price, imageUrl: product.imageUrl });
        buttonElement.classList.add('favorited');
        showNotification(`${product.name} agregado a favoritos!`);
    }
    localStorage.setItem('ecommerceFavorites', JSON.stringify(favorites));
};

const searchProducts = () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredProducts = products.filter(product => {
        return product.name.toLowerCase().includes(searchTerm) ||
               product.description.toLowerCase().includes(searchTerm) ||
               product.category.toLowerCase().includes(searchTerm);
    });
    renderProducts(filteredProducts);
};

searchInput.addEventListener('input', searchProducts);

loginButton.addEventListener('click', () => {
    hideModal(registerModal);
    hideSection(myAccountSection);
    showModal(loginModal);
});

registerButton.addEventListener('click', () => {
    hideModal(loginModal);
    hideSection(myAccountSection);
    showModal(registerModal);
});

favoritesButton.addEventListener('click', () => {
    showNotification('Funcionalidad de ver Favoritos no implementada.', 3000);
    console.log('Current Favorites:', favorites);
});

modalCloseButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        const modalId = event.target.dataset.modal;
        const modalElement = document.getElementById(modalId);
        if (modalElement) {
            hideModal(modalElement);
        }
    });
});

switchToRegisterButton.addEventListener('click', () => {
    hideModal(loginModal);
    showModal(registerModal);
});

switchToLoginButton.addEventListener('click', () => {
    hideModal(registerModal);
    showModal(loginModal);
});

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        showNotification(`Bienvenido de nuevo, ${currentUser.username}!`, 3000);
        hideModal(loginModal);
        updateTopBar();
    } else {
        showNotification('Correo o contraseña incorrectos.', 3000);
    }
});

registerForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const username = registerUsernameInput.value;
    const email = registerEmailInput.value;
    const password = registerPasswordInput.value;
    const confirmPassword = registerConfirmPasswordInput.value;

    if (password !== confirmPassword) {
        showNotification('Las contraseñas no coinciden.', 3300);
        return;
    }

    if (users.some(user => user.email === email)) {
        showNotification('Ya existe una cuenta con este correo electrónico.', 3300);
        return;
    }

    const newUser = {
        username: username,
        email: email,
        password: password
    };

    users.push(newUser);
    localStorage.setItem('ecommerceUsers', JSON.stringify(users));

    showNotification('Registro exitoso! Ahora puedes iniciar sesión.', 3000);
    hideModal(registerModal);
    registerForm.reset();
});

logoutButton.addEventListener('click', () => {
    currentUser = null;
    localStorage.removeItem('currentUser');
    showNotification('Sesión cerrada.', 3000);
    updateTopBar();
    hideSection(myAccountSection);
    showSection(productListElement);
});

googleLoginButton.addEventListener('click', async () => {
    showLoading();
    await new Promise(resolve => setTimeout(resolve, 1000));
    currentUser = { username: 'Usuario Google', email: 'google_user@example.com' };
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    showNotification(`Bienvenido, ${currentUser.username}! (Google)`, 3000);
    hideModal(loginModal);
    updateTopBar();
    hideLoading();
});

appleLoginButton.addEventListener('click', async () => {
    showLoading();
    await new Promise(resolve => setTimeout(resolve, 1000));
    currentUser = { username: 'Usuario Apple', email: 'apple_user@example.com' };
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    showNotification(`Bienvenido, ${currentUser.username}! (Apple)`, 3000);
    hideModal(loginModal);
    updateTopBar();
    hideLoading();
});

facebookLoginButton.addEventListener('click', async () => {
    showLoading();
    await new Promise(resolve => setTimeout(resolve, 1000));
    currentUser = { username: 'Usuario Facebook', email: 'facebook_user@example.com' };
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    showNotification(`Bienvenido, ${currentUser.username}! (Facebook)`, 3000);
    hideModal(loginModal);
    updateTopBar();
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

const showSection = (sectionElement) => {
    productListElement.classList.remove('visible');
    myAccountSection.classList.remove('visible');
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

myAccountLink.addEventListener('click', (event) => {
    event.preventDefault();
    hideModal(userMenuModal);
    showSection(myAccountSection);
});

backToMainMenuButton.addEventListener('click', () => {
    hideSection(myAccountSection);
    showSection(productListElement);
});

document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
    updateTopBar();
    showSection(productListElement);
});