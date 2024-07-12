
class UserPresenter {
    constructor(model) {
        this.model = model
    }

    toJSON() {
        const userData = this.model;
        return {
            id: Number(userData.id) || 1,
            name: (userData.name || '').toUpperCase(),
            email: (userData.email || ''),
            role: (userData.role || '').toUpperCase()
        }
    }

    toJSONNameAndId() {
        const userData = this.model;
        return {
            id: Number(userData.id) || 1,
            name: (userData.name || '').toUpperCase(),
        }
    }
}

module.exports = UserPresenter;