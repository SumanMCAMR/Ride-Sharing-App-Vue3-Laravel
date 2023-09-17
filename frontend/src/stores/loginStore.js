import { defineStore } from "pinia";
import { ref } from "vue";
import http from "../Helpers/http";
import { useRouter } from "vue-router";

export const loginStore = defineStore("login", {
    state: () => ({
        credentials: {
            phone: null,
            login_code: null,
        },
        waitingForVerification: false,
        isLoading: false,
    }),
    getters: {
        formattedCredentials: (state) => {
            return {
                phone: state.credentials.phone.replaceAll(" ", ""),
                login_code: state.credentials.login_code,
            };
        },
    },
    actions: {
        handleLogin() {
            this.isLoading = true;
            const formattedCredentials = this.formattedCredentials; // Access the getter here
            http()
                .post("/api/login", formattedCredentials) // Use formattedCredentials
                .then((Response) => {
                    console.log(Response.status);
                    this.waitingForVerification = true;
                })
                .catch((Error) => {
                    console.log(Error.message);
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        handleVerification() {
            const router = useRouter();
            this.isLoading = true;
            const formattedCredentials = this.formattedCredentials; // Access the getter here
            http()
                .post("api/login/verify", formattedCredentials) // Use formattedCredentials
                .then((Response) => {
                    console.log("Login successful");
                    console.log(Response.data);
                    localStorage.setItem("token", Response.data);
                    this.router.push({
                        name: "landing",
                    });
                })
                .catch((Error) => {
                    console.log("Some unexpected error occurred");
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
    },
});
