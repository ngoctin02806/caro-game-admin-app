import Loadable from "react-loadable";
import { view as Loader } from "../../../components2/loader";

const view = Loadable({
  loader: () => import("./view"),
  loading: Loader,
});

export { view };
