export function Logging(metadata: { prefix: string }) {
  return function (target: { new (...args: any[]): {} }): any {
    // save a reference to the original constructor
    const original = target;

    // the new constructor behaviour
    const f = function (...args: any[]) {
      console.log(
        metadata.prefix + ": currently instantiating: " + original.name
      );
      return new original(...args); // according the comments
    };

    // copy prototype so intanceof operator still works
    f.prototype = original.prototype;

    // return new constructor (will override original)
    return f;
  };
}
