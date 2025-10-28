<!-- Register.vue -->
<template>
    <div class="wrapper">
        <!--  Header  -->
        <div class="header">
            <h1>Snippet App</h1>
        </div>

        <!--  Login  -->
        <div>
            <form>
                <input
                    v-model="user.username"
                    type="text"
                    placeholder="Username"
                />
                <input
                    v-model="user.password"
                    type="password"
                    placeholder="Password"
                />
                <p class="error">{{ error }}</p>
                <button @click="login" type="button">Login</button>
                <p class="register">Not Registered?</p>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            user: {
                username: '',
                password: ''
            },
            error: null
        };
    },
    methods: {
        async login() {
            try {
                const user = this.user;
                const response = await axios.post(
                    'http://localhost:8080/users/login',
                    user
                );
                console.log(response.data);

                const token = response.headers.authorization;
                console.log(token);

                localStorage.setItem('authToken', token);

                this.$router.push(`/profile/${response.data._id}`);
            } catch (error) {
                // client is reading from server to set error message
                this.error = error.response.data.error;
                console.log(error);
            }
        }
    }
};
</script>

<style scoped>
.header {
    text-align: center;
    color: #f8f8ff;
    padding-bottom: 20px;
}

h1.header {
    font-size: 18px;
}

form {
    max-width: 300px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
}

input {
    font-family: 'Saira Extra Condensed', sans-serif;
    color: #333;
    margin-bottom: 15px;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
}

button {
    width: 100%;
    cursor: pointer;
}

.register {
    display: flex;
    justify-content: center;
    color: #f8f8ff;
}

.register-link {
    display: flex;
    justify-content: center;
    color: #b492ad;
    text-decoration: underline;
}

.error {
    display: flex;
    justify-content: center;
    color: #eb8b7a;
    text-transform: uppercase;
}
</style>
