const fs = require('fs');
const templates = require('./templates');

const componentName = process.argv[2];

if (!componentName) {
  console.error('Please supply a valid component name');
  process.exit(1);
}

console.log('Creating Component Templates with name: ' + componentName);

const componentDirectory = `./src/components/${componentName}`;

if (fs.existsSync(componentDirectory)) {
  console.error(`Component ${componentName} already exists.`);
  process.exit(1);
}

fs.mkdirSync(componentDirectory);

const generatedTemplates = templates.map((template) => template(componentName));

generatedTemplates.forEach((template) => {
  fs.writeFileSync(
    `${componentDirectory}/${componentName}${template.extension}`,
    template.content
  );
});

const indexExport = `export { default } from './${componentName}';
`;

fs.writeFileSync(`${componentDirectory}/index.ts`, indexExport);

console.log('Successfully created component under: ' + componentDirectory);
