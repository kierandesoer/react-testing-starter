import { render, screen } from '@testing-library/react';
import ExpandableText from '../../src/components/ExpandableText';
import userEvent from '@testing-library/user-event';

describe('ExpandableText', () => {
    const limit = 255;
    const longText = 'a'.repeat(limit + 1);
    const truncatedText = longText.substring(0, 255) + '...';
    it('should render the full text if less than 255 characters', () => {
        //Arrange
        const text = "Short Text"
        //Act
        render(<ExpandableText text={text} />);
        //Assert
        expect(screen.getByText(text)).toBeInTheDocument();

    });
    it('should expand text when show more button is clicked', async () => {
        render(<ExpandableText text={longText} />);
        
        const button = screen.getByRole('button');
        const user = userEvent.setup();
        await user.click(button);

        expect(screen.getByText(longText)).toBeInTheDocument();
        expect(button).toHaveTextContent(/less/i);
    });
    it('should collapse text when show less button is clicked', async () => {
        render(<ExpandableText text={longText} />);
        const showMoreButton = screen.getByRole('button', {name: /more/i});
        const user = userEvent.setup();
        await user.click(showMoreButton);

        const showLessButton = screen.getByRole('button', {name: /less/i});
        await user.click(showLessButton);

        expect(screen.getByText(truncatedText)).toBeInTheDocument();
        expect(showMoreButton).toHaveTextContent(/more/i);
    })
})