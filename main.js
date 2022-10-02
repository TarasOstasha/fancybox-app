let gallery = async () => {
  const response = await fetch("gallery.json");
  let result = await response.json();
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

  for (let img of result) {
    let tagA = document.createElement("a");
    tagA.href = img.src;
    tagA.setAttribute("data-fancybox", "gallery");
    tagA.setAttribute("data-caption", img.caption);
    let imgTag = document.createElement("img");
    imgTag.classList.add("rounded");
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
};

gallery();
