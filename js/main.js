

// count
// delete
// update
// serarch
// clean data
// ------------------------------------------------------
let title = document.getElementById("title")
let price = document.getElementById("price");
let tax = document.getElementById("tax");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let create = document.getElementById("create");
let mode = "create";
let temp;
//-----------------------------------------------------------
// function calc total
function getTotal() {
    if (price.value != '') {
        let result = (+price.value + +tax.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.backgroundColor = 'green';
    } else {
        total.innerHTML = '';
    }
}
//-----------------------------------------------------------
// function create product and save data in local stroage
//  هون تاكدنا انو الستورج مش فاضي ولو فاضي ضيفلي البيانات عليها
//  وحولها من سترنق ال ارري لانو انا بعتت البيانات سترنج

let arrA;
if (localStorage.prod != null)  {
    arrA = JSON.parse(localStorage.prod);// حولنا البيانات ال وضعها الاصلي 
} else {
    arrA = [];
}

 //  لمن الكومبايلر عم يشمي عل كود عم يفضي ال مصفوفة
create.onclick = function () {
    let objForData = {
        title : title.value.toLowerCase(),
        price: price.value,
        tax  : tax.value,
        ads : ads.value,
        discount : discount.value,
        count : count.value,
        category : category.value.toLowerCase(),
        total : total.innerHTML,
    }
    //  انشاء عدد من المنتجات بتحديد واحد  count
    if (title.value != ''){
        if (mode === 'create'){
            if (objForData.count > 1) {
                for (let i = 0; i < objForData.count; i++) {
                    arrA.push(objForData);
                } 
            } else {
                arrA.push(objForData);
            }
        } else {
            arrA[temp] = objForData;
            mode = 'create';
            create.innerHTML = "create";
            count.style.display = "block";
        }
    }
    
    
    localStorage.setItem('prod', JSON.stringify(arrA))
    clearDdata();
    sowData ()
     
}
//-----------------------------------------------------------
//  مسح البيانات من ا inputs
// clear data  
function clearDdata () {
    title.value = ''
    price.value = '';
    ads.value = '';
    tax.value = '';
    discount.value = '';
    count.value = '';
    category.value = '';
    total.innerHTML = '';

}
//-----------------------------------------------------------
// show data in table 
function sowData () {
    getTotal();
    let ta = '';
    for (let i = 0; i<arrA.length; i++) {
        ta += `
        <tr>
                <td>${i}</td>
                <td>${arrA[i].title}</td>
                <td>${arrA[i].price}</td>
                <td>${arrA[i].tax}</td>
                <td>${arrA[i].ads}</td>
                <td>${arrA[i].discount}</td>
                <td>${arrA[i].total}</td>
                <td>${arrA[i].category}</td>
                <td><button  onclick = "update(${i})"" id="update">update</button></td>
                <td><button onclick = "deleteProduct(${i})" id="delete">delete</button></td>
              </tr>
        `
    }
    let deleteAll=  document.getElementById("delteAll");
    if (arrA.length > 0) {
        deleteAll.innerHTML = `
        <button onclick="deleteAl()">deleteAll (${arrA.length})</button>
        `
    } else {
        deleteAll.innerHTML = '' ;
    }
    document.getElementById("tbody").innerHTML = ta; 
} 
sowData ()
//حزف منتج واحد
//-----------------------------------------------------------'
function deleteProduct (i){
arrA.splice(i,1); //  عملية الحزف بتم عل مصفوفة في فوق
localStorage.prod = JSON.stringify(arrA); //  منظيف عل لوكال هوست الارري الجديده بعد تحديث
sowData() //  رجعنا ستخدمنا ال showData() عشان تحدث البيانات 

}
// حزف كل المنتجات
//-----------------------------------------------------------'
function deleteAl() {
    localStorage.clear();
    arrA.splice(0);
    sowData()
    
}
//-----------------------------------------------------------'


// update 

function update(i) {
    title.value = arrA[i].title;
    price.value = arrA[i].price;
    tax.value = arrA[i].tax;
    ads.value = arrA[i].ads;
    discount.value = arrA[i].discount;
    getTotal()
    count.style.display = "none"
    create.innerHTML = "update";
    mode = "update";
    temp = i;
    scroll({
        top:0,
        behavior:"smooth",
    })
    
}



// search  



let searchMode = "title";
function getSearchMode (id) {

    let serach = document.getElementById("serach");
if (id === 'byTitle') {
    searchMode =  'title';
    serach.placeholder = "Search By title"
}
 else { 
    searchMode = 'category';
     serach.placeholder = "Search By category"

}

serach.focus()
serach.value = '';
sowData()

}



let ta  = '';
function serachData (value) 
{
    for (let i =0; i<arrA.length; i++){
    if (searchMode == 'title'){
            if (arrA[i].title.includes(value.toLowerCase())) {
                ta += `
        <tr>
                <td>${i}</td>
                <td>${arrA[i].title}</td>
                <td>${arrA[i].price}</td>
                <td>${arrA[i].tax}</td>
                <td>${arrA[i].ads}</td>
                <td>${arrA[i].discount}</td>
                <td>${arrA[i].total}</td>
                <td>${arrA[i].category}</td>
                <td><button  onclick = "update(${i})"" id="update">update</button></td>
                <td><button onclick = "deleteProduct(${i})" id="delete">delete</button></td>
              </tr>
        `
        }

    
    } else {
            if (arrA[i].category.includes(value.toLowerCase())) {
                ta += `
        <tr>
                <td>${i}</td>
                <td>${arrA[i].title}</td>
                <td>${arrA[i].price}</td>
                <td>${arrA[i].tax}</td>
                <td>${arrA[i].ads}</td>
                <td>${arrA[i].discount}</td>
                <td>${arrA[i].total}</td>
                <td>${arrA[i].category}</td>
                <td><button  onclick = "update(${i})"" id="update">update</button></td>
                <td><button onclick = "deleteProduct(${i})" id="delete">delete</button></td>
              </tr>
        `
            }
    }
}
    document.getElementById("tbody").innerHTML = ta; 
}




// 

