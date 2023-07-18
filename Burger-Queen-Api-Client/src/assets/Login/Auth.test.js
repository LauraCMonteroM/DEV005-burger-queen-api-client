import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import Auth from "./login";
import { loginAdmin } from "../../services/Login.services";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

jest.mock("../../services/Login.services", () => ({
  loginAdmin: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("Auth Component", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("renders login form correctly", () => {
    render(<Auth />);

    const emailInput = screen.getByPlaceholderText("ejemplo@ejemplo.com");
    const passwordInput = screen.getByLabelText("Contraseña");
    const loginButton = screen.getByTestId("login-button");

    expect(emailInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
    expect(loginButton).toBeTruthy();
  });

  test("handles form submission correctly", async () => {
    const navigateMock = jest.fn();
    useNavigate.mockReturnValue(navigateMock);

    const mockData = {
      user: {
        role: "admin",
        email: "admin@example.com",
        id: "123",
      },
      accessToken: "token123",
    };
    loginAdmin.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockData),
    });

    render(<Auth />);
    const emailInput = screen.getByPlaceholderText("ejemplo@ejemplo.com");
    const passwordInput = screen.getByPlaceholderText("*********");
    const loginButton = screen.getByTestId("login-button");

    fireEvent.change(emailInput, { target: { value: "admin@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(loginAdmin).toHaveBeenCalledTimes(1);
      expect(loginAdmin).toHaveBeenCalledWith({
        email: "admin@example.com",
        password: "password123",
      });
    });

    expect(navigateMock).toHaveBeenCalledTimes(1);
    expect(navigateMock).toHaveBeenCalledWith("/admin");
  });

  test("throws an error on login failure", async () => {
    const errorMessage = "Usuario no existe";
  
    loginAdmin.mockRejectedValueOnce(new Error("Cannot find user"));
  
    render(<Auth />);
  
    const emailInput = screen.getByPlaceholderText("ejemplo@ejemplo.com");
    const passwordInput = screen.getByPlaceholderText("*********");
    const submitButton = screen.getByTestId("login-button");
  
    fireEvent.change(emailInput, { target: { value: "example@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.click(submitButton);
  
    await waitFor(() => {
      expect(loginAdmin).toHaveBeenCalledTimes(1);
      expect(loginAdmin).toHaveBeenCalledWith({
        email: "example@example.com",
        password: "password",
      });
    });
  
    const errorElement = screen.getByText(errorMessage);
    expect(errorElement).toBeTruthy();
  });

  test("redirects to /menu and sets localStorage for waiter role", async () => {
    const data = {
      user: {
        role: "waiter",
        email: "example@example.com",
        id: "123456789",
      },
      accessToken: "1234567890",
    };
  
    loginAdmin.mockResolvedValueOnce(data);
  
    render(<Auth />);
  
    const submitButton = screen.getByTestId("login-button");
    await fireEvent.click(submitButton); // Agregar el await aquí
  
    await waitFor(() => {
      expect(loginAdmin).toHaveBeenCalledTimes(1);
      expect(loginAdmin).toHaveBeenCalledWith({
        email: "example@example.com",
        password: "password",
      });
      expect(navigateTo).toHaveBeenCalledWith("/menu");
      expect(localStorage.setItem).toHaveBeenNthCalledWith(
        1,
        "accessToken",
        data.accessToken
      );
      expect(localStorage.setItem).toHaveBeenNthCalledWith(
        2,
        "userEmail",
        data.user.email
      );
      expect(localStorage.setItem).toHaveBeenNthCalledWith(
        3,
        "userRole",
        data.user.role
      );
      expect(localStorage.setItem).toHaveBeenNthCalledWith(
        4,
        "userId",
        data.user.id
      );
    });
  });
  
  test("redirects to /cheff and sets localStorage for cheff role", async () => {
    const navigateTo = jest.fn();
    useNavigate.mockReturnValue(navigateTo);
  
    loginAdmin.mockResolvedValueOnce({
      accessToken: "dgdfdhrhrthtrhsh",
      user: {
        email: "chef6@bq.com",
        role: "chef",
        id: "10",
      },
    });
  
    render(<Auth />);
  
    const emailInput = screen.getByPlaceholderText("ejemplo@ejemplo.com");
    const passwordInput = screen.getByPlaceholderText("*********");
    const submitButton = screen.getByTestId("login-button");
  
    fireEvent.change(emailInput, { target: { value: "chef6@bq.com" } });
    fireEvent.change(passwordInput, { target: { value: "131313" } });
    fireEvent.click(submitButton);
  
    await waitFor(() => {
      expect(loginAdmin).toHaveBeenCalledTimes(1);
      expect(loginAdmin).toHaveBeenCalledWith({
        email: "chef6@bq.com",
        password: "131313",
      });
    });
  
    expect(localStorage.setItem).toHaveBeenNthCalledWith(1, "accessToken", "dgdfdhrhrthtrhsh");
    expect(localStorage.setItem).toHaveBeenNthCalledWith(2, "userEmail", "chef6@bq.com");
    expect(localStorage.setItem).toHaveBeenNthCalledWith(3, "userRole", "chef");
    expect(localStorage.setItem).toHaveBeenNthCalledWith(4, "userId", "10");
  });
});
