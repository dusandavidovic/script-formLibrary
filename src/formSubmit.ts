type TFormSubmit = {
  form: GoogleAppsScript.Forms.Form | null;
  lastResponse: GoogleAppsScript.Forms.FormResponse | null;
  lastResponseValues: FormResponseObject[];
  title: string;
};

interface FormResponseObject {
  question: string;
  answer: string | any;
}

class FormSubmit {
  C: {
    email: "Email Address";
  };
  buffer: TFormSubmit = {
    form: null,
    lastResponse: null,
    lastResponseValues: [],
    title: "",
  };
  constructor(e?: any) {
    if (e) {
      this.buffer.form = e.source;
      if (this.buffer.form) this.buffer.title = this.buffer.form?.getTitle();
      this.buffer.lastResponse = e.response;
      if (this.buffer.lastResponse)
        this.buffer.lastResponseValues = this.getResponseObject(this.buffer.lastResponse);
    } else {
      this.buffer.form = FormApp.getActiveForm();
      if (this.buffer.form) this.buffer.title = this.buffer.form?.getTitle();
      this.buffer.lastResponse = this.getLastResponse(this.buffer.form);
      if (this.buffer.lastResponse)
        this.buffer.lastResponseValues = this.getResponseObject(this.buffer.lastResponse);
    }
  }
  private getLastResponse(form: GoogleAppsScript.Forms.Form) {
    if (form) {
      const responses = form.getResponses();
      const lastResponseNumber = responses.length - 1;
      return responses[lastResponseNumber - 1];
    }
    return null;
  }

  /*  Use this method for test when you need to provide form
   */
  setActive(id: string) {
    this.buffer.form = FormApp.openById(id);
    if (this.buffer.form) this.buffer.title = this.buffer.form?.getTitle();
    this.buffer.lastResponse = this.getLastResponse(this.buffer.form);
    if (this.buffer.lastResponse)
      this.buffer.lastResponseValues = this.getResponseObject(this.buffer.lastResponse);
  }

  getResponseObject(response: GoogleAppsScript.Forms.FormResponse): FormResponseObject[] {
    // loop through the form response
    const respObjs: FormResponseObject[] = [];
    const itemResp = response.getItemResponses();
    for (let i = 0; i < itemResp.length; i++) {
      const respObj: FormResponseObject = { question: "", answer: "" };
      respObj.question = itemResp[i].getItem().getTitle();
      respObj.answer = itemResp[i].getResponse();
      respObjs.push(respObj);
    }
    return respObjs;
  }

  getMailBody(respObject: FormResponseObject[]) {
    let body: string = "";
    respObject.forEach((item) => {
      body += `${item.question}: ${item.answer}\n`;
    });
    return body;
  }
  getRecipient(respObj: FormResponseObject[]) {
    const value = respObj.filter((item: FormResponseObject) => {
      return item.question === COMMON_FIELDS.email;
    });

    return value[0] ? value[0].answer : "";
  }

  sendEmail(responseValues?: FormResponseObject[]) {
    const respValues = !responseValues ? this.buffer.lastResponseValues : responseValues;
    const recipient = this.getRecipient(respValues);
    const subject = "Google Forms Response: " + this.buffer.title;
    let message = this.getMailBody(respValues);

    // send the email
    GmailApp.sendEmail(recipient, subject, message);
  }
}
