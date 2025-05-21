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
const favoritesIcon = document.getElementById('favorites-icon'); // Icono de corazón en la barra superior
const openFavoritesModalButton = document.getElementById('open-favorites-modal-button'); // Botón "Favoritos" en el menú de usuario
const favoritesModal = document.getElementById('favorites-modal'); // El modal de favoritos
const favoriteProductsContainer = document.getElementById('favorite-products-container'); // Contenedor dentro del modal
const noFavoritesMessage = document.getElementById('no-favorites-message'); // Mensaje si no hay favoritos

// --- Variables de Estado ---
let currentUser = null;
let products = []; // Array para almacenar todos los productos
let favoriteProducts = []; // Array para almacenar los IDs de productos favoritos

// --- Datos de Productos (simulados) ---
const localProducts = [
    {
        id: 1,
        name: 'Laptop Ultraligera',
        description: 'Potente y portátil, ideal para trabajo y estudio.',
        imageUrl: 'https://placehold.co/400x300/8DD8FF/000?text=Laptop+Ultraligera',
        price: 999.99,
        category: 'Electrónica'
    },
    {
        id: 2,
        name: 'Auriculares Inalámbricos',
        description: 'Sonido de alta fidelidad y cancelación de ruido activa.',
        imageUrl: 'https://placehold.co/400x300/4E71FF/fff?text=Auriculares+Inalámbricos',
        price: 149.50,
        category: 'Electrónica'
    },
    {
        id: 3,
        name: 'Reloj Inteligente',
        description: 'Monitoriza tu actividad física y recibe notificaciones.',
        imageUrl: 'https://placehold.co/400x300/5409DA/fff?text=Reloj+Inteligente',
        price: 79.00,
        category: 'Electrónica'
    },
    {
        id: 4,
        name: 'Teclado Mecánico',
        description: 'Experiencia de escritura táctil y duradera.',
        imageUrl: 'https://placehold.co/400x300/BBFBFF/000?text=Teclado+Mecánico',
        price: 85.75,
        category: 'Accesorios'
    },
    {
        id: 5,
        name: 'Monitor Curvo 27"',
        description: 'Inmersión total para juegos y productividad.',
        imageUrl: 'https://placehold.co/400x300/F2F2F2/333?text=Monitor+Curvo',
        price: 299.00,
        category: 'Electrónica'
    },
    {
        id: 6,
        name: 'Ratón Gaming RGB',
        description: 'Precisión y estilo para tus sesiones de juego.',
        imageUrl: 'https://placehold.co/400x300/EAE4D5/555?text=Ratón+Gaming',
        price: 45.00,
        category: 'Accesorios'
    },
    {
        id: 7,
        name: 'Smartphone Última Generación',
        description: 'Cámara increíble, rendimiento superior.',
        imageUrl: 'https://placehold.co/400x300/8DD8FF/000?text=Smartphone+Pro',
        price: 799.00,
        category: 'Electrónica'
    },
    {
        id: 8,
        name: 'Tableta Gráfica Profesional',
        description: 'Ideal para artistas digitales y diseñadores.',
        imageUrl: 'https://placehold.co/400x300/4E71FF/fff?text=Tableta+Gráfica',
        price: 350.00,
        category: 'Accesorios'
    },
    {
        id: 9,
        name: 'Altavoz Bluetooth Portátil',
        description: 'Sonido potente en cualquier lugar, resistente al agua.',
        imageUrl: 'https://placehold.co/400x300/5409DA/fff?text=Altavoz+Bluetooth',
        price: 65.00,
        category: 'Electrónica'
    },
    {
        id: 10,
        name: 'Cámara Mirrorless 4K',
        description: 'Captura momentos con calidad profesional.',
        imageUrl: 'https://placehold.co/400x300/BBFBFF/000?text=Cámara+4K',
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
    // Asegurarse de que la barra de notificación existe o crearla
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
        // Mostrar icono de favoritos solo si hay usuario logueado
        favoritesIcon.style.display = 'inline-block';
        // Actualizar el estado del icono de favoritos en la barra superior
        if (favoriteProducts.length > 0) {
            favoritesIcon.classList.add('active');
        } else {
            favoritesIcon.classList.remove('active');
        }
    } else {
        userDisplay.style.display = 'none';
        authButtons.style.display = 'flex';
        // Ocultar icono de favoritos si no hay usuario logueado
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
    // También borrar favoritos al cerrar sesión
    favoriteProducts = [];
    saveFavorites(); // Guardar el array de favoritos vacío
    updateTopBar();
    showModal(loginRegisterModal); // Muestra el modal de login al cerrar sesión
};

// --- Manejo de la Lógica de Favoritos ---

// Función para guardar los favoritos en localStorage
const saveFavorites = () => {
    // Guardamos solo los IDs de los productos favoritos
    localStorage.setItem('favoriteProducts', JSON.stringify(favoriteProducts));
};

// Función para cargar los favoritos desde localStorage
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

// Función para renderizar un solo producto en el contenedor de favoritos (o en la lista principal)
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
        event.stopPropagation(); // Evita que el clic se propague si la tarjeta fuera un enlace
        toggleFavorite(product.id);

        // Si estamos en la vista de favoritos, re-renderizar la lista
        if (isFavoriteView) {
            renderFavoriteProducts();
        } else {
            // Si estamos en la vista principal, solo actualiza el botón en la tarjeta
            favoriteButton.classList.toggle('active');
        }
        updateTopBar(); // Para actualizar el color del icono de favoritos en la barra superior
    });

    // Ocultar botón de añadir al carrito si estamos en el modal de favoritos, si lo deseas
    // if (isFavoriteView) {
    //     productCard.querySelector('.add-to-cart-button').style.display = 'none';
    // }

    return productCard;
};


