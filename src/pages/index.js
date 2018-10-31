import {lazy} from "react";
export {default as Home} from "./home";
export const Properties = lazy(() => import(/* webpackChunkName: "rest" */"./properties"));
export const Register = lazy(() => import(/* webpackChunkName: "rest" */"./register"));
export const Login = lazy(() => import(/* webpackChunkName: "rest" */"./login"));
export const Property = lazy(() => import(/* webpackChunkName: "rest" */"./property"));
export const FourOFour = lazy(() => import(/* webpackChunkName: "rest" */"./404"));

export const API = lazy(() => import(/* webpackChunkName: "dev" */"./api"));
export const Docs = lazy(() => import(/* webpackChunkName: "dev" */"./docs"));
