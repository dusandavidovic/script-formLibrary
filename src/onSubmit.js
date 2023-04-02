/**
 * Form submission event...
 **/

function onFormSubmit(e) {
  var formTitle = FormApp.getActiveForm().getTitle();
  console.log("onFormSubmit - %s", formTitle);

  var resp = getResponse(e);
  var formUrl = resp.getEditResponseUrl();
  var itemResp = resp.getItemResponses();
  //var key = getValueForKey(itemResp, 'BHYC Membership Number');

  //var retVal = validateKey(key);

  //   if (retVal.returnCode === true) {
  //      var cfmMsg = 'Registration is completed, you are going to receive confirmation email';

  //      sendConfirmation(  formTitle, formUrl, retVal.rowOb.emailAddress, retVal.rowOb.firstName, retVal.rowOb.boatName  );

  //   } else {
  //      cfmMsg = 'Your registration failed with: ' + retVal.message + '. Please make sure that your BHYC Memebrship number is correct. Email is not issued!'
  // //     sendErrorMail();
  //      sendConfirmation(  formTitle, formUrl, 'rcsail@bhyc.on.ca', retVal.message, ""  );
  //   }

  console.log(cfmMsg);
  confMessage(cfmMsg);

  return;
}

/********************************************************************************************************************/

/* Execution script *********************/
var VAR_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxcGG3o96TYM_EBve7P4svSuUdtJ95slf1gG2Tzxyh9ZH1TFrg/exec";
//var VAR_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxcGG3o96TYM_EBve7P4svSuUdtJ95slf1gG2Tzxyh9ZH1TFrg/dev";

/* TEST  TEST ***************************/
var VAR_RESP_NUMBER = 0;
/********************************************************************************************************************/

function confMessage(cfmMessage) {
  var form = FormApp.getActiveForm();
  form.setConfirmationMessage(cfmMessage);
}

function validateKey(keyValue) {
  var options = {
    method: "GET",
    followRedirects: true,
    muteHttpExceptions: true,
  };

  var url = VAR_SCRIPT_URL + "?action=lookup" + "&keyValue=" + keyValue;
  var result = UrlFetchApp.fetch(url, options); //execute script
  if (result.getResponseCode() == 200) {
    return JSON.parse(result.getContentText());
  }
}

function getKeyValue(e) {
  var resp = getResponse(e);
  var itemResp = resp.getItemResponses();
  var keyValue = getValueForKey(itemResp, "BHYC Membership Number");

  return keyValue;
}

function getResponse(e) {
  var form, response, responseNumber;

  if (typeof e == "undefined") {
    //TEST ONLY
    form = FormApp.getActiveForm();
    responseNumber = VAR_RESP_NUMBER === 0 ? form.getResponses().length - 1 : VAR_RESP_NUMBER; //dafult is last response
    response = form.getResponses()[responseNumber];
  } else {
    form = e.source;
    response = e.response;
  }

  return response;
}

function getValueForKey(itemResponses, keyTitle) {
  for (var k = 0; k < itemResponses.length; k++) {
    if (itemResponses[k].getItem().getTitle() == keyTitle) {
      return itemResponses[k].getResponse();
    }
  }
}

/***************************************************************************************/
/* EMAIL CONFIRMATION *****************/
/***************************************************************************************/

function sendConfirmation(formTitle, formUrl, email, firstName, boat) {
  // set template
  var html = setMessageBody(firstName, boat, formTitle, formUrl);
  // send mail
  MailApp.sendEmail(
    //    email,
    "dusandavidovic@gmail.com",
    formTitle, // subject
    html,
    {
      // body, options {object}
      htmlBody: html,
      replyTo: "rcsail@bhyc.on.ca",
      name: "BHYC Form Confirmation",
    }
  );
}

function setMessageBody(firstName, boat, formTitle, formUrl) {
  var template = HtmlService.createTemplateFromFile("confEmail");
  template.firstName = capitalize(firstName);
  template.boatName = boat;
  template.eventName = formTitle;
  template.formUrl = formUrl;
  var message = template.evaluate();
  return message.getContent();
}

function capitalize(str) {
  return str.toLowerCase().replace(/\b./g, function (a) {
    return a.toUpperCase();
  });
}
