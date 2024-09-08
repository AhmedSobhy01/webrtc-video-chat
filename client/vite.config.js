import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default ({ mode }) => {
    // eslint-disable-next-line no-undef
    const env = loadEnv(mode, process.cwd(), "");

    return defineConfig({
        plugins: [react()],
        preview: {
            port: parseInt(env.VITE_PORT) || 4173,
        },
    });
};
