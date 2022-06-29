// ADD SOME DUMMY DATA
let persons = [
  { fName: 'Denis', lName: 'Bunner', email: 'dbunner@gmail.com', address: 'Manchester, Main Street 45' },
  { fName: 'Holly', lName: 'Smith', email: 'hsmith@gmail.com', address: 'Barcelona, Carrer Nou 12' },
  { fName: 'Ines', lName: 'Baca', email: 'ibaca@gmail.com', address: 'Sevilla, Calle Independencia 39' }
];

persons.forEach(person => { 
  $('.entries-table').append(`<tr>
                          <td>${person.fName}</td>
                          <td>${person.lName}</td>
                          <td>${person.email}</td>
                          <td>${person.address}</td>
                          <td><span class="material-symbols-outlined delete-btn" >cancel</span></td>
                          </tr>`);
});


// INPUT VALIDATION (e.g. all inoput fields are required to have content + email has to have correct form)
$('.text-input').blur(function()
{
    if( $(this).val() ) {
      $(this).parent().children("span").css('visibility', 'visible');
    } 

    if (!$(this).val()) {
      $(this).parent().children("span").css('visibility', 'hidden');
    }
});


$('.email-input').blur(function()
{
    let emailInput = document.getElementById("email")
    if(emailInput.checkValidity()) {
      $(this).parent().children("span").css('visibility', 'visible');
    } 

    if (!$(this).val()) {
      $(this).parent().children("span").css('visibility', 'hidden');
    }
});


// ADDING NEW CONTACTS
$("#form").submit(event => {

    event.preventDefault()

    let formData = $("#form").serializeArray();

    // Create a function which will add the new person to address book

    const addToBook = (inputData) => {

      let person = {
        fName: inputData[0].value,
        lName: inputData[1].value,
        email: inputData[2].value,
        address: inputData[3].value
      };

      persons.push(person);
  
      $('.entries-table').append(`<tr>
                              <td>${person.fName}</td>
                              <td>${person.lName}</td>
                              <td>${person.email}</td>
                              <td>${person.address}</td>
                              <td><span class="material-symbols-outlined delete-btn" >cancel</span></td>
                              </tr>`);
    
      $("#form").trigger("reset");
    
      // Removing validation icons when form is submitted
    
      $(".text-input").parent().children("span").css('visibility', 'hidden');
      $(".email-input").parent().children("span").css('visibility', 'hidden');
    }

    // Check if new user is already in the address book

    let filterDuplicates = persons.filter(person => {
      return person.fName.toLowerCase() === formData[0].value.trim().toLowerCase()
            && person.lName.toLowerCase() === formData[1].value.trim().toLowerCase()
    })

    // If an other entry with same firstName and lastName is already in the list, we warn the user about duplicates

    if(filterDuplicates.length > 0) {
        if(confirm(`There is already one entry for ${filterDuplicates[0].fName} ${filterDuplicates[0].lName}. Are you sure you want to add this person again?`)) {
          addToBook(formData);
        } else {

          //If user doesn't want to add duplicate: we clear the form 
          $("#form").trigger("reset");
          $(".text-input").parent().children("span").css('visibility', 'hidden');
          $(".email-input").parent().children("span").css('visibility', 'hidden');
        }
    } else {
        addToBook(formData);
    }
});

// NAVBAR FUNCTIONALITY .- CHANGING VIEWS BETWEEN ADD AND SEARCH
$(".searchBar").hide();  // DEFAULT VIEW IS THE FORM FOR ADDING USERS

$("#nav-add-new").click(function() {
  $("#nav-search").removeClass("selected");
  $(this).addClass("selected");
  $(".searchBar").hide();
  $("#add-contact-panel").show();
 });
 
 
 
 $("#nav-search").click(function() {
   $("#nav-add-new").removeClass("selected");
   $(this).addClass("selected"); 
   $(".searchBar").show();
   $("#add-contact-panel").hide();
 })
 

// DELETE ENTRIES FROM LIST
$(".entries-table").on("click", ".delete-btn", function(){ 

  let nameToDelete = $(this).parent().parent().children('td').first().text();

  if(confirm(`Are you sure you want to delete ${nameToDelete} from your address book?`)) {
    $(this).closest("tr").remove();
  }
  
});

// SEARCH BAR DYNAMIC TYPING 
$("#search").on("keyup", function() {

  var value = $(this).val().toLowerCase();

  $(".table-body tr").filter(function() {
    $(this).toggle($(this).text().toLowerCase().replace("cancel", "").indexOf(value) > -1)
  });

});


