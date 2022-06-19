let facciaMask;
let layerFaccia;

let occhioSxMask;
let layerOcchiosx;

let occhioDxMask;
let layerOcchiodx;

let nasoMask;
let layerNaso;

let boccaMask;
let layerBocca;

const sliderFaccia = { /*funziona come una cartella, scrivere il percorso*/
    diametro : document.querySelector("#slider-diametro-faccia"),
    passo : document.querySelector("#slider-passo-faccia"),
    sagoma : document.querySelector("#sagoma-faccia"),
    colore : document.querySelector("#colore-faccia"),
}

const sliderOcchioSx = { 
    diametro : document.querySelector("#slider-diametro-occhio-sx"),
    passo : document.querySelector("#slider-passo-occhio-sx"),
    sagoma : document.querySelector("#sagoma-occhio-sx"),
    colore : document.querySelector("#colore-occhio-sx"),
}

const sliderOcchioDx = { 
    diametro : document.querySelector("#slider-diametro-occhio-dx"),
    passo : document.querySelector("#slider-passo-occhio-dx"),
    sagoma : document.querySelector("#sagoma-occhio-dx"),
    colore : document.querySelector("#colore-occhio-dx"),
}

const sliderNaso = { 
    diametro : document.querySelector("#slider-diametro-naso"),
    passo : document.querySelector("#slider-passo-naso"),
    sagoma : document.querySelector("#sagoma-naso"),
    colore : document.querySelector("#colore-naso"),
}

const sliderBocca = { 
    diametro : document.querySelector("#slider-diametro-bocca"),
    passo : document.querySelector("#slider-passo-bocca"),
    sagoma : document.querySelector("#sagoma-bocca"),
    colore : document.querySelector("#colore-bocca"),
}

function preload() {
    facciaMask = loadImage("assets/faccia_0.png");
    occhioSxMask = loadImage("assets/occhio-sx_0.png");
    occhioDxMask = loadImage("assets/occhio-dx_0.png");
    nasoMask = loadImage("assets/naso_0.png");
    boccaMask = loadImage("assets/bocca_0.png");
}

function setup(){
    createCanvas(400, 400);

    layerFaccia = createGraphics(width, height);
    layerOcchiosx = createGraphics(60, 60);
    layerOcchiodx = createGraphics(60, 60);
    layerNaso = createGraphics(50, 50);
    layerBocca = createGraphics(60, 60);
}

function pattern (layer, valore, passoX, forma = 'cerchio') {
    const passoY = passoX * sqrt(3) / 2;
    const numX = floor(width / passoX) + 1;
    const numY = floor(height / passoY) + 1;
    const margineX = (width - (numX - 1) * passoX) / 2 - passoX / 4;
    const margineY = (height - (numY - 1) * passoY) / 2;
    
    for(let j = 0; j < numY; j++) {
        for(let i = 0; i < numX; i++) {
            const cx = margineX + i * passoX + passoX/2 * (j % 2);
            const cy = margineY + j * passoY;

            if (forma === 'cerchio') {
                layer.circle(cx, cy, valore);
            }
            else {
                layer.square(cx, cy, valore);
            }
        }
    }
}

function draw(){

    // BG (layer 0)
    noStroke();
    fill(document.querySelector("#colore-sfondo").value);

    const spessore = 3;
    const passo = spessore * 1;
    const num = width / passo;

    for(let i = 0; i < num; i++) {
        const rx = i * passo;

        rect( rx, 0, spessore, height);
    }

    // Layer Faccia
    layerFaccia.clear();
    layerFaccia.noStroke();
    layerFaccia.fill(sliderFaccia.colore.value);

    const patternFaccia = document.querySelector("[name='forma-faccia']:checked");

    pattern(layerFaccia, sliderFaccia.diametro.value, sliderFaccia.passo.value, patternFaccia.value);

    let img = layerFaccia.get();
    img.mask(facciaMask);

    image(img, 0, 0);
    

    // Layer occhio sinistro
    layerOcchiosx.clear();
    layerOcchiosx.noStroke();
    layerOcchiosx.fill(sliderOcchioSx.colore.value);

    const patternOcchioSx = document.querySelector("[name='forma-occhio-sx']:checked");

    pattern(layerOcchiosx, sliderOcchioSx.diametro.value, sliderOcchioSx.passo.value, patternOcchioSx.value);
    
    let imos = layerOcchiosx.get();
    imos.mask(occhioSxMask);

    image(imos, 90, 130);


    // Layer occhio destro
    layerOcchiodx.clear();
    layerOcchiodx.noStroke();
    layerOcchiodx.fill(sliderOcchioDx.colore.value);

    const patternOcchioDx = document.querySelector("[name='forma-occhio-dx']:checked");

    pattern(layerOcchiodx, sliderOcchioDx.diametro.value, sliderOcchioDx.passo.value, patternOcchioDx.value);

    let imod = layerOcchiodx.get();
    imod.mask(occhioDxMask);

    image(imod, 250, 130);
    

    // Layer naso
    layerNaso.clear();
    layerNaso.noStroke();
    layerNaso.fill(sliderNaso.colore.value);

    const patternNaso = document.querySelector("[name='forma-naso']:checked");

    pattern(layerNaso, sliderNaso.diametro.value, sliderNaso.passo.value, patternNaso.value);

    let imn = layerNaso.get();
    imn.mask(nasoMask);

    image(imn, 180, 170);


    // Layer bocca
    layerBocca.clear();
    layerBocca.noStroke();
    layerBocca.fill(sliderBocca.colore.value);

    const patternBocca = document.querySelector("[name='forma-bocca']:checked");

    pattern(layerBocca, sliderBocca.diametro.value, sliderBocca.passo.value, patternBocca.value);

    let imb = layerBocca.get();
    imb.mask(boccaMask);

    image(imb, 174, 240);

}

function keyPressed() {
    //s salva
    if (key === 's'){
        save("immagine.png");
    }
}

// funzione che ricrea la sagoma
function creaSagoma(prefix, value) {
    return `assets/${prefix}_${value}.png`;
}

sliderFaccia.sagoma.addEventListener('input', function() {
    const sagoma = creaSagoma('faccia', sliderFaccia.sagoma.value);
    
    facciaMask = loadImage(sagoma);
});

sliderOcchioSx.sagoma.addEventListener('input', function() {
    const sagoma = creaSagoma('occhio-sx', sliderOcchioSx.sagoma.value);
    
    occhioSxMask = loadImage(sagoma);
});

sliderOcchioDx.sagoma.addEventListener('input', function() {
    const sagoma = creaSagoma('occhio-dx', sliderOcchioDx.sagoma.value);
    
    occhioDxMask = loadImage(sagoma);
});

sliderNaso.sagoma.addEventListener('input', function() {
    const sagoma = creaSagoma('naso', sliderNaso.sagoma.value);
    
    nasoMask = loadImage(sagoma);
});

sliderBocca.sagoma.addEventListener('input', function() {
    const sagoma = creaSagoma('bocca', sliderBocca.sagoma.value);
    
    boccaMask = loadImage(sagoma);
});