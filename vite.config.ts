import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import {resolve} from 'path'
function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir)
}
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: /\/@\//,
        replacement: pathResolve("src") + "/",
      },
    ],
  },
});
