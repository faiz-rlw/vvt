/// <reference types="vite/client" />
declare module "*.vue" {
  import { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

interface ImportMetaEnv {
  readonly VITE_ENV_TYPE: string;
  readonly VITE_APP_BASE_API: string;
  readonly VITE_APP_TITLE: string;
  readonly VITE_ENABLE_JAX: string;
  readonly VITE_ALONE_CHUNK: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
