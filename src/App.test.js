import React from "react";
import {
  render,
  wait,
  fireEvent,
  waitForElement,
  getByTestId
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { fetchShow as mockfetchShow } from "./api/fetchShow";
import App from "./App";
import Episodes from "./components/Episodes";
import { data } from "./data";
import { act } from "react-dom/test-utils";

jest.mock("./api/fetchShow");

test("renders the app ", () => {
  act(() => {
    mockfetchShow.mockResolvedValueOnce(data);
  });
  render(<App />);
});

test("correct episodes populate when you select a season", async () => {
  act(() => {
    mockfetchShow.mockResolvedValueOnce(data);
  });
  const { getByTestId, getByText } = render(<App />);
  await wait(() => {
    getByText(/Select a season/i);
  });
  const dropDown = getByText(/Select a season/i);
  userEvent.click(dropDown);
  // fireEvent.change(dropDown, {value: "Season 1"})
  const text = getByText(/Season 1/i);
  expect(text).toBeInTheDocument();
  userEvent.click(text);
  getByText(/Season 1, Episode 1/i);
});

// test("renders episodes from the API", () => {});

// test("App renders text", () => {
//   const { getByText } = render(<App />);
//   const text = getByText(/Stranger Things/i);
//   expect(text).toBeInTheDocument();
// });

// jest.mock("./api/fetchShow");

// test("App fetches show data and render data", () => {
// const { getByText, getByTestId } = render(<App />);

// getByText(/Stranger Things/i);
// await wait();
// getByTestId(/showimage/i);
// });

// test("app fetches data", async () => {
//   const {} = render(<App />);

// });
