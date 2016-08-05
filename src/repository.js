export default class Repository {
	getById(id) {
		throw new Error("Override me");
	}

	save(entity) {
		throw new Error("Override me");
	}
}
