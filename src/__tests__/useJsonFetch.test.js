import useJsonFetch from '../hooks/useJsonFetch';
import { renderHook, waitFor } from '@testing-library/react';

global.fetch = jest.fn();

describe('useJsonFetch', () => {
	test('should fetch data', async () => {
		const mockedData = [];
		const mockOpts = {
			method: 'GET'
		}
		const mockResponse = {
			ok: true,
			json: jest.fn().mockResolvedValue(mockedData)
		};
		global.fetch.mockResolvedValue(mockResponse)

		const {result} = renderHook(() =>
			useJsonFetch('https://example.com', mockOpts)
		);

		expect(result.current.isLoading).toBe(true);

		await waitFor(() =>
			expect(result.current).toEqual({
				data: mockedData,
				isError: null,
				isLoading: false,
			})
		);
	});

	test('should handle error', async () => {
		const mockOpts = {method: 'GET'};
		const messageError = 'Not found'
		const mockResponse = {
			ok: false,
			statusText: messageError,
		};
		global.fetch.mockResolvedValue(mockResponse)

		const {result} = renderHook(() =>
			useJsonFetch('https://example.com', mockOpts)
		);

		expect(result.current.isLoading).toBe(true);

		await waitFor(() =>
			expect(result.current).toEqual({
				data: [],
				isError: messageError,
				isLoading: false,
			})
		);
	});
});
