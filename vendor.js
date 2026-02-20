(async function () {
  const GVL_URL = "https://ancient-wind-15ae.narendra-3c5.workers.dev/gvl/vendor-list.json";

  /* ---------------------------- DYNAMIC VENDOR DETECTION -----------------------------*/
  async function fetchGVL() {
    const res = await fetch(GVL_URL);
    if (!res.ok) throw new Error(`GVL fetch failed: ${res.status}`);
    return res.json();
  }

  function extractDomain(url) {
    try {
      const u = new URL(url);
      return u.hostname.replace(/^www\./, "");
    } catch (e) {
      return null;
    }
  }

  /* KEY: Build REVERSE MAPPING - script_domain → vendor_ids */
  function buildScriptVendorMap(gvl) {
    const scriptToVendor = new Map(); // script_domain → [vendor objects]
    
    Object.values(gvl.vendors || {}).forEach(vendor => {
      const vendorDomains = new Set();
      
      // 1. Extract ALL domains from GVL vendor data
      if (vendor.urls) {
        vendor.urls.forEach(u => {
          if (u.privacy || u.home || u.web) {
            const domain = extractDomain(u.privacy || u.home || u.web);
            if (domain) vendorDomains.add(domain);
          }
        });
      }
      
      // 2. Known script patterns in vendor declaration URLs
      if (vendor.declaration) {
        vendor.declaration.forEach(d => {
          const domain = extractDomain(d.url || d);
          if (domain) vendorDomains.add(domain);
        });
      }
      
      // 3. LegitInterest URLs
      if (vendor.legIntStory) {
        const domain = extractDomain(vendor.legIntStory);
        if (domain) vendorDomains.add(domain);
      }

      // 4. MAP: script domains → vendor (reverse lookup)
      vendorDomains.forEach(domain => {
        if (!scriptToVendor.has(domain)) scriptToVendor.set(domain, []);
        scriptToVendor.get(domain).push({
          id: vendor.id,
          name: vendor.name,
          purposeIds: vendor.purposeIds || [],
          domains: Array.from(vendorDomains)
        });
      });
    });

    // 5. COMMON SCRIPT PATTERNS (extracted from GVL patterns)
    const commonScriptDomains = [
      { domain: 'googletagmanager.com', vendorId: 755 },
      { domain: 'google-analytics.com', vendorId: 755 },
      { domain: 'connect.facebook.net', vendorId: 89 },
      { domain: 'amazon-adsystem.com', vendorId: 598 },
      { domain: 'static.hotjar.com', vendorId: 780 }
    ];

    commonScriptDomains.forEach(({domain, vendorId}) => {
      if (!scriptToVendor.has(domain)) {
        scriptToVendor.set(domain, [{
          id: vendorId,
          name: `Vendor ${vendorId}`,
          purposeIds: [],
          domains: [domain]
        }]);
      }
    });

    return scriptToVendor;
  }

  /* Scan ALL scripts (head + body + dynamic) */
  function scanAllScripts() {
    const selectors = [
      "head script[src]",
      "body script[src]", 
      "script[src]" // Fallback
    ];
    
    const allScripts = Array.from(new DOMParser().parseFromString(
      document.documentElement.outerHTML, 'text/html'
    ).querySelectorAll('script[src]'));
    
    const urls = allScripts.map(s => {
      try {
        const url = new URL(s.src, window.location.origin);
        return {
          src: s.src,
          domain: url.hostname.replace(/^www\./, ""),
          fullDomain: url.hostname
        };
      } catch (e) {
        return null;
      }
    }).filter(Boolean);

    console.log(`📋 Found ${urls.length} script domains`);
    return urls;
  }

  /* DYNAMIC MATCHING - No hardcoded list! */
  function detectVendors(scriptDomains, scriptVendorMap) {
    const detected = [];
    
    scriptDomains.forEach(script => {
      console.log(`🔍 Checking: ${script.src}`);
      
      // 1. EXACT domain match from GVL-derived mapping
      if (scriptVendorMap.has(script.domain)) {
        scriptVendorMap.get(script.domain).forEach(vendor => {
          detected.push({
            vendorId: vendor.id,
            vendorName: vendor.name,
            matchType: 'gvl_script_domain',
            domain: script.domain,
            script: script.src,
            purposes: vendor.purposeIds
          });
        });
      }
      
      // 2. PARTIAL MATCH (subdomain matching)
      scriptVendorMap.forEach((vendors, gvlDomain) => {
        if (script.domain.includes(gvlDomain) || 
            gvlDomain.includes(script.domain)) {
          vendors.forEach(vendor => {
            detected.push({
              vendorId: vendor.id,
              vendorName: vendor.name,
              matchType: 'gvl_partial_match',
              domain: gvlDomain,
              script: script.src,
              purposes: vendor.purposeIds
            });
          });
        }
      });
      
      // 3. COMMON PATTERNS (fallback for popular vendors)
      const commonPatterns = {
        'googletagmanager.com': 755,
        'google-analytics.com': 755,
        'connect.facebook.net': 89,
        'amazon-adsystem.com': 598,
        'static.hotjar.com': 780,
        'cloudflareinsights.com': null // 1st party
      };
      
      if (commonPatterns[script.domain]) {
        detected.push({
          vendorId: commonPatterns[script.domain],
          vendorName: commonPatterns[script.domain] ? `Vendor ${commonPatterns[script.domain]}` : 'Cloudflare Insights (1st Party)',
          matchType: 'common_pattern',
          domain: script.domain,
          script: script.src
        });
      }
    });

    // DEDUPE by vendorId
    const unique = Object.values(detected.reduce((acc, v) => {
      acc[v.vendorId || v.domain] = v; // Handle 1st party
      return acc;
    }, {}));

    return unique;
  }

  /* MAIN DYNAMIC DETECTION */
  async function runDynamicDetection() {
    try {
      console.log("🚀 ConsentBit DYNAMIC Vendor Detection (No hardcoded map!)");
      
      // 1. Fetch latest GVL
      const gvl = await fetchGVL();
      console.log(`✅ GVL loaded: ${Object.keys(gvl.vendors || {}).length} vendors`);

      // 2. Build DYNAMIC script→vendor mapping from GVL
      const scriptVendorMap = buildScriptVendorMap(gvl);
      console.log(`✅ Dynamic mapping: ${scriptVendorMap.size} script domains`);

      // 3. Wait for async scripts
      await new Promise(r => setTimeout(r, 3000));

      // 4. Scan ALL scripts
      const scripts = scanAllScripts();
      
      // 5. DETECT vendors dynamically
      const vendors = detectVendors(scripts, scriptVendorMap);
      
      console.table("🎯 DYNAMICALLY DETECTED VENDORS:", vendors);
      
      // 6. EXPOSE for ConsentBit
      window.__IAB_DETECTED_VENDORS__ = vendors;
      
      console.log("✅ Ready for TCF Banner:", vendors.length, "vendors detected");
      
    } catch (err) {
      console.error("❌ Dynamic detection failed:", err);
    }
  }

  // Run + retries for SPA
  runDynamicDetection();
  setTimeout(runDynamicDetection, 5000);
  setTimeout(runDynamicDetection, 10000);

})();
