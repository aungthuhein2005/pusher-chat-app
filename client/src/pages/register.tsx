import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { register } from "@/api/auth";
import { useNavigate } from "react-router-dom";

export function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await register(name, email, password);
            alert("Registration successful!");
            window.location.href = "/login";
        } catch (error) {
            alert("Error registering user");
        }
    };

    return (
        <div className="max-w-md mx-auto p-6">
            <h2 className="text-xl font-bold mb-4">Register</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <Button type="submit">Register</Button>
            </form>
        </div>
    );
}
