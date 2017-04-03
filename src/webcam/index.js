import * as effects from './effects';

export default function webcam(el, {onSnapClick = () => {}}) {
    const video = el.querySelector('.player');
    const photoBtn = el.querySelector('.js-photo-btn');
    const canvas = el.querySelector('.photo');
    const ctx = canvas.getContext('2d');
    const strip = el.querySelector('.strip');
    const filterSelect = el.querySelector('.filter');
    let paintingInterval;

    let imageNumber = 0;
    function render(videoNode = video) {
        // get the video from the browser and return a promise with a media stream
        navigator.mediaDevices.getUserMedia({ video: true, audio: false })
            .then(localMediaStream => {
                // the media stream has to be transformed so that the video element can understand it
                videoNode.src = window.URL.createObjectURL(localMediaStream);
                videoNode.play();
            })
            .catch(err => {
                console.error(err);
            })
    };

    const createSnapshot = (id = 0, canvasNode = canvas) => {
        // this creates an image data object returning text representation of the iamge
        const data = canvas.toDataURL('image/jpeg');
        const link = document.createElement(`a`);
        link.href = data;
        link.setAttribute('download', `snapshot${id}`);
        link.classList.add('snapshot');
        link.innerHTML = `
            <div>
                <img src="${data}" alt="snapshot ${id}" />
            </div>
            <div>Snapshot ${id}</div>`;
        link.addEventListener('click', onSnapClick(link));

        return link;
    };

    const takePhoto = (node = strip) => {
        node.appendChild(createSnapshot(imageNumber++), strip.firstChild);
        return node;
    };

    const paintToCanvas = (filter = null, videoNode = video, canvasNode = canvas, context = ctx) => {
        clearInterval(paintingInterval);
        const [width, height] = [videoNode.videoWidth, videoNode.videoHeight];
        canvasNode.width = width;
        canvasNode.height = height;
        paintingInterval = setInterval(() => {
            context.drawImage(videoNode, 0, 0, width, height);
            if (filter) {
                // take the pixels out
                const pixels = context.getImageData(0, 0, width, height);

                if (filter === effects.ghostEffect) {
                    effects.ghostEffect(0.1, ctx);
                } else {
                    filter(pixels);
                }
                // put them back once the effect is applied
                context.putImageData(pixels, 0, 0);
            }
        }, 16);

        return paintingInterval;
    };

    const applyEffect = e => {
        const { target: { value } } = e;
        const filters = {
            'redEffect': effects.redEffect,
            'blueEffect': effects.blueEffect,
            'greenEffect': effects.greenEffect,
            'rgbSplit': effects.rgbSplit,
            'ghostEffect': effects.ghostEffect,
            'blackAndWhite': effects.blackAndWhite,
            'sephia': effects.sephia
        };
        paintToCanvas(filters[value]);
    };

    const cleanSnaps = (snaps = strip) => 
        snaps.innerHTML = '';

    // once the video is ready to be played it will emit this 'canplay' event
    video.addEventListener('canplay', (e) => paintToCanvas());
    photoBtn.addEventListener('click', (e) => takePhoto());
    filterSelect.addEventListener('change', applyEffect);

    return {
        render,
        cleanSnaps
    }
}