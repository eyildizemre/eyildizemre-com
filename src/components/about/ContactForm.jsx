import { useState } from "react";
import { useUI } from "../../i18n/ui";

export default function ContactForm() {
    const ui = useUI();
    const t = ui.about.contact;

    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [errors, setErrors] = useState({});
    const [sent, setSent] = useState(false);

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
        setSent(false);
    }

    // Mock form: validates only, never actually sends (see "Demo" badge).
    // CSP requirement = form validation. Re-author these rules to make them yours.
    function validate() {
        const next = {};
        if (!form.name.trim()) next.name = t.required;
        if (!form.email.trim()) next.email = t.required;
        else if (!/\S+@\S+\.\S+/.test(form.email)) next.email = t.invalidEmail;
        if (!form.message.trim()) next.message = t.required;
        return next;
    }

    function handleSubmit(e) {
        e.preventDefault();
        const next = validate();
        setErrors(next);
        if (Object.keys(next).length === 0) {
            setSent(true); // mock — no real delivery
            setForm({ name: "", email: "", message: "" });
        }
    }

    const field = "w-full bg-c-bg-secondary border border-c-border rounded px-4 py-2.5 text-f-sm text-c-text focus:outline-none focus:border-c-neon transition-colors duration-[220ms]";

    return (
        <div className="mt-12 border-t border-c-border pt-10">
            <div className="flex items-center gap-3 mb-6">
                <h2 className="text-f-base tracking-[0.02em] text-c-text">{t.heading}</h2>
                <span
                    title={t.demoNote}
                    lang="en"
                    className="font-mono text-f-2xs tracking-[0.08em] uppercase text-c-muted border border-c-border rounded-full px-2 py-0.5"
                >
                    Demo
                </span>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-f-xs text-c-muted mb-1.5">{t.name}</label>
                    <input id="name" name="name" type="text" value={form.name} onChange={handleChange} className={field} />
                    {errors.name && <p className="mt-1.5 text-f-2xs text-red-400">{errors.name}</p>}
                </div>

                <div>
                    <label htmlFor="email" className="block text-f-xs text-c-muted mb-1.5">{t.email}</label>
                    <input id="email" name="email" type="email" value={form.email} onChange={handleChange} className={field} />
                    {errors.email && <p className="mt-1.5 text-f-2xs text-red-400">{errors.email}</p>}
                </div>

                <div>
                    <label htmlFor="message" className="block text-f-xs text-c-muted mb-1.5">{t.message}</label>
                    <textarea id="message" name="message" rows={4} value={form.message} onChange={handleChange} className={`${field} resize-y`} />
                    {errors.message && <p className="mt-1.5 text-f-2xs text-red-400">{errors.message}</p>}
                </div>

                <div className="flex items-center gap-4 pt-1">
                    <button type="submit" className="text-f-sm tracking-[0.04em] text-c-text border border-c-border rounded px-5 py-2 hover:border-c-neon hover:text-c-neon transition-colors duration-[220ms]">
                        {t.send}
                    </button>
                    {sent && <span className="text-f-xs text-c-neon">{t.success}</span>}
                </div>
            </form>
        </div>
    );
}
