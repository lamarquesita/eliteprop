document.addEventListener('DOMContentLoaded', () => {
  // ====== NAVIGATION ======
  const nav = document.querySelector('.nav-outer');
  const closeBtn = document.querySelector('.close-btn');
  const navToggleBtn = document.querySelector('.mobile-nav-toggler');
  const stickyNav = document.querySelector('.main-box');
  const logoImg = document.querySelector('.logo-box img');
  const navTogglerIcon = navToggleBtn.querySelector('svg');
  const navLinks = document.querySelector('.navigation');

  navToggleBtn.addEventListener('click', () => {
    nav.classList.toggle('hidden');
  });

  closeBtn.addEventListener('click', () => {
    nav.classList.add('hidden');
  });

  window.addEventListener('scroll', () => {
    const isScrolled = window.pageYOffset > stickyNav.offsetHeight;

    stickyNav.classList.toggle('bg-gray-100', isScrolled);
    stickyNav.classList.toggle('top-0', isScrolled);

    logoImg.src = isScrolled ? 'images/logo.png' : 'images/logo_negative.webp';

    navTogglerIcon.classList.toggle('fill-gray-100', !isScrolled);
    navTogglerIcon.classList.toggle('fill-dark-300', isScrolled);

    navLinks.classList.toggle('xl:text-gray-100', !isScrolled);
  });
});

// ====== ACCORDION BOX ======

document.addEventListener('DOMContentLoaded', () => {
  const accountBox = document.querySelector('.account-faq.accordion-box');
  const generalBox = document.querySelector('.general-faq.accordion-box');
  const generalBtn = document.querySelector('.general-btn');
  const accountBtn = document.querySelector('.account-btn');

  const activeTab = localStorage.getItem('activeTab') || 'account';
  showTab(activeTab);

  function showTab(tabName) {
    const isGeneral = tabName === 'general';

    generalBox.classList.toggle('hidden', !isGeneral);
    accountBox.classList.toggle('hidden', isGeneral);

    generalBtn.classList.toggle('text-primary-300', isGeneral);
    generalBtn.classList.toggle('border-b-3', isGeneral);
    generalBtn.classList.toggle('border-primary-300', isGeneral);

    accountBtn.classList.toggle('text-primary-300', !isGeneral);
    accountBtn.classList.toggle('border-b-3', !isGeneral);
    accountBtn.classList.toggle('border-primary-300', !isGeneral);

    localStorage.setItem('activeTab', tabName);
    setupAccordions(tabName);
  }

  function setupAccordions(tabName) {
    const container = document.querySelector(tabName === 'general' ? '.general-faq' : '.account-faq');
    const accordions = container.querySelectorAll('.accordion');

    const activeIndex = parseInt(localStorage.getItem(`accordionState_${tabName}`) || '0');

    accordions.forEach((accordion, index) => {
      const btn = accordion.querySelector('.acc-btn');
      const content = accordion.querySelector('.acc-content');
      const icon = btn.querySelector('svg');

      const isActive = index === activeIndex;
      btn.classList.toggle('active', isActive);
      content.classList.toggle('hidden', !isActive);
      icon?.classList.toggle('rotate', isActive);

      btn.onclick = () => {
        const wasActive = btn.classList.contains('active');

        accordions.forEach((acc) => {
          const accBtn = acc.querySelector('.acc-btn');
          const accContent = acc.querySelector('.acc-content');
          const accIcon = accBtn.querySelector('svg');

          accBtn.classList.remove('active');
          accContent.classList.add('hidden');
          accIcon?.classList.remove('rotate');
        });

        const targetIndex = wasActive ? 0 : index;
        const targetAccordion = accordions[targetIndex];
        const targetBtn = targetAccordion.querySelector('.acc-btn');
        const targetContent = targetAccordion.querySelector('.acc-content');
        const targetIcon = targetBtn.querySelector('svg');

        targetBtn.classList.add('active');
        targetContent.classList.remove('hidden');
        targetIcon?.classList.add('rotate');

        localStorage.setItem(`accordionState_${tabName}`, targetIndex.toString());
      };
    });
  }

  generalBtn.onclick = () => showTab('general');
  accountBtn.onclick = () => showTab('account');
});

// ====== SLIDER ======

