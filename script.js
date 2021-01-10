const pizza = document.getElementById('pizza');
const burger = document.getElementById('burger')
const garlicBread = document.getElementById('garlic-bread');
const billOut = document.querySelector(".bill-out");

const pizzaPrice = parseInt(pizza.children[1].innerText.split(" ")[2].split("$")[1]);
const burgerPrice = parseInt(burger.children[1].innerText.split(" ")[2].split("$")[1]);
const garlicBreadPrice = parseInt(garlicBread.children[1].innerText.split(" ")[2].split("$")[1]);

let receiptNumber = 0


billOut.addEventListener('click', (event) => {
    event.preventDefault();

    saveBillNumberLocal(receiptNumber);
    receiptNumber++;
    getBillNumber();

    let pizzaQuantity = parseInt(pizza.children[2].value);
    let burgerQuantity = parseInt(burger.children[2].value);
    let garlicBreadQuantity = parseInt(garlicBread.children[2].value);

    if(isNaN(pizzaQuantity)) {
        pizzaQuantity = 0;
    }
    if(isNaN(burgerQuantity)) {
        burgerQuantity = 0;
    }
    if(isNaN(garlicBreadQuantity)){
        garlicBreadQuantity = 0;
    }
    const total = (garlicBreadPrice*garlicBreadQuantity) + (pizzaPrice*pizzaQuantity) + (burgerPrice*burgerQuantity);


    if(pizzaQuantity !== 0 && burgerQuantity !== 0 && garlicBreadQuantity !== 0) {
    const bill = `
                RESTAURANT
        xyz@resto.com   0123-456-789
        ------------------------------
        Item            Qty   Price
    ------------------------------------
        Pizza            ${pizzaQuantity}      $${(pizzaPrice*pizzaQuantity)}
        Burger           ${burgerQuantity}      $${(burgerPrice*burgerQuantity)}
        Garlic Bread     ${garlicBreadQuantity}      $${(garlicBreadPrice*garlicBreadQuantity)}
    ------------------------------------
    SUB-TOTAL                   $${total}
    Taxes (5%)                  $${((5/100)*total).toFixed(2)}
    ------------------------------------
    TOTAL                       $${total + ((5/100)*total)}
    
                THANK YOU
               VISIT AGAIN 
                  ❤❤`;
    }
    downloadToFile(bill, `BillNumber${receiptNumber}.txt`, 'text/plain');
})

const saveBillNumberLocal = function(billNumber) {
    if(localStorage.getItem('billNumber') === null) {
        billNumber = 0;
    } else {
        billNumber = JSON.parse(localStorage.getItem('billNumber'));
    }

    billNumber++;
    localStorage.setItem('billNumber',JSON.stringify(billNumber));
}

const getBillNumber = function() {
    let billNumber;

    if(localStorage.getItem('billNumber') === null) {
        billNumber = 0;
    } else {
        billNumber = JSON.parse(localStorage.getItem('billNumber'));
    }
    
    receiptNumber = billNumber;
}

const downloadToFile = (content, filename, contentType) => {
    const a = document.createElement('a');
    const file = new Blob([content], {type: contentType});
    
    a.href= URL.createObjectURL(file);
    a.download = filename;
    a.click();

    URL.revokeObjectURL(a.href);
};
