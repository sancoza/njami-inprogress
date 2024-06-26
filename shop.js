document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { id: 1, name: 'Bedzevi protiv komaraca', category: 'accessories', price: 450, img: './img/shop/bedzevi protiv komaraca.JPG' },
        { id: 2, name: 'Duksić za pse meda', category: 'clothes', price: 800, img: './img/shop/duksić-za-pse-meda.JPG' },
        { id: 3, name: 'Fudbal loptica', category: 'toys', price: 300, img: 'img/shop/fudbal-loptica.JPG' },
        { id: 4, name: 'Igračka kečap', category: 'toys', price: 400, img: 'img/shop/igračkica-kečap.JPG' },
        { id: 5, name: 'Igračka novine', category: 'toys', price: 250, img: 'img/shop/igračkica-novine.JPG' },
        { id: 6, name: 'Loptica za zubiće', category: 'toys', price: 400, img: 'img/shop/loptica-za-interakciju.JPG' },
        { id: 7, name: 'Plišana loptica sa zvoncem', category: 'toys', price: 500, img: 'img/shop/plišana-loptica-sa-zvoncem.JPG' },
        { id: 8, name: 'Plišana igračkica kokoška', category: 'toys', price: 500, img: 'img/shop/Plush-Dog-Toy-Chicken.JPG' },
        { id: 9, name: 'Pojas za kola', category: 'accessories', price: 300, img: 'img/shop/pojas-za-kola.JPG' },
        { id: 10, name: 'Ragbi loptica', category: 'toys', price: 300, img: 'img/shop/ragbi-loptica.JPG' },
        { id: 11, name: 'Čistač dlaka', category: 'accessories', price: 500, img: 'img/shop/roler za dlake.JPG' },
        { id: 12, name: 'DUNKIN™ Crinkle Bag + Donut', category: 'toys', price: 15.00, img: 'images/toy1.jpg' },
        { id: 13, name: 'Convoluted Cactus', category: 'toys', price: 14.00, img: 'images/toy2.jpg' },
        { id: 14, name: 'Squeaky Lion', category: 'toys', price: 12.00, img: 'images/toy3.jpg' },
        { id: 15, name: 'Wiggly Worm', category: 'toys', price: 10.00, img: 'images/toy4.jpg' },
        { id: 16, name: 'Chewy Donut', category: 'silicon-mold', price: 8.00, img: 'images/toy5.jpg' }
    ];

    const itemsPerPage = 8;
    let currentPage = 1;
    let filteredProducts = products;

    const productGrid = document.getElementById('product-grid');
    const pagination = document.getElementById('pagination');
    const categoryLinks = document.querySelectorAll('.category-link');

    categoryLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const category = event.target.dataset.category;
            filterProducts(category);
        });
    });

    function filterProducts(category) {
        currentPage = 1;
        filteredProducts = category === 'all' ? products : products.filter(product => product.category === category);
        updateDisplay();
    }

    function displayProducts(page) {
        productGrid.innerHTML = '';
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const pageProducts = filteredProducts.slice(start, end);

        pageProducts.forEach(product => {
            const productItem = document.createElement('a');
            productItem.href = 'product-detail.html';
            productItem.className = 'product-item';
            productItem.innerHTML = `
                <img src="${product.img}" alt="${product.name}">
                <p class="product-name">${product.name}</p>
                <p class="product-price">${product.price.toFixed(2)} din.</p>
            `;
            productGrid.appendChild(productItem);
        });
    }

    function displayPagination() {
        pagination.innerHTML = '';

        const prevLink = document.createElement('a');
        prevLink.href = '#';
        prevLink.className = 'prev';
        prevLink.textContent = '« Previous';
        prevLink.addEventListener('click', (event) => {
            event.preventDefault();
            if (currentPage > 1) {
                currentPage--;
                updateDisplay();
            }
        });
        pagination.appendChild(prevLink);

        for (let i = 1; i <= Math.ceil(filteredProducts.length / itemsPerPage); i++) {
            const pageLink = document.createElement('a');
            pageLink.href = '#';
            pageLink.textContent = i;
            pageLink.className = i === currentPage ? 'active' : '';
            pageLink.addEventListener('click', (event) => {
                event.preventDefault();
                currentPage = i;
                updateDisplay();
            });
            pagination.appendChild(pageLink);
        }

        const nextLink = document.createElement('a');
        nextLink.href = '#';
        nextLink.className = 'next';
        nextLink.textContent = 'Next »';
        nextLink.addEventListener('click', (event) => {
            event.preventDefault();
            if (currentPage < Math.ceil(filteredProducts.length / itemsPerPage)) {
                currentPage++;
                updateDisplay();
            }
        });
        pagination.appendChild(nextLink);
    }

    function updateDisplay() {
        displayProducts(currentPage);
        displayPagination();
    }

    updateDisplay();
});
