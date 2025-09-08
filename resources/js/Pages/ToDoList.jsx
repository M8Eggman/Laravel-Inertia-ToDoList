import { useEffect, useState } from "react";

export default function ToDoList({ taches, themes, activeTheme }) {
    // Initialise le thème depuis localStorage ou le thème actif passé en props
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") ?? activeTheme?.name ?? "Clair";
    });

    // Met à jour le localStorage quand le thème change
    useEffect(() => {
        localStorage.setItem("theme", theme);
    }, [theme]);

    // Récupère les couleurs du thème sélectionné
    const themeColors = themes.find((t) => t.name === theme)?.colors;

    // Définie les variables CSS selon le thème sélectionné
    const cssVariables = themeColors
        ? {
              "--bg": themeColors.bg,
              "--bg-secondary": themeColors.bg_secondary,
              "--text": themeColors.text,
              "--text-muted": themeColors.text_muted,
              "--accent": themeColors.accent,
          }
        : {};

    return (
        <div className="relative" style={cssVariables}>
            <div className="bgImage h-[40vh]"></div>
            <div className="bg h-full"></div>
            <div className="absolute top-0 w-full flex  justify-center">
                <div
                    className="w-full flex gap-5 flex-col"
                    style={{ width: "min(900px, 90vw)" }}
                >
                    <div className="flex gap-2.5 items-center justify-between mt-[100px]">
                        <h1
                            className="text-white font-medium"
                            style={{
                                fontSize: "clamp(3rem, 10vw, 4rem)",
                                letterSpacing: "clamp(0.25rem, 2.5vw, 2rem)",
                            }}
                        >
                            ToDo
                        </h1>
                        <select
                            value={theme}
                            onChange={(e) => setTheme(e.target.value)}
                            name="theme"
                            className="py-3 pl-3 pr-8 rounded-lg border font-medium outline-none border-none"
                        >
                            {themes.map((t) => (
                                <option key={t.id} value={t.name}>
                                    {t.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <form action="">
                            <input
                                type="text"
                                className="w-full bg-secondary h-[50px] text border-none focus:outline-none focus:ring-2 focus:ring-[var(--accent)] px-5"
                            />
                        </form>
                    </div>
                    <div className="bg-secondary px-5">
                        {taches.map((t) => (
                            <div
                                className="flex gap-2.5 items-center"
                                style={{ minHeight: "70px" }}
                            >
                                <form action="">
                                    <input type="checkbox" name="" id="" />
                                </form>
                                <span>{t.title}</span>
                                <form action="" className="ml-auto">
                                    <button type="submit">X</button>
                                </form>
                            </div>
                        ))}
                    </div>
                    <div
                        className="flex bg-secondary text-muted justify-between items-center gap-2.5 px-5"
                        style={{ minHeight: "70px" }}
                    >
                        <span>Items Left: {taches.length}</span>
                        <ul className="flex gap-5">
                            <li>All</li>
                            <li>Active</li>
                            <li>Completed</li>
                        </ul>
                        <button>Clear Completed</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