// Función para añadir/quitar un producto de favoritos
const toggleFavorite = (productId) => {
    const index = favoriteProducts.indexOf(productId);
    if (index > -1) {
        // Ya es favorito, lo quitamos
        favoriteProducts.splice(index, 1);
        showNotification('Producto eliminado de favoritos.', 2000);
    } else {
        // No es favorito, lo añadimos
        favoriteProducts.push(productId);
        showNotification('Producto añadido a favoritos.', 2000);
    }
    saveFavorites(); // Guarda los cambios
    // Re-renderiza los productos en la vista principal para actualizar el estado del corazón
    renderProducts(products);
};


// Renderiza los productos en el modal de favoritos
const renderFavoriteProducts = () => {
    favoriteProductsContainer.innerHTML = ''; // Limpiar el contenedor
    const currentFavorites = products.filter(product => favoriteProducts.includes(product.id));

    if (currentFavorites.length === 0) {
        noFavoritesMessage.style.display = 'block';
        favoritesIcon.classList.remove('active'); // Quitar color si no hay favoritos
    } else {
        noFavoritesMessage.style.display = 'none';
        currentFavorites.forEach(product => {
            // Aseguramos que la tarjeta de favorito muestre el corazón activo
            const productCard = createProductCard(product, true); // Pasar true para isFavoriteView
            favoriteProductsContainer.appendChild(productCard);
        });
        favoritesIcon.classList.add('active'); // Poner color si hay favoritos
    }
};

// --- Funciones principales ---
const fetchProducts = async () => {
    showLoading();
    try {
        // Simulamos una carga de datos
        await new Promise(resolve => setTimeout(resolve, 500));
        products = localProducts; // Asignamos los productos locales

        renderProducts(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        showNotification('Error al cargar los productos.', 3000);
    } finally {
        hideLoading();
    }
};

const renderProducts = (productsToRender) => {
    productsContainer.innerHTML = ''; // Limpiar productos existentes
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
    // Ocultar todas las secciones principales
    productListElement.classList.remove('visible');
    myAccountSection.classList.remove('visible');
    // Asegurar que los modals se ocultan también cuando se cambia de sección
    hideModal(favoritesModal); 
    hideModal(userMenuModal);
    hideModal(loginRegisterModal);

    productListElement.style.display = 'none';
    myAccountSection.style.display = 'none';

    // Mostrar la sección deseada
    sectionElement.classList.add('visible');
    if (sectionElement === productListElement) {
        sectionElement.style.display = 'grid'; // product-list es una cuadrícula
    } else {
        sectionElement.style.display = 'flex'; // my-account-section es flex
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

    // Simulación de login exitoso
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

    // Simulación de registro exitoso
    await new Promise(resolve => setTimeout(resolve, 1000));
    currentUser = {
        username: username,
        email: email,
        lastLogin: new Date().toLocaleString()
    };
    saveCurrentUser(currentUser);
    showNotification('Registro exitoso! Has iniciado sesión.', 3000);
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
    }, 1000); // Simula el tiempo de cierre de sesión
});

