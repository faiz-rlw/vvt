const modulesFile = import.meta.globEager("./allApi/*.ts");

let modules = {};
let obj = [];

for (const key in modulesFile) {
  obj.push(modulesFile[key].default);
}

obj.forEach((item) => {
  modules = { ...modules, ...item };
});
export default modules;
