
const PRODUCTS=[
{id:1,name:"Urban Runner Blue",brand:"KAZE",cat:"Shoes",price:1999,old:2499,discount:20,emoji:"👟",sizes:["6","7","8","9","10","11"],colors:["Blue","Black"],stock:12,desc:"Comfortable everyday runner with a clean modern look."},
{id:2,name:"Classic Street Sneaker",brand:"KAZE",cat:"Shoes",price:2299,old:2999,discount:23,emoji:"👟",sizes:["6","7","8","9","10"],colors:["White","Black"],stock:8,desc:"Versatile casual sneaker for daily wear."},
{id:3,name:"Chrono Steel Watch",brand:"KAZE",cat:"Watches",price:2799,old:3499,discount:20,emoji:"⌚",sizes:[],colors:["Silver","Black"],stock:7,desc:"Premium-inspired steel watch with a timeless dial."},
{id:4,name:"Minimal Black Watch",brand:"KAZE",cat:"Watches",price:1899,old:2399,discount:21,emoji:"⌚",sizes:[],colors:["Black"],stock:15,desc:"Minimal watch designed for everyday styling."},
{id:5,name:"Everyday Casual Shirt",brand:"KAZE",cat:"Clothing",price:999,old:1299,discount:23,emoji:"👕",sizes:["S","M","L","XL"],colors:["Blue","White","Black"],stock:18,desc:"Simple casual shirt with a comfortable fit."},
{id:6,name:"Premium Crossbody Bag",brand:"KAZE",cat:"Accessories",price:1499,old:1999,discount:25,emoji:"👜",sizes:[],colors:["Black","Brown"],stock:5,desc:"Compact crossbody bag for everyday essentials."},
{id:7,name:"KZ Pro Smartphone",brand:"KAZE",cat:"Phones & Tech",price:14999,old:17999,discount:17,emoji:"📱",sizes:[],colors:["Black","Blue"],stock:4,desc:"Demo smartphone product for the KAZE catalogue."},
{id:8,name:"Wireless Earbuds Pro",brand:"KAZE",cat:"Phones & Tech",price:1299,old:1799,discount:28,emoji:"🎧",sizes:[],colors:["White","Black"],stock:9,desc:"Compact wireless earbuds for everyday listening."}
];
const money=n=>"₹"+Number(n).toLocaleString("en-IN");
function getCart(){return JSON.parse(localStorage.getItem("kaze_cart")||"[]")}
function setCart(c){localStorage.setItem("kaze_cart",JSON.stringify(c));updateCount()}
function addToCart(id,size="",color=""){let p=PRODUCTS.find(x=>x.id==id),c=getCart();let k=c.find(x=>x.id==id&&x.size==size&&x.color==color);k?k.qty++:c.push({id,size,color,qty:1});setCart(c);toast("Added to cart 🛒")}
function updateCount(){let n=getCart().reduce((a,x)=>a+x.qty,0);document.querySelectorAll(".cart-count").forEach(e=>e.textContent=n)}
function toast(t){let e=document.querySelector(".toast");if(!e)return;e.textContent=t;e.style.display="block";clearTimeout(window._t);window._t=setTimeout(()=>e.style.display="none",1700)}
function orderWhatsApp(items=getCart()){let lines=items.map(x=>{let p=PRODUCTS.find(y=>y.id==x.id);return `Product Name: ${p.name}%0AColor: ${x.color||"Not selected"}%0ASize: ${x.size||"Not applicable"}%0AQuantity: ${x.qty}`}).join("%0A%0A");let msg=`Hello KAZE STOREZ,%0A%0AI want to place an order.%0A%0A${lines}%0A%0ACustomer Name: %0APhone Number: %0ADelivery Address: %0APincode: `;window.open("https://wa.me/919946375868?text="+msg,"_blank")}
function productCard(p){return `<article class="card"><span class="badge">${p.discount}% OFF</span><button class="heart" onclick="toast('Added to wishlist ❤️')">♡</button><div class="pic">${p.emoji}</div><div class="info"><div class="brand">${p.brand} • ${p.cat}</div><div class="name">${p.name}</div><div><span class="price">${money(p.price)}</span><span class="old">${money(p.old)}</span></div><div class="card-actions"><button class="btn blue" onclick="addToCart(${p.id})">Add to Cart</button><a class="btn dark" href="product.html?id=${p.id}">Buy Now</a></div></div></article>`}
function renderProducts(list=PRODUCTS,target="products"){let e=document.getElementById(target);if(e)e.innerHTML=list.map(productCard).join("")}
function filterProducts(){let q=(document.getElementById("search")?.value||"").toLowerCase();renderProducts(PRODUCTS.filter(p=>(p.name+" "+p.brand+" "+p.cat).toLowerCase().includes(q)))}
document.addEventListener("DOMContentLoaded",updateCount);
