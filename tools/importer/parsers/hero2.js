/* global WebImporter */
export default function parse(element, { document }) {
  // Find the deepest child that contains the hero content (image + text)
  let heroContent = element;
  // Go down single-child wrappers to get to the actual content
  while (heroContent && heroContent.children.length === 1) {
    heroContent = heroContent.children[0];
  }
  // The structure is now a <div> containing a <div> with the <p><picture>...</picture></p>, a <h1>, etc.
  // Get the first (and probably only) <div> child
  let contentDiv = null;
  const possibleDivs = Array.from(heroContent.children).filter(child => child.tagName.toLowerCase() === 'div');
  if (possibleDivs.length > 0) {
    contentDiv = possibleDivs[0];
  } else {
    // fallback in case structure changes
    contentDiv = heroContent;
  }

  // Gather image <p><picture><img/></picture></p>
  let imagePara = null;
  let textNodes = [];
  Array.from(contentDiv.children).forEach(child => {
    if (
      child.tagName.toLowerCase() === 'p' &&
      child.querySelector('picture') &&
      child.querySelector('picture img')
    ) {
      imagePara = child;
    } else if (child.textContent.trim() !== '') {
      textNodes.push(child);
    }
  });

  // Build the rows as per block spec: header, image (optional), text content (optional)
  const rows = [
    ['Hero'],
    [imagePara ? imagePara : ''],
    [textNodes.length ? textNodes : ''],
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
