<script>
    import { Router, Route, navigate } from "svelte-routing";
    import ActionSelector from "./pages/ActionSelector.svelte";
    import Install from "./pages/Install.svelte";
    import Repair from "./pages/Repair.svelte";
    import Uninstall from "./pages/Uninstall.svelte";
    import Complete from "./pages/Complete.svelte";

    // Stores
    import { canGoBack, canGoForward, currentPage, nextPage } from "./stores/navigation";
    import { action } from "./stores/installation";
    import { radioSelectedIndex } from "./stores/controls";

    // تحديث الصفحة الحالية
    const unsub = nextPage.subscribe((page) => {
        if (page) {
            navigate(page);
        }
    });
</script>

<style global>
    /* ========================================
       S7Cord Theme - Red & White
       ======================================== */

    :root {
        --s7-red: #FF0000;
        --s7-dark-red: #CC0000;
        --s7-darker-red: #990000;
        --s7-white: #FFFFFF;
        --s7-off-white: #F5F5F5;
        --s7-bg-dark: #0a0a0a;
        --s7-bg-card: #141414;
        --s7-bg-hover: #1f1f1f;
        --s7-border: #2a2a2a;
    }

    /* إعادة تعيين أساسية */
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        background-color: var(--s7-bg-dark);
        color: var(--s7-white);
        font-family: 'Segoe UI', 'Poppins', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        overflow: hidden;
    }

    /* الروابط العامة */
    a {
        color: var(--s7-red);
        text-decoration: none;
        transition: color 0.2s ease;
    }

    a:hover {
        color: var(--s7-white);
    }

    /* ===== الهيدر (PageHeader) ===== */
    .page-header {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 20px 24px;
        border-bottom: 3px solid var(--s7-red);
        margin-bottom: 24px;
        background: linear-gradient(180deg, rgba(255,0,0,0.05), transparent);
    }

    .page-header svg {
        width: 32px;
        height: 32px;
        fill: none;
        stroke: var(--s7-red);
        stroke-width: 1.5;
    }

    .page-header h1 {
        font-size: 1.75rem;
        font-weight: 700;
        background: linear-gradient(135deg, var(--s7-red), var(--s7-white));
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
    }

    .page-header h2 {
        font-size: 1.1rem;
        font-weight: 500;
        color: var(--s7-off-white);
        opacity: 0.8;
    }

    /* ===== مجموعة الراديو (RadioGroup) ===== */
    .radio-group {
        display: flex;
        flex-direction: column;
        gap: 16px;
        padding: 0 24px;
    }

    .radio {
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 16px 20px;
        background-color: var(--s7-bg-card);
        border: 1px solid var(--s7-border);
        border-radius: 16px;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .radio:hover {
        border-color: var(--s7-red);
        background-color: var(--s7-bg-hover);
        transform: translateX(6px);
    }

    .radio.selected {
        background: linear-gradient(135deg, var(--s7-red), var(--s7-dark-red));
        border-color: var(--s7-white);
        box-shadow: 0 4px 15px rgba(255, 0, 0, 0.3);
    }

    .radio.selected:hover {
        transform: translateX(6px) scale(1.01);
    }

    /* أيقونات الراديو */
    .radio svg {
        width: 28px;
        height: 28px;
        stroke: var(--s7-red);
        stroke-width: 1.8;
        fill: none;
        transition: all 0.2s ease;
    }

    .radio.selected svg {
        stroke: var(--s7-white);
        filter: drop-shadow(0 0 2px rgba(255,255,255,0.5));
    }

    /* نص الراديو */
    .radio span {
        font-size: 1.1rem;
        font-weight: 600;
        letter-spacing: 0.3px;
        color: var(--s7-off-white);
    }

    .radio.selected span {
        color: var(--s7-white);
    }

    /* ===== الأزرار ===== */
    button {
        background: linear-gradient(135deg, var(--s7-red), var(--s7-dark-red));
        color: var(--s7-white);
        border: none;
        padding: 12px 28px;
        border-radius: 40px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 2px 8px rgba(255, 0, 0, 0.3);
    }

    button:hover {
        background: linear-gradient(135deg, var(--s7-dark-red), var(--s7-darker-red));
        transform: scale(1.02);
        box-shadow: 0 4px 15px rgba(255, 0, 0, 0.5);
    }

    button:active {
        transform: scale(0.98);
    }

    button.secondary {
        background: transparent;
        border: 2px solid var(--s7-red);
        color: var(--s7-red);
        box-shadow: none;
    }

    button.secondary:hover {
        background: rgba(255, 0, 0, 0.1);
        color: var(--s7-white);
        border-color: var(--s7-white);
    }

    /* ===== شريط التقدم (Progress Bar) ===== */
    .progress-container {
        width: 100%;
        background-color: var(--s7-bg-card);
        border-radius: 12px;
        overflow: hidden;
        margin: 20px 0;
        border: 1px solid var(--s7-border);
    }

    .progress-bar {
        height: 8px;
        background: linear-gradient(90deg, var(--s7-red), var(--s7-white));
        width: 0%;
        transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        border-radius: 12px;
        box-shadow: 0 0 6px rgba(255, 0, 0, 0.5);
    }

    /* ===== نصوص الحالة ===== */
    .status-text {
        color: var(--s7-red);
        font-size: 0.85rem;
        margin-top: 8px;
        font-family: 'JetBrains Mono', monospace;
        letter-spacing: 0.3px;
    }

    /* ===== سجل التثبيت (Log Area) ===== */
    .log-area {
        background-color: var(--s7-bg-card);
        border-left: 3px solid var(--s7-red);
        padding: 12px 16px;
        margin-top: 20px;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.75rem;
        max-height: 200px;
        overflow-y: auto;
        border-radius: 8px;
    }

    .log-area::-webkit-scrollbar {
        width: 6px;
    }

    .log-area::-webkit-scrollbar-track {
        background: var(--s7-bg-dark);
        border-radius: 3px;
    }

    .log-area::-webkit-scrollbar-thumb {
        background: var(--s7-red);
        border-radius: 3px;
    }

    /* ===== الصفحات ===== */
    .page {
        max-width: 680px;
        margin: 0 auto;
        padding: 24px 32px;
        height: 100vh;
        overflow-y: auto;
        animation: fadeIn 0.4s ease;
    }

    .page::-webkit-scrollbar {
        width: 6px;
    }

    .page::-webkit-scrollbar-track {
        background: var(--s7-bg-dark);
    }

    .page::-webkit-scrollbar-thumb {
        background: var(--s7-red);
        border-radius: 3px;
    }

    /* أنيميشن */
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    /* ===== كاردات ومكونات إضافية ===== */
    .card {
        background-color: var(--s7-bg-card);
        border-radius: 20px;
        padding: 24px;
        border: 1px solid var(--s7-border);
        margin-bottom: 20px;
    }

    .card-title {
        color: var(--s7-red);
        font-size: 1.2rem;
        font-weight: 700;
        margin-bottom: 12px;
        border-left: 3px solid var(--s7-red);
        padding-left: 12px;
    }

    /* شعار S7Cord */
    .s7cord-logo {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .s7cord-logo svg {
        width: 36px;
        height: 36px;
        stroke: var(--s7-red);
        fill: none;
    }

    .s7cord-logo span {
        font-size: 1.5rem;
        font-weight: 800;
        background: linear-gradient(135deg, var(--s7-red), var(--s7-white));
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
    }
</style>

<Router>
    <div class="page">
        <Route path="/" component={ActionSelector} />
        <Route path="/setup/install" component={Install} />
        <Route path="/setup/repair" component={Repair} />
        <Route path="/setup/uninstall" component={Uninstall} />
        <Route path="/complete" component={Complete} />
    </div>
</Router>