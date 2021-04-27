import { fireEvent, render } from '@testing-library/react';
import AutocompleteInput from './autocompleteInput';


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

        fireEvent.input(input, { target: { value: 't' }});

        const allItens = getAllByRole('listitem');
        expect(allItens.length).toBe(4);
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

    it('should not have difference when the query term is upper or lower case', () => {
        const { queryAllByRole, getByTestId } = render(
            <AutocompleteInput />,
        );

        const input = getByTestId('input');

        fireEvent.input(input, { target: { value: 't' }});
        const allItensLowerCase = queryAllByRole('listitem');
        expect(allItensLowerCase.length).toBe(4);

        fireEvent.input(input, { target: { value: 'T' }});
        const allItensUpperCase = queryAllByRole('listitem');
        expect(allItensUpperCase.length).toBe(4);
    });
});