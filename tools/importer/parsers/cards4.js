/* global WebImporter */
export default function parse(element, { document }) {
  // Find the .cards block with <ul><li>...</li></ul>
  const cardsBlock = element.querySelector('.cards.block');
  if (!cardsBlock) return;
  const ul = cardsBlock.querySelector('ul');
  if (!ul) return;
  const liList = Array.from(ul.children);
  const cells = [['Cards']];
  liList.forEach(li => {
    // Get image (use <picture> if present, otherwise <img>)
    let imgElem = null;
    const imgWrapper = li.querySelector('.cards-card-image');
    if (imgWrapper) {
      const picture = imgWrapper.querySelector('picture');
      if (picture) {
        imgElem = picture;
      } else {
        const img = imgWrapper.querySelector('img');
        if (img) imgElem = img;
      }
    }
    // Get text content
    let textElems = [];
    const bodyWrapper = li.querySelector('.cards-card-body');
    if (bodyWrapper) {
      // Add all element children (e.g., <p>) and significant text nodes
      textElems = Array.from(bodyWrapper.childNodes).filter(n => (n.nodeType === 1) || (n.nodeType === 3 && n.textContent.trim()));
    }
    // If there are multiple elements, pass as array; otherwise, single element or empty string
    let textCell;
    if (textElems.length > 1) {
      textCell = textElems;
    } else if (textElems.length === 1) {
      textCell = textElems[0];
    } else {
      textCell = '';
    }
    cells.push([
      imgElem,
      textCell
    ]);
  });
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
