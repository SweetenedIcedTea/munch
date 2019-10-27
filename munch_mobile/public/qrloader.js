import QrScanner from './qr-scanner.min.js';

var scanner;

window.onScan = (data)=>{
    console.log("[qrloader] Scanned data:",data);
    window.onScanResolved(data);
    window.stopScanner();
}

window.startScanner = ()=>{
    console.log("[qrloader] Started QR Reader")
    scanner = new QrScanner(document.getElementById('qr-preview'), window.onScan);
    scanner.start();
}

window.stopScanner = () => {
    scanner.stop();
}

window.addEventListener('load', ()=>{
    window.startScanner();
});