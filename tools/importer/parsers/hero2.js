/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find the innermost content div with the hero content
  let contentDiv = element.querySelector('.hero-wrapper .hero.block > div > div');
  if (!contentDiv) {
    // fallback: select the first div inside hero.block
    const heroBlock = element.querySelector('.hero-wrapper .hero.block');
    if (heroBlock) {
      const maybeDiv = heroBlock.querySelector('div');
      if(maybeDiv) contentDiv = maybeDiv;
    }
  }

  // 2. Find the background image (picture or img inside a <p>)
  let bgImgPara = null;
  let bgImgEl = null;
  if (contentDiv) {
    for (const child of contentDiv.children) {
      if (child.querySelector && child.querySelector('picture')) {
        bgImgPara = child;
        bgImgEl = child.querySelector('picture');
        break;
      }
    }
  }
  // Fallback: maybe the first picture under contentDiv
  if (!bgImgEl && contentDiv) {
    bgImgEl = contentDiv.querySelector('picture');
    if (bgImgEl) {
      const parent = bgImgEl.closest('p');
      if (parent) bgImgPara = parent;
    }
  }

  // 3. Collect the heading and other content (excluding image para and empty <p>)
  const contentEls = [];
  if (contentDiv) {
    for (const child of Array.from(contentDiv.children)) {
      if (child === bgImgPara) continue;
      // skip empty paragraphs
      if (child.tagName === 'P' && child.textContent.trim() === '') continue;
      contentEls.push(child);
    }
  }

  // 4. Build table rows according to requirements
  // Row 1: Header
  const headerRow = ['Hero'];
  // Row 2: Background Image (may be empty string if missing)
  const imageRow = [bgImgEl ? bgImgEl : ''];
  // Row 3: Headline, subheading, CTA (may be empty string if missing)
  const textRow = [contentEls.length > 0 ? contentEls : ''];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    imageRow,
    textRow
  ], document);

  element.replaceWith(table);
}
