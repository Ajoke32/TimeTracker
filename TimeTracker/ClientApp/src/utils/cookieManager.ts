export const ReadCookie = (name: string): string | null => {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
}

export const SetCookie = (cookieName: string, cookieValue: string) => {
    document.cookie = `${encodeURIComponent(cookieName)}=${encodeURIComponent(cookieValue)}`
}

export const DeleteCookie = (name: string) => {
    document.cookie = `'${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'`
}