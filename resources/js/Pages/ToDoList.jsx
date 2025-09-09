import { router, useForm } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";
import { RxCheck, RxCross1 } from "react-icons/rx";
import { route } from "ziggy-js";

export default function ToDoList({ taches, themes, activeTheme, lastId }) {
    const { post, data, setData, errors, reset } = useForm({
        title: "",
        completed: false,
    });

    const [tempTasks, setTempTasks] = useState(taches);
    // Garde en mémoire le dernier id
    const [id, setId] = useState(lastId);

    // Initialise le thème depuis localStorage ou le thème actif passé en props
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") ?? activeTheme?.name ?? "Clair";
    });

    // Met à jour le localStorage quand le thème change
    useEffect(() => {
        localStorage.setItem("theme", theme);
    }, [theme]);

    const [showModal, setShowModal] = useState(false);
    // Quand Le modal est active désactive le scroll
    useEffect(() => {
        if (showModal) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }
        return () => document.body.classList.remove("overflow-hidden");
    }, [showModal]);

    // Récupère les couleurs du thème sélectionné
    const themeColors = themes.find((t) => t.name === theme)?.colors;
    // Définie les variables CSS selon le thème sélectionné
    useEffect(() => {
        if (!themeColors) return;

        // Récupère la balise html et lui intègre les variables css
        const root = document.documentElement;
        root.style.setProperty("--bg", themeColors.bg);
        root.style.setProperty("--bg-secondary", themeColors.bg_secondary);
        root.style.setProperty("--text", themeColors.text);
        root.style.setProperty("--text-muted", themeColors.text_muted);
        root.style.setProperty("--accent", themeColors.accent);
    }, [themeColors]);

    // Variable pour le filtre, par défaut "all"
    const [filter, setFilter] = useState("all");
    // filtre les taches selon si ils sont complétés ou non
    const filteredTask =
        filter === "all"
            ? tempTasks
            : tempTasks.filter((t) =>
                  filter === "active" ? !t.completed : t.completed
              );

    const submitTimeout = useRef(null);
    const [loading, setLoading] = useState(false);
    function handleSubmit(e) {
        e.preventDefault();

        // Empêche les appels rapides
        if (loading) return;

        // Empêche la création si le champ est vide ou ne contient que des espaces
        if (!data.title || !data.title.trim()) return;

        setLoading(true);

        setId((prev) => prev + 1);

        // Crée la nouvelle tâche
        const newTask = {
            id: id + 1,
            title: data.title.trim(),
            completed: data.completed,
        };

        setTempTasks((tasks) => [...tasks, newTask]);

        setData("title", "");
        setData("completed", false);

        post(route("tasks.store"), {
            preserveScroll: true,
            preserveState: true,
            data: {
                title: data.title.trim(),
                completed: data.completed,
            },
            onFinish: () => {
                clearInterval(submitTimeout.current);
                submitTimeout.current = setTimeout(() => {
                    setLoading(false);
                }, 500);
            },
        });
    }

    const intervalRef = useRef({});
    function handleToggleTask(e, id) {
        if (loading) return;

        // Supprime le timeout existant si re clique sur le même checked
        if (intervalRef.current[id]) {
            clearTimeout(intervalRef.current[id]);
            delete intervalRef.current[id];
        }

        // Mise à jour immédiate côté frontend
        setTempTasks((tasks) =>
            tasks.map((t) =>
                t.id === id ? { ...t, completed: e.target.checked } : t
            )
        );

        // Définit un nouveau timeout pour mettre à jour la DB
        intervalRef.current[id] = setTimeout(() => {
            router.put(route("tasks.update.checked", id), {
                completed: e.target.checked,
                preserveScroll: true,
                preserveState: true,
            });
        }, 300);
    }

    function handleDestroy(id) {
        if (loading) return;

        setTempTasks((tasks) => tasks.filter((t) => t.id !== id));
        router.delete(route("tasks.destroy", id), {
            preserveScroll: true,
            preserveState: true,
        });
    }

    function handleDestroyComplete() {
        if (loading) return;

        setTempTasks((tasks) => tasks.filter((t) => !t.completed));
        router.delete(route("tasks.destroy.completed"), {
            preserveScroll: true,
            preserveState: true,
        });
    }

    return (
        <>
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center text z-50">
                    <div
                        className="bg-secondary rounded-lg p-6 flex flex-col gap-4"
                        style={{ width: "min(25rem, 90vw)" }}
                    >
                        <h2 className="text-lg font-semibold">
                            Confirmer la suppression
                        </h2>
                        <p className="text-muted">
                            Voulez-vous vraiment supprimer toutes les tâches
                            complétées ?
                        </p>
                        <div className="flex justify-end gap-2">
                            <button
                                autoFocus
                                className="px-4 py-2 rounded bg text transition-all hover:brightness-75"
                                onClick={() => setShowModal(false)}
                            >
                                Annuler
                            </button>
                            <button
                                className="px-4 py-2 rounded transition-all text-white bg-red-500 hover:brightness-75"
                                onClick={() => {
                                    setShowModal(false);
                                    handleDestroyComplete();
                                }}
                            >
                                Supprimer
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="bg relative min-h-screen">
                <div className="w-full flex  justify-center">
                    <div
                        className="w-full flex gap-5 flex-col my-[100px] min-w-[min(900px, 90vw)]"
                        style={{ width: "min(900px, 90vw)" }}
                    >
                        <div className="flex flex-col justify-center sm:flex-row sm:justify-between gap-2.5 items-center">
                            <h1
                                className="text font-medium text-h1"
                                style={{
                                    letterSpacing:
                                        "clamp(0.25rem, 2.5vw, 2rem)",
                                }}
                            >
                                ToDo
                            </h1>
                            <select
                                value={theme}
                                onChange={(e) => setTheme(e.target.value)}
                                name="theme"
                                className="py-4 pl-4 pr-10 bg-secondary text rounded-lg border font-medium outline-none border-none"
                            >
                                {themes.map((t) => (
                                    <option
                                        className="bg-secondary text"
                                        key={t.id}
                                        value={t.name}
                                    >
                                        {t.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <small className="text-muted text-sm-custom">
                                Tâche de 50 charactères maximal
                            </small>
                            <div
                                className={`w-full mt-2 h-1 bg-blue-500  ${
                                    loading
                                        ? "opacity-100 animate-pulse"
                                        : "opacity-0"
                                }`}
                            ></div>
                            <form
                                onSubmit={handleSubmit}
                                className="flex px-5 mt-2 gap-5 bg-secondary items-center"
                            >
                                <div>
                                    <input
                                        type="checkbox"
                                        id="task-create"
                                        className="hidden peer"
                                        checked={data.completed}
                                        value={data.completed}
                                        onChange={(e) =>
                                            setData(
                                                "completed",
                                                e.target.checked
                                            )
                                        }
                                    />
                                    <label
                                        htmlFor="task-create"
                                        className="flex items-center justify-center w-6 h-6 border-2 rounded-lg cursor-pointer border-[var(--accent)] text-[var(--accent)] peer-hover:bg-[var(--accent)] peer-checked:bg-[var(--accent)] peer-checked:text-[var(--text)] transition-all"
                                    >
                                        {data.completed ? <RxCheck /> : ""}
                                    </label>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Create a new ToDo..."
                                    maxLength={50}
                                    className="flex-grow bg-secondary h-[50px] text border-none focus:outline-none focus:ring-2 focus:ring-[var(--accent)] px-5 min-h-[70px]"
                                    value={data.title}
                                    onChange={(e) =>
                                        setData("title", e.target.value)
                                    }
                                />
                            </form>
                        </div>
                        <div className="bg-secondary px-5">
                            {filteredTask.length <= 0 ? (
                                <div className="flex items-center min-h-[70px] text text-l-custom text-center">
                                    <p className="w-full">
                                        Il n'y a aucune tâches pour l'instant
                                    </p>
                                </div>
                            ) : (
                                filteredTask.map((t) => (
                                    <div
                                        key={t.id}
                                        className="flex items-center gap-5 min-h-[70px]"
                                    >
                                        <div>
                                            <input
                                                type="checkbox"
                                                id={`task-${t.id}`}
                                                className="hidden peer"
                                                checked={t.completed}
                                                onChange={(e) => {
                                                    handleToggleTask(e, t.id);
                                                }}
                                            />
                                            <label
                                                htmlFor={`task-${t.id}`}
                                                className="flex items-center justify-center w-6 h-6 border-2 rounded-lg cursor-pointer border-[var(--accent)] text-[var(--accent)] peer-checked:bg-[var(--accent)] peer-checked:text-white transition-all"
                                            >
                                                {t.completed ? <RxCheck /> : ""}
                                            </label>
                                        </div>
                                        <span className="text text-l-custom break-words overflow-wrap break-all">
                                            {t.title}
                                        </span>
                                        <button
                                            className="text text-h3 transition-all hover:brightness-50 ml-auto"
                                            onClick={() => handleDestroy(t.id)}
                                        >
                                            <RxCross1 />
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                        <div className="flex flex-col gap-5 sm:flex-row bg-secondary sm:gap-2.5 py-2.5 text-muted font-medium justify-between items-center px-5 min-h-[70px]">
                            <span>Items Left: {tempTasks.length}</span>
                            <ul className="flex gap-5">
                                <li
                                    onClick={() =>
                                        filter !== "all" && setFilter("all")
                                    }
                                    className={`cursor-pointer hover:text-[var(--accent)] transition-all  ${
                                        filter === "all" && "accent"
                                    }`}
                                >
                                    All
                                </li>
                                <li
                                    onClick={() =>
                                        filter !== "active" &&
                                        setFilter("active")
                                    }
                                    className={`cursor-pointer hover:text-[var(--accent)] transition  ${
                                        filter === "active" && "accent"
                                    }`}
                                >
                                    Active
                                </li>
                                <li
                                    onClick={() =>
                                        filter !== "completed" &&
                                        setFilter("completed")
                                    }
                                    className={`cursor-pointer hover:text-[var(--accent)] transition  ${
                                        filter === "completed" && "accent"
                                    }`}
                                >
                                    Completed
                                </li>
                            </ul>
                            <button
                                onClick={() => setShowModal(true)}
                                className="hover:text-[var(--accent)] transition"
                            >
                                Clear Completed
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
