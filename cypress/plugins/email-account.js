const nodemailer = require("nodemailer");
const makeEmailAccount = async () => {
  const testAccount = await nodemailer.createTestAccount();
  // use testAccount.user and testAccount.pass
  // to log in into the email inbox
  return {
    email: testAccount.user,
    pass: testAccount.pass,

    /**
     * Utility method for getting the last email
     * for the Ethereal email account created above.
     */
    async getLastEmail() {
      return await testAccount.getLastEmail();
      // connect to the IMAP inbox for the test account
      // and get the last email
    },
  };
};
module.exports = makeEmailAccount;
