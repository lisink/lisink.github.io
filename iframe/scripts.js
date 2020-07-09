(function () {
  var currentScriptId = "fmp_embeddeding_script";
  var currentScript = document.getElementById(currentScriptId);

  if (!currentScript) return;

  function concatUrls(urls) {
    var repeatingSlashesRegex = /\/{2,}/g;

    return urls.filter(Boolean).join("/").replace(repeatingSlashesRegex, "/");
  }

  function loadIframeResizer() {
    var script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.2.11/iframeResizer.min.js";
    script.type = "text/javascript";
    script.onload = initIframe;

    document.body.appendChild(script);
  }

  function getIframeDomain(url) {
    var matches = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
    var domain = matches && matches[1];

    return domain;
  }

  function initIframe() {
    var iframeBaseSrc = "test.funeral-market.place";
    var clientId = currentScript.getAttribute("data-client-id");

    if (!clientId) return;

    var basePathname = currentScript.getAttribute("data-base-pathname");
    var iframe = document.createElement("iframe");
    var innerRoute = localStorage.getItem("redirectPathname");

    if (innerRoute) {
      localStorage.removeItem("redirectPathname");
      history.pushState({}, "", innerRoute);
    }

    innerRoute = innerRoute ? innerRoute.replace(basePathname, "") : "";

    iframe.style.cssText =
      "width: 1px; min-width: 100%; margin: 0; border: 0; display: block;";
    iframe.id = "fmp_iframe";
    iframe.src =
      "//" + iframeBaseSrc + innerRoute + "?iframe=1&clientId=" + clientId;

    document.body.appendChild(iframe);

    if (iFrameResize) {
      var iframeResizeOptions = {
        log: true,
        heightCalculationMethod: "taggedElement",
        onMessage: (event) => {
          var message = event.message;

          switch (message.type) {
            case "locationChange":
              history.pushState(
                {},
                "",
                concatUrls([basePathname, message.pathname])
              );
              break;

            default:
              break;
          }
        },
      };

      iFrameResize(iframeResizeOptions, iframe);
    }
  }

  //Entry point
  loadIframeResizer();
})();
