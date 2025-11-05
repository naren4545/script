(function () { 

  window.dataLayer = window.dataLayer || []; 
  function gtag() { dataLayer.push(arguments); } 
 
 
  gtag('consent', 'default', { 
    'analytics_storage': 'denied', 
    'ad_storage': 'denied', 
    'ad_personalization': 'denied', 
    'ad_user_data': 'denied', 
    'personalization_storage': 'denied', 
    'functionality_storage': 'granted', 
    'security_storage': 'granted' 
  }); 
 
  const ENCRYPTION_KEY = ""; 
  const ENCRYPTION_IV = ""; 
 
 
  function setConsentCookie(name, value, days) { 
   console.log(" setConsentCookie")
    let expires = ""; 
    if (days) { 
      const date = new Date(); 
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); 
      expires = "; expires=" + date.toUTCString(); 
    } 
    let cookieString = name + "=" + value + expires + "; path=/; SameSite=Lax"; 
    if (location.protocol === 'https:') { 
      cookieString += "; Secure"; 
    } 
    document.cookie = cookieString; 
    console.log(" setConsentCookie done")
  } 
  function getConsentCookie(name) { 
    const value = `; ${document.cookie}`; 
    const parts = value.split(`; ${name}=`); 
    if (parts.length === 2) return parts.pop().split(';').shift(); 
  } 
  function removeDuplicateScripts() { 
    const scripts = document.head.querySelectorAll('script[data-category]'); 
    const scriptMap = new Map(); 
     
    scripts.forEach(function(script) { 
      const src = script.src; 
      const dataCategory = script.getAttribute('data-category'); 
      const key = src + '|' + dataCategory; 
       
              if (scriptMap.has(key)) { 
          script.remove(); 
      } else { 
        scriptMap.set(key, script); 
      } 
    }); 
  } 
 
  function ensureGtagInitialization() { 
    window.dataLayer = window.dataLayer || []; 
     
    if (typeof window.gtag === 'undefined') { 
      window.gtag = function() {  
        window.dataLayer.push(arguments);  
      }; 
    } 
     
    const gtmScripts = document.querySelectorAll('script[src*="googletagmanager"]'); 
    if (gtmScripts.length > 0) { 
      if (typeof window.gtag === 'function') { 
        try { 
          window.gtag('event', 'consent_scripts_enabled', { 
            'event_category': 'consent', 
            'event_label': 'scripts_re_enabled' 
          }); 
           
          setTimeout(function() { 
            try { 
              window.gtag('config', 'GA_MEASUREMENT_ID', { 
                'page_title': document.title, 
                'page_location': window.location.href 
              }); 
            } catch (e) { 
            } 
          }, 500); 
        } catch (e) { 
        } 
      } 
    } 
     
    const analyticsScripts = document.querySelectorAll('script[src*="analytics"], script[src*="gtag"], script[src*="googletagmanager"]'); 
    if (analyticsScripts.length > 0) { 
    } 
  } 
 
  function forceReloadAnalyticsScripts() { 
    const analyticsScripts = document.querySelectorAll('script[src*="analytics"], script[src*="gtag"], script[src*="googletagmanager"], script[src*="google-analytics"]'); 
     
    analyticsScripts.forEach(function(script) { 
      if (script.type === 'text/javascript' && script.src) { 
        try { 
          const newScript = document.createElement('script'); 
           
          for (let attr of script.attributes) { 
            newScript.setAttribute(attr.name, attr.value); 
          } 
           
          newScript.type = 'text/javascript'; 
           
          newScript.onerror = function() { 
          }; 
          newScript.onload = function() { 
          }; 
           
          script.parentNode.insertBefore(newScript, script); 
          script.remove(); 
        } catch (error) { 
        } 
      } 
    }); 
  } 
 
function blockScriptsByCategory() {
  removeDuplicateScripts();
  
  var scripts = document.head.querySelectorAll('script[data-category]');
  scripts.forEach(function (script) {
    var category = script.getAttribute('data-category');
    if (category) {
      var categories = category.split(',').map(function (cat) { return cat.trim(); });
      
      var hasEssentialCategory = categories.some(function (cat) {
        var lowercaseCat = cat.toLowerCase();
        return lowercaseCat === 'necessary' || lowercaseCat === 'essential';
      });
      
      if (!hasEssentialCategory) {
        script.type = 'text/plain';
        script.setAttribute('data-blocked-by-consent', 'true');
      }
    }
  });
  // REMOVED: blockNonGoogleScripts(); - no longer needed here
} 
 function enableAllScriptsWithDataCategory() {
    // Enable all scripts with data-category attribute
    var scripts = document.head.querySelectorAll('script[data-category]');
    var blockedScripts = [];
    
    scripts.forEach(function (script) {
      var isBlocked = script.type === 'text/plain' || 
                     script.hasAttribute('data-blocked-by-consent') || 
                     script.hasAttribute('data-blocked-by-ccpa');
      
      if (isBlocked) {
        blockedScripts.push(script);
      }
    });
    
    blockedScripts.forEach(function (script) {
      if (script.src) {
        try {
          const existingScript = document.querySelector(`script[src="${script.src}"][type="text/javascript"]`);
          if (existingScript) {
            script.remove();
            return;
          }
          
          const newScript = document.createElement('script');
          
          for (let attr of script.attributes) {
            if (attr.name !== 'type' && 
                attr.name !== 'data-blocked-by-consent' && 
                attr.name !== 'data-blocked-by-ccpa') {
              newScript.setAttribute(attr.name, attr.value);
            }
          }
          
          newScript.type = 'text/javascript';
          
          newScript.onerror = function() {
          };
          newScript.onload = function() {
            ensureGtagInitialization();
          };
          
          script.parentNode.insertBefore(newScript, script);
          script.remove();
        } catch (error) {
        }
      } else {
        script.type = 'text/javascript';
        script.removeAttribute('data-blocked-by-consent');
        script.removeAttribute('data-blocked-by-ccpa');
        
        if (script.innerHTML) {
          try {
            eval(script.innerHTML);
          } catch (e) {
          }
        }
      }
    });
    
    // Unblock ALL scripts that were blocked (including those without data-category)
    // Change type from text/plain to text/javascript and remove blocking attributes
    var allBlockedScripts = document.head.querySelectorAll('script[type="text/plain"]');
    allBlockedScripts.forEach(function (script) {
      // Check if this is a Google script (should not have been blocked, but just in case)
      var isGoogleScript = script.src && (
        script.src.includes('googletagmanager.com') ||
        script.src.includes('google-analytics.com') ||
        script.src.includes('gtag') ||
        script.src.includes('analytics.js') ||
        script.src.includes('ga.js')
      );
      
      // Unblock all scripts (including Google scripts)
      if (script.src) {
        // For external scripts, create new script element to force reload
        try {
          const existingScript = document.querySelector(`script[src="${script.src}"][type="text/javascript"]`);
          if (existingScript) {
            script.remove();
            return;
          }
          
          const newScript = document.createElement('script');
          for (let attr of script.attributes) {
            if (attr.name !== 'type' && 
                attr.name !== 'data-blocked-by-consent' && 
                attr.name !== 'data-blocked-by-ccpa' &&
                attr.name !== 'data-blocked-by-targeted-advertising' &&
                attr.name !== 'data-blocked-by-sale') {
              newScript.setAttribute(attr.name, attr.value);
            }
          }
          newScript.type = 'text/javascript';
          newScript.onload = function() {
            ensureGtagInitialization();
          };
          script.parentNode.insertBefore(newScript, script);
          script.remove();
        } catch (error) {
          // Fallback: just change type if creating new script fails
          script.type = 'text/javascript';
          script.removeAttribute('data-blocked-by-consent');
          script.removeAttribute('data-blocked-by-ccpa');
        }
      } else {
        // For inline scripts, just change type and remove attributes
        script.type = 'text/javascript';
        script.removeAttribute('data-blocked-by-consent');
        script.removeAttribute('data-blocked-by-ccpa');
        script.removeAttribute('data-blocked-by-targeted-advertising');
        script.removeAttribute('data-blocked-by-sale');
        
        if (script.innerHTML) {
          try {
            eval(script.innerHTML);
          } catch (e) {
          }
        }
      }
    });
    
    removeDuplicateScripts();
    
    setTimeout(ensureGtagInitialization, 100);
  }
  function enableScriptsByCategories(allowedCategories) { 
    // Enable scripts based on categories (including Google scripts) in head section only 
    var scripts = document.head.querySelectorAll('script[data-category]'); 
    var scriptsToEnable = []; 
     
    scripts.forEach(function (script) { 
      var category = script.getAttribute('data-category'); 
      if (category) { 
        var categories = category.split(',').map(function (cat) { return cat.trim().toLowerCase(); 
}); 
        var shouldEnable = categories.some(function (cat) { 
          // Check for exact match or partial match (e.g., 'analytics' matches 'analytics_storage') 
          return allowedCategories.some(function (allowedCat) { 
            var allowedCatLower = allowedCat.toLowerCase(); 
            return cat === allowedCatLower || cat.includes(allowedCatLower) || 
allowedCatLower.includes(cat); 
          }); 
        }); 
         
        if (shouldEnable) { 
          // Check if script is blocked (either by type or attribute) 
          var isBlocked = script.type === 'text/plain' ||  
                         script.hasAttribute('data-blocked-by-consent') ||  
                         script.hasAttribute('data-blocked-by-ccpa'); 
           
          if (isBlocked) { 
            scriptsToEnable.push(script); 
          } 
        } 
      } 
    }); 
     
    scriptsToEnable.forEach(function (script) { 
      // Re-execute the script if it has a src attribute 
      if (script.src) { 
        try { 
          // Check if a script with this src already exists and is enabled 
          const existingScript = 
document.querySelector(`script[src="${script.src}"][type="text/javascript"]`); 
          if (existingScript) { 
            // Just remove the blocked version 
            script.remove(); 
            return; 
          } 
           
          // Create a new script element to force re-execution 
          const newScript = document.createElement('script'); 
           
          // Copy all attributes except blocking ones 
          for (let attr of script.attributes) { 
            if (attr.name !== 'type' &&  
                attr.name !== 'data-blocked-by-consent' &&  
                attr.name !== 'data-blocked-by-ccpa') { 
              newScript.setAttribute(attr.name, attr.value); 
            } 
          } 
           
          // Ensure proper type 
          newScript.type = 'text/javascript'; 
           
          // Add error handling for script loading 
          newScript.onerror = function() { 
            // Script failed to load 
          }; 
          newScript.onload = function() { 
            // Script loaded successfully - ensure gtag is available 
            ensureGtagInitialization(); 
          }; 
           
          // Insert the new script before the old one, then remove the old one 
          script.parentNode.insertBefore(newScript, script); 
          script.remove(); 
        } catch (error) { 
          // Error re-executing script 
        } 
      } else { 
        // For inline scripts, just change the type 
        script.type = 'text/javascript'; 
        script.removeAttribute('data-blocked-by-consent'); 
        script.removeAttribute('data-blocked-by-ccpa'); 
         
        // Execute the script if it has inline content 
        if (script.innerHTML) { 
          try { 
            eval(script.innerHTML); 
          } catch (e) { 
            // Error executing re-enabled script 
          } 
        } 
      } 
    }); 
     
    // Remove any duplicates that might have been created 
    removeDuplicateScripts(); 
     
    // Ensure gtag is properly initialized after all scripts are loaded 
    setTimeout(ensureGtagInitialization, 100); 
  } 
  function updateGtagConsent(preferences) { 
    if (typeof gtag === "function") { 
      gtag('consent', 'update', { 
        'analytics_storage': preferences.analytics ? 'granted' : 'denied', 
        'functionality_storage': 'granted', 
        'ad_storage': preferences.marketing ? 'granted' : 'denied', 
        'ad_personalization': preferences.marketing ? 'granted' : 'denied', 
        'ad_user_data': preferences.marketing ? 'granted' : 'denied', 
        'personalization_storage': preferences.personalization ? 'granted' : 'denied', 
        'security_storage': 'granted' 
      }); 
    } 
 
    // Push consent update event to dataLayer 
    if (typeof window.dataLayer !== 'undefined') { 
      window.dataLayer.push({ 
        'event': 'consent_update', 
        'consent_analytics': preferences.analytics, 
        'consent_marketing': preferences.marketing, 
        'consent_personalization': preferences.personalization 
      }); 
    } 
  } 
async function setConsentState(preferences, cookieDays = 365) {
  console.log("checkk", preferences);
  if (!preferences || typeof preferences !== 'object') {
    console.error("setConsentState failed: Invalid or missing preferences");
    return;
  }
  const consentCategories = ['analytics', 'marketing', 'personalization', 'doNotShare'];

  for (const category of consentCategories) {
    if (preferences.hasOwnProperty(category)) {
      try {
        const cookieName = category === 'doNotShare'
          ? 'cb-consent-donotshare'
          : `cb-consent-${category}_storage`;
        const cookieValue = preferences[category] ? 'true' : 'false';
        setConsentCookie(cookieName, cookieValue, cookieDays);
      } catch (err) {
        console.error(`Error setting cookie for "${category}"`, err);
      }
    }
  }

  try {
    await storeEncryptedPreferences(preferences);
    updateGtagConsent(preferences);
    const DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;
    const expiresAt = Date.now() + (cookieDays * DAY_IN_MILLISECONDS);
    localStorage.setItem('consentExpiresAt', expiresAt.toString());
    localStorage.setItem('consentExpirationDays', cookieDays.toString());

    console.log("Consent state was successfully saved.");
  } catch (err) {
    console.error("Failed to store preferences or update gtag:", err);
  }
}
  // Encrypt and store preferences in localStorage 
  async function storeEncryptedPreferences(preferences) { 
    try { 
      const preferencesString = JSON.stringify(preferences); 
      const encryptedData = await encryptWithHardcodedKey(preferencesString); 
      localStorage.setItem('encrypted-consent-preferences', encryptedData); 
    } catch (error) { 
      // Silent error handling 
    } 
  } 
 
  // Decrypt and retrieve preferences from localStorage 
  async function getDecryptedPreferences() { 
    try { 
      const encryptedData = localStorage.getItem('encrypted-consent-preferences'); 
      if (!encryptedData) { 
        return null; 
      } 
 
      // Decrypt the data 
      const key = await importHardcodedKey(); 
      const iv = base64ToUint8Array(ENCRYPTION_IV); 
      const encryptedBytes = base64ToUint8Array(encryptedData); 
 
      const decryptedBuffer = await crypto.subtle.decrypt( 
        { name: "AES-GCM", iv }, 
        key, 
        encryptedBytes 
      ); 
 
      const decryptedString = new TextDecoder().decode(decryptedBuffer); 
      return JSON.parse(decryptedString); 
    } catch (error) { 
      // Silent error handling 
      return null; 
    } 
  } 
 
  async function getConsentPreferences() { 
    // Try to get from encrypted localStorage first 
    const encryptedPrefs = await getDecryptedPreferences(); 
    if (encryptedPrefs) { 
      return encryptedPrefs; 
    } 
 
    // Fallback to cookies for backward compatibility 
    return { 
      analytics: getConsentCookie('cb-consent-analytics_storage') === 'true', 
      marketing: getConsentCookie('cb-consent-marketing_storage') === 'true', 
      personalization: getConsentCookie('cb-consent-personalization_storage') === 'true', 
      doNotShare: getConsentCookie('cb-consent-donotshare') === 'true'  // Convert to camelCase for consistency 
    }; 
  } 
  function showBanner(banner) { 
    if (banner) { 
      banner.style.setProperty("display", "block", "important"); 
      banner.style.setProperty("visibility", "visible", "important"); 
      banner.style.setProperty("opacity", "1", "important"); 
      banner.classList.add("show-banner"); 
      banner.classList.remove("hidden"); 
    } 
  } 



  function hideBanner(banner) { 
    if (banner) { 
      banner.style.setProperty("display", "none", "important"); 
      banner.style.setProperty("visibility", "hidden", "important"); 
      banner.style.setProperty("opacity", "0", "important"); 
      banner.classList.remove("show-banner"); 
      banner.classList.add("hidden"); 
    } 
  } 
  async function hideAllBanners() { 
    hideBanner(document.getElementById("consent-banner")); 
    hideBanner(document.getElementById("initial-consent-banner")); 
    hideBanner(document.getElementById("main-banner")); 
    hideBanner(document.getElementById("main-consent-banner")); 
    hideBanner(document.getElementById("simple-consent-banner")); 
     
    // Also hide any banners with data-cookie-banner attribute 
    // const dataBanners = document.querySelectorAll('[data-cookie-banner="true"]'); 
    // dataBanners.forEach(banner => hideBanner(banner)); 
     
    // Hide any consent-related divs 
    // const consentDivs = document.querySelectorAll('.consentbit-ccpa-banner-div, .consentbit-ccpa_preference, .consentbit-gdpr-banner-div, .consentbit-preference_div'); 
    // consentDivs.forEach(div => hideBanner(div)); 
  } 
 
 
 
  function base64ToUint8Array(base64) { 
    const binary = atob(base64); 
    const bytes = new Uint8Array(binary.length); 
    for (let i = 0; i < binary.length; i++) { 
      bytes[i] = binary.charCodeAt(i); 
    } 
    return bytes; 
  } 
 
  function uint8ArrayToBase64(bytes) { 
    return btoa(String.fromCharCode(...bytes)); 
  } 
 
  async function importHardcodedKey() { 
    const keyBytes = base64ToUint8Array(ENCRYPTION_KEY); 
    return crypto.subtle.importKey( 
      "raw", 
      keyBytes, 
      { name: "AES-GCM" }, 
      false, 
      ["encrypt", "decrypt"] 
    ); 
  } 
 
  async function encryptWithHardcodedKey(data) { 
    try { 
      const key = await importHardcodedKey(); 
      const iv = base64ToUint8Array(ENCRYPTION_IV); 
      const encoder = new TextEncoder(); 
      const encryptedBuffer = await crypto.subtle.encrypt( 
        { name: "AES-GCM", iv }, 
        key, 
        encoder.encode(data) 
      ); 
      return uint8ArrayToBase64(new Uint8Array(encryptedBuffer)); 
    } catch (error) { 
      throw error; 
    } 
  } 
 
 
  function isTokenExpired(token) { 
    if (!token) return true; 
    const [payloadBase64] = token.split('.'); 
    if (!payloadBase64) return true; 
    try { 
      const payload = JSON.parse(atob(payloadBase64)); 
      if (!payload.exp) return true; 
      return payload.exp < Math.floor(Date.now() / 1000); 
    } catch { 
      return true; 
    } 
  } 
  async function getOrCreateVisitorId() { 
    let visitorId = localStorage.getItem('visitorId'); 
    if (!visitorId) { 
      visitorId = crypto.randomUUID(); 
      localStorage.setItem('visitorId', visitorId); 
    } 
    return visitorId; 
  } 
  async function cleanHostname(hostname) { 
    let cleaned = hostname.replace(/^www\./, ''); 
    cleaned = cleaned.split('.')[0]; 
    return cleaned; 
  } 
 
 
  function clearVisitorSession() { 
    localStorage.removeItem('visitorId'); 
    localStorage.removeItem('visitorSessionToken'); 
    localStorage.removeItem('consent-given'); 
    localStorage.removeItem('consentExpiresAt'); 
    localStorage.removeItem('consentExpirationDays'); 
  } 
 
 
  let tokenRequestInProgress = false; 
 
  async function getVisitorSessionToken() { 
    try { 
  console.log("problem check 1")
      if (tokenRequestInProgress) { 
       console.log("problem check2")
        await new Promise(resolve => setTimeout(resolve, 1000)); 
        const existingToken = localStorage.getItem('visitorSessionToken'); 
        if (existingToken && !isTokenExpired(existingToken)) { 
          return existingToken; 
        } 
      } 
 
      const existingToken = localStorage.getItem('visitorSessionToken'); 
      if (existingToken && !isTokenExpired(existingToken)) { 
        console.log("problem check 3")
        return existingToken; 
      } 
 
  
      tokenRequestInProgress = true; 
  console.log("problem check4")
      const visitorId = await getOrCreateVisitorId(); 
      console.log("problem check5", visitorId)
      const siteName = document.getElementById('consensite-id').textContent; 
console.log("siteName",siteName)
      const response = await fetch('https://framer.consentbit.com/api/visitor-token', { 
        method: 'POST', 
        headers: { 
          'Content-Type': 'application/json' 
        }, 
        body: JSON.stringify({ 
          visitorId: visitorId, 
          // userAgent: navigator.userAgent, // Removed to fix fingerprinting warnings 
          siteName: siteName 
        }) 
      }); 
 
      if (!response.ok) { 
 
        if (response.status === 500) { 
          clearVisitorSession(); 
 
 
          const newVisitorId = await getOrCreateVisitorId(); 
          const retryResponse = await 
fetch('https://framer.consentbit.com/api/visitor-token', { 
            method: 'POST', 
            headers: { 
              'Content-Type': 'application/json' 
            }, 
            body: JSON.stringify({ 
              visitorId: newVisitorId, 
              // userAgent: navigator.userAgent, // Removed to fix fingerprinting warnings 
              siteName: siteName 
            }) 
          }); 
 
          if (!retryResponse.ok) { 
            throw new Error(`Retry failed after clearing session: ${retryResponse.status}`); 
          } 
 
          const retryData = await retryResponse.json(); 
          // Store token immediately 
          console.log(retryData)
          localStorage.setItem('visitorSessionToken', retryData.token); 
          return retryData.token; 
        } 
 
        throw new Error(`Failed to get visitor session token: ${response.status}`); 
      } 
 
      const data = await response.json(); 
  console.log(data)
      localStorage.setItem('visitorSessionToken', data.token); 
      return data.token; 
    } catch (error) { 
      return null; 
    } finally { 
 
      tokenRequestInProgress = false; 
    } 
  } 
 
 
  async function fetchCookieExpirationDays() { 
    const sessionToken = localStorage.getItem("visitorSessionToken"); 
    if (!sessionToken) return 180; 
    try { 
    const siteName = document.getElementById('consensite-id').textContent;
      const apiUrl = 
`https://framer.consentbit.com/banner/get/${encodeURIComponent(siteName)}`; 
      const response = await fetch(apiUrl, { 
        method: "GET", 
        headers: { 
          "Authorization": `Bearer ${sessionToken}`, 
          "Accept": "application/json" 
        } 
      }); 
      if (!response.ok) return 180; 
      const data = await response.json(); 
      if (data && data.settings.expires !== null && data.settings.expires !== undefined) { 
        return parseInt(data.settings.expires, 10); 
      } 
      return 180; 
    } catch { 
      return 180; 
    } 
  } 
 
 
  function getTestLocationOverride() { 
 
    const override = localStorage.getItem('test_location_override'); 
    if (override) { 
      try { 
        return JSON.parse(override); 
      } catch { 
        return null; 
      } 
    } 
    return null; 
  } 
 
 
    let country = null; 
   
  // CLIENT-SIDE DETECTION REMOVED - Using server-side only 
   
  // Show CCPA banner 
  function showCCPABanner() { 
    hideBanner(document.getElementById("consent-banner")); 
    showBanner(document.getElementById("initial-consent-banner")); 
  } 
   
  // Show GDPR banner   
  function showGDPRBanner() { 
    hideBanner(document.getElementById("initial-consent-banner")); 
    showBanner(document.getElementById("consent-banner")); 
  } 
   
  // Server-side location detection functions removed - using direct server detection only 
   
    async function detectLocationAndGetBannerType() { 
    try { 
      const sessionToken = localStorage.getItem('visitorSessionToken'); 
 
      if (!sessionToken) { 
        return null; 
      } 
 
      const siteName = window.location.hostname.replace(/^www\./, '').split('.')[0]; 
 console.log("working loacation")
      const apiUrl = `https://framer.consentbit.com/location?siteName=${encodeURIComponent(siteName)}`; 
 
      const response = await fetch(apiUrl, { 
        method: 'GET', 
        headers: { 
          'Authorization': `Bearer ${sessionToken}`, 
          'Content-Type': 'application/json', 
          'Accept': 'application/json' 
        }, 
      }); 
 
      if (!response.ok) { 
        return null; 
      } 
 
      const data = await response.json(); 
 
      if (!data.bannerType) { 
        return null; 
      } 
 
      country = data.country; 
      const locationData = { 
        country: data.country || 'UNKNOWN', 
        continent: data.continent || 'UNKNOWN', 
        state: data.state || null, 
        bannerType: data.bannerType 
      }; 
      currentLocation = locationData; 
      country = locationData.country; 
      return data; 
    } catch (error) { 
      return null; 
    } 
  } 
 
 
  async function saveConsentStateToServer(preferences, cookieDays, includeUserAgent) { 
    try { 
      const clientId = window.location.hostname; 
      const visitorId = localStorage.getItem("visitorId"); 
      const policyVersion = "1.2"; 
      const timestamp = new Date().toISOString(); 
      const sessionToken = localStorage.getItem("visitorSessionToken"); 
 
 const siteId = document.getElementById('consensite-id').textContent;

      if (!sessionToken) { 
        return; 
      } 
 
 
   console.log("checkk final")
 
      const fullPayload = { 
        clientId, 
       siteId,
        visitorId, 
        preferences, 
        policyVersion, 
        timestamp, 
        country: country || "IN", 
        bannerType: preferences.bannerType || "GDPR", 
        expiresAtTimestamp: Date.now() + ((cookieDays || 365) * 24 * 60 * 60 * 1000), 
        expirationDurationDays: cookieDays || 365, 
        metadata: { 
          ...(includeUserAgent && { userAgent: navigator.userAgent }), 
          language: navigator.language, 
          platform: navigator.userAgentData?.platform || "unknown", 
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone 
        } 
      }; 
 
 
    //   const encryptedPayload = await encryptWithHardcodedKey(JSON.stringify(fullPayload)); 
 
 
    //   const requestBody = { 
    //     encryptedData: fullPayload
    //   }; 
 
 const requestBody =fullPayload
 
      const response = await 
fetch("https://framer.consentbit.com/consent", { 
        method: "POST", 
        headers: { 
          "Content-Type": "application/json", 
          "Authorization": `Bearer ${sessionToken}`, 
        }, 
        body: JSON.stringify(requestBody), 
      }); 
 
      if (!response.ok) { 
        const errorText = await response.text(); 
        throw new Error(`Server error: ${response.status} ${response.statusText}`); 
      } 
 
      const result = await response.json(); 
 
    } catch (error) { 
      // Silent error handling 
      console.error("Error saving consent state to server:", error);
    } 
  } 
 
 
  function updatePreferenceForm(preferences) { 
    const necessaryCheckbox = 
document.querySelector('[data-consent-id="necessary-checkbox"]'); 
    const marketingCheckbox = 
document.querySelector('[data-consent-id="marketing-checkbox"]'); 
    const personalizationCheckbox = 
document.querySelector('[data-consent-id="personalization-checkbox"]'); 
    const analyticsCheckbox = 
document.querySelector('[data-consent-id="analytics-checkbox"]'); 
 
 
 
    if (necessaryCheckbox) { 
      necessaryCheckbox.checked = true; 
      necessaryCheckbox.disabled = true; 
    } 
    if (marketingCheckbox) { 
      marketingCheckbox.checked = Boolean(preferences.marketing); 
    } 
    if (personalizationCheckbox) { 
      personalizationCheckbox.checked = Boolean(preferences.personalization); 
    } 
    if (analyticsCheckbox) { 
      analyticsCheckbox.checked = Boolean(preferences.analytics); 
    } 
  } 
 
 
  function updateCCPAPreferenceForm(preferences) { 
 
    const doNotShareCheckbox = 
document.querySelector('[data-consent-id="do-not-share-checkbox"]'); 
 
 
 
    if (doNotShareCheckbox) { 
 
      if (preferences.hasOwnProperty('doNotShare')) { 
        doNotShareCheckbox.checked = preferences.doNotShare; 
      } else if (preferences.hasOwnProperty('donotshare')) { 
        doNotShareCheckbox.checked = preferences.donotshare; 
      } else { 
 
        const shouldCheck = !preferences.analytics || !preferences.marketing || 
!preferences.personalization; 
        doNotShareCheckbox.checked = shouldCheck; 
      } 
    } 
 
 
    const ccpaToggleCheckboxes = 
document.querySelectorAll('.consentbit-ccpa-prefrence-toggle input[type="checkbox"]'); 
    ccpaToggleCheckboxes.forEach(checkbox => { 
      const checkboxName = checkbox.name || checkbox.getAttribute('data-category') || ''; 
 
      if (checkboxName.toLowerCase().includes('analytics')) { 
        checkbox.checked = !Boolean(preferences.analytics); 
      } else if (checkboxName.toLowerCase().includes('marketing') || 
checkboxName.toLowerCase().includes('advertising')) { 
        checkbox.checked = !Boolean(preferences.marketing); 
      } else if (checkboxName.toLowerCase().includes('personalization') || 
checkboxName.toLowerCase().includes('functional')) { 
        checkbox.checked = !Boolean(preferences.personalization); 
      } 
    }); 
  } 
 
  async function checkPublishingStatus() { 
    try { 
      const sessionToken = localStorage.getItem('visitorSessionToken'); 
      console.log("problem check6", sessionToken)
      if (!sessionToken) { 
        return false; 
      } 
      const siteDomain = window.location.hostname; 
      const apiUrl = 
`https://framer.consentbit.com/subscription-status?siteDomain=${encodeURIComponent(siteDomain)}`; 
      const response = await fetch(apiUrl, { 
        method: "GET", 
        headers: { 
          "Authorization": `Bearer ${sessionToken}`, 
          "Accept": "application/json" 
        } 
      }); 
      if (!response.ok) { 
        return false; 
      } 
      const data = await response.json(); 
      return data.canPublishToCustomDomain === true; 
    } catch (error) { 
      return false; 
    } 
  } 
  function removeConsentElements() {    const selectors = [ 
      '.consentbit-gdpr-banner-div', 
      '.consentbit-preference_div', 
      '.consentbit-change-preference', 
      '.consentbit-ccpa-banner-div', 
      '.consentbit-ccpa_preference', 
    ]; 
    selectors.forEach(selector => { 
      const elements = document.querySelectorAll(selector); 
      elements.forEach(el => el.remove()); 
    }); 
  } 
  function isStagingHostname() { 
    const hostname = window.location.hostname; 
    return hostname.includes('.framer.app') || hostname.includes('localhost') || 
hostname.includes('127.0.0.1'); 
  } 
 
 
  // --- Load Consent Styles --- 
  function loadConsentStyles() { 
    try { 
      const link = document.createElement("link"); 
      link.rel = "stylesheet"; 
      link.href = "https://cdn.jsdelivr.net/gh/snm62/consentbit@0980c49/consentbitstyle.css"; 
      link.type = "text/css"; 
      const link2 = document.createElement("link"); 
      link2.rel = "stylesheet"; 
      link2.href = "https://cdn.jsdelivr.net/gh/snm62/consentbit@8c69a0b/consentbit.css"; 
      document.head.appendChild(link2); 
      link.onerror = function () {}; 
      link.onload = function () {}; 
      document.head.appendChild(link); 
    } catch (error) { 
      // Silent error handling 
    } 
  } 
  function monitorDynamicScripts() { 
    const observer = new MutationObserver(function (mutations) { 
      mutations.forEach(function (mutation) { 
        mutation.addedNodes.forEach(function (node) { 
          if (node.nodeType === 1 && node.tagName === 'SCRIPT') { 
 
            const analyticsConsent = localStorage.getItem("cb-consent-analytics_storage"); 
            const marketingConsent = localStorage.getItem("cb-consent-marketing_storage"); 
            const personalizationConsent = 
localStorage.getItem("cb-consent-personalization_storage"); 
            const consentGiven = localStorage.getItem("consent-given"); 
 
 
            if (node.hasAttribute('data-category')) { 
              const category = node.getAttribute('data-category'); 
              const categories = category.split(',').map(function (cat) { return cat.trim(); }); 
 
              // Check if ANY category is necessary or essential (these should never be blocked) 
              var hasEssentialCategory = categories.some(function (cat) { 
                var lowercaseCat = cat.toLowerCase(); 
                return lowercaseCat === 'necessary' || lowercaseCat === 'essential'; 
              }); 
 
 
              if (!hasEssentialCategory && consentGiven === "true") { 
                var shouldBlock = false; 
 
 
                categories.forEach(function (cat) { 
                  var lowercaseCat = cat.toLowerCase(); 
                  if (lowercaseCat === 'analytics' && analyticsConsent === "false") { 
                    shouldBlock = true; 
                  } else if ((lowercaseCat === 'marketing' || lowercaseCat === 'advertising') && 
marketingConsent === "false") { 
                    shouldBlock = true; 
                  } else if ((lowercaseCat === 'personalization' || lowercaseCat === 'functional') && 
personalizationConsent === "false") { 
                    shouldBlock = true; 
                  } 
                }); 
 
                if (shouldBlock) { 
                  node.type = 'text/plain'; 
                  node.setAttribute('data-blocked-by-consent', 'true'); 
                } 
              } 
            } else { 
 
              if (node.src && ( 
                node.src.includes('facebook.net') || 
                node.src.includes('fbcdn.net') || 
                node.src.includes('hotjar.com') || 
                node.src.includes('mixpanel.com') || 
                node.src.includes('intercom.io') || 
                node.src.includes('klaviyo.com') || 
                node.src.includes('tiktok.com') || 
                node.src.includes('linkedin.com') || 
                node.src.includes('twitter.com') || 
                node.src.includes('adobe.com') 
              )) { 
 
                if (analyticsConsent === "false" && marketingConsent === "false") { 
                  node.type = 'text/plain'; 
                  node.setAttribute('data-blocked-by-consent', 'true'); 
                } 
              } 
            } 
          } 
        }); 
      }); 
    }); 
 
    observer.observe(document.documentElement, { 
      childList: true, 
      subtree: true 
    }); 
  } 
 
 
  if (document.readyState === 'loading') { 
    document.addEventListener('DOMContentLoaded', function() { 
      loadConsentStyles(); 
      monitorDynamicScripts(); 
    }); 
  } else { 
    loadConsentStyles(); 
    monitorDynamicScripts(); 
  } 
 
 
 
  async function checkConsentExpiration() { 
    const expiresAt = localStorage.getItem('consentExpiresAt'); 
    if (expiresAt && Date.now() > parseInt(expiresAt, 10)) { 
 
      localStorage.removeItem('consent-given'); 
      localStorage.removeItem('consent-preferences'); 
      localStorage.removeItem('consentExpiresAt'); 
      localStorage.removeItem('consentExpirationDays'); 
 
      ['analytics', 'marketing', 'personalization'].forEach(category => { 
        setConsentCookie('cb-consent-' + category + '_storage', '', -1); 
      }); 
    } 
  } 
 
  
  // async function disableScrollOnSite(){ 
  //   const scrollControl = document.querySelector('[scroll-control="true"]'); 
  //   function toggleScrolling() { 
  //     const banner = document.querySelector('[data-cookie-banner="true"]'); 
  //     if (!banner) return; 
  //     const observer = new MutationObserver(() => { 
  //       const isVisible = window.getComputedStyle(banner).display !== "none"; 
  //       document.body.style.overflow = isVisible ? "hidden" : ""; 
  //     }); 
  //     // Initial check on load 
  //     const isVisible = window.getComputedStyle(banner).display !== "none"; 
  //     document.body.style.overflow = isVisible ? "hidden" : ""; 
  //     observer.observe(banner, { attributes: true, attributeFilter: ["style", "class"] }); 
  //   } 
  //   if (scrollControl) { 
  //     toggleScrolling(); 
  //   } 
  // } 
async function disableScrollOnSite() {
  const scrollControl = document.querySelector('[scroll-control="true"]');
  if (!scrollControl) {
    console.log("No scroll control element found.");
    return;
  }

  let scrollLocked = false;

  function lockScroll() {
    if (scrollLocked) return;
    scrollLocked = true;
    const scrollY = window.scrollY;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    document.body.dataset.scrollY = scrollY;
    console.log("Scroll locked at", scrollY);
  }

  function unlockScroll() {
    if (!scrollLocked) return;
    scrollLocked = false;
    const scrollY = parseInt(document.body.dataset.scrollY || '0', 10);
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    window.scrollTo(0, scrollY);
    console.log("Scroll unlocked");
  }

  function isElementVisible(el) {
    const style = window.getComputedStyle(el);
    return (
      style.display !== "none"
    );
  }

  function anyBannerVisible() {
    const banners = Array.from(document.querySelectorAll('[data-cookie-banner="true"]'));
    const visibleCount = banners.filter(isElementVisible).length;
    console.log(`Banners total: ${banners.length}, visible: ${visibleCount}`);
    return visibleCount > 0;
  }

  function updateScrollState() {
    if (anyBannerVisible()) lockScroll();
    else unlockScroll();
  }

  const observer = new MutationObserver(mutations => {
    console.log(`DOM mutation detected: ${mutations.length} change(s)`);
    updateScrollState();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['style', 'class', 'hidden', 'aria-hidden'],
  });

  console.log("disableScrollOnSite initialized");
  updateScrollState();
}


  document.addEventListener('DOMContentLoaded', async function () { 
    await hideAllBanners(); 
   // await checkConsentExpiration(); 
    
    // Will check banner after required API calls 
 
    let canPublish = false; 
    let isStaging = false; 
    let locationData = null; 
 
 
    const toggleConsentBtn = document.getElementById('toggle-consent-btn'); 
 
    if (toggleConsentBtn) { 
      toggleConsentBtn.onclick = async function (e) { 
        e.preventDefault(); 
 
        // Get location data for toggle button 
        if (!locationData) { 
          locationData = await detectLocationAndGetBannerType(); 
        } 
 
        const consentBanner = document.getElementById("consent-banner"); 
        const ccpaBanner = document.getElementById("initial-consent-banner"); 
        const mainBanner = document.getElementById("main-banner"); 
 
        if (locationData && (["CCPA", "VCDPA", "CPA", "CTDPA", 
"UCPA"].includes(locationData.bannerType) || locationData.country === "US") && 
ccpaBanner && !document.getElementById("consensite-banner-type").textContent.toLowerCase().includes("gdpr")) { 
          console.log("working fine 1")
          hideAllBanners(); 
          showBanner(ccpaBanner); 
 
          setTimeout(async () => { 
            const preferences = await getConsentPreferences(); 
            updateCCPAPreferenceForm(preferences); 
          }, 100); 
        } else if (consentBanner) { 
         console.log("working fine")
          hideAllBanners(); 
          showBanner(consentBanner); 
        } 
 
        if (typeof updatePreferenceForm === 'function') { 
          setTimeout(async () => { 
            const preferences = await getConsentPreferences(); 
            updatePreferenceForm(preferences); 
          }, 100); 
        } 
      }; 
    } 
     
    try { 
      const token = await getVisitorSessionToken(); 
    console.log('Visitor session token:', token);
      if (!token) { 
        clearVisitorSession(); 
        const retryToken = await getVisitorSessionToken(); 
        if (!retryToken) { 
          setTimeout(() =>{ 
           console.log("problem")
           // location.reload()
          }, 3000); 
          return; 
        } 
        localStorage.setItem('visitorSessionToken', retryToken); 
      } else { 
        if (!localStorage.getItem('visitorSessionToken')) { 
          localStorage.setItem('visitorSessionToken', token); 
        } 
      } 
      canPublish = await checkPublishingStatus(); 
     canPublish=true;
     console.log("hiiiiii",canPublish)
      isStaging = isStagingHostname(); 
 
      if (!canPublish && !isStaging) { 
        removeConsentElements(); 
        return; 
      } 
    } catch (error) { 
      clearVisitorSession(); 
      setTimeout(() => location.reload(), 5000); 
      return; 
    } 
 
 
    // Check consent first 
    const consentGiven = localStorage.getItem("consent-given"); 
     
    // Only show banner if no consent given 
    if (!consentGiven) { 
      const testOverride = getTestLocationOverride(); 
      if (testOverride) { 
        locationData = testOverride; 
        country = testOverride.country; 
        // Show appropriate banner based on test override 
        if (testOverride.bannerType === 'CCPA') { 
          showCCPABanner(); 
        } else { 
          showGDPRBanner(); 
        } 
      } else { 
        // Server-side location detection before showing banner 
        locationData = await detectLocationAndGetBannerType(); 
        if (locationData && locationData.bannerType) { 
          country = locationData.country; 
          if (locationData.bannerType === 'CCPA' && !document.getElementById("consensite-banner-type").textContent.toLowerCase().includes("gdpr")) { 
            showCCPABanner(); 
          } else { 
            showGDPRBanner(); 
          } 
        } else { 
          // Fallback to GDPR if server detection fails 
          showGDPRBanner(); 
        } 
      } 
    } 
     
    // POST-BANNER OPERATIONS (after banner is visible) 
     
    // 1. Enable scroll control 
    await disableScrollOnSite(); 
     
    // 2. Check consent expiration 
    checkConsentExpiration(); 
     console.log("check scanning")
    // 3. Scan and send scripts (in background) 
    const currentToken = localStorage.getItem('visitorSessionToken'); 
    if (currentToken) { 
     console.log("check scanning 2")
      Promise.resolve().then(() => scanAndSendHeadScriptsIfChanged(currentToken)) 
        .catch(error => { 
          // Silent error handling 
        }); 
    } 
     
    let cookieDays = await fetchCookieExpirationDays(); 
   console.log("exp", cookieDays )
    const prefs = await getConsentPreferences(); 
    updatePreferenceForm(prefs); 
 
 
 
    // Accept all 
    const acceptBtn = document.getElementById('accept-btn'); 
    if (acceptBtn) { 
      acceptBtn.onclick = async function (e) { 
        e.preventDefault(); 
         
        // IMMEDIATE UI RESPONSE: Hide banners and update UI first 
        hideBanner(document.getElementById("consent-banner")); 
        hideBanner(document.getElementById("initial-consent-banner")); 
        hideBanner(document.getElementById("main-banner")); 
        hideBanner(document.getElementById("main-consent-banner")); 
        hideBanner(document.getElementById("simple-consent-banner")); 
        localStorage.setItem("consent-given", "true"); 
         
        // Enable scripts immediately for better UX 
         console.log("checkk 1")
        enableAllScriptsWithDataCategory(); 
         
        // Background API calls (non-blocking) 
        const preferences = {  
          analytics: true,  
          marketing: true,  
          personalization: true,  
          doNotShare: false,  
          action: 'acceptance',  
          bannerType: locationData ? locationData.bannerType : undefined  
        }; 
           console.log("checkk 2")
        // Do heavy operations in background 
        Promise.all([ 
          setConsentState(preferences, cookieDays), 
          saveConsentStateToServer(preferences, cookieDays, true) 
        ]).catch(error => { 
        }); 
      }; 
    } 
 
    // Reject all 
    const declineBtn = document.getElementById('decline-btn'); 
    if (declineBtn) { 
      declineBtn.onclick = async function (e) { 
        e.preventDefault(); 
         
        // IMMEDIATE UI RESPONSE: Hide banners and update UI first 
        hideBanner(document.getElementById("consent-banner")); 
        hideBanner(document.getElementById("initial-consent-banner")); 
        hideBanner(document.getElementById("main-banner")); 
        hideBanner(document.getElementById("main-consent-banner")); 
        hideBanner(document.getElementById("simple-consent-banner")); 
        localStorage.setItem("consent-given", "true"); 
         
        // Block scripts immediately 
        blockScriptsByCategory(); 
         
        // Update Google Consent immediately 
        if (typeof gtag === "function") { 
          gtag('consent', 'update', { 
            'analytics_storage': 'denied', 
            'ad_storage': 'denied', 
            'ad_personalization': 'denied', 
            'ad_user_data': 'denied', 
            'personalization_storage': 'denied', 
            'functionality_storage': 'granted', 
            'security_storage': 'granted' 
          }); 
        } 
         
        // Background API calls (non-blocking) 
        const preferences = {  
          analytics: false,  
          marketing: false,  
          personalization: false,  
          doNotShare: true,  
          action: 'rejection',  
          bannerType: locationData ? locationData.bannerType : undefined  
        }; 
         
        // Do heavy operations in background 
        Promise.all([ 
          setConsentState(preferences, cookieDays), 
          saveConsentStateToServer(preferences, cookieDays, false) 
        ]).catch(error => { 
        }); 
      }; 
    } 
 
    // Do Not Share (CCPA) 
    const doNotShareBtn = document.getElementById('do-not-share-link'); 
    if (doNotShareBtn) { 
      doNotShareBtn.onclick = async function (e) { 
        e.preventDefault(); 
 
        
 
        // Show main consent banner with force 
        const mainBanner = document.getElementById('main-consent-banner'); 
        if (mainBanner) { 
         hideBanner(document.getElementById("initial-consent-banner")); 
          showBanner(mainBanner); 
 
          // Update CCPA preference form with saved preferences 
          const preferences = await getConsentPreferences(); 
          updateCCPAPreferenceForm(preferences); 
        } 
      }; 
    } 
 
          // CCPA Preference Accept button 
      const ccpaPreferenceAcceptBtn = 
document.getElementById('consebit-ccpa-prefrence-accept'); 
      if (ccpaPreferenceAcceptBtn) { 
        ccpaPreferenceAcceptBtn.onclick = async function (e) { 
          e.preventDefault(); 
 
          // IMMEDIATE UI RESPONSE: Hide banners first 
          hideBanner(document.getElementById("initial-consent-banner")); 
          const ccpaPreferencePanel = document.querySelector('.consentbit-ccpa_preference'); 
          hideBanner(ccpaPreferencePanel); 
          const ccpaBannerDiv = document.querySelector('.consentbit-ccpa-banner-div'); 
          hideBanner(ccpaBannerDiv); 
          localStorage.setItem("consent-given", "true"); 
 
          // Read the do-not-share checkbox value 
          const doNotShareCheckbox = 
document.querySelector('[data-consent-id="do-not-share-checkbox"]'); 
          let preferences; 
 
          if (doNotShareCheckbox && doNotShareCheckbox.checked) { 
            // Checkbox checked means "Do Not Share" - block based on US law type 
            preferences = { 
              
              doNotShare: true,  // Changed to camelCase to match server expectation 
              doNotSell: true,   // Added to match server expectation 
              action: 'rejection', 
              bannerType: locationData ? locationData.bannerType : undefined 
            }; 
 
            // For CCPA: Disable Webflow Analytics when "Do Not Share" is checked 
            localStorage.setItem("cb-consent-analytics_storage", "false"); 
            //disableWebflowAnalytics(); 
 
            // Apply law-specific blocking based on banner type 
            if (locationData && ["VCDPA", "CPA", "CTDPA", 
"UCPA"].includes(locationData.bannerType)) { 
              // Enhanced privacy laws with granular opt-out requirements 
              blockTargetedAdvertisingScripts(); 
              blockSaleScripts(); 
              blockProfilingScripts(); 
              blockCrossContextBehavioralAdvertising(); 
              blockAutomatedDecisionScripts(); 
            } else { 
              // CCPA - block all scripts   
              blockScriptsWithDataCategory(); 
              blockNonGoogleScripts(); 
            } 
          } else { 
            // Checkbox unchecked means "Allow" - unblock all scripts 
            preferences = { 
              
              doNotShare: false,  // Changed to camelCase to match server expectation 
              doNotSell: false,   // Added to match server expectation 
              action: 'acceptance', 
              bannerType: locationData ? locationData.bannerType : undefined 
            }; 
             
            // For CCPA: Enable Webflow Analytics when "Do Not Share" is unchecked 
            localStorage.setItem("cb-consent-analytics_storage", "true"); 
            //enableWebflowAnalytics(); 
             
            // Unblock all scripts 
            unblockScriptsWithDataCategory(); 
 
            // Also unblock any scripts that might have been blocked by the initial blocking 
            var allBlockedScripts = 
document.head.querySelectorAll('script[type="text/plain"][data-category]'); 
            allBlockedScripts.forEach(function (oldScript) { 
              var newScript = document.createElement('script'); 
              for (var i = 0; i < oldScript.attributes.length; i++) { 
                var attr = oldScript.attributes[i]; 
                if (attr.name === 'type') { 
                  newScript.type = 'text/javascript'; 
                } else if (attr.name !== 'data-blocked-by-consent' && attr.name !== 
'data-blocked-by-ccpa') { 
                  newScript.setAttribute(attr.name, attr.value); 
                } 
              } 
              if (oldScript.innerHTML) { 
                newScript.innerHTML = oldScript.innerHTML; 
              } 
              oldScript.parentNode.replaceChild(newScript, oldScript); 
            }); 
          } 
 
          // Background operations - don't block UI 
          Promise.all([ 
            setConsentState(preferences, cookieDays), 
            saveConsentStateToServer(preferences, cookieDays, true) 
          ]).catch(error => { 
            // Silent error handling 
          }); 
        }; 
      } 
 
          // CCPA Preference Decline button 
      const ccpaPreferenceDeclineBtn = 
document.getElementById('consebit-ccpa-prefrence-decline'); 
      if (ccpaPreferenceDeclineBtn) { 
        ccpaPreferenceDeclineBtn.onclick = async function (e) { 
          e.preventDefault(); 
 
          // IMMEDIATE UI RESPONSE: Hide banners and block scripts 
          hideBanner(document.getElementById("initial-consent-banner")); 
          const ccpaPreferencePanel = document.querySelector('.consentbit-ccpa_preference'); 
          hideBanner(ccpaPreferencePanel); 
          const ccpaBannerDiv = document.querySelector('.consentbit-ccpa-banner-div'); 
          hideBanner(ccpaBannerDiv); 
          localStorage.setItem("consent-given", "true"); 
          localStorage.setItem("cb-consent-analytics_storage", "false"); 
           
          // Block scripts immediately 
          blockScriptsByCategory(); 
         // disableWebflowAnalytics(); 
 
          // Background operations 
          const preferences = { 
            doNotShare: true, 
            doNotSell: true, 
            action: 'rejection', 
            bannerType: locationData ? locationData.bannerType : undefined 
          }; 
 
          Promise.all([ 
            setConsentState(preferences, cookieDays), 
            saveConsentStateToServer(preferences, cookieDays, true) 
          ]).catch(error => { 
            // Silent error handling 
          }); 
        }; 
      } 
 
          // Save button (CCPA) 
      const saveBtn = document.getElementById('save-btn'); 
      if (saveBtn) { 
        saveBtn.onclick = async function (e) { 
          e.preventDefault(); 
 
          // IMMEDIATE UI RESPONSE: Hide banners first 
          const mainConsentBanner = document.getElementById('main-consent-banner'); 
          const initialConsentBanner = document.getElementById('initial-consent-banner'); 
          if (mainConsentBanner) hideBanner(mainConsentBanner); 
          if (initialConsentBanner) hideBanner(initialConsentBanner); 
          localStorage.setItem("consent-given", "true"); 
 
          // Read the do-not-share checkbox value 
          const doNotShareCheckbox = 
document.querySelector('[data-consent-id="do-not-share-checkbox"]'); 
          let preferences; 
          let includeUserAgent; 
 
          if (doNotShareCheckbox && doNotShareCheckbox.checked) { 
            // Checkbox checked means "Do Not Share" - block all scripts and restrict userAgent 
            preferences = { 
              
              doNotShare: true,  // Changed to camelCase to match server expectation 
              doNotSell: true,   // Added to match server expectation 
              action: 'rejection', 
              bannerType: locationData ? locationData.bannerType : undefined 
            }; 
            includeUserAgent = false; // Restrict userAgent 
             
            // For CCPA: Disable Webflow Analytics when "Do Not Share" is checked 
            localStorage.setItem("cb-consent-analytics_storage", "false"); 
           // disableWebflowAnalytics(); 
          } else { 
            // Checkbox unchecked means "Allow" - unblock all scripts and allow userAgent 
            preferences = { 
               
              doNotShare: false,  // Changed to camelCase to match server expectation 
              doNotSell: false,   // Added to match server expectation 
              action: 'acceptance', 
              bannerType: locationData ? locationData.bannerType : undefined 
            }; 
            includeUserAgent = true; // Allow userAgent 
             
            // For CCPA: Enable Webflow Analytics when "Do Not Share" is unchecked 
            localStorage.setItem("cb-consent-analytics_storage", "true"); 
            //enableWebflowAnalytics(); 
          } 
 
          // Handle script blocking/unblocking immediately 
          if (doNotShareCheckbox && doNotShareCheckbox.checked) { 
            blockScriptsWithDataCategory(); 
          } else { 
            unblockScriptsWithDataCategory(); 
          } 
 
          // Background operations 
          Promise.all([ 
            setConsentState(preferences, cookieDays), 
            saveConsentStateToServer(preferences, cookieDays, includeUserAgent) 
          ]).catch(error => { 
            // Silent error handling 
          }); 
        }; 
      } 
 
    // Preferences button (show preferences panel) 
    const preferencesBtn = document.getElementById('preferences-btn'); 
    if (preferencesBtn) { 
      preferencesBtn.onclick = async function (e) { 
        e.preventDefault(); 
        // IMMEDIATE UI RESPONSE 
        hideBanner(document.getElementById("consent-banner")); 
        showBanner(document.getElementById("main-banner")); 
         
        // Background preference loading 
        getConsentPreferences().then(preferences => { 
          updatePreferenceForm(preferences); 
        }).catch(error => { 
          // Silent error handling 
        }); 
      }; 
    } 
 
    // Save Preferences button 
    const savePreferencesBtn = document.getElementById('save-preferences-btn'); 
    if (savePreferencesBtn) { 
      savePreferencesBtn.onclick = async function (e) { 
        e.preventDefault(); 
         
        // IMMEDIATE UI RESPONSE: Hide banners first 
        hideBanner(document.getElementById("main-banner")); 
        hideBanner(document.getElementById("consent-banner")); 
        hideBanner(document.getElementById("initial-consent-banner")); 
        localStorage.setItem("consent-given", "true"); 
         
        // Read checkboxes and handle scripts immediately 
        const analytics = 
!!document.querySelector('[data-consent-id="analytics-checkbox"]:checked'); 
        const marketing = 
!!document.querySelector('[data-consent-id="marketing-checkbox"]:checked'); 
        const personalization = 
!!document.querySelector('[data-consent-id="personalization-checkbox"]:checked'); 
         
        // Block ALL scripts first, then enable selected categories 
        blockScriptsByCategory(); 
        const selectedCategories = []; 
        if (analytics) selectedCategories.push('analytics'); 
        if (marketing) selectedCategories.push('marketing'); 
        if (personalization) selectedCategories.push('personalization'); 
         
        if (selectedCategories.length > 0) { 
          enableScriptsByCategories(selectedCategories); 
        } 
 
        // Background operations 
        const preferences = { 
          analytics: analytics, 
          marketing: marketing, 
          personalization: personalization, 
          action: (analytics || marketing || personalization) ? 'acceptance' : 'rejection', 
          bannerType: locationData ? locationData.bannerType : undefined 
        }; 
         updateGtagConsent(preferences);  // NEW: Immediate update
        Promise.all([ 
          setConsentState(preferences, cookieDays), 
          saveConsentStateToServer(preferences, cookieDays, true) 
        ]).catch(error => { 
          // Silent error handling 
        }); 
      }; 
    } 
 
    // Cancel button (go back to main banner) 
    const cancelGDPRBtn = document.getElementById('cancel-btn'); 
    if (cancelGDPRBtn) { 
      cancelGDPRBtn.onclick = async function (e) { 
        e.preventDefault(); 
  // STEP 6: Hide banners 
        hideBanner(document.getElementById("main-banner")); 
        hideBanner(document.getElementById("consent-banner")); 
        // STEP 1: Block all scripts except necessary/essential 
        blockScriptsByCategory(); 
 
        // STEP 2: Also block any scripts that are already running by disabling them 
        // Disable Google Analytics if present 
        if (typeof gtag !== 'undefined') { 
          gtag('consent', 'update', { 
            'analytics_storage': 'denied', 
            'ad_storage': 'denied', 
            'ad_personalization': 'denied', 
            'ad_user_data': 'denied', 
            'personalization_storage': 'denied' 
          }); 
        } 
 
        // Disable Google Tag Manager if present 
        if (typeof window.dataLayer !== 'undefined') { 
          window.dataLayer.push({ 
            'event': 'consent_denied', 
            'analytics_storage': 'denied', 
            'ad_storage': 'denied' 
          }); 
        } 
 
        // STEP 3: Uncheck all preference checkboxes 
        const analyticsCheckbox = 
document.querySelector('[data-consent-id="analytics-checkbox"]'); 
        const marketingCheckbox = 
document.querySelector('[data-consent-id="marketing-checkbox"]'); 
        const personalizationCheckbox = 
document.querySelector('[data-consent-id="personalization-checkbox"]'); 
 
        if (analyticsCheckbox) { 
          analyticsCheckbox.checked = false; 
        } 
        if (marketingCheckbox) { 
          marketingCheckbox.checked = false; 
        } 
        if (personalizationCheckbox) { 
          personalizationCheckbox.checked = false; 
        } 
 
        // STEP 4: Save consent state with all preferences as false (like decline behavior) 
        const preferences = { 
         action: "rejection",
          analytics: false, 
          marketing: false, 
          personalization: false, 
          bannerType: locationData ? locationData.bannerType : undefined 
        }; 
 
        await setConsentState(preferences, cookieDays); 
        updateGtagConsent(preferences); 
 
        // STEP 5: Set consent as given and save to server 
        localStorage.setItem("consent-given", "true"); 
 
        try { 
          await saveConsentStateToServer(preferences, cookieDays, false); // Exclude userAgent like decline 
        } catch (error) { 
          // Silent error handling 
        } 
 
       
      }; 
    } 
 
    // Cancel button (go back to main banner) 
    const cancelBtn = document.getElementById('close-consent-banner'); 
    if (cancelBtn) { 
      cancelBtn.onclick = async function (e) { 
        e.preventDefault(); 
 
        // Always hide main-consent-banner when cancel is clicked 
        const mainConsentBanner = document.getElementById('main-consent-banner'); 
        if (mainConsentBanner) { 
          hideBanner(mainConsentBanner); 
        } 
 
        // Show initial banner if it exists 
        const initialConsentBanner = document.getElementById('initial-consent-banner'); 
        if (initialConsentBanner) { 
          hideBanner(initialConsentBanner); 
        } 
      }; 
    } 
 
    // Universal close button with consentbit="close" attribute 
    function setupConsentbitCloseButtons() { 
      const closeButtons = document.querySelectorAll('[consentbit="close"]'); 
      closeButtons.forEach(function (closeBtn) { 
        closeBtn.onclick = function (e) { 
          e.preventDefault(); 
 
          // Find the currently visible banner by checking all possible banner elements 
          const banners = [ 
            document.getElementById("consent-banner"), 
            document.getElementById("initial-consent-banner"), 
            document.getElementById("main-banner"), 
            document.getElementById("main-consent-banner"), 
            document.getElementById("simple-consent-banner"), 
            document.querySelector('.consentbit-ccpa-banner-div'), 
            document.querySelector('.consentbit-ccpa_preference'), 
            document.querySelector('.consentbit-gdpr-banner-div'), 
            document.querySelector('.consentbit-preference_div'), 
          ]; 
 
          // Find the currently visible banner 
          let activeBanner = null; 
          banners.forEach(function (banner) { 
            if (banner && window.getComputedStyle(banner).display !== 'none' && 
              window.getComputedStyle(banner).visibility !== 'hidden' && 
              window.getComputedStyle(banner).opacity !== '0') { 
              activeBanner = banner; 
            } 
          }); 
 
          // Hide the currently active banner 
          if (activeBanner) { 
            hideBanner(activeBanner); 
          } 
        }; 
      }); 
    } 
 
    // Universal "Do Not Share" link with consentbit-data-donotshare="consentbit-link-donotshare" attribute 
    function setupDoNotShareLinks() { 
      const doNotShareLinks = 
document.querySelectorAll('[consentbit-data-donotshare="consentbit-link-donotshare"]'); 
      doNotShareLinks.forEach(function (link) { 
        link.onclick = async function (e) { 
          e.preventDefault(); 
 
          // Hide all other banners first 
          hideAllBanners(); 
 
          // Check if locationData indicates any US privacy law banner or US country 
          if (locationData && (locationData?.bannerType === "CCPA" || 
locationData?.bannerType === "VCDPA" || locationData?.bannerType === "CPA" || 
locationData?.bannerType === "CTDPA" || locationData?.bannerType === "UCPA" || 
locationData?.country === "US")) { 
            // Show the CCPA banner with ID "main-consent-banner" 
            const ccpaBanner = document.getElementById("main-consent-banner"); 
            if (ccpaBanner && !document.getElementById("consensite-banner-type").textContent.toLowerCase().includes("gdpr")) { 
              showBanner(ccpaBanner); 
              const preferences = await getConsentPreferences(); 
              updateCCPAPreferenceForm(preferences); 
            } 
          } 
        }; 
      }); 
    } 
 
    // Set up close buttons and do not share links when DOM is ready 
    setupConsentbitCloseButtons(); 
    setupDoNotShareLinks(); 
 
    // Monitor for dynamically added close buttons and do not share links 
    const closeButtonObserver = new MutationObserver(function (mutations) { 
      mutations.forEach(function (mutation) { 
        mutation.addedNodes.forEach(function (node) { 
          if (node.nodeType === 1) { 
            // Check if the added node is a close button 
            if (node.hasAttribute && node.hasAttribute('consentbit') && 
node.getAttribute('consentbit') === 'close') { 
              setupConsentbitCloseButtons(); 
            } 
            // Check if any child elements are close buttons 
            const closeButtons = node.querySelectorAll && 
node.querySelectorAll('[consentbit="close"]'); 
            if (closeButtons && closeButtons.length > 0) { 
              setupConsentbitCloseButtons(); 
            } 
 
            // Check if the added node is a do not share link 
            if (node.hasAttribute && node.hasAttribute('consentbit-data-donotshare') && 
node.getAttribute('consentbit-data-donotshare') === 'consentbit-link-donotshare') { 
              setupDoNotShareLinks(); 
            } 
 
          } 
        }); 
      }); 
    }); 
 
    // Start observing for dynamically added close buttons and do not share links 
    closeButtonObserver.observe(document.body, { 
      childList: true, 
      subtree: true 
    }); 
 
    // CCPA Link Block - Show CCPA Banner 
    const ccpaLinkBlock = document.getElementById('consentbit-ccpa-linkblock'); 
    if (ccpaLinkBlock) { 
      ccpaLinkBlock.onclick = function (e) { 
        e.preventDefault(); 
 
        // Show CCPA banner using showBanner function 
        const ccpaBannerDiv = document.querySelector('.consentbit-ccpa-banner-div'); 
        showBanner(ccpaBannerDiv); 
 
        // Also show the CCPA banner if it exists 
        showBanner(document.getElementById("initial-consent-banner")); 
      }; 
    } 
 
    // If consent is already given, hide all banners and do not show any 
    if (consentGiven === "true") { 
      await hideAllBanners(); 
 
      // Unblock scripts based on saved consent preferences 
      const savedPreferences = await getConsentPreferences(); 
      if (savedPreferences.analytics || savedPreferences.marketing || 
savedPreferences.personalization) { 
        // If any consent is given, unblock appropriate scripts 
        const selectedCategories = Object.keys(savedPreferences).filter(k => 
savedPreferences[k] && k !== 'doNotShare'); 
        if (selectedCategories.length > 0) { 
          enableScriptsByCategories(selectedCategories); 
 
          // Also unblock any scripts that might have been blocked 
          var allBlockedScripts = 
document.head.querySelectorAll('script[type="text/plain"][data-category]'); 
          allBlockedScripts.forEach(function (oldScript) { 
            var category = oldScript.getAttribute('data-category'); 
            if (category) { 
              var categories = category.split(',').map(function (cat) { return cat.trim(); }); 
              var shouldEnable = categories.some(function (cat) { 
                return selectedCategories.includes(cat); 
              }); 
              if (shouldEnable) { 
                var newScript = document.createElement('script'); 
                for (var i = 0; i < oldScript.attributes.length; i++) { 
                  var attr = oldScript.attributes[i]; 
                  if (attr.name === 'type') { 
                    newScript.type = 'text/javascript'; 
                  } else if (attr.name !== 'data-blocked-by-consent' && attr.name !== 
'data-blocked-by-ccpa') { 
                    newScript.setAttribute(attr.name, attr.value); 
                  } 
                } 
                if (oldScript.innerHTML) { 
                  newScript.innerHTML = oldScript.innerHTML; 
                } 
                oldScript.parentNode.replaceChild(newScript, oldScript); 
              } 
            } 
          }); 
        } 
      } 
 
      // Do not show any banner unless user clicks the icon 
      return; 
    } 
 
    // Banner already shown earlier - just handle server location data if available 
    if (!consentGiven) { 
       
      // Also handle server-detected location data   
      if (locationData && locationData.bannerType) { 
        if (["CCPA", "VCDPA", "CPA", "CTDPA", "UCPA"].includes(locationData.bannerType)) { 
          // US Privacy Laws: Ensure all scripts are unblocked initially (opt-out model) 
          // For CCPA, scripts should start as text/javascript, not text/plain 
           
          // First remove any duplicate scripts 
          removeDuplicateScripts(); 
           
          var allBlockedScripts = 
document.head.querySelectorAll('script[type="text/plain"][data-category]'); 
         
        allBlockedScripts.forEach(function (script) { 
          // Re-execute the script if it has a src attribute 
          if (script.src) { 
            try { 
              // Check if a script with this src already exists and is enabled 
              const existingScript = 
document.querySelector(`script[src="${script.src}"][type="text/javascript"]`); 
              if (existingScript) { 
                // Just remove the blocked version 
                script.remove(); 
                return; 
              } 
               
              // Create a new script element to force re-execution 
              const newScript = document.createElement('script'); 
               
              // Copy all attributes except blocking ones 
              for (let attr of script.attributes) { 
                if (attr.name !== 'type' &&  
                    attr.name !== 'data-blocked-by-consent' &&  
                    attr.name !== 'data-blocked-by-ccpa') { 
                  newScript.setAttribute(attr.name, attr.value); 
                } 
              } 
               
              // Ensure proper type 
              newScript.type = 'text/javascript'; 
               
              // Insert the new script before the old one, then remove the old one 
              script.parentNode.insertBefore(newScript, script); 
              script.remove(); 
            } catch (error) { 
              // Error re-executing script 
            } 
          } else { 
            // For inline scripts, just change the type 
            script.type = 'text/javascript'; 
            script.removeAttribute('data-blocked-by-consent'); 
            script.removeAttribute('data-blocked-by-ccpa'); 
          } 
        }); 
 
        // Also unblock any scripts that might have been blocked by initial blocking 
        var allBlockedScripts2 = document.head.querySelectorAll('script[type="text/plain"]'); 
        allBlockedScripts2.forEach(function (script) { 
          // Re-execute the script if it has a src attribute 
          if (script.src) { 
            try { 
              // Check if a script with this src already exists and is enabled 
              const existingScript = 
document.querySelector(`script[src="${script.src}"][type="text/javascript"]`); 
              if (existingScript) { 
                // Just remove the blocked version 
                script.remove(); 
                return; 
              } 
               
              // Create a new script element to force re-execution 
              const newScript = document.createElement('script'); 
               
              // Copy all attributes except blocking ones 
              for (let attr of script.attributes) { 
                if (attr.name !== 'type' &&  
                    attr.name !== 'data-blocked-by-consent' &&  
                    attr.name !== 'data-blocked-by-ccpa') { 
                  newScript.setAttribute(attr.name, attr.value); 
                } 
              } 
               
              // Ensure proper type 
              newScript.type = 'text/javascript'; 
               
              // Insert the new script before the old one, then remove the old one 
              script.parentNode.insertBefore(newScript, script); 
                script.remove(); 
            } catch (error) { 
              // Error re-executing script 
            } 
          } else { 
            // For inline scripts, just change the type 
            script.type = 'text/javascript'; 
            script.removeAttribute('data-blocked-by-consent'); 
            script.removeAttribute('data-blocked-by-ccpa'); 
          } 
        }); 
 
                  // For CCPA/US Privacy Laws: Scripts start enabled but banner must be shown 
          // User must explicitly accept or decline through banner interaction 
 
        !document.getElementById("consensite-banner-type").textContent.toLowerCase().includes("gdpr") && showBanner(document.getElementById("initial-consent-banner")); 
       !document.getElementById("consensite-banner-type").textContent.toLowerCase().includes("gdpr") && hideBanner(document.getElementById("consent-banner")); 
 
 
              } else { 
          // Show GDPR banner (default for EU and other locations) 
          showBanner(document.getElementById("consent-banner")); 
          hideBanner(document.getElementById("initial-consent-banner")); 
          blockScriptsByCategory(); 
        } 
      } 
    } 
 
 
 
     
    // Styles are already loaded when DOM is ready 
     
    // Initialize Webflow Analytics integration 
   
     
    // Start monitoring for consent changes 
    // monitorConsentChanges(); 
  }); 
 
  // End DOMContentLoaded event listener 
 
  // --- CCPA-specific script handling functions --- 
  function unblockScriptsWithDataCategory() { 
    // CCPA: Unblock ALL scripts with data-category attribute (including Google scripts) in head section only 
    var scripts = document.head.querySelectorAll('script[type="text/plain"][data-category]'); 
    scripts.forEach(function (script) { 
      // Re-execute the script if it has a src attribute 
      if (script.src) { 
        try { 
          // Check if a script with this src already exists and is enabled 
          const existingScript = 
document.querySelector(`script[src="${script.src}"][type="text/javascript"]`); 
          if (existingScript) { 
            // Just remove the blocked version 
            script.remove(); 
            return; 
          } 
           
          // Create a new script element to force re-execution 
          const newScript = document.createElement('script'); 
           
          // Copy all attributes except blocking ones 
          for (let attr of script.attributes) { 
            if (attr.name !== 'type' &&  
                attr.name !== 'data-blocked-by-consent' &&  
                attr.name !== 'data-blocked-by-ccpa') { 
              newScript.setAttribute(attr.name, attr.value); 
            } 
          } 
           
          // Ensure proper type 
          newScript.type = 'text/javascript'; 
           
          // Insert the new script before the old one, then remove the old one 
          script.parentNode.insertBefore(newScript, script); 
          script.remove(); 
        } catch (error) { 
          // Silent error handling 
        } 
      } else { 
        // For inline scripts, just change the type 
        script.type = 'text/javascript'; 
        script.removeAttribute('data-blocked-by-ccpa'); 
         
        // Execute the script if it has inline content 
        if (script.innerHTML) { 
          try { 
            eval(script.innerHTML); 
          } catch (e) { 
            // Silent error handling 
          } 
        } 
      } 
    }); 
     
    // Ensure gtag is properly initialized after all scripts are loaded 
    setTimeout(ensureGtagInitialization, 100); 
  } 
 
  function blockScriptsWithDataCategory() { 
    // CCPA: Block ALL scripts with data-category attribute (including Google scripts) in head section only 
    var scripts = document.head.querySelectorAll('script[data-category]'); 
    scripts.forEach(function (script) { 
      if (script.type !== 'text/plain') { 
        script.type = 'text/plain'; 
        script.setAttribute('data-blocked-by-ccpa', 'true'); 
      } 
    }); 
  } 
 
  async function hashStringSHA256(str) { 
    const encoder = new TextEncoder(); 
    const data = encoder.encode(str); 
    const hashBuffer = await crypto.subtle.digest('SHA-256', data); 
    return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, 
'0')).join(''); 
  } 
 
  async function scanAndSendHeadScriptsIfChanged(sessionToken) { 
   console.log("check scanning 3")
    const headScripts = document.head.querySelectorAll('script'); 
    const scriptData = Array.from(headScripts).map(script => ({ 
      src: script.src || null, 
      content: script.src ? null : script.innerHTML, 
      dataCategory: script.getAttribute('data-category') || null 
    })); 
    const scriptDataString = JSON.stringify(scriptData); 
    const scriptDataHash = await hashStringSHA256(scriptDataString); 
 
    const cachedHash = localStorage.getItem('headScriptsHash'); 
    if (cachedHash === scriptDataHash) { 
      return; // No change, do nothing 
    } 
 
    try { 
      //const encryptedScriptData = await encryptWithHardcodedKey(scriptDataString); 
 
      // Get siteName from hostname 
      const siteName = window.location.hostname.replace(/^www\./, '').split('.')[0]; 
 const siteId = document.getElementById('consensite-id').textContent;
      // Build API URL with siteName parameter 
      const apiUrl = `https://framer.consentbit.com/scripts`; 
 console.log("running script check")
      const response = await fetch(apiUrl, { 
        method: 'POST', 
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${sessionToken}`, 
        }, 
        body: JSON.stringify({ siteId, scripts:scriptData }), 
      }); 
 
      if (response.ok) { 
        localStorage.setItem('headScriptsHash', scriptDataHash); 
      } 
    } catch (e) { 
      // Silent error handling 
    } 
  } 
 
 function blockNonGoogleScripts() {
  // First remove any duplicate scripts
  removeDuplicateScripts();
  
  // CRITICAL FIX: Do NOT block Google Tag Manager/Google Analytics scripts
  // These scripts use Consent Mode and should be allowed to load
  // Consent Mode will handle blocking/unblocking based on user consent
  var scripts = document.head.querySelectorAll('script[src]');
  scripts.forEach(function (script) {
    // Check if this is a Google Tag Manager or Google Analytics script
    var isGoogleScript = script.src && (
      script.src.includes('googletagmanager.com') ||
      script.src.includes('google-analytics.com') ||
      script.src.includes('gtag') ||
      script.src.includes('analytics.js') ||
      script.src.includes('ga.js')
    );
    
    // Only block non-Google scripts
    if (!isGoogleScript && script.type !== 'text/plain') {
      script.type = 'text/plain';
      script.setAttribute('data-blocked-by-consent', 'true');
    }
  });

  // Block inline scripts in head section only (but allow dataLayer initialization)
  var inlineScripts = document.head.querySelectorAll('script:not([src])');
  inlineScripts.forEach(function (script) {
    // Don't block dataLayer initialization or gtag consent commands
    var isGoogleConsentScript = script.innerHTML && (
      script.innerHTML.includes('dataLayer') ||
      script.innerHTML.includes('gtag') ||
      script.innerHTML.includes('googletagmanager')
    );
    
    if (script.innerHTML && !isGoogleConsentScript && script.type !== 'text/plain') {
      script.type = 'text/plain';
      script.setAttribute('data-blocked-by-consent', 'true');
    }
  });
}
 
  function blockTargetedAdvertisingScripts() { 
    const targetedAdvertisingPatterns = 
/facebook|meta|fbevents|linkedin|twitter|pinterest|tiktok|snap|reddit|quora|outbrain|taboola|sharethrough|doubleclick|adwords|adsense|adservice|pixel|quantserve|scorecardresearch|moat|integral-marketing|comscore|nielsen|quantcast|adobe/i; 
 
    const scripts = document.head.querySelectorAll('script[src]'); 
    scripts.forEach(script => { 
      if (targetedAdvertisingPatterns.test(script.src)) { 
        if (script.type !== 'text/plain') { 
          script.type = 'text/plain'; 
          script.setAttribute('data-blocked-by-targeted-advertising', 'true'); 
        } 
      } 
    }); 
  } 
 
  function blockSaleScripts() { 
    const salePatterns = 
/facebook|meta|fbevents|linkedin|twitter|pinterest|tiktok|snap|reddit|quora|outbrain|taboola|sharethrough|doubleclick|adwords|adsense|adservice|pixel|quantserve|scorecardresearch|moat|integral-marketing|comscore|nielsen|quantcast|adobe|marketo|hubspot|salesforce|pardot|eloqua|act-on|mailchimp|constantcontact|sendgrid|klaviyo|braze|iterable/i; 
 
    const scripts = document.head.querySelectorAll('script[src]'); 
    scripts.forEach(script => { 
      if (salePatterns.test(script.src)) { 
        if (script.type !== 'text/plain') { 
          script.type = 'text/plain'; 
          script.setAttribute('data-blocked-by-sale', 'true'); 
        } 
      } 
    }); 
  } 
 
  function blockProfilingScripts() { 
    const profilingPatterns = /optimizely|hubspot|marketo|pardot|salesforce|intercom|drift|zendesk|freshchat|tawk|livechat|clarity|hotjar|mouseflow|fullstory|logrocket|mixpanel|segment|amplitude|heap|kissmetrics|matomo|piwik|plausible|woopra|crazyegg|clicktale|chartbeat|parse\.ly/i; 
 
    const scripts = document.head.querySelectorAll('script[src]'); 
    scripts.forEach(script => { 
      if (profilingPatterns.test(script.src)) { 
        if (script.type !== 'text/plain') { 
          script.type = 'text/plain'; 
          script.setAttribute('data-blocked-by-profiling', 'true'); 
        } 
      } 
    }); 
  } 
 
  function blockCrossContextBehavioralAdvertising() { 
    const crossContextPatterns = 
/facebook|meta|fbevents|linkedin|twitter|pinterest|tiktok|snap|reddit|quora|outbrain|taboola|sharethrough|doubleclick|adwords|adsense|adservice|pixel|quantserve|scorecardresearch|moat|integral-marketing|comscore|nielsen|quantcast|adobe/i; 
 
    const scripts = document.head.querySelectorAll('script[src]'); 
    scripts.forEach(script => { 
      if (crossContextPatterns.test(script.src)) { 
        if (script.type !== 'text/plain') { 
          script.type = 'text/plain'; 
          script.setAttribute('data-blocked-by-cross-context', 'true'); 
        } 
      } 
    }); 
  } 
 
  function blockAutomatedDecisionScripts() { 
    const automatedDecisionPatterns = 
/optimizely|hubspot|marketo|pardot|salesforce|intercom|drift|zendesk|freshchat|tawk|livechat|clarity|hotjar|mouseflow|fullstory|logrocket|mixpanel|segment|amplitude|heap|kissmetrics|matomo|piwik|plausible|woopra|crazyegg|clicktale|chartbeat|parse\.ly/i; 
     
    const scripts = document.head.querySelectorAll('script[src]'); 
    scripts.forEach(script => { 
      if (automatedDecisionPatterns.test(script.src)) { 
        if (script.type !== 'text/plain') { 
          script.type = 'text/plain'; 
          script.setAttribute('data-blocked-by-automated-decision', 'true'); 
        } 
      } 
    }); 
  } 
 
  // ======================================== 
  // WEBFLOW ANALYTICS INTEGRATION 
  // ======================================== 
 
  // Configuration for Webflow Analytics integration 
//   const WEBFLOW_ANALYTICS_CONFIG = { 
//     enabled: true, 
//     trackPageViews: true, 
//     trackForms: true, 
//     trackClicks: true, 
//     trackEvents: true, 
//     debugMode: false, 
//     scriptUrl: "https://cdn.webflow.com/analyze.js" // Webflow Analytics script URL 
//   }; 
 
//   // Dynamically load Webflow Analytics script based on consent 
//   function enableWebflowAnalytics() { 
//     if (typeof window.WebflowAnalytics === "undefined") { 
//       try { 
//         // Check if script is already being loaded 
//         if (document.querySelector('script[src*="analyze.js"]')) { 
//           return; 
//         } 
 
//         // Create and insert Webflow Analytics script 
//         var script = document.createElement("script"); 
//         script.src = WEBFLOW_ANALYTICS_CONFIG.scriptUrl; 
//         script.async = true; 
//         script.onload = function() { 
//           // Initialize tracking after script loads 
//           setTimeout(initializeWebflowAnalytics, 100); 
//         }; 
//         script.onerror = function() { 
//           // Silent error handling 
//         }; 
         
//         document.head.appendChild(script); 
         
        
//       } catch (error) { 
//       } 
//     } else { 
      
//       // Initialize tracking immediately if already available 
//       initializeWebflowAnalytics(); 
//     } 
//   } 
 
//   // Initialize Webflow Analytics when consent is given 
//   function initializeWebflowAnalytics() { 
//     if (!WEBFLOW_ANALYTICS_CONFIG.enabled) { 
//       return; 
//     } 
 
//     const consentGiven = localStorage.getItem("consent-given"); 
//     const analyticsConsent = localStorage.getItem("cb-consent-analytics_storage"); 
     
//     // Only proceed if consent is given AND analytics consent is specifically granted 
//     if (consentGiven === "true" && analyticsConsent === "true") { 
//       if (typeof window.WebflowAnalytics !== 'undefined') { 
         
//         // Track initial page view 
//         trackWebflowPageView(); 
         
//         // Set up form tracking 
//         if (WEBFLOW_ANALYTICS_CONFIG.trackForms) { 
//           setupWebflowFormTracking(); 
//         } 
         
//         // Set up click tracking 
//         if (WEBFLOW_ANALYTICS_CONFIG.trackClicks) { 
//           setupWebflowClickTracking(); 
//         } 
         
//         // Track consent granted event 
//         trackWebflowEvent('consentbit_consent_granted', { 
//           category: 'consent', 
//           label: 'analytics_consent_granted', 
//           consent_categories: getActiveConsentCategories(), 
//           consentbit_integration: true 
//         }); 
//       } else { 
//         // Try to load the Webflow Analytics script 
//         enableWebflowAnalytics(); 
//       } 
//     } else { 
//       // If consent is revoked or analytics consent is false, ensure script is removed 
//       if (consentGiven === "true" && analyticsConsent === "false") { 
//         disableWebflowAnalytics(); 
//       } 
//     } 
//   } 
 
//   // Track Webflow page view 
//   function trackWebflowPageView() { 
//     if (typeof window.WebflowAnalytics !== 'undefined' && getConsentBitAnalyticsConsent()) { 
//       try { 
//         window.WebflowAnalytics.track('page_view', { 
//           page_title: document.title, 
//           page_url: window.location.href, 
//           page_referrer: document.referrer, 
//           consentbit_integration: true, 
//           consentbit_timestamp: new Date().toISOString() 
//         }); 
//       } catch (error) { 
//       } 
//     } 
//   } 
 
//   // Track custom events in Webflow Analytics 
//   function trackWebflowEvent(eventName, eventData = {}) { 
//     if (typeof window.WebflowAnalytics !== 'undefined' && getConsentBitAnalyticsConsent()) { 
//       try { 
//         const enhancedEventData = { 
//           ...eventData, 
//           consentbit_integration: true, 
//           consentbit_timestamp: new Date().toISOString() 
//         }; 
         
//         window.WebflowAnalytics.track(eventName, enhancedEventData); 
//       } catch (error) { 
//       } 
//     } 
//   } 
 
//   // Set up Webflow form tracking 
//   function setupWebflowFormTracking() { 
//     if (!getConsentBitAnalyticsConsent()) return; 
 
//     document.addEventListener('submit', function(event) { 
//       const form = event.target; 
       
//       // Check if it's a Webflow form 
//       if (form.classList.contains('w-form') || form.hasAttribute('data-name')) { 
//         const formName = form.getAttribute('data-name') || 'Unknown Form'; 
         
//         // Track form submission 
//         trackWebflowEvent('form_submit', { 
//           category: 'forms', 
//           label: formName, 
//           form_id: form.id || 'unknown', 
//           form_action: form.action || 'unknown', 
//           consentbit_form_tracking: true 
//         }); 
         
//         // Track form success/failure 
//         setTimeout(function() { 
//           const successMessage = form.querySelector('.w-form-done'); 
//           const errorMessage = form.querySelector('.w-form-fail'); 
           
//           if (successMessage && successMessage.style.display !== 'none') { 
//             trackWebflowEvent('form_success', { 
//               category: 'forms', 
//               label: formName, 
//               form_id: form.id || 'unknown', 
//               consentbit_form_tracking: true 
//             }); 
//           } else if (errorMessage && errorMessage.style.display !== 'none') { 
//             trackWebflowEvent('form_error', { 
//               category: 'forms', 
//               label: formName, 
//               form_id: form.id || 'unknown', 
//               consentbit_form_tracking: true 
//             }); 
//           } 
//         }, 1000); 
//       } 
//     }); 
//   } 
 
//   // Set up Webflow click tracking 
//   function setupWebflowClickTracking() { 
//     if (!getConsentBitAnalyticsConsent()) return; 
 
//     document.addEventListener('click', function(event) { 
//       const target = event.target; 
       
//       // Track button clicks 
//       if (target.tagName === 'BUTTON' || target.classList.contains('w-button')) { 
//         const buttonText = target.textContent.trim() || target.getAttribute('aria-label') || 'Unknown Button'; 
//         const buttonId = target.id || 'unknown'; 
         
//         trackWebflowEvent('button_click', { 
//           category: 'engagement', 
//           label: buttonText, 
//           button_id: buttonId, 
//           button_type: target.getAttribute('data-type') || 'general', 
//           consentbit_click_tracking: true 
//         }); 
//       } 
       
//       // Track link clicks 
//       if (target.tagName === 'A' || target.closest('a')) { 
//         const link = target.tagName === 'A' ? target : target.closest('a'); 
//         const linkText = link.textContent.trim() || link.getAttribute('aria-label') || 'Unknown Link'; 
//         const linkHref = link.href || 'unknown'; 
         
//         trackWebflowEvent('link_click', { 
//           category: 'engagement', 
//           label: linkText, 
//           link_url: linkHref, 
//           link_type: link.getAttribute('data-type') || 'general', 
//           consentbit_click_tracking: true 
//         }); 
//       } 
//     }); 
//   } 
 
//   // Helper function to check if analytics consent is given 
//   function getConsentBitAnalyticsConsent() { 
//     const consentGiven = localStorage.getItem("consent-given"); 
//     const analyticsConsent = localStorage.getItem("cb-consent-analytics_storage"); 
//     return consentGiven === "true" && analyticsConsent === "true"; 
//   } 
 
//   // Helper function to get active consent categories 
//   function getActiveConsentCategories() { 
//     const categories = []; 
//     if (localStorage.getItem("cb-consent-analytics_storage") === "true") 
// categories.push('analytics'); 
//     if (localStorage.getItem("cb-consent-marketing_storage") === "true") 
// categories.push('marketing'); 
//     if (localStorage.getItem("cb-consent-personalization_storage") === "true") 
// categories.push('personalization'); 
//     return categories.join(','); 
//   } 
 
//   // Monitor consent changes and update Webflow Analytics 
//   function monitorConsentChanges() { 
//     let lastConsentState = getConsentBitAnalyticsConsent(); 
     
//     setInterval(function() { 
//       const currentConsentState = getConsentBitAnalyticsConsent(); 
       
//       if (currentConsentState !== lastConsentState) { 
         
//         if (currentConsentState) { 
//           // Consent granted - initialize Webflow Analytics 
//           initializeWebflowAnalytics(); 
//         } else { 
//           // Consent revoked - track revocation event and disable 
//           if (typeof window.WebflowAnalytics !== 'undefined') { 
//             trackWebflowEvent('consentbit_consent_revoked', { 
//               category: 'consent', 
//               label: 'analytics_consent_revoked', 
//               consentbit_integration: true 
//             }); 
//           } 
//           // Remove Webflow Analytics script when consent is revoked 
//           disableWebflowAnalytics(); 
//         } 
         
//         lastConsentState = currentConsentState; 
//       } 
//     }, 2000); 
//   } 
 
  // Remove Webflow Analytics script when consent is revoked 
//   function disableWebflowAnalytics() { 
//     try { 
//       // Remove the script tag 
//       const scriptTag = document.querySelector('script[src*="analyze.js"]'); 
//       if (scriptTag) { 
//         scriptTag.remove(); 
         
//       } 
       
//       // Clear the global object 
//       if (window.WebflowAnalytics) { 
//         delete window.WebflowAnalytics; 
        
//       } 
//     } catch (error) { 
//     } 
//   } 
 
//   // Public API for external use 
//   window.ConsentBitWebflowIntegration = { 
//     // Configuration 
//     config: WEBFLOW_ANALYTICS_CONFIG, 
     
//     // Core functions 
//     trackEvent: trackWebflowEvent, 
//     trackPageView: trackWebflowPageView, 
//     initialize: initializeWebflowAnalytics, 
     
//     // Script management 
//     enableAnalytics: enableWebflowAnalytics, 
//     disableAnalytics: disableWebflowAnalytics, 
     
//     // Consent functions 
//     getAnalyticsConsent: getConsentBitAnalyticsConsent, 
//     getActiveConsentCategories: getActiveConsentCategories, 
     
//     // Utility functions 
//     isWebflowAnalyticsAvailable: function() { 
//       return typeof window.WebflowAnalytics !== 'undefined'; 
//     }, 
     
//     // Configuration helpers 
//     enableDebugMode: function() { 
//       WEBFLOW_ANALYTICS_CONFIG.debugMode = true; 
//     }, 
     
//     disableTracking: function() { 
//       WEBFLOW_ANALYTICS_CONFIG.enabled = false; 
//     }, 
     
//     enableTracking: function() { 
//       WEBFLOW_ANALYTICS_CONFIG.enabled = true; 
//     } 
//   }; 
 
//   // Set up consent event listener for external CMP integration 
//   document.addEventListener('consentUpdated', function(event) { 
//     if (event.detail && event.detail.analytics === true) { 
//       enableWebflowAnalytics(); 
//     } else if (event.detail && event.detail.analytics === false) { 
//       disableWebflowAnalytics(); 
//     } 
//   }); 
 
//   // Also listen for the legacy consent event format 
//   document.addEventListener('consentUpdated', function(event) { 
//     if (window.userConsent && window.userConsent.analytics === true) { 
//       enableWebflowAnalytics(); 
//     } else if (window.userConsent && window.userConsent.analytics === false) { 
//       disableWebflowAnalytics(); 
//     } 
//   }); 
 
})(); 
 
