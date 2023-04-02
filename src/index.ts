// TEST form library
const testFormLibrary = "1gWBSM656mofKYa5I38yEDiD6oQNxEUEUdiTdlhCh2eE";
//const testFormLibrary = "1qRIj4wOZ_OR4yG7beCBdfRXG28vxRlhg5sPxtwXm75A"; //thursday

function testFormSubmit() {
  console.log("Hello World");

  const formSubmit = new FormSubmit();
  if (formSubmit.buffer.form === null) formSubmit.setActive(testFormLibrary);

  console.log(formSubmit.buffer.title);

  const body = formSubmit.getMailBody(formSubmit.buffer.lastResponseValues);
  console.log("getMailBody", body);
  const recipient = formSubmit.getRecipient(formSubmit.buffer.lastResponseValues);
  console.log("getRecipient", recipient);

  if (body && recipient) formSubmit.sendEmail();
}

// function testForEach(item) {
//   var aa = item.getItem();

//   console.log(aa.getTitle(), aa.getId());
// }

// function testList(form){
//   // Open a form by ID and log the responses to each question.
// //var form = FormApp.openById('1234567890abcdefghijklmnopqrstuvwxyz');
// var formResponses = form.getResponses();
// for (var i = 0; i < formResponses.length; i++) {
//   var formResponse = formResponses[i];
//   var itemResponses = formResponse.getItemResponses();
//   for (var j = 0; j < itemResponses.length; j++) {
//     var itemResponse = itemResponses[j];
//     console.log('Response #%s to the question "%s" was "%s"',
//         (i + 1).toString(),
//         itemResponse.getItem().getTitle(),
//         itemResponse.getResponse());
//   }
// }
// }
// function sendEmail(e: GoogleAppsScript.Events.FormsOnFormSubmit) {
//   const response = e.response;
//   const recipient = "youremail@example.com"; // replace with your own email address
//   const subject = "New form submission";
//   let message = "A new form submission has been received.\n\n";

//   // loop through the form responses and add them to the email message
//   for (let i = 0; i < response.getItemResponses().length; i++) {
//     const question = response.getItemResponses()[i].getItem().getTitle();
//     const answer = response.getItemResponses()[i].getResponse();
//     message += `${question}: ${answer}\n`;
//   }

//   // send the email
//   GmailApp.sendEmail(recipient, subject, message);
// }
