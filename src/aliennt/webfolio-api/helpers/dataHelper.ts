export function getTime({days = 0, hours = 0, minutes = 0, seconds = 0}) {
    return (days ? days *  24 * 60 * 60 : 0) + (hours ? hours * 60 * 60 : 0) + (minutes ? minutes * 60 : 0) + (seconds ? seconds : 0)
}