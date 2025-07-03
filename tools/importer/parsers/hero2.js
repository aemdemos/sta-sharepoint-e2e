/* global WebImporter */
export default function parse(element, { document }) {
  // Find the hero block inside the section
  const heroBlock = element.querySelector('.hero.block');
  let contentDiv = heroBlock;
  // Drill down to the deepest div that contains the content
  if (heroBlock) {
    let div = heroBlock;
    // Go down two divs if nested
    for (let i = 0; i < 2; i++) {
      if (div && div.children.length === 1 && div.children[0].tagName === 'DIV') {
        div = div.children[0];
      }
    }
    contentDiv = div;
  }
  // Find the picture (background image)
  let picture = null;
  for (const child of contentDiv.children) {
    if (child.querySelector && child.querySelector('picture')) {
      picture = child.querySelector('picture');
      break;
    }
  }
  // If not found above, check for direct picture
  if (!picture) {
    picture = contentDiv.querySelector('picture');
  }

  // Collect all headings and text content (excluding the <picture> and empty paragraphs)
  const textNodes = [];
  for (const child of contentDiv.children) {
    // skip <p> wrappers that only contain <picture>
    if (child.tagName === 'P' && child.querySelector('picture')) continue;
    // capture headings and paragraphs
    if (/^H[1-6]$/.test(child.tagName) || child.tagName === 'P') {
      // Only skip truly empty paragraphs (no text, no child elements)
      if (child.textContent.trim() !== '' || child.children.length > 0) {
        textNodes.push(child);
      }
    }
  }

  // Build the table rows
  const rows = [
    ['Hero'],
    [picture || ''],
    [textNodes.length ? textNodes : '']
  ];
  // Create the table using the WebImporter helper
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element with the new table
  element.replaceWith(table);
}
