const overlay = document.querySelector(".overlay");
const popup = document.querySelector(".popup");
const settingsPopup = document.querySelector(".settings-popup");

fetch("https://valorant-api.com/v1/weapons")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Problem found: Network problem");
    }
    return response.json();
  })
  .then((data) => {
    const weapons = data;
    let dat = {
      classic: { name: "classic", id: 8, defaultId: 39, activeId: 39, variant: 0 },
      shorty: { name: "shorty", id: 11, defaultId: 22, activeId: 22, variant: 0 },
      frenzy: { name: "frenzy", id: 7, defaultId: 34, activeId: 34, variant: 0 },
      ghost: { name: "ghost", id: 9, defaultId: 33, activeId: 33, variant: 0 },
      sheriff: { name: "sheriff", id: 10, defaultId: 36, activeId: 36, variant: 0 },
      stinger: { name: "stinger", id: 16, defaultId: 25, activeId: 25, variant: 0 },
      spectre: { name: "spectre", id: 15, defaultId: 42, activeId: 42, variant: 0 },
      bucky: { name: "bucky", id: 6, defaultId: 30, activeId: 30, variant: 0 },
      judge: { name: "judge", id: 5, defaultId: 32, activeId: 32, variant: 0 },
      bulldog: { name: "bulldog", id: 3, defaultId: 31, activeId: 31, variant: 0 },
      guardian: { name: "guardian", id: 13, defaultId: 38, activeId: 38, variant: 0 },
      phantom: { name: "phantom", id: 4, defaultId: 59, activeId: 59, variant: 0 },
      vandal: { name: "vandal", id: 2, defaultId: 57, activeId: 57, variant: 0 },
      marshall: { name: "marshall", id: 14, defaultId: 28, activeId: 28, variant: 0 },
      operator: { name: "operator", id: 12, defaultId: 40, activeId: 40, variant: 0 },
      ares: { name: "ares", id: 1, defaultId: 34, activeId: 34, variant: 0 },
      odin: { name: "odin", id: 0, defaultId: 20, activeId: 20, variant: 0 },
      melee: { name: "melee", id: 17, defaultId: 91, activeId: 91, variant: 0 },
    };
    var tempActive;
    var tempVariant = 0;

    function loadDefault(name) {
      const w = dat[name];
      const wDiv = document.querySelector(`#${name}`);
      wDiv.querySelector("img").src = weapons.data[w.id].skins[w.defaultId].chromas[w.variant].fullRender;
      if (wDiv) {
        wDiv.removeEventListener("click", () => {});
        wDiv.addEventListener("click", () => {
          document.querySelector(".displayed").src = weapons.data[w.id].skins[w.activeId].chromas[0].fullRender;
          for (let i = 0; i < weapons.data[w.id].skins.length; i++) {
            if (weapons.data[w.id].skins[i].displayName !== "Random Favorite Skin") {
              document.querySelector(".list").insertAdjacentHTML(
                "beforeend",
                `
              <div class="skin list-skin">
                <img src="${weapons.data[w.id].skins[i].chromas[0].fullRender}" class="list-${name}" loading="lazy" />
                <p class="skin-name">${weapons.data[w.id].skins[i].displayName}</p>
              </div>`
              );
              document.querySelector(".skin:last-child").onclick = function () {
                document.querySelector(".displayed").src = weapons.data[w.id].skins[i].chromas[0].fullRender;
                tempActive = i;
                document.querySelectorAll(".variant").forEach((e) => {
                  e.remove();
                });
                if (weapons.data[w.id].skins[i].chromas.length == 1) {
                  return;
                } else {
                  for (let n = 0; n < weapons.data[w.id].skins[i].chromas.length; n++) {
                    document.querySelector(".variants").insertAdjacentHTML(
                      "beforeend",
                      `
                    <div class="variant">
                      <img src="${weapons.data[w.id].skins[i].chromas[n].swatch}" />
                    </div>
                    `
                    );
                    document.querySelector(".variant:last-child").onclick = function () {
                      document.querySelector(".displayed").src = weapons.data[w.id].skins[i].chromas[n].fullRender;
                      tempVariant = n;
                    };
                  }
                }
              };

              document.querySelector(".save").onclick = function () {
                w.activeId = tempActive;
                w.variant = tempVariant;
                tempActive = "";
                tempVariant = 0;
                document.querySelector(`#${name} img`).src = weapons.data[w.id].skins[w.activeId].chromas[w.variant].fullRender;
              };
              document.querySelector(".overlay").onclick = function () {
                tempActive = "";
                tempVariant = 0;
              };
            }
          }

          overlay.classList.add("active");
          popup.classList.add("active");
        });
      }
    }

    Object.keys(dat).forEach((key) => {
      loadDefault(dat[key].name);
    });
  })
  .catch((err) => {
    console.error(err);
  });

