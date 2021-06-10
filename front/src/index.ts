import "./style.scss";

import { Mendeleev } from "./Mendeleev";

(async () => {
  const div = document.querySelector("div.tableau");
  if (!div) {
    throw new Error("cannot find the div.tableau");
  }
  const m = new Mendeleev(div);
  await m.init();
  m.refresh();
})();
