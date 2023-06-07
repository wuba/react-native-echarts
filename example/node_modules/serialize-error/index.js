'use strict';

class NonError extends Error {
	constructor(message) {
		super(NonError._prepareSuperMessage(message));
		this.name = 'NonError';

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, NonError);
		}
	}

	static _prepareSuperMessage(message) {
		try {
			return JSON.stringify(message);
		} catch (_) {
			return String(message);
		}
	}
}

const commonProperties = [
	'name',
	'message',
	'stack',
	'code'
];

const destroyCircular = (from, seen, to_) => {
	const to = to_ || (Array.isArray(from) ? [] : {});

	seen.push(from);

	for (const [key, value] of Object.entries(from)) {
		if (typeof value === 'function') {
			continue;
		}

		if (!value || typeof value !== 'object') {
			to[key] = value;
			continue;
		}

		if (!seen.includes(from[key])) {
			to[key] = destroyCircular(from[key], seen.slice());
			continue;
		}

		to[key] = '[Circular]';
	}

	for (const property of commonProperties) {
		if (typeof from[property] === 'string') {
			to[property] = from[property];
		}
	}

	return to;
};

const serializeError = value => {
	if (typeof value === 'object' && value !== null) {
		return destroyCircular(value, []);
	}

	// People sometimes throw things besides Error objects…
	if (typeof value === 'function') {
		// `JSON.stringify()` discards functions. We do too, unless a function is thrown directly.
		return `[Function: ${(value.name || 'anonymous')}]`;
	}

	return value;
};

const deserializeError = value => {
	if (value instanceof Error) {
		return value;
	}

	if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
		const newError = new Error();
		destroyCircular(value, [], newError);
		return newError;
	}

	return new NonError(value);
};

module.exports = {
	serializeError,
	deserializeError
};
