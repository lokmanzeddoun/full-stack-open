import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	test: {
    globals:true,
		environment: "jsdom",
		setupFiles: ["./testSetup.js"],
	},
	server: {
		proxy: {
			"/api": {
				target: "http://localhost:3003",
				changeOrigin: true,
			},
		},
	},
});
