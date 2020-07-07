(function () {
  var thisScriptId = "iframe_script";
  var thisScript = document.getElementById(thisScriptId);

  if (!thisScript) return;

  var clientId = thisScript.getAttribute("data-client-id");

  if (!clientId) return;

  console.log(clientId);

  var iframe = document.createElement("iframe");
  iframe.src = "http://localhost:3000/";

  iframe.id = "fmp_iframe";

  document.body.appendChild(iframe);

  if (iFrameResize) {
    iFrameResize(
      { log: true, heightCalculationMethod: "taggedElement" },
      iframe
    );
  }
})();
