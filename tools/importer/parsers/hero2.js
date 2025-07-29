/* global WebImporter */
export default function parse(element, { document }) {
  // Step 1: Find the hero-wrapper inside the section
  const heroWrapper = element.querySelector('.hero-wrapper');
  if (!heroWrapper) return;

  // Step 2: Find the hero block
  const heroBlock = heroWrapper.querySelector('.hero.block');
  if (!heroBlock) return;

  // Step 3: Find the inner content container (first nested div > div)
  // We want the first inner div that contains the main visual and text
  let contentDiv = heroBlock.querySelector('div > div');
  if (!contentDiv) contentDiv = heroBlock;

  // Step 4: Extract the picture (image) element
  // Accept <picture> or <img> (reference the existing element, not clone)
  let imageElem = null;
  // Find picture directly, or look for img if picture is missing
  const picture = contentDiv.querySelector('picture');
  if (picture) {
    imageElem = picture;
  } else {
    const img = contentDiv.querySelector('img');
    if (img) imageElem = img;
  }

  // Step 5: Gather all content elements except the image (for the text row)
  // Remove the <p> that contains the <picture> from the text content row
  let imageContainer = null;
  if (imageElem) {
    imageContainer = imageElem.closest('p') || imageElem;
  }
  // Gather all element children except the image container/paragraph
  const contentNodes = [];
  contentDiv.childNodes.forEach((node) => {
    if (imageContainer && node === imageContainer) return;
    if (node.nodeType === Node.ELEMENT_NODE) {
      // Exclude empty <p> tags
      if (node.tagName === 'P' && !node.textContent.trim()) return;
      contentNodes.push(node);
    }
  });

  // Step 6: Build block table rows to match the example structure
  // 1 column, 3 rows (header, image, text)
  const rows = [
    ['Hero'],
    [imageElem ? imageElem : ''],
    [contentNodes.length ? contentNodes : '']
  ];
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Step 7: Replace the original element with the table
  element.replaceWith(table);
}
