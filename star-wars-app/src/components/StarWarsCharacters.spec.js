import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import { getData as mockGetData } from '../api';
import { mockData } from '../mockData/'
import StarWarsCharacters from './StarWarsCharacters';

jest.mock('../api');

test('renders the characters component with charactrs and buttons', async () => {
  mockGetData.mockResolvedValue(mockData)
  const { getByTestId, getByText, getAllByText } = render(<StarWarsCharacters />);
  
  const nextButton = getByTestId('next-button');
  
  await wait(() => { getAllByText(/luke/i) })
  expect(getByText("luke"))
  expect(getByText(/luke1/i))
  expect(getByText(/luke2/i))

  expect(mockGetData).toHaveBeenCalledTimes(1);
  expect(mockGetData).toHaveBeenCalledWith('https://swapi.co/api/people');
  expect(getByTestId("characters-container")).toHaveTextContent("PreviousNext")

  fireEvent.click(nextButton);

  expect(mockGetData).toHaveBeenCalledWith('nextURL');
  expect(mockGetData).toHaveBeenCalledTimes(2);
  wait(() =>{});
});
