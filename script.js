let bagItems=[];
onLoad();
function onLoad()
{
    let bagItemsstr=localStorage.getItem('bagItems');
    bagItems = bagItemsstr?JSON.parse(bagItemsstr):[]; 
    displayItemsOnHomePage();
    displayBagIcon(); 
}

function addToBag(id)
{
    bagItems.push(id);
    localStorage.setItem('bagItems',JSON.stringify(bagItems));
    displayBagIcon();
}

function displayBagIcon()
{
    let count=document.querySelector(".bag-item-count");
    if(bagItems.length>0)
    {
        count.style.visibility="visible";
        count.innerText=bagItems.length;
    }
    else{
        count.style.visibility="hidden";
    }
}


function displayItemsOnHomePage(){
   
    let itemsContainerElement = document.querySelector(".items-container");
    if(!itemsContainerElement)
    {
        return;
    }
    let innerHTML='';
    items.forEach( item =>{
        innerHTML += `
        <div class="item-container">
        <img src="${item.item_image}" alt="" class="item-image">
        <div class="rating">${item.rating.stars}⭐ | ${item.rating.noOfReviews}</div>
        <div class="company-name">${item.company_name}</div>
        <div class="item-name">${item.item_name}</div>
        <div class="price">
            <span class="current-price">Rs ${item.current_price}</span>
            <span class="original-price">Rs ${item.original_price}</span>
            <span class="discount">(${item.discount}% OFF)</span>
        </div>
        <button class="atb-btn" onclick=addToBag(${item.id})>Add to Bag</button>
        </div>
        `;
    });
    
    itemsContainerElement.innerHTML = innerHTML;
}



// ********for single item***********
// let items={
    // id:1,
//     item_image:"images/items/1.jpg",
//     rating:{
//         stars:4.5,
//         noOfReviews:1400
//     },
//     company_name:"Carlton London",
//     item_name:"Rhodium-plated CZ Floral Studs",
//     current_price:799,
//     original_price:1199,
//     discount:33,
// }
