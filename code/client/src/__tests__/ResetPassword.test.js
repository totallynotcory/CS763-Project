import React from "react";
import { render, screen, fireEvent,waitFor  } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import ResetPasswordRequest from "../components/ResetPasswordRequest.js";
import apiClient from "../services/apiClient.js";

//  Mock the API response for login
jest.mock("../services/apiClient.js");

describe("Reset Password Component", () => {
  beforeEach(() => {
    render(
      <Router>
        <ResetPasswordRequest />
      </Router>
    );
  });

  it("renders reset reqeust form correctly", () => {
    //  Check if the form is rendered
    expect(screen.getByLabelText(/email/i, { selector: 'input' })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /request reset/i })).toBeInTheDocument();
  });

  it("allows user to input email", () => {
    const emailInput = screen.getByLabelText(/email/i, { selector: 'input' });
    //  Simulate user input
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    expect(emailInput.value).toBe("test@example.com");
  });

  it("submits the form with valid input and calls the reset password API", async () => {
    //  Mock a successful API response
    apiClient.post.mockResolvedValue({
      data: { token: "fakeToken", userId: "123" },
    });

    const emailInput = screen.getByLabelText(/email/i, { selector: 'input' });
    const submitButton = screen.getByRole("button", { name: /request reset/i });

    //  Simulate user input and form submission
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.click(submitButton);

    //  Check if the reset password API was called
    await waitFor(() => {
      expect(apiClient.post).toHaveBeenCalledWith("/api/users/reset-password-request", {
        email: "test@example.com",
      });
    });
  }); 

  it("displays an error message on failed login attempt", async () => {
    //  Mock an unsuccessful API response
    apiClient.post.mockRejectedValue({
      response: {
        data: { message: "Invalid email provided." },
      },
    });

    const emailInput = screen.getByLabelText(/email/i, { selector: 'input' });
    const submitButton = screen.getByRole("button", { name: /request reset/i });

    //  Simulate user input and form submission
    fireEvent.change(emailInput, { target: { value: "wrong@example.com" } });
    fireEvent.click(submitButton);

    //  Check if the error message is displayed
    expect(await screen.findByText(/reset attempt failed/i)).toBeInTheDocument();
  });
});
