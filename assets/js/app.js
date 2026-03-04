(function () {
  'use strict';

  //menu fix mobile

  let vh = window.innerHeight * 0.01;
  // Then we set the value in the --vh custom property to the root of the document
  document.documentElement.style.setProperty('--vh', `${vh}px`);

  window.addEventListener('resize', () => {
    // We execute the same script as before
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  });

  // poppup

  $('.popup-frame').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false
  });

  $('.popup-img').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    mainClass: 'mfp-img-mobile',
    image: {
      verticalFit: true
    }

  });

  $('.popup').magnificPopup({
    type: 'inline',
    preloader: false,
    closeOnContentClick: false,
    fixedContentPos: true,
    mainClass: 'mfp-zoom-in',

    callbacks: {
      open: function () {

      },
    }
  });

  //

  svg4everybody();


  //table

  if ($('table.responsive').length > 0) {
    $('table.responsive').ngResponsiveTables();
  }

  $('.cab-box_drop .cab-box__head a').on('click', function (e) {
    e.preventDefault();
    let $target = $(this).parents('.cab-box_drop').find('.cab-box__drop');
    $(this).parents('.cab-box_drop').toggleClass('active');
    $target.slideToggle();

    const text1 = $(this).data('text1');
    const text2 = $(this).data('text2');

    $(this).find('span').text($(this).find('span').text() === text1 ? text2 : text1);
  });

  //tabs
  $('[data-tabs-btn]').click(function () {
    let tabsName = $(this).parent().attr('data-tabs-btns');
    let tabNo = $(this).attr('data-tabs-btn');
    let tabsWrapper = $('[data-tabs-wrapper=' + tabsName + ']');

    $(this).siblings().removeClass('active');
    $(this).addClass('active');

    tabsWrapper.children().each(function (i, item) {
      $(item).hide().removeClass('active');
      if ($(item).attr('data-tabs-item') === tabNo) {
        $(item).show().addClass('active');
      } else {
        $(item).removeClass('active')
      }
    });
  });

  function tabsInitialization() {
    let btns = $('[data-tabs-btns]');
    let wrapper = $('[data-tabs-wrapper]');
    $(wrapper).children().first().addClass('active')
    $(wrapper).children().not(function () {
      if ($(this).attr('data-tabs-item') === '1') {
        return true;
      }
    }).hide();

    $(btns).children().not(function () {
      if ($(this).attr('data-tabs-btn') === '1') {
        return false;
      } else {
        return true;
      }
    }).addClass('active');
  }

  tabsInitialization();

  //accordion

  var Accordion = function (el, multiple) {
    this.el = el || {};
    this.multiple = multiple || false;

    // Variables privadas
    var links = this.el.find('.accordion__head');
    // Evento
    links.on('click', { el: this.el, multiple: this.multiple }, this.dropdown)
  }

  Accordion.prototype.dropdown = function (e) {
    var $el = e.data.el,
      $this = $(this),
      $next = $this.next();

    $next.slideToggle();
    $this.parent().toggleClass('active');

    if (!e.data.multiple) {
      $el.find('.accordion__body').not($next).slideUp().parent().removeClass('active');
    };
  }

  var accordion = new Accordion($('.accordion'), false);

  //clipboard

  var affil = new Clipboard('.copy-text');

  function affiliatelink(id) {
    id.on('success', function (e) {

      $('.copy-success').fadeIn();
      $('.copy-success').delay(3000).fadeOut();
    });
  }

  affiliatelink(affil);

  $('.header-burger').on('click', function () {
    $(this).toggleClass('active');
    $('.mob-nav').toggleClass('active');
    $('.mob-nav').removeClass('mob-nav_lang')
  })

  $('.header-top .lang-btn, .cab-header .lang-btn').on('click', function () {
    $(this).parents('.lang').toggleClass('active');

    if (!$('.mob-nav').hasClass('active')) {
      $('.mob-nav').toggleClass('active')
      $('.header-burger').toggleClass('active')
    }
  })

  $('.mob-nav .lang').on('click', function () {
    $('.mob-nav').toggleClass('mob-nav_lang').removeClass('mob-nav_cur')
    $('.header-burger').removeClass('active');
  })

  $('.mob-nav__close').on('click', function () {
    $(this).parents('.mob-nav').removeClass('active mob-nav_lang mob-nav_cur');
  })

  $(document).on('mouseup', function (e) {
    let btn = $('.header .lang-btn');
    let modal = $('.header .lang-drop');

    if (!btn.is(e.target) && btn.has(e.target).length === 0 &&
      !modal.is(e.target) && modal.has(e.target).length === 0) {
      $('.header .lang').removeClass('active');
    }
  });

  $(document).on('mouseup', function (e) {
    let btn = $('.cab .lang-btn');
    let modal = $('.cab .lang-drop');

    if (!btn.is(e.target) && btn.has(e.target).length === 0 &&
      !modal.is(e.target) && modal.has(e.target).length === 0) {
      $('.cab .lang').removeClass('active');
    }
  });

  $('.lang-select__btn').on('click', function () {
    let $parent = $(this).closest('.lang-select');
    let $dropdown = $parent.find('.lang-select__drop');

    $parent.toggleClass('active');

    let dropdownOffset = $dropdown.offset();
    let dropdownHeight = $dropdown.outerHeight();
    let windowScrollTop = $(window).scrollTop();
    let windowHeight = $(window).height();
    let parentOffsetTop = $parent.offset().top;
    let spaceAbove = parentOffsetTop - windowScrollTop;
    let spaceBelow = windowHeight - (dropdownOffset.top - windowScrollTop);

    if (spaceBelow < dropdownHeight && spaceAbove > spaceBelow) {
      $parent.addClass('top');
    } else {
      $parent.removeClass('top');
    }
  })

  $(document).on('mouseup', function (e) {
    let btn = $('.lang-select__btn');
    let modal = $('.lang-select__drop');

    if (!btn.is(e.target) && btn.has(e.target).length === 0 &&
      !modal.is(e.target) && modal.has(e.target).length === 0) {
      $('.lang-select').removeClass('active');
      $('.lang-select').removeClass('top');
    }
  });

  if ($('.tip-trigger').length) {
    let tooltips = document.querySelectorAll('.tip-trigger');
    tooltips.forEach(item => {
      let temp = item.querySelector('.tip-wrap')

      tippy(item, {
        content: temp.innerHTML,
        maxWidth: 'none',
        allowHTML: true,
        placement: 'top',
        theme: 'e-estate',
        arrow: true,
        interactive: true,
        appendTo: () => document.body
      });
    })
  }

  if ($('#tel').length) {
    const inputTel = document.querySelector("#tel");

    intlTelInput(inputTel, {
      initialCountry: "gb",
      autoInsertDialCode: true,
      useFullscreenPopup: false,
      separateDialCode: true,
      formatOnDisplay: true,
      nationalMode: false,
      responsiveDropdown: true,
      // utilsScript: "assets/libs/intl-tel-input/js/utils.js",
      utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@25.10.6/build/js/utils.js",
      preferredCountries: [],
    });
  }

  if ($('#country').length) {
    $('#country').countrySelect({
      responsiveDropdown: true,
      defaultCountry: "us",
    });
  }

  // inputs pin

  $('#inputs-code input').on('input', function () {
    const input = $(this);
    const value = input.val().replace(/\D/g, '');
    input.val(value);

    if (value.length === 1) {
      input.next('input').focus();
    }
  });

  $('#inputs-code input').on('keydown', function (e) {
    const input = $(this);

    if (e.key === 'Backspace') {
      if (input.val() === '') {
        input.prev('input').focus();
      }
      else {
        input.val('');
        e.preventDefault();
      }
    }
  });

  $('.m-select__btn').on('click', function () {
    let $parent = $(this).closest('.m-select');
    let $dropdown = $parent.find('.m-select__drop');

    $parent.toggleClass('active');

    let dropdownOffset = $dropdown.offset();
    let dropdownHeight = $dropdown.outerHeight();
    let windowScrollTop = $(window).scrollTop();
    let windowHeight = $(window).height();
    let parentOffsetTop = $parent.offset().top;
    let spaceAbove = parentOffsetTop - windowScrollTop;
    let spaceBelow = windowHeight - (dropdownOffset.top - windowScrollTop);

    if (spaceBelow < dropdownHeight && spaceAbove > spaceBelow) {
      $parent.addClass('top');
    } else {
      $parent.removeClass('top');
    }
  })

  $(document).on('mouseup', function (e) {
    let btn = $('.m-select.active .m-select__btn');
    let modal = $('.m-select.active .m-select__drop');

    if (!btn.is(e.target) && btn.has(e.target).length === 0 &&
      !modal.is(e.target) && modal.has(e.target).length === 0) {
      $('.m-select').removeClass('active');
      $('.m-select').removeClass('top');
    }
  });

  if ($('.date-input').length) {
    $(".date-input").flatpickr({
      mode: "range",
      theme: 'light',
      disableMobile: true,
      dateFormat: 'd/m/y',
      showMonths: 1,
      monthSelectorType: 'static',
      locale: {
        firstDayOfWeek: 1 // Monday
      },
    });
  }

  if ($('.date-input-range').length) {
    $(".date-input-range").flatpickr({
      mode: "range",
      theme: 'light',
      disableMobile: true,
      dateFormat: 'd.m.y',
      showMonths: 2,
      monthSelectorType: 'static',
      locale: {
        firstDayOfWeek: 1 // Monday
      },
    });
  }


  $(".m-input_pass svg").on("click", function () {
    const $wrapper = $(this).closest(".m-input_pass");
    const $input = $wrapper.find("input");
    const $use = $(this).find("use");

    if ($input.attr("type") === "password") {
      $input.attr("type", "text");
      $use.attr("xlink:href", "assets/img/sprite.svg#eye");
    } else {
      $input.attr("type", "password");
      $use.attr("xlink:href", "assets/img/sprite.svg#eye-hide");
    }
  });

  if ($('.sect-17-tabs').length) {
    const tabs = document.querySelector('.sect-17-tabs');
    const tabBtns = tabs.querySelectorAll('.m-tabs__item');
    const tabItems = tabs.querySelectorAll('.sect-17-tabs__item');

    let activeIndex = 0;

    // ---- helpers ----
    function setActive(index) {
      activeIndex = index;

      tabBtns.forEach(b => b.classList.remove('active'));
      tabItems.forEach(i => i.classList.remove('active'));

      tabBtns[index].classList.add('active');

      const contentIndex = index >= tabItems.length
        ? tabItems.length - 1
        : index;

      tabItems[contentIndex].classList.add('active');
    }

    // ---- click ----
    tabBtns.forEach((btn, index) => {
      btn.addEventListener('click', () => setActive(index));
    });

    // ---- swipe ----
    let startX = 0;
    let endX = 0;

    tabs.addEventListener('touchstart', e => {
      startX = e.touches[0].clientX;
    });

    tabs.addEventListener('touchend', e => {
      endX = e.changedTouches[0].clientX;
      handleSwipe();
    });

    function handleSwipe() {
      const diff = startX - endX;
      const threshold = 50; 

      if (Math.abs(diff) < threshold) return;

      if (diff > 0 && activeIndex < tabBtns.length - 1) {
        setActive(activeIndex + 1);
      }

      if (diff < 0 && activeIndex > 0) {
        setActive(activeIndex - 1);
      }
    }
  }



  // sliders

  const sect2Slider1 = new Swiper('.sect-2-slider_1 .swiper', {
    loop: true,
    slidesPerView: 'auto',
    spaceBetween: 30,
    centeredSlides: true,
    speed: 10000,
    allowTouchMove: false,
    autoplay: {
      delay: 0,
      disableOnInteraction: true,
    },
  });

  const sect2Slider2 = new Swiper('.sect-2-slider_2 .swiper', {
    loop: true,
    slidesPerView: 'auto',
    spaceBetween: 30,
    speed: 10000,
    allowTouchMove: false,
    autoplay: {
      delay: 0,
      disableOnInteraction: true,
      reverseDirection: true,
    },
  });

  const sect2Slider3 = new Swiper('.sect-2-slider_3 .swiper', {
    loop: true,
    slidesPerView: 'auto',
    spaceBetween: 30,
    centeredSlides: true,
    speed: 10000,
    allowTouchMove: false,
    autoplay: {
      delay: 0,
      disableOnInteraction: true,
    },
  });

  const sect2Slider4 = new Swiper('.sect-2-slider_4 .swiper', {
    loop: true,
    slidesPerView: 'auto',
    spaceBetween: 30,
    centeredSlides: true,
    speed: 10000,
    allowTouchMove: false,
    autoplay: {
      delay: 0,
      disableOnInteraction: true,
      reverseDirection: true,
    },
  });


  if ($('.sect-5-slider').length) {
    let sect5Slider;

    function initSlider() {
      if (window.innerWidth >= 992) {
        sect5Slider = new Swiper(".sect-5-slider .swiper", {
          loop: true,
          slidesPerView: "auto",
          centeredSlides: true,
          direction: 'horizontal',
          effect: "coverflow",
          coverflowEffect: {
            rotate: 0,
            stretch: 230,
            scale: 0.8234,
            depth: 0,
            modifier: 1,
            slideShadows: false,
          },
          autoplay: {
            delay: 3000,
            disableOnInteraction: true,
          },
        });
      } else {
        sect5Slider = new Swiper(".sect-5-slider .swiper", {
          loop: true,
          slidesPerView: "auto",
          direction: 'vertical',
          centeredSlides: false,
          effect: 'coverflow',
          coverflowEffect: {
            rotate: 0,
            stretch: 200,
            scale: 0.9,
            depth: 0,
            modifier: 1,
            slideShadows: false,
          },
          autoplay: {
            delay: 3000,
            disableOnInteraction: true,
          },
        });
      }
    }

    initSlider();
    window.addEventListener('resize', () => {
      sect5Slider.destroy(true, true);
      initSlider();
    });
  }

  const sect7Slider = new Swiper(".sect-7-slider .swiper", {
    loop: true,
    slidesPerView: "auto",
    centeredSlides: false,
    direction: 'horizontal',
    effect: "coverflow",
    coverflowEffect: {
      rotate: 0,
      stretch: 340,
      scale: 0.85,
      depth: 0,
      modifier: 1,
      slideShadows: false,
    },
  });

  $('.sect-7 .m-tabs__item').on('click', function () {
    sect7Slider.slideTo($(this).index());
  })


  //charts

  if ($('#cab-bal-chart').length) {

    Highcharts.chart('cab-bal-chart', {
      chart: {
        type: 'areaspline',
        backgroundColor: 'transparent',
        spacing: [10, 0, 0, 0],
      },

      title: {
        text: ''
      },
      legend: {
        enabled: false,
      },
      xAxis: {
        categories: [
          '16:00', '16:05', '16:10', '16:15', '16:20',
          '16:25', '16:30', '16:35', '16:40', '16:45',
          '16:50', '16:55', '17:00', '17:05', '17:10',
          '17:15'
        ],
        lineWidth: 0,
        gridLineWidth: 0,
        minPadding: 0,
        maxPadding: 0,
        gridLineColor: '#fff',
        tickLength: 0,
        labels: {
          style: {
            color: '#F2F6F7',
            fontSize: '12px',
            fontWeight: 400,
          }
        },
      },
      yAxis: {
        lineWidth: 0,
        gridLineWidth: 1,
        gridLineColor: '#fff',
        title: {
          enabled: false
        },
        labels: {
          style: {
            color: '#F2F6F7',
            fontSize: '12px',
            fontWeight: 400,
          }
        },
      },
      plotOptions: {
        areaspline: {
          fillColor: {
            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
            stops: [
              [0, 'rgba(255, 255, 255, .8)'],
              [1, 'rgba(198, 134, 248, 0)']
            ]
          },
          marker: {
            enabled: true,
            radius: 0,
            symbol: 'circle',
            fillColor: '#fff',
            lineWidth: 4,
            lineColor: '#9C80F4',
            states: {
              hover: {
                enabled: false,
              }
            }
          },
          lineWidth: 3,
          lineColor: '#fff',
          states: {
            hover: {
              lineWidth: 2
            }
          },
          threshold: null
        }
      },
      series: [{
        name: 'Balance',
        data: [0, 100000, 200000, 500000, 600000, 900000, 1000000, 1400000, 1500000, 1100000, 1200000, 1300000, 300000, 700000, 800000, 400000,]
      }]
    });
  }

  const chartRefOptions = {
    chart: {
      type: 'solidgauge',
      backgroundColor: 'transparent',
      spacing: [15, 15, 15, 15],
    },
    title: null,
    pane: {
      center: ['50%', '85%'],
      size: '160%',
      startAngle: -90,
      endAngle: 90,
      background: {
        backgroundColor: '#52B5D0',
        borderColor: '#F1F4F9',
        borderRadius: 0,
        borderWidth: 15,
        innerRadius: '75%',
        outerRadius: '106%',
        shape: 'arc',
      }
    },

    exporting: {
      enabled: false
    },

    tooltip: {
      enabled: false
    },

    // the value axis
    yAxis: {
      stops: [
        [1, '#7354D3'],
      ],
      lineWidth: 0,
      tickWidth: 0,
      tickPositions: [0, 30000],
      minorTickInterval: null,
      tickAmount: 0,
      title: {
        y: -70
      },
      labels: {
        y: 30,
        distance: -10,
        format: '$ {value}',
        style: {
          fontSize: '14px',
          fontWeight: 500,
          color: '#000',
        }
      }
    },

    plotOptions: {
      solidgauge: {
        borderRadius: 0,
        innerRadius: "81%",
        borderWidth: 15,
        lineWidth: 0,
        dataLabels: {
          y: 5,
        }
      }
    }
  };

  if ($('#cab-ref-chart').length) {
    const chartRef = Highcharts.chart('cab-ref-chart', Highcharts.merge(chartRefOptions, {
      yAxis: {
        min: 0,
        max: 30000,
        title: {
          enabled: false
        }
      },
      series: [{
        name: '',
        data: [6998.64],
        dataLabels: {
          enabled: false
        },
      }]

    }));
  }

  if ($('#cab-ref-chart-empty').length) {
    const chartRef = Highcharts.chart('cab-ref-chart-empty', Highcharts.merge(chartRefOptions, {
      yAxis: {
        min: 0,
        max: 30000,
        title: {
          enabled: false
        }
      },
      pane: {
        background: {
          backgroundColor: '#fff',
        }
      },
      series: [{
        name: '',
        data: [0],
        dataLabels: {
          enabled: false
        },
      }]

    }));
  }


  if ($('#cab-tree').length) {
    const dataTree = [
      {
        id: 1,
        refId: null,
        lvl: 'L1',
        img: 'cab-tree-img-1.webp',
        name: 'Janvi El-Amin',
        nickName: 'selene485',
        valText: 'Investment amount',
        val: '$ 100',
      },
      {
        id: 2,
        refId: 1,
        lvl: 'L1',
        img: 'cab-tree-img-2.webp',
        name: 'Janvi El-Amin',
        nickName: 'selene485',
        valText: 'Investment',
        val: '$ 100,000',
      },
      {
        id: 3,
        refId: 2,
        lvl: 'L1',
        img: 'cab-tree-img-2.webp',
        name: 'Janvi El-Amin',
        nickName: 'selene485',
        valText: 'Investment',
        val: '$ 100,000',
      },
      {
        id: 4,
        refId: 1,
        lvl: 'L1',
        img: 'cab-tree-img-2.webp',
        name: 'Janvi El-Amin',
        nickName: 'selene485',
        valText: 'Investment',
        val: '$ 100,000',
      },
      {
        id: 5,
        refId: 4,
        lvl: 'L1',
        img: 'cab-tree-img-2.webp',
        name: 'Janvi El-Amin',
        nickName: 'selene485',
        valText: 'Investment',
        val: '$ 100,000',
      },
      {
        id: 6,
        refId: 4,
        lvl: 'L1',
        img: 'cab-tree-img-2.webp',
        name: 'Janvi El-Amin',
        nickName: 'selene485',
        valText: 'Investment',
        val: '$ 100,000',
      },
      {
        id: 7,
        refId: 4,
        lvl: 'L1',
        img: 'cab-tree-img-2.webp',
        name: 'Janvi El-Amin',
        nickName: 'selene485',
        valText: 'Investment',
        val: '$ 100,000',
      },
      {
        id: 8,
        refId: 4,
        lvl: 'L1',
        img: 'cab-tree-img-2.webp',
        name: 'Janvi El-Amin',
        nickName: 'selene485',
        valText: 'Investment',
        val: '$ 100,000',
      },
      {
        id: 9,
        refId: 1,
        lvl: 'L1',
        img: 'cab-tree-img-2.webp',
        name: 'Janvi El-Amin',
        nickName: 'selene485',
        valText: 'Investment',
        val: '$ 100,000',
      },
      {
        id: 10,
        refId: 9,
        lvl: 'L1',
        img: 'cab-tree-img-2.webp',
        name: 'Janvi El-Amin',
        nickName: 'selene485',
        valText: 'Investment',
        val: '$ 100,000',
      },
      {
        id: 11,
        refId: 9,
        lvl: 'L1',
        img: 'cab-tree-img-2.webp',
        name: 'Janvi El-Amin',
        nickName: 'selene485',
        valText: 'Investment',
        val: '$ 100,000',
      },
      {
        id: 12,
        refId: 9,
        lvl: 'L1',
        img: 'cab-tree-img-2.webp',
        name: 'Janvi El-Amin',
        nickName: 'selene485',
        valText: 'Investment',
        val: '$ 100,000',
      },
      {
        id: 13,
        refId: 9,
        lvl: 'L1',
        img: 'cab-tree-img-2.webp',
        name: 'Janvi El-Amin',
        nickName: 'selene485',
        valText: 'Investment',
        val: '$ 100,000',
      },
    ];

    const cabTree = new d3.OrgChart()
      .nodeId((dataItem) => dataItem.id)
      .parentNodeId((dataItem) => dataItem.refId)
      .nodeWidth(node => {
        return node.data.refId === null ? 356 : 186;
      })

      .nodeHeight(node => {
        return node.data.refId === null ? 197 : 186;
      })
      .buttonContent(({ node, state }) => {
        return `<div class="cab-tree-item__arrow">
          ${node.children
            ? `<svg>
                  <use xlink:href="assets/img/sprite.svg#minus"></use>
                </svg>`
            : `<span>${node.data._directSubordinates}</span>`
          }  </div>`;
      })
      .nodeContent((node) => {
        const isRoot = node.data.refId === null;
        const isActive = node.data._expanded === true;

        return `
          <div 
            class="cab-tree-item ${!isRoot ? 'cab-tree-item_2' : ''} ${!isActive ? 'active' : ''}"
            style="width:${node.width}px;
            height:${node.height}px"
          > 
            <div class="cab-tree-item__top">
              <div class="cab-tree-item__dots open-modal" data-modal="#cab-modal-5">
                <svg>
                  <use xlink:href="assets/img/sprite.svg#dots"></use>
                </svg>
              </div>
              <div class="cab-tree-item__img">
                <img src="assets/img/${node.data.img}" alt="heroImg">
                <span>${node.data.lvl}</span>
              </div>
              <h3>${node.data.name}</h3>
              <p>${node.data.nickName}</p>
            </div>
            
            <div class="cab-tree-item__footer">
              <h3>${node.data.valText}</h3>
              <p>${node.data.val}</p>
            </div>
          </div>
        `;
      })

      .container('#cab-tree')
      .data(dataTree)
      .render();

    cabTree.getChartState().zoomBehavior
      .filter((event) => event.type !== 'wheel');

    $('#cab-tree-plus').on('click', function () {
      cabTree.zoomIn();
    })
    $('#cab-tree-minus').on('click', function () {
      cabTree.zoomOut();
    })
  }

  $('.open-modal').on('click', function () {
    let targetModalId = $(this).data('modal');
    $(this).toggleClass('active');
    $('.open-modal').not(this).removeClass('active');
    $('.cab-modal').not(targetModalId).removeClass('active');
    $(targetModalId).toggleClass('active');
  })

  $(document).on('mouseup', function (e) {
    let btn = $('.open-modal');
    let modal = $('.cab-modal');

    if (!btn.is(e.target) && btn.has(e.target).length === 0 &&
      !modal.is(e.target) && modal.has(e.target).length === 0) {
      modal.removeClass('active');
      btn.removeClass('active');
    }
  });

  $('.cab-modal__close').on('click', function () {
    $('.cab-modal').removeClass('active');
  })

  if ($('.cab-btns').length) {
    const wrap = document.querySelector('.cab-btns');
    const active = wrap.querySelector('.btn.active');

    const wrapRect = wrap.getBoundingClientRect();
    const activeRect = active.getBoundingClientRect();

    const offset = activeRect.left - wrapRect.left;

    wrap.scrollTo({
      left: wrap.scrollLeft + offset - 20,
      behavior: 'auto'
    });
  }

})();
