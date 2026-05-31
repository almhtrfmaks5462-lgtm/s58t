<script>
    import { onMount } from "svelte";

    let selectedAction = "install";
    let canGoForward = false;

    function update(action) {
        selectedAction = action;
        canGoForward = true;
    }

    onMount(() => {
        // Apply red theme to body
        document.body.style.backgroundColor = "#0a0a0a";
    });
</script>

<style>
    /* S7Cord Theme - Red & White */
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        background-color: #0a0a0a;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 2rem;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    /* Header */
    .header {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 20px 24px;
        border-bottom: 3px solid #FF0000;
        margin-bottom: 32px;
    }

    .header svg {
        stroke: #FF0000;
    }

    .header h1 {
        font-size: 1.8rem;
        background: linear-gradient(135deg, #FF0000, #FFFFFF);
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
    }

    /* Radio options */
    .options {
        display: flex;
        flex-direction: column;
        gap: 16px;
        margin-bottom: 32px;
    }

    .option {
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 16px 20px;
        background-color: #141414;
        border: 1px solid #2a2a2a;
        border-radius: 16px;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .option:hover {
        border-color: #FF0000;
        transform: translateX(5px);
    }

    .option.selected {
        background: linear-gradient(135deg, #FF0000, #CC0000);
        border-color: #FFFFFF;
    }

    .option svg {
        width: 28px;
        height: 28px;
        stroke: #FF0000;
        stroke-width: 1.8;
    }

    .option.selected svg {
        stroke: #FFFFFF;
    }

    .option span {
        font-size: 1.1rem;
        font-weight: 600;
        color: #FFFFFF;
        opacity: 0.9;
    }

    .option.selected span {
        opacity: 1;
    }

    /* Button */
    .next-btn {
        background: linear-gradient(135deg, #FF0000, #CC0000);
        color: white;
        border: none;
        padding: 14px 28px;
        border-radius: 40px;
        font-size: 1rem;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
        margin-top: 20px;
        width: 100%;
    }

    .next-btn:hover {
        background: linear-gradient(135deg, #CC0000, #990000);
        transform: scale(1.01);
    }

    .next-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
</style>

<div class="container">
    <div class="header">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M8.75 13.5C10.2869 13.5 11.5747 14.5668 11.9131 16.0003L21.25 16C21.6642 16 22 16.3358 22 16.75C22 17.1297 21.7178 17.4435 21.3518 17.4932L21.25 17.5L11.9129 17.5007C11.5741 18.9337 10.2866 20 8.75 20C7.21345 20 5.92594 18.9337 5.58712 17.5007L2.75 17.5C2.33579 17.5 2 17.1642 2 16.75C2 16.3703 2.28215 16.0565 2.64823 16.0068L2.75 16L5.58688 16.0003C5.92534 14.5668 7.21309 13.5 8.75 13.5Z"/>
            <path d="M15.25 4C16.7869 4 18.0747 5.06682 18.4131 6.50034L21.25 6.5C21.6642 6.5 22 6.83579 22 7.25C22 7.6297 21.7178 7.94349 21.3518 7.99315L21.25 8L18.4129 8.00066C18.0741 9.43368 16.7866 10.5 15.25 10.5C13.7134 10.5 12.4259 9.43368 12.0871 8.00066L2.75 8C2.33579 8 2 7.66421 2 7.25C2 6.8703 2.28215 6.55651 2.64823 6.50685L2.75 6.5L12.0869 6.50034C12.4253 5.06682 13.7131 4 15.25 4Z"/>
        </svg>
        <h1>S7Cord Installer</h1>
    </div>

    <div class="options">
        <div class="option {selectedAction === 'install' ? 'selected' : ''}" on:click={() => update('install')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            <span>Install S7Cord</span>
        </div>

        <div class="option {selectedAction === 'repair' ? 'selected' : ''}" on:click={() => update('repair')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
            </svg>
            <span>Repair S7Cord</span>
        </div>

        <div class="option {selectedAction === 'uninstall' ? 'selected' : ''}" on:click={() => update('uninstall')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
            <span>Uninstall S7Cord</span>
        </div>
    </div>

    <button class="next-btn" disabled={!canGoForward} on:click={() => window.location.href = `/setup/${selectedAction}`}>
        Next →
    </button>
</div>