export function calculatorTime(time: string) {
    const now = new Date();
    const past = new Date(time);
    const diff = now.getTime() - past.getTime();
    const s = Math.floor(diff / 1000);
    const m = Math.floor(s / 60);
    const h = Math.floor(m / 60);
    const d = Math.floor(h / 24);
    const w = Math.floor(d / 7);
    const M = Math.floor(d / 30);
    const y = Math.floor(d / 365);

    if(s < 60) {
        return `${s} seconds ago`;
    } else if(m < 60) {
        return `${m} minutes ago`;
    } else if(h < 24) {
        return `${h} hours ago`;
    } else if(d < 7) {
        return `${d} days ago`;
    } else if(w < 5) {
        return `${w} weeks ago`;
    } else if (M < 12) {
        return `${M} months ago`;
    } else {
        return `${y} years ago`;
    }
}