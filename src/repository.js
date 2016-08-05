export default sclass Repository {
	getById(id) {
		throw new Error("Override me");
	}

	save(entity) {
		throw new Error("Override me");
	}
}