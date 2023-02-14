import "@testing-library/jest-dom/extend-expect"
import { describe, expect, it } from '@jest/globals';
import { getUrlLastSubdirectory } from '../RouteWrapper';


describe('getUrlLastSubdirectory', () => {
    it('returns the last subdirectory of a url with only one tailing forward slash', () => {
      const url = '/asset-lineage/abc123/vertical-lineage/';
      expect(getUrlLastSubdirectory(url)).toBe('vertical-lineage');
    });
    it('returns the last subdirectory of a url with more than one tailing forward slashes', () => {
      const url = '/asset-lineage/abc123/vertical-lineage/////';
      expect(getUrlLastSubdirectory(url)).toBe('vertical-lineage');
    });
    it('returns the last subdirectory of a url with no tailing forward slashes', () => {
      const url = '/asset-lineage/abc123/vertical-lineage';
      expect(getUrlLastSubdirectory(url)).toBe('vertical-lineage');
    });
});
