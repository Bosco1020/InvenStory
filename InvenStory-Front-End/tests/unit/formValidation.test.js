import {
  validateEmail,
  validatePassword,
} from "../../src/middleware/form.validation.js";

describe("Form Validation Tests", () => {
describe("Email Validation Tests", () => {
    it("Responds true if given valid email", async () => {
        // Arrange
        const goodEmail = "goodEmail@email.com"
        // Act
        const res = validateEmail(goodEmail);
        // Assert
        expect(res).to.equal(true);
    });
    
    it("Responds false if given invalid email", async () => {
        // Arrange
        const badEmail = "notAnEmail"
        // Act
        const res = validateEmail(badEmail);
        // Assert
        expect(res).to.equal(false);
    });
});

describe("Password Validation Tests", () => {
    it("Responds true if given valid password", async () => {
        // Arrange
        const goodPassword = "GoodPassword@11!"
        // Act
        const res = validatePassword(goodPassword);
        // Assert
        expect(res).to.equal(true);
    });
    
    it("Responds false if given invalid email", async () => {
        // Arrange
        const badPassword = "badPassword"
        // Act
        const res = validatePassword(badPassword);
        // Assert
        expect(res).to.equal(false);
    });
});
});