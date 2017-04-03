// Generate object containing all actions states consts
export function generateConstants(type) {
    return {
        REQUEST: type + '_REQUEST',
        SUCCESS: type + '_SUCCESS',
        FAILURE: type + '_FAILURE'
    };
}

export const IMAGES = generateConstants('IMAGES');
export const WEBCAM = generateConstants('WEBCAM');