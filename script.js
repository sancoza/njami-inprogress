document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.getElementById('menu-toggle');
  const menu = document.querySelector('.menu');

  menuToggle.addEventListener('click', function () {
    menu.classList.toggle('active');
    menuToggle.classList.toggle('change');
  });
});

document.addEventListener('mousemove', function (event) {
  const mouseMoveElements = document.querySelectorAll('.mouse-move img');
  const mouseX = event.clientX;
  const mouseY = event.clientY;

  mouseMoveElements.forEach((element) => {
    const speed = element.getAttribute('data-speed');
    const x = (window.innerWidth - mouseX * speed) / 100;
    const y = (window.innerHeight - mouseY * speed) / 100;

    element.style.transform = `translate(${x}px, ${y}px)`;
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const newsPost = document.querySelector('.news');
  const video = document.getElementById('newsVideo');

  newsPost.addEventListener('mouseover', function () {
    video.play();
  });

  newsPost.addEventListener('mouseout', function () {
    video.pause();
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const blogsPerPage = 4;
  const blogs = document.querySelectorAll('.blog');
  const pagination = document.querySelector('.pagination');
  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  let currentPage = 1;

  function showPage(page) {
    const start = (page - 1) * blogsPerPage;
    const end = start + blogsPerPage;

    blogs.forEach((blog, index) => {
      if (index >= start && index < end) {
        blog.style.display = 'block';
      } else {
        blog.style.display = 'none';
      }
    });

    pagination.innerHTML = createPagination(page);
    currentPage = page;

    const pageNumbers = pagination.querySelectorAll('.page-number');
    pageNumbers.forEach((pageNumber) => {
      pageNumber.addEventListener('click', () => {
        showPage(parseInt(pageNumber.textContent));
      });
    });

    const prev = pagination.querySelector('.prev');
    const next = pagination.querySelector('.next');

    prev.addEventListener('click', () => {
      if (currentPage > 1) {
        showPage(currentPage - 1);
      }
    });

    next.addEventListener('click', () => {
      if (currentPage < totalPages) {
        showPage(currentPage + 1);
      }
    });
  }

  function createPagination(page) {
    let paginationHTML = '';
    if (page > 1) {
      paginationHTML += `<a href="#" class="prev">Previous</a>`;
    }

    if (page > 2) {
      paginationHTML += `<a href="#" class="page-number">1</a>`;
      if (page > 3) {
        paginationHTML += `<span>...</span>`;
      }
    }

    if (page > 1) {
      paginationHTML += `<a href="#" class="page-number">${page - 1}</a>`;
    }

    paginationHTML += `<a href="#" class="page-number active">${page}</a>`;

    if (page < totalPages) {
      paginationHTML += `<a href="#" class="page-number">${page + 1}</a>`;
    }

    if (page < totalPages - 1) {
      if (page < totalPages - 2) {
        paginationHTML += `<span>...</span>`;
      }
      paginationHTML += `<a href="#" class="page-number">${totalPages}</a>`;
    }

    if (page < totalPages) {
      paginationHTML += `<a href="#" class="next">Next</a>`;
    }

    return paginationHTML;
  }

  showPage(1);
});

let isScrolling;

window.addEventListener('scroll', () => {
  const items = document.querySelectorAll('.health .item');
  const scrollPosition = window.scrollY;

  items.forEach((item, index) => {
    const rotationDirection = index % 2 === 0 ? 1 : -1;
    const rotation = ((scrollPosition / 20) % 15) * rotationDirection;
    item.style.transform = `rotate(${rotation}deg)`;
  });

  // Clear the timeout if it's already set
  window.clearTimeout(isScrolling);

  // Set a timeout to run after scrolling ends
  isScrolling = setTimeout(() => {
    items.forEach((item) => {
      item.style.transform = `rotate(0deg)`;
    });
  }, 200); // Timeout in ms, adjust as necessary
});

document.addEventListener('DOMContentLoaded', function () {
  const menuLinks = document.querySelectorAll('#slider-menu .menu li a');
  const slider = document.querySelector('.slider');
  const slides = document.querySelectorAll('.slide');
  let activeSlide = 0;
  let sliderWidth = document.querySelector('.slider-container').offsetWidth;

  menuLinks.forEach((link) => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const slideIndex = parseInt(this.getAttribute('data-slide'));
      setActiveSlide(slideIndex);
    });
  });

  function setActiveSlide(index) {
    menuLinks[activeSlide].classList.remove('active');
    menuLinks[index].classList.add('active');
    activeSlide = index;

    const offset = -index * sliderWidth;
    gsap.to(slider, { x: offset, duration: 0.5 });
  }

  setActiveSlide(0); // Set the first slide as active on page load

  // Initialize Draggable
  Draggable.create(slider, {
    type: 'x',
    edgeResistance: 0.65,
    bounds: { minX: -(slides.length - 1) * sliderWidth, maxX: 0 },
    throwProps: true,
    onDragEnd: function () {
      const index = Math.round(this.x / -sliderWidth);
      setActiveSlide(index);
    },
  });

  window.addEventListener('resize', function () {
    sliderWidth = document.querySelector('.slider-container').offsetWidth;
    setActiveSlide(activeSlide);
  });
});

function playVideo(btn) {
  const video = btn.parentElement.querySelector('.video');
  btn.style.display = 'none'; // Hide the play button when the video is playing
  video.play();
  video.volume = 0.3; // Set volume to 50%
}

document.querySelectorAll('.video').forEach((video) => {
  video.addEventListener('click', function () {
    if (!this.paused) {
      this.pause();
      this.parentElement.querySelector('.play-pause-btn').style.display =
        'flex';
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('myModal');
  const closeBtn = document.querySelector('.close');
  const heroCircles = document.querySelectorAll('.hero__circle');
  const videoTitle = document.getElementById('videoTitle');
  let lastFocusedElement;

  heroCircles.forEach((circle) => {
    circle.addEventListener('click', (event) => {
      const videoUrl = circle.getAttribute('data-video-src');
      const titleText = circle.querySelector('img').alt; // Using alt text as video title
      if (videoUrl) {
        lastFocusedElement = document.activeElement;
        const videoElement = createVideoElement(videoUrl); // Create video element dynamically
        modal.appendChild(videoElement);
        modal.style.display = 'flex';
        videoTitle.textContent = titleText;
        videoElement.play();
        closeBtn.focus(); // Move focus to the close button
      }
    });
  });

  closeBtn.addEventListener('click', () => {
    closeModal();
  });

  window.addEventListener('click', (event) => {
    if (event.target == modal) {
      closeModal();
    }
  });

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.style.display === 'flex') {
      closeModal();
    }
    if (event.key === 'Tab' && modal.style.display === 'flex') {
      // Trap focus inside the modal
      trapFocus(event);
    }
  });

  function closeModal() {
    const videoElement = modal.querySelector('video');
    if (videoElement) {
      videoElement.pause();
      videoElement.remove(); // Remove video element from modal
    }
    modal.style.display = 'none';
    lastFocusedElement.focus(); // Return focus to the last focused element
  }

  function trapFocus(event) {
    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey) {
      // If Shift + Tab
      if (document.activeElement === firstElement) {
        lastElement.focus();
        event.preventDefault();
      }
    } else {
      // If Tab
      if (document.activeElement === lastElement) {
        firstElement.focus();
        event.preventDefault();
      }
    }
  }

  function createVideoElement(src) {
    const videoElement = document.createElement('video');
    videoElement.classList.add('modal-content');
    videoElement.setAttribute('controls', '');
    const sourceElement = document.createElement('source');
    sourceElement.setAttribute('src', src);
    sourceElement.setAttribute('type', 'video/mp4');
    videoElement.appendChild(sourceElement);
    return videoElement;
  }
});



