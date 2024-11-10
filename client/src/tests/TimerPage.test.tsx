import { render, screen, fireEvent, waitFor, act} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../App";
 beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

describe('checks UI elements (initial)', () => {

test('checks if the timer gets rendered', () => {
    render(<MemoryRouter initialEntries={['/timer']}>
        <App />
    </MemoryRouter>);
  const intialTimer = screen.getByTestId('timer');
  expect(intialTimer).toBeInTheDocument();

  const intialTimerTime = intialTimer.innerHTML;
  expect(intialTimerTime).toBe('00:00:00s');
});

test('checks if the home button gets rendered', () => {
    render(<MemoryRouter initialEntries={['/timer']}>
        <App />
    </MemoryRouter>);
    const homeButton = screen.getByRole('button', {name: 'home'} );
    expect(homeButton).toBeInTheDocument();

    const homeButtonImage = homeButton.innerHTML;
    expect(homeButtonImage).toBe("<i class=\"bi bi-house\"></i>");
});


test('checks if the start timer button gets rendered', () => {
  render(<MemoryRouter initialEntries={['/timer']}>
        <App />
    </MemoryRouter>);
    const timerButton = screen.getByRole('button', {name: 'start/stopButton'} );
    expect(timerButton).toBeInTheDocument();

    const homeButtonText = timerButton.innerHTML;
    expect(homeButtonText).toBe('Start Timer');
})
});

describe('check UI elements when buttons pressed', () => {
test('when start timer is pressed', async () => {
  render(<MemoryRouter initialEntries={['/timer']}>
        <App />
    </MemoryRouter>);
    const timerButton = screen.getByRole('button', {name: 'start/stopButton'} );
    fireEvent.click(timerButton);

    expect(timerButton.innerHTML).toBe('Stop Timer'); //makes sure that the button is now stop timer

    const intialTimer = screen.getByTestId('timer');
    act(() => jest.advanceTimersByTime(5000)); //waits 5 seconds
    expect(intialTimer.innerHTML).toBe('00:00:05s');

    act(() => jest.advanceTimersByTime(5000)); //waits 5 seconds
    expect(intialTimer.innerHTML).toBe('00:00:10s');

    fireEvent.click(timerButton);
    
    expect(timerButton.innerHTML).toBe('Start Timer');
    expect(intialTimer.innerHTML).toBe('00:00:00s');
})

test('checks if the home button goes to homepage', () => {
    render(<MemoryRouter initialEntries={['/timer']}>
        <App />
    </MemoryRouter>);
    const homeButton = screen.getByRole('button', {name: 'home'} );
    fireEvent.click(homeButton);
    expect(homeButton).not.toBeInTheDocument();
});

});
