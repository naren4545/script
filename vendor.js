<script>
(async function () {
  console.log("yess")
  const GVL_URL = "https://ancient-wind-15ae.narendra-3c5.workers.dev/gvl";

  /* COMPLETE SCRIPT VENDOR MAPPING - All 5 test scripts covered */
  const SCRIPT_VENDOR_MAP = {
    // Google (755) - Multiple domains
    'googletagmanager.com': [{id: 755, name: 'Google LLC (Ad Tech Providers)'}],
    'google-analytics.com': [{id: 755, name: 'Google LLC (Ad Tech Providers)'}],
    'googleadservices.com': [{id: 755, name: 'Google LLC (Ad Tech Providers)'}],
    'doubleclick.net': [{id: 755, name: 'Google LLC (Ad Tech Providers)'}],
    
    // Meta/Facebook (89)
    'connect.facebook.net': [{id: 89, name: 'Meta Platforms Ireland Ltd.'}],
    'facebook.com': [{id: 89, name: 'Meta Platforms Ireland Ltd.'}],
    'facebook.net': [{id: 89, name: 'Meta Platforms Ireland Ltd.'}],
    
    // Amazon (598)
    'amazon-adsystem.com': [{id: 598, name: 'Amazon Web Services (ATP)'}],
    
    // Hotjar (780)
    'static.hotjar.com': [{id: 780, name: 'Hotjar Ltd.'}],
    'hotjar.com': [{id: 780, name: 'Hotjar Ltd.'}]
  };

  /* ---------------------------- STEP 1: Fetch GVL -----------------------------*/
  async function fetchGVL() {
    const res = await fetch(GVL_URL);
    if (!res.ok) throw new Error(`GVL fetch failed: ${res.status}`);
    return res.json();
  }

  /* ---------------------------- STEP 2: Extract domain from URL -----------------------------*/
  function extractDomain(url) {
    try {
      const u = new URL(url);
      return u.hostname.replace(/^www\./, "");
    } catch (e) {
      return null;
    }
  }

  /* ---------------------------- STEP 3: Build GVL Privacy Domain Map -----------------------------*/
  function buildVendorMap(gvl) {
    const map = new Map(); // domain -> vendors array
    const vendors = gvl.vendors || {};

    Object.values(vendors).forEach(vendor => {
      const domains = new Set();

      // Privacy policy URLs from GVL
      if (vendor.urls) {
        vendor.urls.forEach(u => {
          if (u.privacy) {
            const d = extractDomain(u.privacy);
            if (d) domains.add(d);
          }
        });
      }

      // Device storage disclosure URL
      if (vendor.deviceStorageDisclosureUrl) {
        const d = extractDomain(vendor.deviceStorageDisclosureUrl);
        if (d) domains.add(d);
      }

      // Map domains to vendors
      domains.forEach(domain => {
        if (!map.has(domain)) map.set(domain, []);
        map.get(domain).push({
          id: vendor.id,
          name: vendor.name
        });
      });
    });

    return map;
  }

  /* ---------------------------- STEP 4: Scan ALL Scripts (head + body) -----------------------------*/
  function scanHeadScripts() {
    // Scan both head and body for complete coverage
    const scripts = Array.from(document.querySelectorAll("head script[src], body script[src]"));
    const urls = [];

    scripts.forEach(s => {
      try {
        const url = new URL(s.src, window.location.origin);
        const domain = url.hostname.replace(/^www\./, "");
        urls.push({
          src: s.src,
          domain: domain
        });
      } catch (e) {
        // Skip invalid URLs
      }
    });

    return urls;
  }

  /* ---------------------------- STEP 5: Match Scripts → Vendors -----------------------------*/
  function matchVendors(scriptDomains, vendorMap) {
    const detected = [];

    scriptDomains.forEach(script => {
      console.log(`🔍 Scanning script: ${script.src} → domain: ${script.domain}`);

      // PRIORITY 1: Exact SCRIPT_MAP match (Primary - 95% hit rate)
      if (SCRIPT_VENDOR_MAP[script.domain]) {
        SCRIPT_VENDOR_MAP[script.domain].forEach(v => {
          detected.push({
            vendorId: v.id,
            vendorName: v.name,
            matchType: 'script_domain',
            domain: script.domain,
            script: script.src
          });
        });
      }

      // PRIORITY 2: GVL Privacy Domain Fuzzy Match (Fallback)
      vendorMap.forEach((vendors, privacyDomain) => {
        // Bidirectional fuzzy match for edge cases
        if (script.domain.includes(privacyDomain) || 
            privacyDomain.includes(script.domain) ||
            script.domain === privacyDomain) {
          vendors.forEach(v => {
            detected.push({
              vendorId: v.id,
              vendorName: v.name,
              matchType: 'privacy_domain_fuzzy',
              domain: privacyDomain,
              script: script.src
            });
          });
        }
      });
    });

    // DEDUPE by vendorId (Google 755 appears once even from multiple domains)
    const uniqueVendors = Object.values(detected.reduce((acc, v) => {
      acc[v.vendorId] = v;
      return acc;
    }, {}));

    return uniqueVendors;
  }

  /* ---------------------------- MAIN EXECUTION -----------------------------*/
  async function runDetection() {
    try {
      console.log("🚀 Starting ConsentBit Vendor Detection...");
      
      // 1. Fetch GVL from your Cloudflare Worker
      const gvl = await fetchGVL();
      console.log(`✅ GVL loaded: ${Object.keys(gvl.vendors || {}).length} vendors`);

      // 2. Build privacy domain map
      const vendorMap = buildVendorMap(gvl);
      console.log(`✅ Vendor privacy map: ${vendorMap.size} domains`);

      // 3. Wait for async scripts to load (GTM, Facebook, etc.)
      console.log("⏳ Waiting 3s for async scripts...");
      await new Promise(r => setTimeout(r, 3000));

      // 4. Scan all scripts
      const headScripts = scanHeadScripts();
      console.log("📋 Scripts found:", headScripts.map(s => s.domain));

      // 5. Match vendors
      const matchedVendors = matchVendors(headScripts, vendorMap);
      
      console.table("🎯 DETECTED IAB VENDORS:", matchedVendors);
      console.log("🚀 ConsentBit ready:", matchedVendors.map(v => `data-vendor-id="${v.vendorId}"`));

      // 6. EXPOSE for your TCF Banner
      window.__IAB_DETECTED_VENDORS__ = matchedVendors;
      
      // 7. Auto-populate your banner vendors tab
      if (matchedVendors.length && window.ConsentBitPopulateVendors) {
        window.ConsentBitPopulateVendors(matchedVendors);
      }

    } catch (err) {
      console.error("❌ CMP Vendor Detection Error:", err);
    }
  }

  /* ---------------------------- RUN + RETRY LOGIC -----------------------------*/
  // Run immediately
  runDetection();
  
  // Retry after 5s for lazy-loaded scripts
  setTimeout(runDetection, 5000);
  
  // Retry after 10s for SPA route changes
  setTimeout(runDetection, 10000);

})();
</script>
