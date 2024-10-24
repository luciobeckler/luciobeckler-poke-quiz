export function formatTimer(segundos) {
    return Math.floor(segundos/60).toString().padStart(2,'0') + ':' + Math.floor(segundos % 60).toString().padStart(2,'0')
}