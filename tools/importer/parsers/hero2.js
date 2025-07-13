/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header row: block name as in the example
  const headerRow = ['Hero'];

  // 2. Second row: background image (picture or img, if available)
  let bgImage = null;
  // Try to find the first <picture> or, if not present, a standalone <img>
  const pic = element.querySelector('picture');
  if (pic) {
    bgImage = pic;
  } else {
    const img = element.querySelector('img');
    if (img) bgImage = img;
  }

  // 3. Third row: all heading (h1-h6) and paragraph (p) elements after the image
  // In the provided HTML, these are inside a nested <div> after the <picture>
  let content = [];
  // Find the div that contains headings/paragraphs, not just the picture
  // The structure in the given HTML is: <div class="hero block"><div><div><p><picture>...</picture></p><h1>...</h1><p></p></div></div></div>
  // So we want to find the first div that contains <h1> or <p> after <picture>
  let contentDiv = null;
  // Two levels down: .hero.block > div > div
  const heroBlock = element.querySelector('.hero.block');
  if (heroBlock) {
    // The inner content div is the first <div> inside heroBlock
    const wrapperDiv = heroBlock.querySelector('div');
    if (wrapperDiv) {
      const innerDiv = wrapperDiv.querySelector('div');
      if (innerDiv) {
        contentDiv = innerDiv;
      }
    }
  }
  // Fallback to grabbing all <h1>-<h6> and <p> if structure is different
  if (!contentDiv) {
    contentDiv = element;
  }
  // Gather all <h1>-<h6> and <p> directly under the contentDiv,
  // but skip <p> that only contains the <picture> image
  const children = Array.from(contentDiv.children);
  for (const child of children) {
    const isHeading = /^H[1-6]$/.test(child.tagName);
    const isParagraph = child.tagName === 'P';
    // Exclude <p> that directly wraps the image
    const isImagePara = isParagraph && child.querySelector('picture, img');
    if (isHeading || (isParagraph && !isImagePara)) {
      // Only add if there's visible text or a link
      if (child.textContent.trim() !== '' || child.querySelector('a')) {
        content.push(child);
      }
    }
  }

  // 4. Assemble table: 1 column, 3 rows
  const cells = [
    headerRow,
    [bgImage ? bgImage : ''],
    [content.length ? content : ''],
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
