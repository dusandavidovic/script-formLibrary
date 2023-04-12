## script-fromLibrary

This script library is used to perform functions on Google Forms.

### Current functions:

1. Sending response email after filling the form

### Google Drive implementation:

- Script Name: formLibrary
- Script ID: 1yUGih5tWYgE7y3j34G0RLujb6I055Zr6oz-j50nx4QYb6X3W3jUZ30Vp
- Library include: formLib

### How to use

In Google Forms, create apps script and add library above.
Then add this code:

```
function onFormSubmit(e) {
    var processor = new formLib.FormSubmit(e);
    processor.sendEmail();
}
```
