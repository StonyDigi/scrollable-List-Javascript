
// State
let pages = [];
let selectedPageIndex = 0;

window.addEventListener("load", windowLoaded);

function windowLoaded() {
  fetch("https://kodbazis.hu/api/members")
    .then((res) => res.json())
    .then((members) => {
      let result = [];
      const numberOfPages = Math.ceil(members.length / 30);
      for (let i = 0; i < numberOfPages; i++) {
        result.push(members.splice(0, 30));
      }
      pages = result;
      render();
    })
    .catch(console.log);
}

function render() {
  document.getElementById("app-container").innerHTML = `
    <nav class="mb-2">
        <ul class="pagination" style="flex-wrap: wrap; justify-content: center;">
            ${pages.map((page, index) => `
                  <li
                    style="cursor: pointer"
                    class="page-item ${index === selectedPageIndex ? "active" : ""}"
                  >
                    <span class="page-link" data-page="${index}">
                        ${index + 1}
                    </span>
                  </li>`
              )
              .join("")}
        </ul>
    </nav>
    <ul class="list-group">
        ${pages[selectedPageIndex]
          .map((member) => `<li class="list-group-item">${member.ParliamentaryName}</li>`)
          .join("")}
    </ul>
  `;

  document.querySelectorAll(".page-link")
    .forEach((element) => {
      element.onclick = function (event) {
        selectedPageIndex = Number(event.target.dataset.page);
        render();
      };
    });
}
