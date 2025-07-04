/* global WebImporter */
export default function parse(element, { document }) {
  // Always create the header row exactly as 'Hero'
  const headerRow = ['Hero'];

  // Find the hero image (picture or img) - appears in a <p> in the content
  let imageEl = null;
  // Search for picture or img anywhere inside the block
  imageEl = element.querySelector('picture') || element.querySelector('img');
  const imageRow = [imageEl ? imageEl : ''];

  // Find the main content container (the div containing headings and paragraphs)
  // It's typically the first .hero.block > div > div
  let contentContainer = null;
  const heroBlock = element.querySelector('.hero.block');
  if (heroBlock) {
    // The main content is usually in heroBlock > div > div
    const innerDivs = heroBlock.querySelectorAll('div > div');
    if (innerDivs.length > 0) {
      contentContainer = innerDivs[0];
    } else {
      // fallback to direct content of heroBlock
      contentContainer = heroBlock;
    }
  } else {
    // fallback to the original element
    contentContainer = element;
  }

  // Remove the <picture> or <img> from the contentContainer if it exists, so the text row does not duplicate the image
  let textNodes = [];
  if (contentContainer) {
    textNodes = Array.from(contentContainer.children).filter((node) => {
      return !(node.tagName === 'PICTURE' || node.tagName === 'IMG' ||
               (node.tagName === 'P' && node.querySelector('picture, img')));
    });
  }
  // Only add to the text row if there are elements
  const textRow = [textNodes.length === 1 ? textNodes[0] : textNodes];

  const cells = [
    headerRow,
    imageRow,
    textRow,
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
