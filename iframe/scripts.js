(function () {
  var iframeSrc = "http://localhost:3000";
  var concatUrls = function (urls) {
    var repeatingSlashesRegex = /\/{2,}/g;

    return urls.filter(Boolean).join("/").replace(repeatingSlashesRegex, "/");
  };

  var thisScriptId = "iframe_script";
  var thisScript = document.getElementById(thisScriptId);

  if (!thisScript) return;

  var clientId = thisScript.getAttribute("data-client-id");
  var basePathname = thisScript.getAttribute("data-base-pathname");

  if (!clientId) return;

  var iframe = document.createElement("iframe");

  var route = localStorage
    .getItem("redirectPathname", path)
    .replace(basePathname, "");

  console.log("internal route", route);

  iframe.src = route ? iframeSrc + route : iframeSrc;
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
