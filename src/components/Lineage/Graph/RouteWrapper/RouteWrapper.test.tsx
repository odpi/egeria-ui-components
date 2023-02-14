import "@testing-library/jest-dom/extend-expect"
import { describe, expect, it } from '@jest/globals';
import { getUrlLastSubdirectory } from '../RouteWrapper';


describe('getUrlLastSubdirectory', () => {
    it('returns the last subdirectory of a url with one or more tailing forward slashes', () => {
      const url = '/asset-lineage/abc123/vertical-lineage/////';
      expect(getUrlLastSubdirectory(url)).toBe('vertical-lineage');
    });
    it('returns the last subdirectory of a url with no tailing forward slashes', () => {
      const url = '/asset-lineage/abc123/vertical-lineage';
      expect(getUrlLastSubdirectory(url)).toBe('vertical-lineage');
    });
});