fetch("https://valorant-api.com/v1/playercards")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Problem found: Network problem");
    }
    return response.json();
  })
  .then((data) => {
    const cards = data;
    let dat = {
      card: { defaultId: 26, activeId: 26 },
    };
    var tempActive;

    function loadDefault() {
      const w = dat.card;
      const wDiv = document.querySelector("#card");
      wDiv.querySelector("img").src = cards.data[w.activeId].largeArt;
      if (wDiv) {
        wDiv.addEventListener("click", () => {
          document.querySelector(".displayed").src = cards.data[w.activeId].wideArt;
          for (let i = 0; i < cards.data.length; i++) {
            document.querySelector(".list").insertAdjacentHTML(
              "beforeend",
              `
            <div class="skin list-card">
              <img src="${cards.data[i].largeArt}" class="list-playerCard" loading="lazy" />
              <p class="skin-name">${cards.data[i].displayName}</p>
            </div>`
            );
            document.querySelector(".skin:last-child").onclick = function () {
              document.querySelector(".displayed").src = cards.data[i].wideArt;
              tempActive = i;
            };
            document.querySelector(".save").onclick = function () {
              w.activeId = tempActive;
              tempActive = "";
              document.querySelector(`#card img`).src = cards.data[w.activeId].largeArt;
            };
          }

          overlay.classList.add("active");
          popup.classList.add("active");
        });
      }
    }

    loadDefault();
  })
  .catch((error) => {
    console.error("Problem found:", error);
  });

fetch("https://valorant-api.com/v1/sprays")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Problem found: Network problem");
    }
    return response.json();
  })
  .then((data) => {
    const sprays = data;
    let dat = {
      spray1: { num: 1, defaultId: 64, activeId: 64 },
      spray2: { num: 2, defaultId: 64, activeId: 64 },
      spray3: { num: 3, defaultId: 64, activeId: 64 },
      spray4: { num: 4, defaultId: 64, activeId: 64 },
    };
    var tempActive;

    function loadDefault(sprayNum) {
      const w = dat[`spray${sprayNum}`];
      const wDiv = document.querySelector(`#spray${sprayNum}`);
      wDiv.querySelector("img").src = sprays.data[64].fullTransparentIcon;
      if (wDiv) {
        wDiv.removeEventListener("click", () => {});
        wDiv.addEventListener("click", () => {
          document.querySelector(".displayed").src = sprays.data[w.defaultId].fullTransparentIcon;

          function determineImagePath(data) {
            if (data.animationGif != null) {
              return data.animationGif;
            } else if (data.fullTransparentIcon != null) {
              return data.fullTransparentIcon;
            } else {
              return data.displayIcon;
            }
          }

          for (let i = 0; i < sprays.data.length; i++) {
            const path = determineImagePath(sprays.data[i]);

            document.querySelector(".list").insertAdjacentHTML(
              "beforeend",
              `
                <div class="skin list-spray">
                    <img src="${path}" class="list-spray${sprayNum} list-sprays" loading="lazy" />
                    <p class="skin-name">${sprays.data[i].displayName}</p>
                </div>`
            );

            document.querySelectorAll(".skin")[i].onclick = function () {
              document.querySelector(".displayed").src = path;
              tempActive = i;
            };
          }

          document.querySelector(".save").onclick = function () {
            w.activeId = tempActive;
            const savedPath = determineImagePath(sprays.data[w.activeId]);
            document.querySelector(`#spray${sprayNum} img`).src = savedPath;
          };

          overlay.classList.add("active");
          popup.classList.add("active");
        });
      }
    }

    Object.keys(dat).forEach((key) => {
      loadDefault(dat[key].num);
    });
  })
  .catch((error) => {
    console.error("Problem found:", error);
  });

var scrollableDiv = document.querySelector(".list");
var isDown = false;
var startX;
var scrollLeft;

scrollableDiv.addEventListener("mousedown", (e) => {
  isDown = true;
  startX = e.pageX - scrollableDiv.offsetLeft;
  scrollLeft = scrollableDiv.scrollLeft;
});

["mouseleave", "mouseup"].forEach((event) => {
  scrollableDiv.addEventListener(event, () => (isDown = false));
});

scrollableDiv.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - scrollableDiv.offsetLeft;
  const walk = x - startX;
  scrollableDiv.scrollLeft = scrollLeft - walk;
});

scrollableDiv.addEventListener("wheel", (e) => {
  e.preventDefault();
  scrollableDiv.scrollLeft += e.deltaY;
});

function rgbToHex(rgb) {
  const values = rgb.match(/\d+/g).map(Number);
  return `#${((1 << 24) + (values[0] << 16) + (values[1] << 8) + values[2]).toString(16).slice(1)}`;
}

document.querySelector(".settings").addEventListener("click", () => {
  settingsPopup.classList.add("active");
  overlay.classList.add("active");
});
document.querySelectorAll(".color").forEach((e) => {
  var rgb = window.getComputedStyle(e).getPropertyValue("background-color");
  var hex = rgbToHex(rgb);
  e.addEventListener("click", () => {
    document.querySelector(":root").style.setProperty("--main", hex);
  });
});

document.querySelector(".save").addEventListener("click", () => {
  overlay.classList.remove("active");
  popup.classList.remove("active");
  document.querySelectorAll(".skin").forEach((e) => {
    e.remove();
  });
  document.querySelectorAll(".variant").forEach((e) => {
    e.remove();
  });
});

overlay.addEventListener("click", () => {
  overlay.classList.remove("active");
  popup.classList.remove("active");
  settingsPopup.classList.remove("active");
  document.querySelectorAll(".skin").forEach((e) => {
    e.remove();
  });
  document.querySelectorAll(".variant").forEach((e) => {
    e.remove();
  });
});
