/* global WebImporter */
export default function parse(element, { document }) {
  // Find the .hero.block section
  let heroBlock = element.querySelector('.hero.block');
  if (!heroBlock) heroBlock = element;

  // Find the central content container
  let contentDiv = heroBlock.querySelector('div > div');
  if (!contentDiv) contentDiv = heroBlock;

  // Get the <picture> for the image row
  const picture = contentDiv.querySelector('picture');

  // Find the first heading (h1-h3) for the content row
  let heading = null;
  for (let i = 0; i < contentDiv.children.length; i++) {
    const child = contentDiv.children[i];
    if (/^H[1-3]$/i.test(child.tagName)) {
      heading = child;
      break;
    }
  }

  // --- FIX: If the heading is inside a child div (as in <div><h1>...</h1></div>), find it!
  if (!heading) {
    for (let i = 0; i < contentDiv.children.length; i++) {
      const child = contentDiv.children[i];
      if (child.children && child.children.length) {
        for (let j = 0; j < child.children.length; j++) {
          const grandchild = child.children[j];
          if (/^H[1-3]$/i.test(grandchild.tagName)) {
            heading = grandchild;
            break;
          }
        }
      }
      if (heading) break;
    }
  }

  const cells = [
    ['Hero'],
    [picture ? picture : ''],
    [heading ? heading : ''],
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
