/* eslint-disable no-unused-vars */
import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import EmployeesView from './EmployeesView';

// Mock de los servicios
jest.mock('../../services/Users.services', () => ({
  editDataUser: jest.fn(),
  createUser: jest.fn(),
  getData: jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          { id: 1, email: 'test1@example.com', role: 'waiter' },
          { id: 2, email: 'test2@example.com', role: 'admin' },
        ]),
    })
  ),
  getDataOnlyUser: jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ id: 1, email: 'test1@example.com', role: 'waiter' }),
    })
  ),
  deleteUser: jest.fn(),
}));

describe('EmployeesView', () => {
  beforeEach(() => {
    // Limpiar los mocks y restablecer los valores iniciales antes de cada prueba
    jest.clearAllMocks();
  });

  test('renders the component', async () => {
    render(<EmployeesView />);

    // Esperar a que se carguen los datos
    await waitFor(() => {
        expect(screen.queryByText('test1@example.com')).toBeTruthy();
        expect(screen.queryByText('test2@example.com')).toBeTruthy();
      });
    });

  test('opens the modal for adding a user', async () => {
    render(<EmployeesView />);

    // Hacer clic en el botón para abrir la ventana modal
    fireEvent.click(screen.getByText('Añadir Empleado'));

    // Verificar que la ventana modal se haya abierto
    expect(screen.getByText('Añadir Empleado')).toBeTruthy();

    // Cerrar la ventana modal
    fireEvent.click(screen.getByTestId('closeButton'));

    // Verificar que la ventana modal se haya cerrado
    expect(screen.queryByText('Añadir Empleado')).toBeTruthy();
  });

  test('creates a new user', async () => {
    render(<EmployeesView />);

    // Hacer clic en el botón para abrir la ventana modal de creación
    fireEvent.click(screen.getByText('Añadir Empleado'));

    // Llenar los campos del formulario de creación
    fireEvent.change(screen.getByPlaceholderText('ejemplo@ejemplo.com'), {
      target: { value: 'newuser@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('****************'), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByLabelText('Rol'), {
        target: { value: 'admin' },
    });

    // Hacer clic en el botón de añadir
    fireEvent.click(screen.getByText('Añadir'));

    // Esperar a que se complete la creación del usuario
    await waitFor(() => {
      expect(screen.getByText('newuser@example.com')).toBeTruthy();
    });

    // Verificar que se haya llamado al servicio de createUser con los datos correctos
    expect(createUser).toHaveBeenCalledWith({
      email: 'newuser@example.com',
      password: 'password123',
      role: 'admin',
    });
  });
});