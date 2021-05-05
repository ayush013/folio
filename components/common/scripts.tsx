import { useEffect } from 'react';
import { GTAG } from '../../constants';

const Scripts = () => {

    useEffect(() => {
        const gtag = document.createElement('script');
        gtag.src = `https://www.googletagmanager.com/gtag/js?id=${GTAG}`;
        gtag.type = 'text/javascript'
        gtag.async = true;

        const gtagExec = document.createElement('script');
        gtagExec.innerHTML = `window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', '${GTAG}');`;

        
        const chaport = document.createElement('script');
        chaport.innerHTML = `setTimeout(() => {
            (function (w, d, v3) {
                w.chaportConfig = {
                    appId: '5ec95b5d1db3487e521123ca'
                };
                if (w.chaport) return; v3 = w.chaport = {}; v3._q = []; v3._l = {}; v3.q = function () { v3._q.push(arguments) }; v3.on = function (e, fn) { if (!v3._l[e]) v3._l[e] = []; v3._l[e].push(fn) }; var s = d.createElement('script'); s.type = 'text/javascript'; s.async = true; s.src = 'https://app.chaport.com/javascripts/insert.js'; var ss = d.getElementsByTagName('script')[0]; ss.parentNode.insertBefore(s, ss)
            })(window, document);
        }, 10000);`;

        document.body.appendChild(gtag);
        document.body.appendChild(gtagExec);
        document.body.appendChild(chaport);

    }, [])

    return (
        <>
        </>
    )
}

export default Scripts;