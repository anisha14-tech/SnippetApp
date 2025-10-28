<!-- Register.vue -->
<template>
    <div class="wrapper">
        <!--  header  -->
        <div class="header">
            <h1>Snippet App</h1>
        </div>

        <!--  register  -->
        <div>
            <form class="two-column-form">
                <div class="column">
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
                    <input
                        v-model="user.years_experience"
                        type="text"
                        placeholder="Years Experience"
                    />
                    <input
                        v-model="user.programming_languages"
                        type="text"
                        placeholder="Programming Languages (comma separated)"
                    />
                    <p class="error">{{ error }}</p>
                    <button @click="register" type="button">Register</button>
                    <p class="login">Already Registered?</p>
                    <RouterLink class="login-link" to="/login">
                        Login
                    </RouterLink>
                </div>
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
                password: '',
                years_experience: '',
                programming_languages: ''
            },
            error: null
        };
    },
    methods: {
        async register() {
            try {
                const user = this.user;
                user.programming_languages = this.user.programming_languages.split(',');

                const response = await axios.post(
                    'http://localhost:8080/users/register',
                    user
                );
                console.log(response.data);

                // redirect after successful registrations
                this.$router.push('/login');
            } catch (error) {
                // client is setting it's own error message and not reading from server
                this.error = 'username already exists';
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

.two-column-form {
    display: flex;
    justify-content: space-between;
    width: 100%;
}

.two-column-form .column {
    flex: 1;
    padding: 0 10px;
}

form {
    margin: 0px auto;
}

input {
    font-family: 'Saira Extra Condensed', sans-serif;
    color: #333;
    margin-bottom: 15px;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    width: 100%;
}

button {
    width: 100%;
    cursor: pointer;
}

.login {
    display: flex;
    justify-content: center;
    color: #f8f8ff;
}

.login-link {
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
