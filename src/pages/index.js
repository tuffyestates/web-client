import {lazy} from "react";
export {default as Home} from "./home";
export const Properties = lazy(() => import(/* webpackChunkName: "rest", webpackPrefetch: true */"./properties"));
export const Register = lazy(() => import(/* webpackChunkName: "rest", webpackPrefetch: true */"./register"));
export const Login = lazy(() => import(/* webpackChunkName: "rest", webpackPrefetch: true */"./login"));
export const Property = lazy(() => import(/* webpackChunkName: "rest", webpackPrefetch: true */"./property/view"));
export const CreateProperty = lazy(() => import(/* webpackChunkName: "rest", webpackPrefetch: true */"./property/create"));
export const FourOFour = lazy(() => import(/* webpackChunkName: "rest", webpackPrefetch: true */"./404"));

export const API = lazy(() => import(/* webpackChunkName: "dev" */"./api"));
export const Docs = lazy(() => import(/* webpackChunkName: "dev" */"./docs"));
