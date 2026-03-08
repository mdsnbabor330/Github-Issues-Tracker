const filterBtns = document.querySelectorAll(".filter-btn");
const count = document.getElementById("count");
const issuesCardContainer = document.getElementById("card-container");
let filteredData = [];

function toggleStyle(id) {
  filterBtns.forEach((btn) => {
    btn.classList.remove("btn-primary");
    btn.classList.add("btn-outline");

    btn.addEventListener("click", () => {
      const status = btn.innerText.toLowerCase();
      loadIssuesCard(status);
    });
  });

  const selected = document.getElementById(id);
  selected.classList.remove("btn-outline");
  selected.classList.add("btn-primary");
}

const loadIssuesCard = async (status) => {
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues`;
  const res = await fetch(url);
  const details = await res.json();
  displayCard(details.data, status);
};

loadIssuesCard("all");

const createElements =(arr)=>{
    const htmlEliments = arr.map((el)=>`
     <p class="px-4 py-1 text-[12px] rounded-full 
          ${el== "bug" ? "text-[#EF4444] bg-[#FEECEC] border-[#EF4444] border-1" 
          : el == "help wanted" ? "bg-[#FFF8DB] text-[#D97706] border-[#D97706] border-1" 
          : "bg-[#BBF7D0] text-[#00A96E] border-[#00A96E] border-1"} flex 
          items-center justify-center">
      <img src="${
          el === "bug"
          ? "./assets/Bug.png": el=="help wanted" 
          ? "./assets/Help.png": "./assets/Enhance.png"
          }" alt="" />
          ${el.toUpperCase()}
          </p>`);
    return htmlEliments.join(" ");
};


const displayCard = (cardData, status) => {
  issuesCardContainer.innerHTML = "";
  cardData.forEach((data) => {
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
          <p class="px-4 rounded-full ${data.priority == "high" ? "text-[#EF4444] bg-[#FEECEC]" : data.priority == "medium" ? "bg-[#FFF8DB] text-[#D97706]" : "bg-[#EEEFF2] text-[#9CA3AF]"}
        ">${data.priority}</p>
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
    issuesCardContainer.appendChild(cardContent);
    count.innerText = filteredData.length;
  });
};
