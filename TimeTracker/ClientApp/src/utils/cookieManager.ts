export const ReadCookie = (name: string): string | undefined => {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
            return cookie.substring(name.length + 1);
        }
    }
    return undefined;
}

export const SetCookie = (cookieName: string, cookieValue: string) => {
    document.cookie = `${encodeURIComponent(cookieName)}=${encodeURIComponent(cookieValue)}`
}