import { bindActionCreators } from "@reduxjs/toolkit";
import useAppDispatch from "./useAppDispatch";
import * as ActionsCreators from "../store/actions";

const useAction = () => bindActionCreators(ActionsCreators, useAppDispatch());

export default useAction;