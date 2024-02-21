let bagItemsObject;
onLoad();

function onLoad()
{
    loadBagItemsObjects();
    displayBagItems();
    displayBagSummary();
}
function loadBagItemsObjects()
{
    console.log(bagItems);
    bagItemsObject=bagItems.map(itemId=>{
        for(let i=0;i<items.length;i++)
        {
            if(itemId == items[i].id)
            {
                return items[i];
            }
        }
    })
    console.log(bagItemsObject);
}

function displayBagItems()
{
    let bagContainerElement = document.querySelector(".bag-items-container");
    let innerHTML ='';
    bagItemsObject.forEach(bagItem => {
        innerHTML += generateItemHtml(bagItem);
    });
    bagContainerElement.innerHTML= innerHTML;
}

function removeFromBag(itemId){
    console.log(itemId);

    bagItems=bagItems.filter(bagItemId=>bagItemId != itemId);
    localStorage.setItem('bagItems',JSON.stringify(bagItems));
    loadBagItemsObjects();
    displayBagItems();
    displayBagIcon();
    displayBagSummary()
}

function generateItemHtml(item){
    return  `<div class="bag-item-container">
                    <div class="item-left-part">
                        <img class="bag-item-img" src="${item.item_image}">
                    </div>
                    <div class="item-right-part">
                        <div class="company">${item.company_name}</div>
                        <div class="item-name">${item.item_name}</div>
                        <div class="price-container">
                            <span class="current-price">Rs ${item.current_price}</span>
                            <span class="original-price">Rs ${item.original_price}</span>
                            <span class="discount-percentage">(${item.discount}% OFF)</span>
                        </div>
                        <div class="return-period">
                            <span class="return-period-days">${item.return_period}days</span> return available
                        </div>
                        <div class="delivery-details">
                            Delivery by 
                            <span class="delivery-details-days">${item.delivery_date}</span>
                        </div>
                    </div>
                    <div class="remove-from-cart" onclick=removeFromBag(${item.id})>X</div>
                </div>
                `; 
}

function displayBagSummary()
{
    let bagSummary=document.querySelector(".bag-summary");
    let convenience;
    let totalItem=bagItemsObject.length
    let totalDiscount=0;
    let totalMRP=0;
    let finalPayment;

    bagItemsObject.forEach(bagItem=>{
        totalMRP+=bagItem.original_price;
        totalDiscount+=bagItem.original_price-bagItem.current_price;
    })
    if(totalItem<=2)
    {
        convenience=99;
        finalPayment=totalMRP-totalDiscount+99;   
    }
    else{
        convenience='free';
        finalPayment=totalMRP-totalDiscount;   

    }
    bagSummary.innerHTML=`
    <div class="bag-details-container">
    <div class="price-header">PRICE DETAILS (${totalItem} Items) </div>
    <div class="price-item">
        <span class="price-item-tag">Total MRP</span>
        <span class="price-item-value">₹${totalMRP}</span>
    </div>
    <div class="price-item">
        <span class="price-item-tag">Discount on MRP</span>
        <span class="price-item-value priceDetail-base-discount">-₹${totalDiscount}</span>
    </div>
    <div class="price-item">
        <span class="price-item-tag">Convenience Fee</span>
        <span class="price-item-value">₹${convenience}</span>
    </div>
    <hr>
    <div class="price-footer">
        <span class="price-item-tag">Total Amount</span>
        <span class="price-item-value">₹${finalPayment}</span>
    </div>
</div>
<button class="btn-place-order">
PLACE ORDER
</button>`;
}

document.querySelector(".btn-place-order").addEventListener("click",()=>{
    let msg=confirm("Do you want to place order");
    if(msg)
    {
        alert("Order Confirmed");
    }
    else{
        alert("do shopping");
    }
})