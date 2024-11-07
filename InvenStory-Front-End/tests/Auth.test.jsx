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
import { signUp } from "../src/service/auth.service.js";

describe("Account Form Tests", () => {
  describe("SignUp form Tests", () => {
    vi.mock("../src/middleware/form.validation.js", () => ({
      default: {
        validatePassword: vi.fn(),
        validateEmail: vi.fn(),
        changeEmail: vi.fn(),
        changePassword: vi.fn(),
        changeUsername: vi.fn(),
      },
      validatePassword: vi.fn(),
      validateEmail: vi.fn(),
      changeEmail: vi.fn(),
      changePassword: vi.fn(),
      changeUsername: vi.fn(),
    }));

    vi.mock("../src/service/auth.service.js", () => ({
      default: {
        signUp: vi.fn(),
      },
      signUp: vi.fn(),
    }));

    beforeEach(() => {
      render(
        <SignUp
          setLoggedIn={() => {}}
          logout={() => {}}
          updateUser={() => {}}
        />,
        {
          wrapper: MemoryRouter,
        }
      );
    });

    test("Error message appears if email isn't valid", async () => {
      const emailInput = screen.queryByPlaceholderText("example@email.com");

      await userEvent.type(emailInput, "badMail");

      expect(emailInput).toHaveValue("badMail");
      expect(validateEmail).toHaveBeenCalled();

      const errorMessage = screen.getByText(
        "Please enter a valid email address"
      );
      expect(errorMessage).toBeInTheDocument();
    });

    test("Error message appears if password isn't valid", async () => {
      const passwordInput = screen.queryByPlaceholderText("Enter Password");

      await userEvent.type(passwordInput, "badPassword");

      expect(passwordInput).toHaveValue("badPassword");
      expect(validatePassword).toHaveBeenCalled();

      const errorMessage = screen.getByText(
        /Password must be at least 8 characters long,contain 1 uppercase letter,a number and a special character/
      );
      expect(errorMessage).toBeInTheDocument();
    });

    test("Error message appears if user name isn't valid", async () => {
      const nameInput = screen.queryByPlaceholderText("YourName");

      await userEvent.type(nameInput, " ");

      expect(nameInput).toHaveValue(" ");
      expect(validatePassword).toHaveBeenCalled();

      const errorMessage = screen.getByText(/Please enter a User Name/);
      expect(errorMessage).toBeInTheDocument();
    });

    test("Submit doesn't work if invalid Email", async () => {
      const submitBtn = screen.getByText("Submit");
      const emailInput = screen.queryByPlaceholderText("example@email.com");

      await userEvent.type(emailInput, "badEmail");

      await userEvent.click(submitBtn);

      expect(signUp).not.toHaveBeenCalled();
    });

    test("Submit doesn't work if invalid password", async () => {
      const submitBtn = screen.getByText("Submit");
      const passwordInput = screen.queryByPlaceholderText("Enter Password");

      await userEvent.type(passwordInput, "badPassword");

      await userEvent.click(submitBtn);

      expect(signUp).not.toHaveBeenCalled();
    });

    test("Submit doesn't work if invalid user name", async () => {
      const submitBtn = screen.getByText("Submit");
      const nameInput = screen.queryByPlaceholderText("YourName");

      await userEvent.type(nameInput, " ");

      await userEvent.click(submitBtn);

      expect(signUp).not.toHaveBeenCalled();
    });
  });

  describe("Login form Tests", () => {
    vi.mock("../src/middleware/form.validation.js", () => ({
      default: {
        validatePassword: vi.fn(),
        validateEmail: vi.fn(),
        changeEmail: vi.fn(),
        changePassword: vi.fn(),
        changeUsername: vi.fn(),
      },
      validatePassword: vi.fn(),
      validateEmail: vi.fn(),
      changeEmail: vi.fn(),
      changePassword: vi.fn(),
      changeUsername: vi.fn(),
    }));

    vi.mock("../src/service/auth.service.js", () => ({
      default: {
        signUp: vi.fn(),
      },
      signUp: vi.fn(),
    }));

    beforeEach(() => {
      render(
        <Login
          setLoggedIn={() => {}}
          logout={() => {}}
          updateUser={() => {}}
        />,
        {
          wrapper: MemoryRouter,
        }
      );
    });
    test("Renders Login Page", async () => {
      const navigateSignUp = screen.getByText("Sign up here");

      expect(navigateSignUp).toBeInTheDocument();
    });
  });
});
