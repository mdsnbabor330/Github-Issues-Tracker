console.log("hello");
const filterBtns = document.querySelectorAll(".filter-btn");
const count= document.getElementById('count');
const issuesCardContainer = document.getElementById('card-container');
let allIssues=[];
let openIssus=[];
let closedIssues=[];

function toggleStyle(id) {
  filterBtns.forEach((btn) => {
    btn.classList.remove("btn-primary");
    btn.classList.add("btn-outline");
  });

  const selected = document.getElementById(id);
  selected.classList.remove("btn-outline");
  selected.classList.add("btn-primary");
}

const loadIssuesCard= async(Btn)=>{
 const url=`https://phi-lab-server.vercel.app/api/v1/lab/issues`;
 const res= await fetch(url);
 const details= await res.json();
 displayCard(details.data, Btn);
}
loadIssuesCard(filterBtns);

