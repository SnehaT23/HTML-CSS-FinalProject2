// ==== Product Data ====
const products = [
  {
    name: "Stylish Headphones",
    brand: "SoundMax",
    price: "$99.99",
    desc: "Premium headphones with noise cancellation and 20-hour battery life."
  },
  {
    name: "Wireless Earbuds",
    brand: "AudioFlex",
    price: "$59.99",
    desc: "Compact true wireless earbuds with fast charging and deep bass."
  },
  {
    name: "Gaming Headset",
    brand: "ProGamer",
    price: "$129.99",
    desc: "7.1 surround sound headset with detachable mic and RGB lighting."
  }
];

let reviews = [];      // All reviews (for all products combined in this demo)
let selectedRating = 0;

const nameEl  = $("#productName");
const brandEl = $("#productBrand");
const priceEl = $("#productPrice");
const descEl  = $("#productDesc");
const qtyEl   = $("#quantity");
const msgEl   = $("#cartMessage");
const reviewList = $("#reviewsList");
const avgStars = $("#averageStars");
const reviewCount = $("#reviewCount");

// ===== Display Product =====
function showProduct(index) {
  const p = products[index];
  nameEl.text(p.name);
  brandEl.text("Brand: " + p.brand);
  priceEl.text(p.price);
  descEl.text(p.desc);
}
showProduct(0);

// ===== Carousel Change Event =====
$("#productCarousel").on("slid.bs.carousel", function (e) {
  const index = $(e.relatedTarget).index();
  showProduct(index);
  updateReviews(); // show reviews (this demo uses one review list for simplicity)
});

// ===== Add to Cart =====
$("#addToCart").on("click", function(){
  const qty = parseInt(qtyEl.val());
  if(qty > 0){
    msgEl.text(${qty} item(s) of "${nameEl.text()}" added to cart!);
    setTimeout(()=>msgEl.text(""), 3000);
  } else {
    alert("Please enter a valid quantity.");
  }
});

// ===== Reviews =====
function updateReviews(){
  reviewList.empty();
  if(reviews.length === 0){
    reviewList.append("<p class='text-muted'>No reviews yet.</p>");
    avgStars.text("★★★★★").css("color","#ccc");
    reviewCount.text("(0 reviews)");
    return;
  }
  reviews.forEach(r => {
    reviewList.append(`
      <div class="border p-2 mb-2 rounded">
        <div class="text-warning">${"★".repeat(r.rating)}${"☆".repeat(5 - r.rating)}</div>
        <p class="mb-0">${r.text}</p>
      </div>
    `);
  });
  const avg = reviews.reduce((a,b)=>a+b.rating,0) / reviews.length;
  avgStars.text("★".repeat(Math.round(avg)) + "☆".repeat(5 - Math.round(avg)));
  reviewCount.text((${reviews.length} reviews));
}
updateReviews();

// Star input
$(".star").on("mouseenter click", function(e){
  const val = $(this).data("value");
  $(".star").each(function(){
    $(this).toggleClass("active", $(this).data("value") <= val);
  });
  if(e.type === "click") selectedRating = val;
});

// Submit review
$("#submitReview").on("click", function(){
  const text = $("#reviewText").val().trim();
  if(selectedRating === 0 || text === ""){
    alert("Please provide a rating and review text.");
    return;
  }
  reviews.push({rating: selectedRating, text});
  $("#reviewText").val("");
  selectedRating = 0;
  $(".star").removeClass("active");
  updateReviews();
});
