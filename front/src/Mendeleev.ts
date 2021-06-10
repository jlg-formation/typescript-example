import * as d3 from "d3";

export class Mendeleev {
  data: d3.DSVRowArray<string> | undefined;
  constructor(private div: Element) {
    console.log("instantiating Mendeleev");
  }

  async init() {
    this.data = await d3.csv("assets/data.csv");
    console.log("this.data: ", this.data);
  }

  refresh() {
    if (!this.data) {
      throw new Error("no data loaded.");
    }
    console.log("start to refresh");
    d3.select(this.div).html(`
    <div class="element">
      <span>H</span>
    </div>
    `);
  }
}
