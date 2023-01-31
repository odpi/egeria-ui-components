import "@testing-library/jest-dom/extend-expect"
import { describe, expect, it } from '@jest/globals';
import { customCellRenderer } from '../PropsTable';

describe('customCellRenderer', () => {
    it('renders a link for the "Guid" key', () =>{
        const property = { key: 'Guid', value: 'test123' };
        const result = customCellRenderer(property);

        expect(result.props.href).toBe("/assets/test123/details");
    });
    it('renders a value for the other keys', () =>{
        const property = { key: 'Name', value: 'CustomName' };
        const result = customCellRenderer(property);

        expect(result).toEqual('CustomName');
    });
});
