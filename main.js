let gallery = async () => {
  const response = await fetch("gallery.json");
  let result = await response.json(); // all imgs
  console.log(result.length)
  let start = 0;
  let page = 25;
  let countImg = 0;
  let firstLoaded = result.slice(start,page);
  function imgsArrayLength(arr,start,end) {
    return arr.slice(start,end)
  }
  // load imgs on scroll
  window.addEventListener("scroll", () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if( scrollTop + clientHeight >= scrollHeight ) {
      countImg += 1;
      start = countImg * page;
      console.log(countImg, start)
      if(result.length <= start) return
      imgsArrayLength(result,start,page) // cut array imgs
      createDom(); // render DOM

      let images = [...document.querySelectorAll('.wrapper a img')]; // get all new images in DOM
      let observer = new IntersectionObserver(onIntersection, interactSettings);
      images.forEach(image => observer.observe(image)); // make new animation
    }
    //console.log(scrollTop,"-scrollTop",clientHeight,"-clientHeight",scrollHeight, "-scrollHeight")
  });
  // end load imgs on scroll

  // *** Method 1 *** \\\
  let mainWrapperDiv = document.createElement("div");
  mainWrapperDiv.classList.add(
    "wrapper",
    "flex",
    "flex-wrap",
    "gap-5",
    "justify-center",
    "max-w-5xl",
    "mx-auto",
    "px-6"
  );
  document.body.appendChild(mainWrapperDiv);

  for (let img of firstLoaded) {
    let tagA = document.createElement("a");
    tagA.href = img.src;
    tagA.setAttribute("data-fancybox", "gallery");
    tagA.setAttribute("data-caption", img.caption);
    let imgTag = document.createElement("img");
    imgTag.classList.add("rounded","lazy-image");
    imgTag.src = img.thumb;
    tagA.appendChild(imgTag);
    mainWrapperDiv.appendChild(tagA); 
  }
  // Fancybox.show(result, {
  //     // Your options go here
  // });
  //
  Fancybox.bind('[data-fancybox="gallery"]', {
    groupAll: true, // Group all items
    on: {
      ready: fancybox => {
        console.log(`fancybox #${fancybox.id} is ready!`);
      }
    },
    Image: {
      zoom: true
    },
    showClass: "fancybox-zoomIn",
    hideClass: "fancybox-zoomOut"
  });
  // task 2
  // upload new imgs onscroll
let images = [...document.querySelectorAll('.wrapper a img')]

const interactSettings = {
  root: document.querySelector('.mainWrapperDiv'),
  rootMargin: '0px 0px 200px 0px'
}

function onIntersection(imageEntites) {
  imageEntites.forEach(image => {
    if (image.isIntersecting) {
      observer.unobserve(image.target)
      image.target.src = image.target.src
      image.target.onload = () => image.target.classList.add('loaded')
    }
  })
}

let observer = new IntersectionObserver(onIntersection, interactSettings)

images.forEach(image => observer.observe(image))

function createDom() { // dynamically create DOM
  for (let img of firstLoaded) {
    let tagA = document.createElement("a");
    tagA.href = img.src;
    tagA.setAttribute("data-fancybox", "gallery");
    tagA.setAttribute("data-caption", img.caption);
    let imgTag = document.createElement("img");
    imgTag.classList.add("rounded","lazy-image");
    imgTag.src = img.thumb;
    tagA.appendChild(imgTag);
    mainWrapperDiv.appendChild(tagA); 
  }
}

};

gallery();
