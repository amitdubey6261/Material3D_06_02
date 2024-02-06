const selectModelVariant = (loadedModelsMap:any) => {
    const buttonArr = document.querySelectorAll('.button')

    Array.from(buttonArr).forEach(button => {
        button.addEventListener('click', async (e: any) => {
            const target = e.target!;
            const selectedModel = target.dataset.model;
            const variantName = target.dataset.variant!;

            console.log(loadedModelsMap);
            console.log(variantName);
            console.log(selectedModel);

            if (selectedModel && loadedModelsMap[selectedModel]) {
                const modelData = loadedModelsMap[selectedModel];
                if (modelData.functions && modelData.functions.selectVariant) {
                    try {
                        await modelData.functions.selectVariant(
                            modelData.scene,
                            variantName
                        );
                    } catch (error) {
                        console.error(`Error selecting variant: ${error}`);
                    }
                }
            }
        });
    });
}


export { selectModelVariant }; 