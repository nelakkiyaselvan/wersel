export const getUserAgent = () => {
    const { userAgent } = window.navigator;
    let currentView = 'desktop';
    const mobileDevice = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
    ];
    if (mobileDevice.some(device => userAgent.match(device))) {
        currentView = 'mobile';
    }
    return currentView;
}