document.addEventListener('DOMContentLoaded', function() {
  const navMenuItems = document.querySelectorAll('nav ul li a');

  function setNavActiveClass() {
      // Remove 'nav-active' class from all items
      navMenuItems.forEach(menuItem => menuItem.parentNode.classList.remove('nav-active'));

      // Get the path from localStorage
      const activeNavPath = localStorage.getItem('activeNavMenuItem');
      console.log('Active Nav Path from localStorage:', activeNavPath);

      // Set the 'nav-active' class based on the path in localStorage
      if (activeNavPath) {
          navMenuItems.forEach(item => {
              console.log('Item href:', item.getAttribute('href'));
              if (item.getAttribute('href') === activeNavPath) {
                  item.parentNode.classList.add('nav-active');
                  console.log('nav-active class added to:', item.getAttribute('href'));
              }
          });
      }
  }

  function addNavClickEvent() {
      navMenuItems.forEach(item => {
          item.addEventListener('click', function(event) {
              // Prevent the default action to ensure the script runs before navigating
              event.preventDefault();
              // Store the clicked item's path in localStorage
              localStorage.setItem('activeNavMenuItem', this.getAttribute('href'));
              console.log('Active Nav MenuItem set to localStorage:', this.getAttribute('href'));

              // Navigate to the clicked item's href
              window.location.href = this.getAttribute('href');
          });
      });
  }

  // Add event listeners and set nav-active class on page load for nav menu
  addNavClickEvent();
  setNavActiveClass();
});

// comments
const comments = [
  {
      name: "Marina",
      date: "Yesterday",
      stars: 5,
      text: "Moj pas obožava parizer,  ovo je najbolji!! 🐶!!",
      
  },
  {
      name: "Zoran",
      date: "6 days ago",
      stars: 5,
      text: "Mrvica jako voli juneću salamu. S obzirom da je elergična na piletinu ova poslastica u obliku salamice je najbolja.",
      
  },
  {
      name: "Sonja",
      date: "3 weeks ago",
      stars: 5,
      text: "Isprobali smo sva tri receptića. Ne morate biti master kuvar da bi ih spremili.",
      
  },
  // Add more comments as needed
];

let commentsToShow = 5;

function renderComments() {
  const container = document.getElementById('comments-container');
  container.innerHTML = '';
  for (let i = 0; i < commentsToShow && i < comments.length; i++) {
      const comment = comments[i];
      container.innerHTML += `
          <div class="comment">
              <div class="name">${comment.name}</div>
              <div class="date">${comment.date}</div>
              <div class="stars">${'★'.repeat(comment.stars)}</div>
              <div class="text">${comment.text}</div>
              
          </div>
      `;
  }
}

document.getElementById('see-more-btn').addEventListener('click', () => {
  commentsToShow += 5;
  renderComments();
});

renderComments();


document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('add-to-cart-form');
  
  form.addEventListener('submit', (event) => {
      event.preventDefault();
      
      const quantity = document.getElementById('quantity').value;
      const product = {
          id: 'dunkin-donut',
          name: 'DUNKIN™ Crinkle Bag + Donut',
          price: 15.00,
          quantity: parseInt(quantity)
      };
      
      addToCart(product);
      alert('Product added to cart!');
  });
  
  function addToCart(product) {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      
      const existingProductIndex = cart.findIndex(item => item.id === product.id);
      if (existingProductIndex !== -1) {
          cart[existingProductIndex].quantity += product.quantity;
      } else {
          cart.push(product);
      }
      
      localStorage.setItem('cart', JSON.stringify(cart));
  }
});