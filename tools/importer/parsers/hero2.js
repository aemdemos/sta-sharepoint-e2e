/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as in the example
  const headerRow = ['Hero'];

  // Find the hero block within element
  const heroBlock = element.querySelector('.hero.block');

  // Default cells for image and text
  let imageCell = '';
  let textCell = '';

  if (heroBlock) {
    // Get the first inner content div inside .hero.block
    const outerDiv = heroBlock.querySelector(':scope > div');
    if (outerDiv) {
      const innerDiv = outerDiv.querySelector(':scope > div');
      if (innerDiv) {
        // Collect children (image, heading, maybe more)
        const children = Array.from(innerDiv.children);
        // Find picture for image cell
        const pictureParent = children.find((child) => child.querySelector && child.querySelector('picture'));
        if (pictureParent) {
          const picture = pictureParent.querySelector('picture');
          if (picture) imageCell = picture;
        }
        // Collect all heading and non-empty paragraph elements except the p with picture
        const textEls = [];
        for (const child of children) {
          if (child === pictureParent) continue; // skip node with image
          // skip empty paragraphs
          if (child.tagName === 'P' && child.textContent.trim() === '') continue;
          textEls.push(child);
        }
        // If textEls is not empty, use them. If there's just one, use the element, otherwise an array.
        if (textEls.length === 1) {
          textCell = textEls[0];
        } else if (textEls.length > 1) {
          textCell = textEls;
        }
      }
    }
  }
  // Compose the table as per block requirements: 1 col, 3 rows
  const cells = [
    headerRow,
    [imageCell],
    [textCell],
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