document.addEventListener('DOMContentLoaded', () => {
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  const progressMarker = document.querySelector('.progress-marker');
  const listItems = document.querySelectorAll('.swiper-container li');
  const progressBar = document.querySelector('.progress-bar');
  const servCards = document.querySelectorAll('.service-block');
  const closeBtns = document.querySelectorAll('.close-btn');
  const totalItems = listItems.length;
  let currentIndex = 0;
  let activeIndex = 0;
  let isCardOpen = true;

  const getItemsToShow = () => {
    return window.innerWidth >= 640 ? 4 : 2;
  };

  closeBtns.forEach((closeBtn) => {
    closeBtn.addEventListener('click', () => {
      isCardOpen = false;

      progressBar.classList.add('hidden');
      servCards.forEach((card) => {
        card.classList.remove('block');
        card.classList.add('hidden');
      });
      listItems.forEach((item) => {
        item.classList.remove('bg-info-100', 'text-primary-300', 'rounded-xl');
      });
    });
  });

  const updateActiveState = () => {
    listItems.forEach((item, index) => {
      const servCard = servCards[index];

      item.classList.remove('bg-info-100', 'text-primary-300', 'rounded-xl');
      if (servCard) {
        servCard.classList.remove('block');
        servCard.classList.add('hidden');
      }

      if (isCardOpen && index === activeIndex) {
        item.classList.add('bg-info-100', 'text-primary-300', 'rounded-xl');
        if (servCard) {
          servCard.classList.remove('hidden');
          servCard.classList.add('block');
        }
      }
    });
  };

  const updateItems = () => {
    const itemsToShow = getItemsToShow();
    listItems.forEach((item) => (item.style.display = 'none'));

    for (let i = 0; i < itemsToShow; i++) {
      const itemIndex = currentIndex + i;
      if (itemIndex < totalItems) {
        listItems[itemIndex].style.display = 'flex';
      }
    }

    updateBtnVisibility();
    updateProgressMarker();
    updateActiveState();
  };

  const updateBtnVisibility = () => {
    const itemsToShow = getItemsToShow();
    prevBtn.style.visibility = currentIndex === 0 ? 'hidden' : 'visible';
    nextBtn.style.visibility = currentIndex + itemsToShow >= totalItems ? 'hidden' : 'visible';
  };

  const updateProgressMarker = (direction = 'next') => {
    if (listItems.length === 0) return;

    let targetItem;

    if (direction === 'prev') {
      const itemsToShow = getItemsToShow();
      if (itemsToShow >= 4) {
        const lastItemIndex = currentIndex + itemsToShow - 1;
        targetItem = lastItemIndex < totalItems ? listItems[lastItemIndex] : listItems[currentIndex];
      } else {
        const secondItemIndex = currentIndex + 1;
        targetItem = secondItemIndex < totalItems ? listItems[secondItemIndex] : listItems[currentIndex];
      }
    } else {
      targetItem = listItems[currentIndex];
    }

    if (!targetItem) return;

    const progressBarRect = progressBar.getBoundingClientRect();
    const itemRect = targetItem.getBoundingClientRect();

    const itemCenterX = itemRect.left + itemRect.width / 2;
    const progressBarLeft = progressBarRect.left;
    const relativePosition = itemCenterX - progressBarLeft;

    const markerWidth = progressMarker.clientWidth || 39;
    const markerPosition = relativePosition - markerWidth / 2;

    progressMarker.style.left = `${Math.max(0, markerPosition)}px`;
  };

  prevBtn.addEventListener('click', () => {
    const itemsToShow = getItemsToShow();
    if (currentIndex > 0) {
      currentIndex = Math.max(0, currentIndex - itemsToShow);

      activeIndex = currentIndex + itemsToShow - 1;

      updateItems();

      setTimeout(() => {
        updateProgressMarker('prev');
      }, 10);
    }
  });
  nextBtn.addEventListener('click', () => {
    const itemsToShow = getItemsToShow();
    if (currentIndex + itemsToShow < totalItems) {
      currentIndex = Math.min(totalItems - itemsToShow, currentIndex + itemsToShow);

      activeIndex = currentIndex;

      updateItems();

      setTimeout(() => {
        updateProgressMarker('next');
      }, 10);
    }
  });
  listItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      if (item.style.display !== 'none') {
        isCardOpen = true;

        progressBar.classList.remove('hidden');
        servCards.forEach((card) => {
          card.classList.remove('hidden');
        });

        const itemsToShow = getItemsToShow();
        const setIndex = Math.floor(index / itemsToShow) * itemsToShow;
        currentIndex = setIndex;
        activeIndex = index;

        updateActiveState();

        setTimeout(() => {
          const progressBarRect = progressBar.getBoundingClientRect();
          const itemRect = item.getBoundingClientRect();
          const itemCenterX = itemRect.left + itemRect.width / 2;
          const progressBarLeft = progressBarRect.left;
          const relativePosition = itemCenterX - progressBarLeft;
          const markerWidth = progressMarker.clientWidth || 39;
          const markerPosition = relativePosition - markerWidth / 2;

          progressMarker.style.left = `${Math.max(0, markerPosition)}px`;
        }, 10);
      }
    });
  });

  window.addEventListener('resize', () => {
    const itemsToShow = getItemsToShow();
    currentIndex = Math.floor(currentIndex / itemsToShow) * itemsToShow;
    updateItems();
  });

  updateItems();
});
