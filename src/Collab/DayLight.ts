import { dayLight } from "../Experience/dayNight";
import { ydoc } from "./Collab"

export const dayLightMap = ydoc.getMap('day_Light_map');

export const CollbDayLight = (scene: THREE.Scene) => {
    let isDayMode = true;
    const dayNightToggle = document.getElementById('dayNightToggle') as HTMLInputElement;
    dayNightToggle.addEventListener('change', () => {
        isDayMode = !isDayMode;
        dayLightMap.set("daylightstate" , isDayMode ) ; 
    });

    dayLightMap.observe(()=>{
        isDayMode = dayLightMap.get('daylightstate') as boolean ; 
        dayNightToggle.checked = isDayMode ; 
        dayLight(isDayMode  , scene  ) ; 
    })
}