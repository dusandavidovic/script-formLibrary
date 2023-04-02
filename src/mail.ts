type TMail = {
  options: {};
};

interface sendProps {
  recipient: string;
  subject?: string;
  body?: string;
}

class Mail {
  send({ recipient, subject, body }: sendProps) {
    GmailApp.sendEmail(recipient, subject ? subject : "Subject?", body ? body : "Message comes");
  }
  setOptions() {}
  setRecipients(recipient: string, option?: string) {}
}
