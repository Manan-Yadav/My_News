const API_KEY="255577b232ee4d2ca6f5ed25ce214484";
const url="https://newsapi.org/v2/everything?q=";

window.addEventListener("load",()=>fetchNews("India"));

async function fetchNews(query){
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data= await res.json();
    bindData(data.articles);
}
function reload(){
    window.location.reload();
}

function bindData(articles){
    const cardsContainer =document.querySelector(".cards-container");
    const template=document.querySelector(".template");
    cardsContainer.innerHTML=" ";
    articles.forEach(article => {
        if(!article.urlToImage) return;
        const cardclone=template.content.cloneNode(true);
        FillDataInCard(cardclone,article);
        cardsContainer.appendChild(cardclone);
        
    });
    function FillDataInCard(cardclone,article){
        const img=cardclone.querySelector(".image");
        const title=cardclone.querySelector(".title");
        const source=cardclone.querySelector(".source");
        const description=cardclone.querySelector(".description");

        const date=new Date(article.publishedAt).toLocaleString("en-US",{
            timeZone:"Asia/Jakarta",
        });

        img.src=article.urlToImage;
        title.innerHTML=article.title;
        source.innerHTML=`${article.source.name} . ${date}`;
        description.innerHTML=article.description;
        cardclone.firstElementChild.addEventListener("click",()=>{
            window.open(article.url,"_blank") 
        })

    }

}
let curselectednav=null;
function onNavItemClick(id){
    fetchNews(id);
    const navitem=document.getElementById(id);
    curselectednav?.classList.remove("active");
    curselectednav=navitem;
    curselectednav.classList.add("active");
}
const search_button=document.getElementById("search_button");
const search_text=document.getElementById("search_text");
search_button.addEventListener("click",()=>{
    const query=search_text.value;
    if(!query) return ;
    fetchNews(query);
    curselectednav?.classList.remove("active");
    curselectednav=null;
})