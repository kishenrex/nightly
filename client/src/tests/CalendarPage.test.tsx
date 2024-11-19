// placeholder
import { render } from "@testing-library/react";
import App from "../App";
import { MemoryRouter } from "react-router-dom";

test('renders learn react link', () => {
  render(<MemoryRouter>
    <App />
    </MemoryRouter>);
});