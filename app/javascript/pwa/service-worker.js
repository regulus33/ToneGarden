// Use feature-detection to check for ES6 support.
function browserSupportsES6() {
    try { eval("var foo = (x)=>x+1"); }
    catch (e) { return false; }
    return true;
}

// Use service workers only if the browser supports ES6,
// Then register the worker. We are serving a js.erb file with all the service worker code
if (browserSupportsES6() && ('caches' in window) && ('serviceWorker' in navigator)) {
    navigator.serviceWorker.register('/service-worker.js', { scope: '/' })
        .then(function(reg) {
            console.log('Service worker registration succeeded!');
        }).catch(function(error) {
        console.log('Service worker registration failed: ' + error);
    });
}
