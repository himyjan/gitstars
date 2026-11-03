import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { loadEnv } from 'vite';

const envLocal = loadEnv(process.env.NODE_ENV, process.cwd(), '');
const isDev = process.env.NODE_ENV === 'development';
const certificateDirectory = path.resolve(
  process.cwd(),
  envLocal.GITSTARS_CERT_DIR || '.certs',
);

const toConfig = () => {
  const config = {
    plugins: [
      vue({
        features: {
          vapor: true,
        },
      }),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, 'src'),
        'vue': 'vue/dist/vue.runtime-with-vapor.esm-browser.js',
      },
    },
  };

  if (isDev) {
    config.server = {
      https: {
        key: path.join(certificateDirectory, 'localhost-key.pem'),
        cert: path.join(certificateDirectory, 'localhost.pem'),
      },
      host: true,
      port: '30000',
      proxy: {
        '/api': {
          target: envLocal.VITE_API_PROXY,
          changeOrigin: true,
        },
      },
    };
  }

  return config;
};
