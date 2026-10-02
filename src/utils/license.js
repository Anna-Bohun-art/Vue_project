export function getStatus(license){
    const daysOff=(new Date(license.expiresAt) - new Date())/(1000*60*60*24);
    if(daysOff< 0) return "abgelaufen";
    else if (daysOff<= 30) return "laeuftbald";
    return "aktiv";

}