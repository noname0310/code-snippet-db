function getScript(source: string, callback: () => void): void {
    const el = document.createElement('script');
    el.addEventListener('load', callback);
    el.setAttribute('src', source);

    document.body.appendChild(el);
}

export default getScript;
