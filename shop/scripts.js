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
    var iframeBaseSrc = "//test.funeral-market.place";
    var clientId = currentScript.getAttribute("data-client-id");

    if (!clientId) return;

    var basePathname = currentScript.getAttribute("data-base-pathname");
    var maxWidth = currentScript.getAttribute("data-max-width");
    var role = currentScript.getAttribute("data-role");
    var containerId = currentScript.getAttribute("data-container-id");

    var iframe = document.createElement("iframe");
    var queryStringIndex = location.href.indexOf("?l=");
    var innerRoute =
      queryStringIndex > -1 ? location.href.slice(queryStringIndex + 3) : "";

    innerRoute = innerRoute ? innerRoute.replace(basePathname, "") : "";

    iframe.style.cssText =
      "width: 100%; margin: 0; margin: 0 auto; border: 0; display: block;" +
      (maxWidth ? "max-width:" + maxWidth + "px;" : "");

    iframe.id = "fmp_iframe";
    iframe.src =
      "//" +
      iframeBaseSrc +
      innerRoute +
      "?iframe=1&clientId=" +
      clientId +
      "&clientRole=" +
      role;

    const parentElement = document.getElementById(containerId) || document.body;

    parentElement.appendChild(iframe);

    if (iFrameResize) {
      var iframeResizeOptions = {
        heightCalculationMethod: "taggedElement",
        onMessage: (event) => {
          var message = event.message;

          switch (message.type) {
            case "locationChange":
              history.replaceState(
                {},
                "",
                basePathname + "?l=" + message.pathname
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
