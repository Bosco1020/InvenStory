import { beforeEach, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import Login from "../src/components/Login.jsx";
import SignUp from "../src/components/SignUp.jsx";
import AccountForm from "../src/components/AccountForm.jsx";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import {
  validateEmail,
  validatePassword,
} from "/src/middleware/form.validation.js";

describe.skip("Account Form Tests", () => {
  // Email must conform to regex or error is displayed
  // password must conform to regex or error is displayed
  // Submit only functions if Email & Password are valid
  // Should redirect to home if successful
  // Expect a successful Submission to return HTTP 200? and the User Info

  describe("Account Form Tests", () => {
    // validateEmail,
    //validatePassword,
    //setLoggedIn

    vi.mock("/src/middleware/form.validation.js", () => ({
      default: {
        validatePassword: vi.fn(),
        validateEmail: vi.fn(),
      },
      validatePassword: vi.fn(),
      validateEmail: vi.fn(),
    }));

    // vi.mock("/src/components/AccountForm.jsx", () => {
    //   return ({ updateEmailValidation }) => {
    //     const handleChange = vi.fn((event) => {
    //       updateEmailValidation("Invalid");
    //     });

    //     return (
    //       <input
    //         type="text"
    //         onChange={handleChange}
    //         data-testid="child-input"
    //       />
    //     );
    //   };
    // });

    beforeEach(() => {
      validatePassword.mockClear();
      validatePassword.mockResolvedValue();

      validateEmail.mockClear();
      validateEmail.mockResolvedValue();

      // changeLoggedIn, newAccount, setLogout, user
      render(
        <AccountForm
          changeLoggedIn={() => {}}
          newAccount={true}
          setLogout={() => {}}
          user={() => {}}
        />,
        {
          wrapper: MemoryRouter,
        }
      );
    });

    test("Error message appears if email isn't valid", async () => {
      validateEmail.mockClear();
      validatePassword.mockClear();
      validatePassword.mockResolvedValue("Invalid");
      validateEmail.mockResolvedValue("Invalid");

      const emailInput = screen.queryByPlaceholderText("example@email.com");

      await userEvent.type(emailInput, "badMail");

      expect(emailInput).toHaveValue("badMail");
      expect(validateEmail).toHaveBeenCalled();

      const errorMessage = screen.getByText(
        "Please enter a valid email address"
      );

      expect(errorMessage).toBeInTheDocument();
    });
  });
});
