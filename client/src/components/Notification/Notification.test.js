import { render, screen, fireEvent } from '@testing-library/react';
import Notification from './Notification';
import '@testing-library/jest-dom';

describe('Notification Component', () => {

  it('renders the message passed as a prop', () => {
    const message = 'This is a notification';
    render(<Notification message={message} type="success" onClose={() => {}} />);
    
    expect(screen.getByText(message)).toBeInTheDocument();
  });

  it('renders the message passed as a prop', () => {
    const message = 'This is a notification';
    render(<Notification message={message} type="success" onClose={() => {}} />);
    
    expect(screen.getByText(message)).toBeInTheDocument();
  });

  it('applies the correct CSS class based on type', () => {
    const message = 'Success message';
    
    const { container } = render(<Notification message={message} type="success" onClose={() => {}} />);
    
    expect(container.firstChild).toHaveClass('notification success');
  });

  it('calls onClose when clicked', () => {
    const mockOnClose = jest.fn();
    const message = 'Click to close notification';

    render(<Notification message={message} type="success" onClose={mockOnClose} />);
    
    fireEvent.click(screen.getByText(message));

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('does not throw an error if onClose is not provided', () => {
    const message = 'Notification without close';
    
    render(<Notification message={message} type="success" />);
    
    expect(screen.getByText(message)).toBeInTheDocument();
  });

  it('calls onClose when clicked', () => {
    const mockOnClose = jest.fn();
    const message = 'Click to close notification';

    render(<Notification message={message} type="success" onClose={mockOnClose} />);
    
    fireEvent.click(screen.getByText(message));

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('does not throw an error if onClose is not provided', () => {
    const message = 'Notification without close';
    
    render(<Notification message={message} type="success" />);
    
    expect(screen.getByText(message)).toBeInTheDocument();
  });
});