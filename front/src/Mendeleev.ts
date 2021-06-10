import * as d3 from "d3";

export class Mendeleev {
  constructor(private div: Element) {
    console.log("instantiating Mendeleev");
  }

  refresh() {
    console.log("start to refresh");
    d3.select(this.div).text("Mendeleev via D3");
  }
}
