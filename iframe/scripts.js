(function () {
  var thisScriptId = "iframe_script";

  var thisScript = document.getElementById(thisScriptId);
  if (!thisScript) return;

  // var iframeBaseSrc = "http://localhost:3000";
  var iframeBaseSrc = "http://c5d69c01b4ea.ngrok.io";

  var concatUrls = function (urls) {
    var repeatingSlashesRegex = /\/{2,}/g;

    return urls.filter(Boolean).join("/").replace(repeatingSlashesRegex, "/");
  };

  var clientId = thisScript.getAttribute("data-client-id");

  if (!clientId) return;

  var basePathname = thisScript.getAttribute("data-base-pathname");

  var iframe = document.createElement("iframe");

  var route = localStorage.getItem("redirectPathname");

  console.log("internal route", route);

  if (route) {
    localStorage.removeItem("redirectPathname");
    history.pushState({}, "", route);
  }

  route = route ? route.replace(basePathname, "") : "";

  iframe.src = iframeBaseSrc + route + "?iframe=1&clientId=" + clientId;
  iframe.id = "fmp_iframe";

  document.body.appendChild(iframe);

  if (iFrameResize) {
    iFrameResize(
      {
        log: true,
        heightCalculationMethod: "taggedElement",

        onMessage: ({ iframe, message }) => {
          console.log("Received message", message);

          if (message.type === "locationChange") {
            history.pushState(
              {},
              "",
              concatUrls([basePathname, message.pathname])
            );
          }
        },
      },
      iframe
    );
  }
})();
