const root = document.documentElement;
let section = document.querySelector("section");
let body = document.querySelector("body");
let header = document.querySelector("header");
let main = document.querySelector("main");

async function getData() {
  let response = await fetch("https://restcountries.com/v3.1/all");
  let data = await response.json();

  data.forEach((country) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const flag = document.createElement("div");
    flag.classList.add("flag");
    const img = document.createElement("img");
    img.src = country?.flags?.svg;
    img.alt = country?.name?.common;
    flag.appendChild(img);
    card.appendChild(flag);

    const info = document.createElement("div");
    info.classList.add("info");
    card.appendChild(info);

    const h2 = document.createElement("h2");
    h2.innerHTML = country?.name?.common;
    info.appendChild(h2);

    const ul = document.createElement("ul");
    info.appendChild(ul);

    const pop = document.createElement("li");
    pop.innerHTML = `<b>Population:</b> ${country?.population?.toLocaleString()}`;
    ul.appendChild(pop);

    const reg = document.createElement("li");
    reg.innerHTML = `<b>Region:</b> ${country?.region?.toLocaleString()}`;
    ul.appendChild(reg);

    const cap = document.createElement("li");
    cap.innerHTML = `<b>Capital:</b> ${country?.capital?.toLocaleString()}`;
    ul.appendChild(cap);

    section.appendChild(card);
    return card;
  });
}

getData();

let dark = document.getElementById("dark");
dark.addEventListener("click", () => {
  if (body.style.backgroundColor === "rgb(248, 249, 250)") {
    root.style.setProperty("--black", "rgb(255, 255, 255)");
    [body, header].forEach((element) => {
      element.style.backgroundColor = "rgb(32, 44, 54)";
    });
    document.querySelectorAll(".card").forEach((card) => {
      card.style.backgroundColor = " #2B3844";
    });
    dark.innerHTML = "🔆Light Mode";
  } else if (body.style.backgroundColor === "rgb(32, 44, 54)") {
    root.style.setProperty("--black", "rgb(0, 0, 0)");
    body.style.backgroundColor = "rgb(248, 249, 250)";
    header.style.backgroundColor = "rgb(236, 236, 236)";
    document.querySelectorAll(".card").forEach((card) => {
      card.style.backgroundColor = "rgb(255, 255, 255)";
    });
  }
});

let search = document.querySelector("input");
search.addEventListener("input", () => {
  const searchTerm = search.value.toLowerCase();

  document.querySelectorAll(".card").forEach((card) => {
    const countryName = card.querySelector("h2").innerText.toLowerCase();
    card.style.display = countryName.includes(searchTerm) ? "block" : "none";
  });
});
