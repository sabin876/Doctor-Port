const urls = [
  'https://drulhasorthopedic.com',
  'https://drulhasorthopedic.com/about',
  'https://drulhasorthopedic.com/services',
  'https://drulhasorthopedic.com/services/fracture-trauma-surgery',
  'https://drulhasorthopedic.com/services/deformity-correction-osteotomy-surgery/knock-knee-correction-surgery',
  'https://drulhasorthopedic.com/blog',
  'https://drulhasorthopedic.com/blog/tendon-vs-ligament',
  'https://drulhasorthopedic.com/contact',
  'https://drulhasorthopedic.com/gallery'
];

console.log('Testing live site: https://drulhasorthopedic.com ...\n');

for (const url of urls) {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    const content = await res.text();

    const titles = content.match(/<title[^>]*>[\s\S]*?<\/title>/gi) || [];
    const metaDescs = content.match(/<meta[^>]+name=["']description["'][^>]*>/gi) || [];
    const canonicals = content.match(/<link[^>]+rel=["']canonical["'][^>]*>/gi) || [];
    const ogTitles = content.match(/<meta[^>]+property=["']og:title["'][^>]*>/gi) || [];
    const ogDescs = content.match(/<meta[^>]+property=["']og:description["'][^>]*>/gi) || [];
    const ogImages = content.match(/<meta[^>]+property=["']og:image["'][^>]*>/gi) || [];
    const h1s = content.match(/<h1(\s|>)/gi) || [];

    const rootMatch = content.match(/<div id="root">([\s\S]*?)<\/div>/i);
    const rootContent = rootMatch ? rootMatch[1] : '';

    const leakedTitle = (rootContent.match(/<title[^>]*>/gi) || []).length;
    const leakedMeta = (rootContent.match(/<meta[^>]*>/gi) || []).length;
    const leakedLink = (rootContent.match(/<link[^>]*>/gi) || []).length;

    console.log(`URL: ${url}`);
    console.log(`Status: ${res.status}`);
    console.log(`- <title> count: ${titles.length} (${titles[0] ? titles[0].replace(/<\/?title>/gi, '').trim() : 'NONE'})`);
    console.log(`- <meta description> count: ${metaDescs.length}`);
    console.log(`- <link canonical> count: ${canonicals.length} (${canonicals[0] || 'NONE'})`);
    console.log(`- og:title count: ${ogTitles.length}`);
    console.log(`- og:description count: ${ogDescs.length}`);
    console.log(`- og:image count: ${ogImages.length}`);
    console.log(`- <h1> count: ${h1s.length}`);
    console.log(`- Leaked in #root: title=${leakedTitle}, meta=${leakedMeta}, link=${leakedLink}`);
    console.log(`- SSR #root content length: ${rootContent.trim().length} chars`);
    console.log('--------------------------------------------------\n');
  } catch (err) {
    console.error(`Error fetching ${url}:`, err.message);
  }
}
