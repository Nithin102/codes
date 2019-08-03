
//==========================================modal start

 //----------------------------------------
 let activeModal = null;
 let activeBookingForm = null;

 //To show a modal window
 const showModal = (modalName, options) =>{
   activeModal = modalName;
   $('#'+modalName).css("display","flex");
   
   $('#selectLocation .modal-item').css('display','flex');
   if(options){
    $('#selectLocation .modal-item').css('display','none');
    $('#selectLocation .modal-item').get(options.loc -1 ).style.display = "flex";
    }

   //modal specific operations
   if(modalName == "bookOnline"){
     activeBookingForm = bookingTemplate[0];
     $('#'+activeBookingForm).css("display","flex");
   }
 }

 //close the active modal 
 const closeModal = () => {
   $('#'+ activeModal).css("display","none");

   //modal specific operations
   if(activeBookingForm){
     $('#'+ activeBookingForm).css("display","none");
   }
   activeModal = null;
 }

 //to close modal when clicked outside the modal
 window.onclick = function(event) {
   let modal = $('#'+activeModal).get(0);
   if (event.target == modal) {
     modal.style.display = "none";
   }
 }
 //==========================================modal end



const bookingTemplate = [
    'selectLocation',
    'selectDoctor',
    'appointmentDetails',
    'done'
];


const formDetails = {};

bookingTemplate.forEach(form => {
    let elem =  $('#'+form);
    if(elem){
        $(elem).css({"display": "none"});
    }
    // $('#'+form).get(0).style.display = "none";
})

const nextPage = (val) => { 
    switch(activeBookingForm){
        case "selectLocation":
            formDetails.location = val;
            break;
        case "selectDoctor":
            formDetails.doctor = val;
            break;
        case "appointmentDetails":
            formDetails.form = val;
            break;
        case "done":
        break;
    }
    showNextPage();
}

const backPage = () => {
    let index = bookingTemplate.indexOf(activeBookingForm);
    $('#'+activeBookingForm).get(0).style.display = "none";
    activeBookingForm = bookingTemplate[index - 1];
    $('#'+activeBookingForm).get(0).style.display = "flex";
}

const showNextPage = () =>{
    let index = bookingTemplate.indexOf(activeBookingForm);
    $('#'+activeBookingForm).get(0).style.display = "none";
    activeBookingForm = bookingTemplate[index +1];
    $('#'+activeBookingForm).get(0).style.display = "flex";
}

const bookingSubmit = () => {
    if(validateForm()){
        showNextPage();
    }else{
        return false;
    }
}

const validateForm = () => {
    let isValid = true;
    const firstName = $('input[name=firstName]').get(0);
    if(!firstName.value){
        isValid = false;
        firstName.style.outline = "1px solid red";
    }
    const lastName = $('input[name=lastName]').get(0);
    if(!lastName.value){
        isValid = false;
        lastName.style.outline = "1px solid red";
    }

    const email = $('input[name=email]').get(0);
    if(!email.value){
        isValid = false;
        email.style.outline = "1px solid red";
    }

    const phone = $('input[name=phone]').get(0);
    if(!phone.value){
        isValid = false;
        phone.style.outline = "1px solid red";
    }


    return isValid;
}

var appointmentForm = document.querySelector('#booking');
var submit = document.querySelector('#submit');

appointmentForm.addEventListener('click', function(){
    console.log("appointmentForm clicked");
},true);

submit.addEventListener('click', function(){
    console.log("submit clicked");
});

var done = document.querySelector('#done');
var button = document.querySelector('#success');

done.addEventListener('click', function(){
    console.log("done modal clicked");
},true);

button.addEventListener('click', function(){
    console.log("donButton clicked");
});

//to close modal when clicked outside the modal
window.onclick = function(event) {
    let modal = $('#'+activeModal).get(0);
    if (event.target == modal) {
        modal.style.display = "none";
    }
}