import * as fs from 'fs';
import * as prettier from "prettier";
import config from "./tailwind.config.js";

/*
  Converts the tailwind config elements into custom props.
*/

const generateCSSProps = async () => {
  let result = '';
  const group = [
    { key: "colors", prefix: 'color' },
    { key: "spacing", prefix: 'space' },
    { key: "fontSize", prefix: 'size' },
  ];

  //* Add a note that this is auto generated
  result += `
  /* VARIABLES GENERATED WITH TAILWIND CONFIG ON ${new Date().toLocaleDateString()}.
  Tokens location: ./tailwind.config.cjs */

  :root {
`;
  //* Loop each group's keys, use that and the associated
  //* property to define a :root custom prop

  group.forEach(({ key, prefix }) => {
    const group = config.theme.extend[key];
    if (!group) {
      return;
    }

    Object.keys(group).forEach(key => {
      result += `--${prefix}-${key}: ${group[key]};`;
    });
  });

  //* Close the :root block
  result += `
    }
  `;

  //* Make the CSS readable to help people with auto-complete in their editors

  result = prettier.format(result, { parser: 'scss' });

  //* Push this file into the CSS dir, ready to go
  fs.writeFileSync('./src/css/custom-prop.css', result);
}

generateCSSProps();

export default generateCSSProps;

