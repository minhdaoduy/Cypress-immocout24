import HomePage from "./PageObjects/HomePage";

describe("Sign In", () => {
  let home;
  before(() => {
    home = new HomePage();
  });
  beforeEach(() => {
    home.visit();
  });

  it.only("sign in", () => {
    const signIn = home.goToSignIn();

    signIn.fillEmail("daoduyminh@gmail.com").fillPassword("operation").submit();
    home.verifyLoginSuccessfulByEmail("daoduyminh@gmail.com");
  });

  it("should sign in with correct credentials", async () => {
    home.verifyLoginSuccessfulByEmail("daoduyminh@gmail.com");
  });
});
