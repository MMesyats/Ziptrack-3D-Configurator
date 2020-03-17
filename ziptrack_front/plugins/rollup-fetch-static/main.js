import fs from 'fs';
import axios from 'axios';
import { dirname } from 'path';

export function prefetchStatic(options = {}) {
	const { endpoint = 'localhost:8000', apiNames = [], staticDir = `${__dirname}/dist/static` } = options;

	const writeData = (fileName, data) => {
		fs.writeFile(staticDir + `/${fileName.replace('/', '_')}.json`, JSON.stringify(data), (err) => {
			if (err) throw err;
		});
	};

	const getApiData = (api) => {
		const data = (async () => {
			const promise = await axios
				.get(endpoint + api)
				.catch((err) => console.log('\x1b[31m', 'ERR', '\x1b[37m', `[${err.code}]`, endpoint + api));
			if (promise) {
				const data = await promise.data;
				if (data) writeData(api, data);
			}
		})();
	};

	return {
		name: 'rollup-fetch-static',
		resolveId: (source) => (source === 'rollup-fetch-static' ? source : null),
		outputOptions: (opt) => {
			if (!fs.existsSync(staticDir)) fs.mkdirSync(staticDir);
			apiNames.forEach((apiName) => getApiData(apiName));
		}
	};
}
