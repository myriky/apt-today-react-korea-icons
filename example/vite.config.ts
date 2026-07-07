import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss(), react()],
  base: "/apt-today-react-korea-icons/",
  resolve: {
    // link:.. 로 연결된 패키지가 훅을 사용하므로 react 복사본을 하나로 강제
    dedupe: ["react", "react-dom"],
  },
});
