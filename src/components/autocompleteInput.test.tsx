import { fireEvent, render } from '@testing-library/react';
import AutocompleteInput from './autocompleteInput';

window.HTMLElement.prototype.scrollIntoView = jest.fn()

describe('Input', () => {
    it('should show 0 elements when render the component', () => {
        const { queryAllByRole } = render(
            <AutocompleteInput />,
        );
        const allItens = queryAllByRole('listitem');
        expect(allItens.length).toBe(0);
    });

    it('should show elements when the search match', () => {
        const { getAllByRole, getByTestId } = render(
            <AutocompleteInput />,
        );

        const input = getByTestId('input');

        fireEvent.input(input, { target: { value: 'tam' }});

        const allItens = getAllByRole('listitem');
        expect(allItens.length).toBe(2);
    });

    it('should show 0 elements when the query term is deleted', () => {
        const { queryAllByRole, getByTestId } = render(
            <AutocompleteInput />,
        );

        const input = getByTestId('input');

        fireEvent.input(input, { target: { value: 't' }});
        fireEvent.input(input, { target: { value: '' }});

        const allItens = queryAllByRole('listitem');
        expect(allItens.length).toBe(0);
    });

    it('should find the query in the middle', () => {
        const { getByTitle, getByTestId } = render(
            <AutocompleteInput />,
        );

        const input = getByTestId('input');

        fireEvent.input(input, { target: { value: 'rap' }});
        const item = getByTitle('Grape');

        expect(item).toBeVisible();
    });

    it('should find the query in the beginning', () => {
        const { getByTitle, getByTestId } = render(
            <AutocompleteInput />,
        );

        const input = getByTestId('input');

        fireEvent.input(input, { target: { value: 'grap' }});
        const item = getByTitle('Grape');

        expect(item).toBeVisible();
    });

    it('should not have difference when the query term is upper or lower case', () => {
        const { queryAllByRole, getByTestId } = render(
            <AutocompleteInput />,
        );

        const input = getByTestId('input');

        fireEvent.input(input, { target: { value: 't' }});
        const allItensLowerCase = queryAllByRole('listitem');

        fireEvent.input(input, { target: { value: 'T' }});
        const allItensUpperCase = queryAllByRole('listitem');

        expect(allItensLowerCase.length).toEqual(allItensUpperCase.length);
    });

    it('should fill the input when an option is selected', () => {
        const { getByTitle, getByTestId } = render(
            <AutocompleteInput />,
        );

        const input = getByTestId('input');

        fireEvent.input(input, { target: { value: 't' }});
        const item = getByTitle('Tomato');

        fireEvent.click(item);
        expect(input).toHaveValue('Tomato');
    });

    it('should fill the input when an option is selected using keyboard', () => {
        const { getByTestId } = render(
            <AutocompleteInput />,
        );

        const input = getByTestId('input');

        fireEvent.input(input, { target: { value: 'p' }});

        fireEvent.keyUp(input, { key: 'ArrowDown', code: 'ArrowDown' });
        fireEvent.keyUp(input, { key: 'ArrowDown', code: 'ArrowDown' });
        fireEvent.keyUp(input, { key: 'ArrowUp', code: 'ArrowUp' });
        fireEvent.keyUp(input, { key: 'Enter', code: 'Enter' });

        expect(input).toHaveValue('Apple');
    });

    it('should return to highlight the first element when the user cross the end of the list', () => {
        const { getByTestId } = render(
            <AutocompleteInput />,
        );

        const input = getByTestId('input');

        fireEvent.input(input, { target: { value: 'pea' }});

        fireEvent.keyUp(input, { key: 'ArrowDown', code: 'ArrowDown' });
        fireEvent.keyUp(input, { key: 'ArrowDown', code: 'ArrowDown' });
        fireEvent.keyUp(input, { key: 'ArrowDown', code: 'ArrowDown' });
        fireEvent.keyUp(input, { key: 'ArrowDown', code: 'ArrowDown' });
        fireEvent.keyUp(input, { key: 'Enter', code: 'Enter' });

        expect(input).toHaveValue('Peach');
    });


    it('should not show a list when there is only one result and It`s match the input value', () => {
        const { getByTestId, queryAllByRole } = render(
            <AutocompleteInput />,
        );

        const input = getByTestId('input');
        fireEvent.input(input, { target: { value: 'peach' }});

        const allItens = queryAllByRole('listitem');
        expect(allItens.length).toBe(0);
    });
});