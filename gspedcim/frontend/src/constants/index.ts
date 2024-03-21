import ENV from "./env";
import ROUTER from "./router";

const rowPerPage = 5;


interface DropdownOption {
  id: number | 0;
  name: string | undefined;
}

export { ENV, ROUTER, rowPerPage };
export type { DropdownOption };
