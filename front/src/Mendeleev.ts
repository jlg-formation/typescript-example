import { ChemicalElt } from "./interfaces/ChemicalElt";
import * as d3 from "d3";
import { Logging } from "./decorators/Logging";

const eltCard = {
  width: 3 + 0.5,
  height: 4 + 0.5,
};

@Logging({ prefix: "My prefix" })
export class Mendeleev {
  data: ChemicalElt[] | undefined;

  constructor(private div: Element) {}

  async init() {
    const data = await d3.csv<ChemicalElt, string>(
      "assets/data.csv",
      (d) => d as unknown as ChemicalElt
    );
    this.data = data.filter((d) => d.Period && d.Group);
  }

  refresh() {
    if (!this.data) {
      throw new Error("no data loaded.");
    }
    const assoc = d3
      .select(this.div)
      .html("")
      .selectAll("div.element")
      .data(this.data);
    assoc
      .enter()
      .append("div")
      .attr("class", "element")
      .attr("style", (d) => {
        const x = (+d.Group - 1) * eltCard.width;
        const y = (+d.Period - 1) * eltCard.height;
        return `transform: translate(${x}em, ${y}em)`;
      })
      .html(
        (d) => `
<span>${d.Symbol}</span>
      `
      );
  }
}
