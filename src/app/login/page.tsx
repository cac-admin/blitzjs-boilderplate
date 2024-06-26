"use client"
import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { BlitzPage, getAntiCSRFToken } from "@blitzjs/auth";

const LoginPage: BlitzPage = () => {
    const router = useRouter()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const login = async (e: SyntheticEvent<HTMLFormElement>) => {
        const antiCSRFToken = getAntiCSRFToken()
        e.preventDefault()
        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "anti-csrf": antiCSRFToken,
                },
                body: JSON.stringify({ email, password }),
            })
            if (res.ok){
                router.push("/")
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={login}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <button type="submit">
                        Login
                    </button>
                </div>
            </form>
        </div>
    )
    // LoginPage.redirectAuthenticatedTo = "/"
}

export default LoginPage