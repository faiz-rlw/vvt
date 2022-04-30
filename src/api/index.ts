const modulesFile = import.meta.globEager("./allApi/*.ts");

interface modulesConfig {
  [name: string]: any;
}

let modules:modulesConfig = {};
let obj = [];

for (const key in modulesFile) {
  obj.push(modulesFile[key].default);
}

obj.forEach((item) => {
  modules = { ...modules, ...item };
});

export default modules;