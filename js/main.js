$(document).ready(function(){

  let triggersModal = document.querySelectorAll(".js-show-modal");
      let modals = document.querySelectorAll(".js-modal");

      function closeModal() {
        modals.forEach(modal => {
          if (modal.classList.contains("is-open")) {
            modal.classList.remove("is-open");
          }
        });
      }


      modals.forEach(modal => {
        modal.addEventListener("click", function (event) {
          const isOutside = !event.target.closest(".modal__inner");
          const isCloseButton = event.target.matches(".js-close-modal");
          if (isCloseButton || isOutside) {
            closeModal();
          }
        });
      });

      triggersModal.forEach((button) =>
      button.addEventListener("click", function (e) {
        e.preventDefault();
        let modalID = this.dataset.modal;
        console.log(modalID);
        modals.forEach(function (modal) {
          if (modal.dataset.modal == modalID) {
            modal.classList.add("is-open");
          }
        });


    }));

    
  const items = document.querySelectorAll(".item");
  
  items.forEach((item) => {
      item.addEventListener("click", () => {
          item.classList.toggle("open");
      });
  });
  $('.dropdown-wrapper a').on("click", function(e) {
    e.preventDefault();
    var item = $(this);
    var dropdown = item.parents('.dropdown-wrapper');
    dropdown.find().val(item.data('dropdown-value'));
    dropdown.find('.dropdown-filter').text(item.text());
  });
  
  
  $(".dropdown-wrapper").on("click", function(e) {
    if ( $(this).hasClass("active")){
      $(this).toggleClass("active");
    } else {
      $(this).toggleClass("active");
    }
  });
  
  
  var acc = document.getElementsByClassName("accordion");
  var i;
  
  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var panel = this.nextElementSibling;
      if (panel.style.maxHeight){
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      } 
    });
  }


const burger = document.querySelector(".cta");
const body = document.querySelector("body");
const header = document.querySelector("header");


burger.addEventListener("click", () => {
  body.classList.toggle("body-open");
  header.classList.toggle("body-open");
});

  
  });