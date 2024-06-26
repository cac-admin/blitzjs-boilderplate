"use client"
import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { BlitzPage, getAntiCSRFToken } from "@blitzjs/auth";

const SignupPage: BlitzPage = () => {
    const router = useRouter();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [role, setRole] = useState('USER')

    const onSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
        const antiCRFToken = getAntiCSRFToken()
        try {
            const res = await fetch("api/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "anti-csrf": antiCRFToken
                },
                body: JSON.stringify({ email, name, password, role })
            })
            if (res.ok) {
                router.replace('/login')
            }
        } catch (error) {
            console.error(error)
        }
    }

    SignupPage.redirectAuthenticatedTo = '/login'

    return (
        <div>
            <h1>Signup Form</h1>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email: </label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="role">Choose a role: </label>
                    <select id="role" name="role" onChange={e => setRole(e.target.value)}>
                        <option value="USER">Normal User</option>
                        <option value="PREMIUM-USER">Premium User</option>
                        <option value="ADMIN">Admin</option>
                    </select>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default SignupPage