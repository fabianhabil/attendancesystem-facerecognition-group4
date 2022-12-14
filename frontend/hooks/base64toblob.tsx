function b64toBlob(dataURI: any, filename: string) {
    const arr = dataURI.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    console.log(mime);
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
}

export default b64toBlob;
