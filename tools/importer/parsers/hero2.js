/* global WebImporter */
export default function parse(element, { document }) {
  // Find the hero block
  const heroBlock = element.querySelector('.hero.block');
  if (!heroBlock) return;

  // The hero main content is inside: heroBlock > div > div
  let contentWrap;
  // Sometimes heroBlock has direct child div, sometimes not
  const heroLevels = heroBlock.querySelectorAll(':scope > div');
  if (heroLevels.length === 1 && heroLevels[0].children.length === 1) {
    contentWrap = heroLevels[0].children[0];
  } else if (heroLevels.length === 1) {
    contentWrap = heroLevels[0];
  } else {
    // fallback: just use heroBlock's first child
    contentWrap = heroBlock.firstElementChild;
  }
  if (!contentWrap) return;

  // Extract the background image (the picture or image-containing <p> as first child)
  let imageCell = '';
  let contentChildren = Array.from(contentWrap.children);
  if (contentChildren.length > 0) {
    const first = contentChildren[0];
    if (
      first.querySelector &&
      (first.querySelector('picture') || first.querySelector('img'))
    ) {
      imageCell = first;
      // Remove image-containing <p> from contentChildren
      contentChildren = contentChildren.slice(1);
    }
  }

  // Remove any empty <p> from contentChildren
  const textEls = contentChildren.filter(el => {
    return !(el.tagName === 'P' && el.textContent.trim() === '' && el.children.length === 0);
  });

  // If no textEls remain, use an empty string
  const textCell = textEls.length === 1 ? textEls[0] : (textEls.length > 1 ? textEls : '');

  // Table
  const table = WebImporter.DOMUtils.createTable([
    ['Hero'],
    [imageCell],
    [textCell],
  ], document);

  element.replaceWith(table);
}
