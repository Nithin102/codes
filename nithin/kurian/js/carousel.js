const carousels = {}

  // Add silder details here
  //currentSlide from 0,1,2,3
carousels.slideshow = {
      "currentSlide":1,
      "autoSlide": true,
      "autoSlideInterval":5000,
      "slidePerPage":1,
      "slideBy":1
}

carousels.review_slider = {
    "currentSlide":1,
    "autoSlide": true,
    "autoSlideInterval":3000,
    "slidePerPage":1,
    "slideBy":1
}

carousels.middleSlider = {
    "currentSlide":1,
    "autoSlide": true,
    "autoSlideInterval":3000,
    "slidePerPage":1,
    "slideBy":1
}

carousels.qaSlider = {
    "currentSlide":1,
    "autoSlide": true,
    "autoSlideInterval":3000,
    "slidePerPage":4,
    "slideBy":1
}

  Object.keys(carousels).forEach(name=>{
    showSlides(carousels[name].currentSlide, name);
    carousels[name].totalSlides =  $('#'+name+' > .slide').length;
    carousels[name].updated = new Date().getTime();
  });

  const plusSlides =(elem) => {
    let plus = elem.className.indexOf('next') > -1 ? 1 : -1;
    let id = elem.closest(".slideshow").id;
    showSlides(carousels[id].currentSlide + plus || 1, id);
    carousels[id].updated = new Date().getTime();
  }

  function currentSlide(elem) {
    let id = elem.closest(".slideshow").id;
    let dots = $('#'+id+' > .dots > .dot');
    let index = dots.index(elem)+1;
    showSlides(index, id);
    carousels[id].updated = new Date().getTime();
  }

  function showSlides(n, slideName) {
    let slides = $('#'+slideName+' > .slide');
    let dots = $('#'+slideName+' > .dots > .dot');

    let carousel = carousels[slideName];


    let start = (n - 1) *  carousel.slideBy;
    let end = carousel.slidePerPage;
  
    carousel.currentSlide = n;
  
    if (n > (Math.ceil(slides.length/carousel.slidePerPage))) {
      carousel.currentSlide = 0;
      start = 0;
    }    
    if (n < 1) {
      carousel.currentSlide = Math.ceil(slides.length/carousel.slidePerPage)
    }

    slides.css({"display":"none"});
    dots.removeClass("active");

    console.log(start, end, n);
    slides.splice(start, end).forEach((item)=>$(item).css("display", "flex"));
    if(dots.length){
      dots.get(carousel.currentSlide-1).className += " active";
    }
  }

  setInterval(()=>{
    Object.keys(carousels).forEach(slider=>{

      let carousel = carousels[slider];
      let timeDiff = new Date().getTime() - carousel.updated;

      if( carousel.autoSlide &&
         timeDiff > carousel.autoSlideInterval){
            carousel.currentSlide += 1;
            if(carousel.currentSlide > Math.ceil(carousel.totalSlides-(carousel.slidePerPage - carousel.slideBy))){
              carousel.currentSlide = 1;
            }  
            console.log(carousel.currentSlide);
            showSlides(carousel.currentSlide, slider);
            carousel.updated = new Date().getTime();
      }
    });
  }, 50);


