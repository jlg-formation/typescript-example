import "./style.scss";

import { Mendeleev } from "./Mendeleev";

(async () => {
  const div = document.querySelector("div.tableau");
  const m = new Mendeleev(div);
  await m.init();
  m.refresh();
})();
