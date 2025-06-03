/* global WebImporter */
export default function parse(element, { document }) {
  // According to the block definition, the only required output is the Search block table
  // with the static index URL, as the HTML does not contain a search index URL.
  
  // The block header matches the markdown example exactly
  const headerRow = ['Search (search1)'];
  
  // The second row should contain the absolute URL to the query index, which is not present in the HTML,
  // but the block's description specifies a canonical sample URL to use.
  const contentRow = ['https://main--helix-block-collection--adobe.hlx.page/block-collection/sample-search-data/query-index.json'];

  // Compose the table
  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
