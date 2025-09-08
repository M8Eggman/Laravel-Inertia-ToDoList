import { useEffect, useState } from "react";

export default function ToDoList() {
    // Réupère le thème depuis localStorage si il existe sinon met le light mode
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") ?? "light";
    });

    // Enregistre le theme dans le localStorage
    useEffect(() => {
        localStorage.setItem("theme", theme);
    }, [theme]);

    return (
        <div className="relative">
            <div className="BgImage"></div>
            <div className="Bg"></div>
            <div className="ToDo"></div>
        </div>
    );
}
