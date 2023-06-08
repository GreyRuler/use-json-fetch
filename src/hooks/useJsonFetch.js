import { useEffect, useState } from 'react';

export default function useJsonFetch(url, opts) {
	const [data, setData] = useState([])
	const [isError, setError] = useState(null)
	const [isLoading, setLoading] = useState(true)
	const fetchData = async () => {
		try {
			const response = await fetch(url, opts)
			if (!response.ok) throw new Error(response.statusText)
			const data = await response.json()
			setData(data)
		} catch (e) {
			setError(e.message)
		} finally {
			setLoading(false)
		}
	};
	useEffect(() => {
		fetchData()
	}, [])
	return {data, isError, isLoading}
}
