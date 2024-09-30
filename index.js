import { promises as fs } from 'fs';
import inquirer from 'inquirer';
import { Circle, Square, Triangle } from './lib/shapes.js';

const generateSVG = (text, textColor, shape, shapeColor) => {
  let shapeInstance;

  switch (shape) {
    case 'Circle':
      shapeInstance = new Circle();
      break;
    case 'Triangle':
      shapeInstance = new Triangle();
      break;
    case 'Square':
      shapeInstance = new Square();
      break;
  }

  shapeInstance.setColor(shapeColor);

  return `
<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
  ${shapeInstance.render()}
  <text x="150" y="120" font-size="60" text-anchor="middle" fill="${textColor}">${text}</text>
</svg>`;
};

inquirer.prompt([
  {
    type: 'input',
    name: 'text',
    message: 'Enter up to three characters for your logo:',
    validate: (input) => input.length <= 3 || 'Text should be up to 3 characters long',
  },
  {
    type: 'input',
    name: 'textColor',
    message: 'Enter a text color (keyword or hexadecimal):',
  },
  {
    type: 'list',
    name: 'shape',
    message: 'Choose a shape for your logo:',
    choices: ['Circle', 'Triangle', 'Square'],
  },
  {
    type: 'input',
    name: 'shapeColor',
    message: 'Enter a shape color (keyword or hexadecimal):',
  },
]).then(({ text, textColor, shape, shapeColor }) => {
  const svgContent = generateSVG(text, textColor, shape, shapeColor);
  
  fs.writeFile('./examples/logo.svg', svgContent, (err) => {
    if (err) {
      console.error('Error generating SVG:', err);
    } else {
      console.log('Generated logo.svg');
    }
  });
});
