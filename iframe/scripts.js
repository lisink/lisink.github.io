(function () {
  var thisScriptId = "iframe_script";
  var thisScript = document.getElementById(thisScriptId);

  if (!thisScript) return;

  var clientId = thisScript.getAttribute("data-client-id");
  var basePathname = thisScript.getAttribute("data-base-pathname");

  if (!clientId) return;

  console.log(clientId);

  var iframe = document.createElement("iframe");
  iframe.src = "http://localhost:3000/";

  iframe.id = "fmp_iframe";

  document.body.appendChild(iframe);

  var concatUrls = function (urls) {
    var repeatingSlashesRegex = /\/{2,}/g;

    return urls.filter(Boolean).join("/").replace(repeatingSlashesRegex, "/");
  };

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
