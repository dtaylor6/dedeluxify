import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import 'jest-styled-components';

import WebsiteHeader from '../../src/components/WebsiteHeader/WebsiteHeader';

import * as dbServiceModule from '../../src/services/databaseService';
let mockedDeleteUser;

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('WebsiteHeader tests', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    mockedDeleteUser = jest
      .spyOn(dbServiceModule, 'DeleteUser')
      .mockImplementation(() => true);
  });

  afterEach(() => {
    mockedDeleteUser.mockRestore();
  });

  test('profile window is not shown by default', async () => {
    render(<WebsiteHeader  profilePic="" />);
    expect(screen.queryByText('Sign out')).toBeFalsy();
    expect(screen.queryByText('Delete data')).toBeFalsy();
  });

  test('profile window is shown when button is clicked', async () => {
    render(<WebsiteHeader  profilePic="" />);
    expect(screen.queryByText('Sign out')).toBeFalsy();
    expect(screen.queryByText('Delete data')).toBeFalsy();

    const user = userEvent.setup();
    const profileBtn = screen.getByRole('button');
    await user.click(profileBtn);
    expect(screen.queryByText('Sign out')).toBeTruthy();
    expect(screen.queryByText('Delete data')).toBeTruthy();
  });

  test('profile button turns green when clicked', async () => {
    const user = userEvent.setup();
    render(<WebsiteHeader  profilePic="" />);
    const profileBtn = screen.getByRole('button');

    // Border should be changed to Spotify green
    await user.click(profileBtn);
    expect(profileBtn).toHaveStyleRule('border', 'solid #1DB954');
  });

  test('pressing sign out button', async () => {
    render(<WebsiteHeader  profilePic="" />);
    expect(screen.queryByText('Sign out')).toBeFalsy();
    expect(screen.queryByText('Delete data')).toBeFalsy();

    const user = userEvent.setup();
    const profileBtn = screen.getByRole('button');
    await user.click(profileBtn);
    expect(screen.queryByText('Sign out')).toBeTruthy();
    expect(screen.queryByText('Delete data')).toBeTruthy();

    // Mocking window.location.reload() to prevent error
    const location = window.location;
    delete window.location;
    window.location = {
      ...location,
      reload: jest.fn()
    };
    const signoutBtn = screen.getByText('Sign out');
    await user.click(signoutBtn);
    expect(window.location.reload).toHaveBeenCalledTimes(1);
    expect(mockedUsedNavigate).toHaveBeenCalledTimes(1);
    window.location = location;
  });

  test('pressing delete data button', async () => {
    render(<WebsiteHeader  profilePic="" />);
    expect(screen.queryByText('Sign out')).toBeFalsy();
    expect(screen.queryByText('Delete data')).toBeFalsy();

    const user = userEvent.setup();
    const profileBtn = screen.getByRole('button');
    await user.click(profileBtn);
    expect(screen.queryByText('Sign out')).toBeTruthy();
    expect(screen.queryByText('Delete data')).toBeTruthy();

    const confirmSpy = jest.spyOn(window, 'confirm');
    confirmSpy.mockImplementation(jest.fn(() => true));
    const deleteBtn = screen.getByText('Delete data');

    await user.click(deleteBtn);
    expect(mockedDeleteUser).toHaveBeenCalledTimes(1);
    confirmSpy.mockRestore();
  });
});

