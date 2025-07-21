export default async function decorate(block) {
  // 1. Get the folder path from block dataset or content
  const folderPath = block.dataset.folderPath || block.textContent.trim();
  if (!folderPath) return;

  // 2. Fetch the asset list from AEM (using CaaS API or GraphQL)
  // Example: use CaaS API to retrieve assets under the folder
  const url = `/api/assets${folderPath}.json`; // Adapt path to your project setup!
  const resp = await fetch(url);
  if (!resp.ok) return;
  const {assets} = await resp.json();

  // 3. Render asset thumbnails
  const gallery = document.createElement('div');
  gallery.classList.add('asset-gallery');
  assets.forEach(asset => {
    const thumb = document.createElement('img');
    thumb.src = asset.thumbnailUrl;
    thumb.alt = asset.title;
    gallery.appendChild(thumb);
  });
  block.replaceChildren(gallery);
}