// Implementación simulada de login con Google/Facebook/Apple (como se discutió en la respuesta anterior)
googleLoginButton.addEventListener('click', async () => {
    showNotification('Iniciando sesión con Google (simulado)...', 2000);
    showLoading();
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simula tiempo de espera
    currentUser = { username: 'Usuario Google', email: 'google_user@example.com', lastLogin: new Date().toLocaleString() };
    saveCurrentUser(currentUser);
    showNotification(`Bienvenido, ${currentUser.username}! (Google)`, 3000);
    hideModal(loginRegisterModal);
    hideLoading();
});

facebookLoginButton.addEventListener('click', async () => {
    showNotification('Iniciando sesión con Facebook (simulado)...', 2000);
    showLoading();
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simula tiempo de espera
    currentUser = { username: 'Usuario Facebook', email: 'facebook_user@example.com', lastLogin: new Date().toLocaleString() };
    saveCurrentUser(currentUser);
    showNotification(`Bienvenido, ${currentUser.username}! (Facebook)`, 3000);
    hideModal(loginRegisterModal);
    // updateTopBar(); // Ya se llama en saveCurrentUser
    hideLoading();
});

appleLoginButton.addEventListener('click', async () => {
    showNotification('Iniciando sesión con Apple (simulado)...', 2000);
    showLoading();
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simula tiempo de espera
    currentUser = { username: 'Usuario Apple', email: 'apple_user@example.com', lastLogin: new Date().toLocaleString() };
    saveCurrentUser(currentUser);
    showNotification(`Bienvenido, ${currentUser.username}! (Apple)`, 3000);
    hideModal(loginRegisterModal);
    // updateTopBar(); // Ya se llama en saveCurrentUser
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

// NUEVOS LISTENERS PARA FAVORITOS
favoritesIcon.addEventListener('click', () => {
    if (currentUser) {
        showModal(favoritesModal);
        renderFavoriteProducts(); // Renderiza los productos favoritos al abrir el modal
    } else {
        showNotification('Debes iniciar sesión para ver tus favoritos.', 3000);
        showModal(loginRegisterModal);
    }
});

openFavoritesModalButton.addEventListener('click', (event) => {
    event.preventDefault(); // Previene el comportamiento predeterminado del enlace
    hideModal(userMenuModal); // Cierra el menú de usuario
    if (currentUser) {
        showModal(favoritesModal);
        renderFavoriteProducts(); // Renderiza los productos favoritos al abrir el modal
    } else {
        showNotification('Debes iniciar sesión para ver tus favoritos.', 3000);
        showModal(loginRegisterModal);
    }
});

favoritesModal.addEventListener('click', (event) => {
    // Solo cierra el modal si se hace clic directamente en el fondo oscuro
    if (event.target === favoritesModal) {
        hideModal(favoritesModal);
    }
});

// --- Inicialización al cargar el DOM ---
document.addEventListener('DOMContentLoaded', () => {
    loadFavorites(); // Carga los favoritos al inicio
    fetchProducts();
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
        currentUser = JSON.parse(storedUser);
    }
    updateTopBar(); // Actualiza la barra superior y el estado del icono de favoritos
    // Asegurarse de que el spinner se oculte si ya hay usuario logueado al cargar
    hideLoading();
});

// Si la barra de notificación no existe en el HTML, la creamos dinámicamente
// Esto es una mejora para asegurar que showNotification siempre funcione
// aunque ya la tengas en el HTML.
if (!document.getElementById('notification-bar')) {
    const notificationBarElement = document.createElement('div');
    notificationBarElement.id = 'notification-bar';
    document.body.appendChild(notificationBarElement);
}