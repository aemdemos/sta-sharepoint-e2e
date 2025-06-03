/* global WebImporter */
export default function parse(element, { document }) {
  // Find the deepest div containing image and headline
  let contentDiv = element;
  const heroWrapper = element.querySelector(':scope > .hero-wrapper');
  if (heroWrapper) {
    const heroBlock = heroWrapper.querySelector(':scope > .hero.block');
    if (heroBlock) {
      const outerDiv = heroBlock.querySelector(':scope > div');
      if (outerDiv) {
        const innerDiv = outerDiv.querySelector(':scope > div');
        if (innerDiv) {
          contentDiv = innerDiv;
        }
      }
    }
  }
  // Get picture (image)
  const picture = contentDiv.querySelector('picture');
  // Get heading (first h1-h6)
  let heading = null;
  for (let i = 1; i <= 6; i++) {
    heading = contentDiv.querySelector('h' + i);
    if (heading) break;
  }
  // Compose cell content as array, referencing existing elements
  const cellContent = [];
  if (picture) cellContent.push(picture);
  if (heading) cellContent.push(heading);
  // Always build header row as in the markdown example
  const cells = [
    ['Hero (hero2)'],
    [cellContent]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
