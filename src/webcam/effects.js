export const redEffect = pixels => {
    // each pixel outputs 4 items in the array, the first is for red, second for green, third for blue and the fourth for alpha,
    // thus RGBA and it is also why we iterate in steps of for 'i += 4'.
    // Since this a special array it doesnt support functors (map, filter, etc) so we need to use a for loop
    const { data } = pixels;
    for (let i = 0; i < data.length; i += 4) {
        data[i + 0] = data[i + 0] + 150 // red
        data[i + 1] = data[i + 1] - 50 // green
        data[i + 2] = data[i + 2] * 0.5 // blue
    }
    return pixels;
};

export const greenEffect = pixels => {
    // each pixel outputs 4 items in the array, the first is for red, second for green, third for blue and the fourth for alpha,
    // thus RGBA and it is also why we iterate in steps of for 'i += 4'.
    // Since this a special array it doesnt support functors (map, filter, etc) so we need to use a for loop
    const { data } = pixels;
    for (let i = 0; i < data.length; i += 4) {
        data[i + 0] = data[i + 0] - 100 // red
        data[i + 1] = data[i + 1] + 150 // green
        data[i + 2] = data[i + 2] + 50 // blue
    }
    return pixels;
};

export const blueEffect = pixels => {
    // each pixel outputs 4 items in the array, the first is for red, second for green, third for blue and the fourth for alpha,
    // thus RGBA and it is also why we iterate in steps of for 'i += 4'.
    // Since this a special array it doesnt support functors (map, filter, etc) so we need to use a for loop
    const { data } = pixels;
    for (let i = 0; i < data.length; i += 4) {
        data[i + 0] = data[i + 0] - 50 // red
        data[i + 1] = data[i + 1] * 0.5 // green
        data[i + 2] = data[i + 2] + 150 // blue
    }
    return pixels;
};

export const rgbSplit = pixels => {
    // each pixel outputs 4 items in the array, the first is for red, second for green, third for blue and the fourth for alpha,
    // thus RGBA and it is also why we iterate in steps of for 'i += 4'.
    // Since this a special array it doesnt support functors (map, filter, etc) so we need to use a for loop
    const { data } = pixels;
    // change the position of each channel
    for (let i = 0; i < data.length; i += 4) {
        data[i - 150] = data[i + 0] // red
        data[i + 100] = data[i + 1] // green
        data[i + 150] = data[i + 2]  // blue
    }
    return pixels;
};

export const blackAndWhite = pixels => {
    const { data } = pixels;
    for (let i = 0; i < data.length; i += 4) {
        const red = data[i + 0];
        const green = data[i + 1];
        const blue = data[i + 2];
        const grey = parseInt((red + green + blue) / 3, 10);

        data[i + 0] = grey; // red
        data[i + 1] = grey; // green
        data[i + 2] = grey; // blue
    }
    return pixels;
};

export const sephia = pixels => {
    const { data } = pixels;
    for (let i = 0; i < data.length; i += 4) {
        const red = data[i + 0];
        const green = data[i + 1];
        const blue = data[i + 2];

        data[i + 0] = (red * .393) + (green * .769) + (blue * .189); // red
        data[i + 1] = (red * .349) + (green * .686) + (blue * .168); // green
        data[i + 2] = (red * .272) + (green * .534) + (blue * .131);  // blue
    }
    return pixels;
};

export const ghostEffect = (level = 1, context) => 
    context.globalAlpha = level;
