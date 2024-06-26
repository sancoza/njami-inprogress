document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { id: 1, name: 'DUNKIN™ Crinkle Bag + Donut', category: 'toys', price: 15.00, img: './img/shop/Plush-Dog-Toy-Chicken.JPG' },
        { id: 2, name: 'Convoluted Cactus', category: 'toys', price: 14.00, img: 'images/toy2.jpg' },
        { id: 3, name: 'Squeaky Lion', category: 'toys', price: 12.00, img: 'images/toy3.jpg' },
        { id: 4, name: 'Wiggly Worm', category: 'toys', price: 10.00, img: 'images/toy4.jpg' },
        { id: 5, name: 'Chewy Donut', category: 'toys', price: 8.00, img: 'images/toy5.jpg' },
        { id: 6, name: 'Bouncy Ball', category: 'toys', price: 6.00, img: 'images/toy6.jpg' },
        { id: 7, name: 'Squeaky Bone', category: 'toys', price: 5.00, img: 'images/toy7.jpg' },
        { id: 8, name: 'Rubber Duck', category: 'toys', price: 4.00, img: 'images/toy8.jpg' },
        { id: 9, name: 'Silicon Mold Example', category: 'silicon-mold', price: 7.00, img: 'images/toy2.jpg' },
        { id: 10, name: 'Fashionable Dog Clothes', category: 'clothes', price: 14.00, img: 'images/toy3.jpg' },
        { id: 11, name: 'Cute Accessories', category: 'accessories', price: 5.00, img: 'images/toy4.jpg' },
        { id: 12, name: 'DUNKIN™ Crinkle Bag + Donut', category: 'toys', price: 15.00, img: 'images/toy1.jpg' },
        { id: 13, name: 'Convoluted Cactus', category: 'toys', price: 14.00, img: 'images/toy2.jpg' },
        { id: 14, name: 'Squeaky Lion', category: 'toys', price: 12.00, img: 'images/toy3.jpg' },
        { id: 15, name: 'Wiggly Worm', category: 'toys', price: 10.00, img: 'images/toy4.jpg' },
        { id: 16, name: 'Chewy Donut', category: 'toys', price: 8.00, img: 'images/toy5.jpg' }
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
                <p class="product-price">$${product.price.toFixed(2)}</p>
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
