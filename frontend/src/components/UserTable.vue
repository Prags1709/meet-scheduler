<template>
    <tr>
        <td>{{ user.name }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.role }}</td>
        <td>
            <img @click="openUserUpdatebox" src='../assets/editing.png' alt="edit">
            <div class="form-wrapper create-user-popup" v-if="isUpdateUserBox">
                <h3>UPDATE USER DETAILS</h3>
                <div @click="closeBox" class="close">
                    <img src="../assets/close.png" alt="cancel">
                </div>
                <form @submit.prevent="updateUserDetail">
                    <label for="name">Name:</label>
                    <input type="text" id="name" v-model="name">
                    <label for="email">Email:</label>
                    <input type="email" id="email" v-model="email">
                    <label for="role">Role:</label>
                    <input type="text" id="role" v-model="role">
                    <button type="submit">UPDATE</button>
                </form>
            </div>
        </td>
        <td>
            <img @click="deleteUserById(user.id)" src='../assets/delete.png' alt="delete">
        </td>
    </tr>
</template>

<script>

export default {
    props: ['user', 'setUsersDatafunction'],
    data() {
        return {
            isUpdateUserBox: false,
            name: this.user.name,
            email: this.user.email,
            role: this.user.role
        }
    },
    methods: {
        async deleteUserById(id) {
            try {
                if (confirm('Are you sure, Do you want to Delete?')) {
                    await this.$store.dispatch('deleteUserData', id);
                    this.setUsersDatafunction();
                }
            }
            catch (error) {
                console.error(error);
                alert("Failed to delete user, try again");
            }
        },
        async updateUserDetail() {
            try {
                if (this.name && this.email && this.role) {
                    if (confirm('Are you sure, Do you want to Update?')) {
                        const queryData = {
                            userId: this.user.id,
                            user: (this.user.name).toLowerCase()
                        }
                        const updatedData = {
                            name: (this.name).toLowerCase(),
                            email: this.email,
                            role: (this.role).toLowerCase()
                        }
                        await this.$store.dispatch('updateUserData', { queryData, updatedData });
                        this.isUpdateUserBox = false
                        this.setUsersDatafunction();
                    }
                } else {
                    alert("Please fill all the details")
                }
            }
            catch (error) {
                console.error(error);
                alert("Failed to update user, try again");
            }
        },
        openUserUpdatebox() {
            this.isUpdateUserBox = true
        },
        closeBox() {
            this.isUpdateUserBox = false
        }
    }
}
</script>

<style>
tr>td {
    text-align: center;
}

tr>td>img {
    width: 30px;
    cursor: pointer;
}
</style>