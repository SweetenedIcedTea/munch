import QrScanner from './qr-scanner.min.js';

window.onScan = (data)=>{
    console.log(data);
}

window.startScanner = ()=>{
    console.log("hmm")
    var scanner = new QrScanner(document.getElementById('qr-preview'), window.onScan);
    scanner.start();
}