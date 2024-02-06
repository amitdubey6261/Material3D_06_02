import { ydoc } from "../Collab";

const lightMap = ydoc.getMap('LightMap');

const controlLight = (scene: THREE.Scene) => {

    lightMap.set('lamp_params', {
        switch: true,
        color: '#ffffff',
        intensity: 0,
    })

    const pl = scene.getObjectByName('FloorLamp_Light') as THREE.PointLight;
    const toggleLamp = document.querySelector('#toggle') as HTMLInputElement;
    const intensity = document.querySelector('#intensity') as HTMLInputElement;
    const color = document.querySelector('#color') as HTMLInputElement;

    let intensityvalue = 0;
    let lamp1color = "#ffffff";

    toggleLamp.addEventListener('change', () => {
        if (toggleLamp.checked) {
            lightMap.set('lamp_params', { switch: true, color: lamp1color, intensity: intensityvalue })
        }
        else {
            lightMap.set('lamp_params', { switch: false, color: lamp1color, intensity: intensityvalue })
        }
    })

    const setintensity = () => {
        lightMap.set('lamp_params', { switch: toggleLamp.checked, color: lamp1color, intensity: intensityvalue })
        console.log('transac-1')
        document.removeEventListener('pointerup', setintensity);
    }

    intensity.addEventListener('input', (e: any) => {
        if (toggleLamp.checked) {
            intensityvalue = e.target.value;
            pl.intensity = intensityvalue;
        }
        document.addEventListener('pointerup', setintensity);
    })

    //color
    const colormouseup = () => {
        lightMap.set('lamp_params', { switch: toggleLamp.checked, color: lamp1color, intensity: intensityvalue });
        document.removeEventListener('mouseup', colormouseup);
    }

    color.addEventListener('input', (e: any) => {
        lamp1color = e.target.value;
        pl.color.set(lamp1color);
        document.addEventListener('mouseup', colormouseup);
    })

    lightMap.observe(() => {
        const mapped: any = lightMap.get('lamp_params')

        if (mapped.switch) {
            toggleLamp.checked = true;
            intensity.value = '10';
            pl.intensity = 10;
            pl.visible = true ; 
        }
        else {
            toggleLamp.checked = false;
            intensity.value = '0';
            pl.intensity = 0;
            pl.visible = false ; 
        }

        pl.color.set(mapped.color);
        color.value = "#" + mapped.color.toString(16);

        pl.intensity = mapped.intensity;
        intensity.value = `${mapped.intensity}`;
    })

}

export { controlLight , lightMap }; 