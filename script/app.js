const filterBtns = document.querySelectorAll(".filter-btn");
const count = document.getElementById("count");
const issuesCardContainer = document.getElementById("card-container");
let filteredData = [];

function toggleStyle(id) {
  filterBtns.forEach((btn) => {
    btn.classList.remove("btn-primary");
    btn.classList.add("btn-outline");
  });

  const selected = document.getElementById(id);
  selected.classList.remove("btn-outline");
  selected.classList.add("btn-primary");
}

const loadIssuesCard = async (status) => {
  Spinner(true);
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues`;
  const res = await fetch(url);
  const details = await res.json();
  displayCard(details.data, status);
};

loadIssuesCard("all");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const status = btn.innerText.toLowerCase();
    loadIssuesCard(status);
  });
});

const createElements = (arr) => {
  const htmlEliments = arr.map(
    (el) => `
     <p class="px-4 py-1 text-[12px] rounded-full 
          ${
            el == "bug"
              ? "text-[#EF4444] bg-[#FEECEC] border-[#EF4444] border"
              : el == "help wanted"
              ? "bg-[#FFF8DB] text-[#D97706] border-[#D97706] border"
              : "bg-[#BBF7D0] text-[#00A96E] border-[#00A96E] border"
          } flex items-center justify-center gap-1">

      <img src="${
        el === "bug"
          ? "./assets/Bug.png"
          : el == "help wanted"
          ? "./assets/Help.png"
          : "./assets/Enhance.png"
      }" alt="" />
      ${el.toUpperCase()}
      </p>`
  );

  return htmlEliments.join(" ");
};

const displayCard = (cardData, status="all") => {
  issuesCardContainer.innerHTML = "";

  if (status === "open") {
    filteredData = cardData.filter((data) => data.status === "open");
  } else if (status === "closed") {
    filteredData = cardData.filter((data) => data.status === "closed");
  } else {
    filteredData = cardData;
  }

  filteredData.forEach((data) => {
   
    const cardContent = document.createElement("div");

    cardContent.innerHTML = `
      <div class="card h-full shadow-sm bg-white p-3 space-y-4 border-t-3 ${
        data.status === "open" ? "border-[#00A96E]" : "border-[#A855F7]"
      }">

        <div class="flex justify-between">
          <img src="${
            data.status === "open"
              ? "./assets/Open-Status.png"
              : "./assets/Closed.png"
          }" alt="" />

          <p class="px-4 rounded-full ${
            data.priority == "high"
              ? "text-[#EF4444] bg-[#FEECEC]"
              : data.priority == "medium"
              ? "bg-[#FFF8DB] text-[#D97706]"
              : "bg-[#EEEFF2] text-[#9CA3AF]"
          }">
            ${data.priority.toUpperCase()}
          </p>
        </div>

        <h4 class="title text-sm font-semibold">
          ${data.title}
        </h4>

        <p class="text-[12px] text-gray-500">
          ${data.description}
        </p>

        <div class="flex flex-row sm:flex-col lg:flex-row gap-2">
          ${createElements(data.labels)}
        </div>

        <hr class="border-gray-300" />

        <p class="text-[12px] text-gray-500">#${data.id} by ${data.author}</p>
        <p class="text-[12px] text-gray-500">${data.createdAt}</p>
      </div>
    `;

    const card = cardContent.firstElementChild;

    card.addEventListener("click", () => {
      displayModal(data);
    });

    issuesCardContainer.appendChild(card);
   
  });
   count.innerText = filteredData.length;
    Spinner(false);
};

const removebtn=()=>{
filterBtns.forEach((btn) => {
  btn.classList.add('btn-outline');
    btn.classList.remove("btn-primary");
  });
};

document.getElementById("search-btn").addEventListener("click", ()=>{
    removebtn();
    Spinner(true); 
    const input = document.getElementById("search-input");
    const searchValue= input.value.trim().toLowerCase();
    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`)
    .then((res)=>res.json())
    .then((json)=>{
        const allcard = json.data;
        const filtercard= allcard.filter((card)=> card.title.toLowerCase().includes(searchValue));
        displayCard(filtercard, "all");
    });
 });


 const Spinner=(status)=>{
    if(status==true){
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("card-container").classList.add("hidden");
    }
    else{
         document.getElementById("spinner").classList.add("hidden");
        document.getElementById("card-container").classList.remove("hidden");
    }
}

 