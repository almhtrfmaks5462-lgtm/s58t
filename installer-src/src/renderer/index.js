import App from "./App.svelte";

const appElement = document.getElementById("app");
const app = new App({
    target: appElement
});

// S7Cord Theme - Red & White Background
const bgSvg = `<svg xmlns='http://www.w3.org/2000/svg' width='60' height='60'><circle cx='30' cy='30' r='1.5' fill='%23FF0000' fill-opacity='0.4'/></svg>`;
appElement.style.setProperty("--background", `url("data:image/svg+xml,${bgSvg}")`);

// إضافة ألوان S7Cord (أحمر وأبيض)
const style = document.createElement('style');
style.textContent = `
    /* S7Cord Theme */
    body {
        background-color: #0a0a0a !important;
    }
    
    .page-header {
        border-bottom: 3px solid #FF0000 !important;
    }
    
    .page-header svg {
        stroke: #FF0000 !important;
    }
    
    .radio {
        background-color: #141414 !important;
        border: 1px solid #2a2a2a !important;
        transition: all 0.3s ease !important;
    }
    
    .radio:hover {
        border-color: #FF0000 !important;
        transform: translateX(5px) !important;
    }
    
    .radio.selected {
        background: linear-gradient(135deg, #FF0000, #CC0000) !important;
        border-color: #FFFFFF !important;
    }
    
    .radio svg {
        stroke: #FF0000 !important;
    }
    
    .radio.selected svg {
        stroke: #FFFFFF !important;
    }
    
    .radio.selected span {
        color: #FFFFFF !important;
    }
    
    button {
        background: linear-gradient(135deg, #FF0000, #CC0000) !important;
        border: none !important;
        color: white !important;
    }
    
    button:hover {
        background: linear-gradient(135deg, #CC0000, #990000) !important;
        transform: scale(1.02) !important;
    }
`;
document.head.appendChild(style);

window.refresh = () => window.location.href = `http://${window.location.host}/`;

// Disable user zooming
window.addEventListener("keydown", (e) => {
    if ((e.code === "Minus" || e.code === "Equal") && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
    }
});

export default app;