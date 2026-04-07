let cartcontainer = document.getElementById('cartcontainer')
const showUrl = 'https://69b848ece69653ffe6a43962.mockapi.io/Mehsul/api/Shoes'

let allshoes = []
 sebet = []
fetch('https://69b848ece69653ffe6a43962.mockapi.io/Mehsul/api/Shoes')
.then(res => res.json())
.then(data => {
    allshoes = data
    render(allshoes);
   
})
//Modal
let modal = document.getElementById('modal')
let overlay = document.getElementById('overlay')
let openmodal = document.getElementById('openmodal')
openmodal.addEventListener("click" , function(){
    overlay.classList.remove('hidden')
    modal.classList.remove('hidden')
    modal.classList.add('flex')
})
function closeModal() {
    overlay.classList.add('hidden');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

//Sebet 
let shoescount = document.getElementById('shoescount')
function addbasket(id){
    existshoes = sebet.find(item => item.id == id)
    if(existshoes){
        existshoes.count += 1
    }
    else{
        sebet.push({id :id , count : 1})
    }
    shoescount.innerHTML = sebet.length
    showsebet()
}

let totalpay = document.getElementById('totalpay')
function showsebet(){
    let total = 0
    let sebetContent = document.getElementById('sebetContent')
    sebetContent.innerHTML = sebet.map((item , index ) =>{
        const carts = allshoes.find(h => h.id == item.id)
        total += carts.price * item.count
        return `
             <div class="flex justify-evenly items-center border-b  border-b-[#9e90a8] pb-1">
                            <img class="w-[50px] h-[50px] rounded-[50%]" src="${carts.image}" alt="">
                              <p>${carts.name}</p>
                          <div class="flex gap-2"> <span onclick="update(${index} , 'minus')" class="font-[700]">-</span> <p>${carts.price * item.count}</p> <span onclick="update(${index} , 'plus')"  class="font-[700]">+</span></div>
                            <p onclick="removeshoes(${index})" >x</p>
                        </div>
        `
    }).join('')
    totalpay.innerHTML = `Total : ${total}`
}

function update(index , change){
    if(change === 'plus'){
        sebet[index].count += 1
    }
    else if(change ===  'minus'){
        if(sebet[index].count > 1){
            sebet[index].count -= 1
        }
    }
    else{
        sebet.splice(index , 1 )
    }
    showsebet()
}
function removeshoes(index){
    sebet.splice(index , 1)
    if(sebet.length == 0){
        modal.style.display = 'none'
        overlay.style.display = 'none'
    }
    else{
        shoescount.innerHTML = sebet.length
    }
    showsebet()
}

//Category
let categorycontainer = document.getElementById('categorycontainer')
fetch('https://69b848ece69653ffe6a43962.mockapi.io/Mehsul/api/shoescategory')
.then(response => response.json())
.then(datacategory =>{
    datacategory.map(e =>{
        categorycontainer.innerHTML += `
            <li onclick="filtershoes('${e.category}')" class="bg-[#0d1e4c] text-[#fff] w-[110px] h-[30px] rounded-[5px] my-10 flex justify-center items-center">${e.category}</li>

        `
    })
})


function render(allshoes){
    cartcontainer.innerHTML = allshoes.map(d => {
        const slug = createslug(d.name)
          return `
         <div data-aos="fade-up"  data-aos-duration="1500" class=" border border-white relative w-[180px] h-[300px] overflow-hidden shadow-[0_0_15px_#c48cb3] rounded-tr-[10px] rounded-bl-[10px] pb-6">
                <div class="overflow-hidden"><img class="w-[200px] h-[130px] hover:scale-[1.1] duration-500 ease-in-out" src="${d.image}" alt=""></div>
                <div class="text-white pl-2 pt-2">
                    <p>${d.category}</p>
                    <p>${d.name}</p>
                    <p class="text-[.7em]">${d.description}</p>
                    <p>${d.price} $</p>
                </div>
                <button  class="bg-[#0d1e4c] text-white text-[.8em] w-[70px] h-[30px] rounded-[10px] hover:bg-[#0a1a31] duration-300 ease-in-out absolute top-[6px] right-[6px] "><a href="detail.htm?item=${d.id} - ${slug}" >More</a></button>
                <div class="flex justify-end px-2 items-center mt-3">
                    
                    <button onclick="addbasket(${d.id})" class="bg-[#0d1e4c] text-white text-[.8em] w-[70px] h-[30px] rounded-[10px]  hover:bg-[#0a1a31] duration-300 ease-in-out">+ Add</button>
                </div>
            </div>
        `}).join('')
}

function filtershoes(category){
    const filtrs = (category == 'hamisi') ? allshoes : allshoes.filter(r => r.category == category)
    render(filtrs)
}


//search
let search = document.getElementById('search')
let blocks = document.getElementById('blocks')
let srchcontainer = document.getElementById('srchcontainer')

search.addEventListener('input' , (e)=>{
    let value = e.target.value.toLowerCase()

    if(value == ""){
        blocks.style.display = 'none'
        render(allshoes)
    }
    else{
        blocks.style.display = 'flex'
        searchdata(value)

    }
})
function searchdata(keyword){
    const sh = allshoes.filter(item =>
        item.name.toLowerCase().startsWith(keyword)
    )
    searchData(sh)
}
function searchData(data){
    srchcontainer.innerHTML = data.map(p =>`
            <div class="flex justify-evenly items-center border-b pb-1">
                            <img class="w-[50px] h-[50px] rounded-[50%]" src="${p.image}" alt="">
                              <p>${p.name}</p>
                            <p>${p.price}</p>
                        </div>
        `).join('')
}
//Detail
function createslug(name){
    return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') 
    .replace(/[\s_-]+/g, '-') 
    .replace(/^-+|-+$/g, ''); 
}

//menubar
let menubar = document.getElementById('menubar')
function openmenubar(){
    menubar.style.top = '0'
    menubar.style.transition = '1s ease-in-out'
}
function closemenubar(){
    menubar.style.top = '-100%'
    menubar.style.transition = '1s ease-in-out'
}

