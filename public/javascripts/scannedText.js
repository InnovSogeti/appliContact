function onQRCodeScanned(scannedText)
{
    var scannedTextMemo = document.getElementById("scannedTextMemo");
    var nom = document.getElementById("nom");
    var email = document.getElementById("email");    
    
    if(scannedTextMemo)
    {
        console.log(scannedText)        
        scannedTextMemo.value = scannedText;//contient ce qui est dans le qrcode
        split0 = scannedText.split("\nN:");
        split0 = split0[1].split(';');
        scannedTextMemo.value = split0[0];
    }
    if(nom)
    {
        console.log(scannedText)        
        nom.value = scannedText;//contient ce qui est dans le qrcode
        split0 = scannedText.split("\nN:");
        split0 = split0[1].split(';');
        split0 = split0[1].split('\n');
        nom.value = split0[0];
    }
    if(email)
    {
        console.log(scannedText)        
        email.value = scannedText;//contient ce qui est dans le qrcode
        split0 = scannedText.split("EMAIL:");
        split0 = split0[1].split('\n');
        email.value = split0[0];
    }
}
//this function will be called when JsQRScanner is ready to use
function JsQRScannerReady()
{
    var jbScanner = new JsQRScanner(onQRCodeScanned);
    //reduce the size of analyzed image to increase performance on mobile devices
    jbScanner.setSnapImageMaxSize(300);
    var scannerParentElement = document.getElementById("scanner");
    if(scannerParentElement)
    {
        jbScanner.appendTo(scannerParentElement);
    }        
}