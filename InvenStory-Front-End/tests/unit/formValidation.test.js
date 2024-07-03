import {
  validateEmail,
  validatePassword,
} from "../../src/middleware/form.validation.js";


describe("Form Email Validation Tests", () => {
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