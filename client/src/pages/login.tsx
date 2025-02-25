import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { login } from "@/api/auth";

export function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await login(email, password);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));
            alert("Login successful!");
            window.location.href = "/";
        } catch (error) {
            alert("Invalid credentials");
        }
    };

    return (
        <div className="max-w-md mx-auto p-6">
            <h2 className="text-xl font-bold mb-4">Login</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <Button type="submit">Login</Button>
                <a href="/register" className="underline ms-4 text-blue-500">Register</a>
            </form>
        </div>
    );
}
